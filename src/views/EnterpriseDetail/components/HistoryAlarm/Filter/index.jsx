import React, { useState, useEffect } from 'react'
import { Select, Button, DatePicker } from 'antd'
import query from '&/api/electricity/query'
import dayjs from 'dayjs'

import './index.scss'

const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const { project_id } = JSON.parse(localStorage.getItem('user'))
  const [dateFormats, setDateFormats] = useState('YYYY-MM-DD')
  const [value, setValue] = useState([])
  const [statues, setStatues] = useState([])
  useEffect(() => {
    query('/v1/device-warn-items', {
      project_id: project_id
    }).then((res) => {
      //  console.log(res,"resresresresresresres");
      const type = [
        {
          warn_type_name: '全部',
          warn_type: -1
        }
      ]
      res.warn_type.map((o) => {
        type.push({
          warn_type_name: o.warn_type_name,
          warn_type: o.warn_type
        })
      })
      setValue(type)
      const status = [
        {
          release_status_value: '全部',
          release_status: -1
        }
      ]
      res.release_status.map((o) => {
        status.push({
          release_status_value: o.release_status_value,
          release_status: o.release_status
        })
      })
      setStatues(status)
    })
  }, [])

  const onQueryChange = (v, t) => {
    // console.log(v,t,"11111111");
    if (t === 'time' && Array.isArray(v)) {
      const st = v[0].format(dateFormats)
      const et = v[1].format(dateFormats)
      setParamsData((state) => {
        state.start_time = st
        state.end_time = et
        return {
          ...state
        }
      })
    }
    if (t === 'type') {
      setParamsData((state) => {
        if (v === '') {
          delete state.warn_type
          return {
            ...state
          }
        } else {
          state.warn_type = v
          return {
            ...state
          }
        }
      })
    }
    if (t === 'statues') {
      setParamsData((state) => {
        if (v === '') {
          delete state.release_status
          return {
            ...state
          }
        } else {
          state.release_status = v
          return {
            ...state
          }
        }
      })
    }
  }

  const click = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != -1) {
        newParamsData[key] = paramsData[key]
      }
    }
    onQuery && onQuery(newParamsData)
    // onQuery && onQuery(paramsData);
  }
  return (
    <div className="filter">
      <div className="filter_query">
        <div className="filter_query__item">
          <div className="filter_query__item--label">时间：</div>
          <div className="filter_query__item--value">
            <DatePicker.RangePicker
              // showTime
              showNow
              defaultValue={[
                dayjs(paramsData.start_time),
                dayjs(paramsData.end_time)
              ]}
              value={[dayjs(paramsData.start_time), dayjs(paramsData.end_time)]}
              onChange={(v) => {
                onQueryChange(v, 'time')
              }}
            />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">报警类型：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={paramsData.warn_type}
              onChange={(v) => onQueryChange(v, 'type')}
            >
              {value &&
                value.map((item) => (
                  <Select.Option value={item.warn_type} key={item.warn_type}>
                    {item.warn_type_name}
                  </Select.Option>
                ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">报警状态：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={paramsData.release_status}
              onChange={(v) => onQueryChange(v, 'statues')}
            >
              {statues &&
                statues.map((item) => (
                  <Select.Option
                    value={item.release_status}
                    key={item.release_status}
                  >
                    {item.release_status_value}
                  </Select.Option>
                ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="filter_button">
        <Button type="primary" onClick={click}>
          查询
        </Button>
      </div>
    </div>
  )
}

export default Filter
