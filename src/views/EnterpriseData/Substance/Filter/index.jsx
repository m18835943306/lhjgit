import React, { useState, useEffect } from 'react'
import { Select, Button, DatePicker, Form, Radio } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'dayjs'

const Filter = ({
  onQuery,
  paramsData,
  setParamsData,
}) => {
  // const [dateFormatsData, setDateFormatsData] = useState('YYYY-MM-DD HH:mm:ss')
   const [picks,setPicks]=useState("")
  const onQueryChange = (v, t) => {
    if (t === 'time' && Array.isArray(v)) {
      const t = {
        start_time: moment(v[0]).format("YYYY-MM-DD 00:00:00"),
        end_time: moment(v[1]).format("YYYY-MM-DD 23:59:59")
      }
      setParamsData((state) => {
        return {
          ...state,
          ...t
        }
      })
    }
    if (t === 'statues') {
      setParamsData((state) => {
        const newState = onTimeTypeChange(v, state)
        return {
          ...newState
        }
      })
    }
  }
  const onTimeTypeChange = (v, state) => {
    state.time_type = v
  if (v === '2') {
      state.start_time = moment(state.start_time).format("YYYY-MM-DD 00:00:00")
      state.end_time = moment(state.end_time).format("YYYY-MM-DD 23:59:59")
      // setDateFormatsData('YYYY-MM')
      setPicks("month")
    } else {
      state.start_time = moment(state.start_time).format("YYYY-MM-DD 00:00:00")
      state.end_time = moment(state.end_time).format("YYYY-MM-DD 23:59:59")
      // setDateFormatsData('YYYY-MM-DD')
      setPicks("")
    }
    return state
  }

  const click = () => {
    const getParams = () => {
      let newParamsData = {}
      for (let key in paramsData) {
        if (paramsData[key] != (-1 || '-1')) {
          newParamsData[key] = paramsData[key]
        }
      }
      return newParamsData
    }
    onQuery && onQuery(getParams())
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Form>
        <Form layout="inline">
          <Form.Item label="时间">
            <DatePicker.RangePicker
              showNow
               picker={picks}
              defaultValue={[
                moment(paramsData.start_time),
                moment(paramsData.end_time)
              ]}
              value={[
                moment(paramsData.start_time),
                moment(paramsData.end_time)
              ]}
              // format={dateFormatsData}
              presets={[
                {
                  label: '昨天',
                  value: [moment().subtract(1, 'day'), moment()]
                },
                {
                  label: '一个月',
                  value: [moment().subtract(30, 'day'), moment()]
                }
              ]}
              onChange={(v) => {
                onQueryChange(v, 'time')
              }}
            />
          </Form.Item>

          <Form.Item label="时间粒度">
            <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={paramsData.time_type}
              onChange={(v) => onQueryChange(v, 'statues')}
            >
              <Select.Option value={'2'} key={'2'}>
                月
              </Select.Option>
              <Select.Option value={'3'} key={'3'}>
                日
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={click}
              icon={<SearchOutlined></SearchOutlined>}
            >
              查询
            </Button>
          </Form.Item>
        </Form>
      </Form>

    </div>
  )
}

export default Filter
