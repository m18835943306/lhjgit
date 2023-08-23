import { useState, useEffect } from 'react'
import { Select, DatePicker } from 'antd'

import { getMonitorItems } from '&/api/electricity'
import dayjs from 'dayjs'

import './index.scss'

const Filter = ({ paramsData, setParamsData }) => {
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD HH:mm:ss')
  const [disabled, setDisabled] = useState(false)
  const [queryData, setQueryData] = useState({
    monitor_items: [],
    total_elec: [],
    production: [],
    control_equip: []
  })

  useEffect(() => {
    const values = JSON.parse(sessionStorage.getItem('userv2'))
    // const result = await getMonitorItems({ project_id: values?.project_id })
    getMonitorItems({ project_id: values?.project_id })
      .then((res) => {
        //.then是接收正确返回的信息
        // console.log(res) // {...}
        setQueryData(res)
      })
      .catch((err) => {
        // .catch 返回报错信息
        console.log(err)
      })
    // setQueryData(result)
  }, [])

  const onQueryChange = (v, t) => {
    if (t === 'time' && Array.isArray(v)) {
      const st = v[0].format(dateFormat)
      const et = v[1].format(dateFormat)
      setParamsData((state) => {
        state.start_time = st
        state.end_time = et
        return {
          ...state
        }
      })
    }
    if (t === 'data_type_id') {
      if (v === 7) {
        setDisabled(true)
      } else setDisabled(false)
      setParamsData((state) => {
        state.data_type_id = v
        return {
          ...state
        }
      })
    }
    if (t === 'time_type') {
      setParamsData((state) => {
        const newState = onTimeTypeChange(v, state)

        return {
          ...newState
        }
      })
    }
  }
  const onTimeTypeChange = (v, state) => {
    const format =
      v === 1 ? 'YYYY-MM-DD HH:mm' : v === 2 ? 'YYYY-MM-DD HH' : 'YYYY-MM-DD'
    setDateFormat(format)
    state.time_type = v
    if (v === 1) {
      state.start_time = dayjs().subtract(6, 'h').format(format)
    } else if (v === 2) {
      state.start_time = dayjs().subtract(24, 'h').format(format)
    } else {
      state.start_time = dayjs().subtract(30, 'd').format(format)
    }
    state.end_time = dayjs().format(format)
    return state
  }

  return (
    <div className="filter">
      <div className="filter_query">
        <div className="filter_query__item">
          <div className="filter_query__item--label">时间：</div>
          <div className="filter_query__item--value">
            <DatePicker.RangePicker
              showTime
              showNow
              defaultValue={[
                dayjs(paramsData.start_time),
                dayjs(paramsData.end_time)
              ]}
              format={dateFormat}
              onChange={(v) => {
                onQueryChange(v, 'time')
              }}
            />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">监测项：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={paramsData.data_type_id}
              onChange={(v) => onQueryChange(v, 'data_type_id')}
            >
              {queryData.monitor_items
                .filter((m) => m.data_type_id === 7 || m.data_type_id === 8)
                .map((item) => (
                  <Select.Option
                    value={item.data_type_id}
                    key={item.data_type_id}
                  >
                    {item.data_type}
                  </Select.Option>
                ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">粒度：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={paramsData.time_type}
              onChange={(v) => onQueryChange(v, 'time_type')}
            >
              <Select.Option value={1}>15分钟</Select.Option>
              <Select.Option value={2} disabled={disabled}>
                小时
              </Select.Option>
              <Select.Option value={3} disabled={disabled}>
                日
              </Select.Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
