import React, { useState, useEffect } from 'react'
import { Select, Button, DatePicker, Form, Radio } from 'antd'
import { getRealtimeItems } from '&/api/electricity'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'dayjs'
import EntData from './../../../DeviceQuery/EntData/index';

const Filter = ({
  entData,
  onQuery,
  paramsData,
  setParamsData,
}) => {
  //设备类型
  const [devType, setDevType] = useState([])
  const [industryNumber, setIndustryNumber] = useState(8)
  const [dateFormats, setDateFormats] = useState('YYYY-MM-DD HH:mm:00')
  const [dateFormatsData, setDateFormatsData] = useState('YYYY-MM-DD HH:mm:00')

  //处理设备类型
  const convertOptions = (arr) => {
    return arr.map(item => ({
      value: item.dev_type_name,
      label: item.dev_type_name,
    }));
  }

  useEffect(() => {
    if (entData && entData.dev_type && entData.dev_type.length > 0) {
      const converted = convertOptions(entData.dev_type)
      setDevType(converted)
    }
  }, [entData]);

  const onQueryChange = (v, t) => {
    if (t === 'time' && Array.isArray(v)) {
      onTimePresetsChange(v)
    }
    if (t === 'industry') {
      setParamsData((state) => {
        setIndustryNumber(v)
        state.data_type_id = v

        return {
          ...state
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
    if(t === 'dev_type') {
      setParamsData((state) => {
        state.dev_type = v
        return {
          ...state,
        }
      })
    }
  }
  const onTimePresetsChange = (v) => {
    const timeType = paramsData.time_type
    const dateFormat = 'YYYY-MM-DD HH:mm:00'
    const time = moment().format(dateFormat)
    const timestr = time.slice(14, 16)
    const timenum = Number(timestr) % 15
    const resultnum = Number(timestr) - timenum
    const e =
      resultnum == 0 ? `YYYY-MM-DD HH:00:00` : `YYYY-MM-DD HH:${resultnum}:00`
    const format = timeType == 1 ? e : dateFormats
    const t = {
      start_time: moment(v[0]).format(format),
      end_time: moment(v[1]).format(format)
    }
    setParamsData((state) => {
      return {
        ...state,
        ...t
      }
    })
  }
  const onTimeTypeChange = (v, state) => {
    state.time_type = v
    if (v === '1') {
      const dateFormat = 'YYYY-MM-DD HH:mm:00'
      const time = moment().format(dateFormat)
      const timestr = time.slice(14, 16)
      const timenum = Number(timestr) % 15
      const resultnum = Number(timestr) - timenum
      const e =
        resultnum == 0 ? `YYYY-MM-DD HH:00:00` : `YYYY-MM-DD HH:${resultnum}:00`
      state.start_time = moment(state.start_time).format(e)
      state.end_time = moment(state.end_time).format(e)
      setDateFormats('YYYY-MM-DD HH:mm:00')
      setDateFormatsData('YYYY-MM-DD HH:mm')
    } else if (v === '2') {
      state.start_time = moment(state.start_time).format('YYYY-MM-DD HH:00:00')
      state.end_time = moment(state.end_time).format('YYYY-MM-DD HH:00:00')
      setDateFormats('YYYY-MM-DD HH:00:00')
      setDateFormatsData('YYYY-MM-DD HH')
    } else {
      state.start_time = moment(state.start_time).format('YYYY-MM-DD 00:00:00')
      state.end_time = moment(state.end_time).format('YYYY-MM-DD 00:00:00')
      setDateFormats('YYYY-MM-DD 00:00:00')
      setDateFormatsData('YYYY-MM-DD')
    }
    return state
  }

  const click = () => {
    onQuery && onQuery()
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Form>
        <Form layout="inline">
          <Form.Item label="时间">
            <DatePicker.RangePicker
              showTime={dateFormatsData == 'YYYY-MM-DD' ? false : true}
              showNow
              minuteStep={15}
              defaultValue={[
                moment(paramsData.start_time),
                moment(paramsData.end_time)
              ]}
              value={[
                moment(paramsData.start_time),
                moment(paramsData.end_time)
              ]}
              format={dateFormatsData}
              presets={[
                {
                  label: '昨天',
                  value: [moment().subtract(1, 'day'), moment()]
                },
                {
                  label: '一周',
                  value: [moment().subtract(7, 'day'), moment()]
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
            {industryNumber && industryNumber === 8 ? (
              <Select
                allowClear
                placeholder={`请选择`}
                defaultValue={paramsData.time_type}
                onChange={(v) => onQueryChange(v, 'statues')}
              >
                <Select.Option value={'1'} key={'1'}>
                  刻钟
                </Select.Option>
                <Select.Option value={'2'} key={'2'}>
                  小时
                </Select.Option>
                <Select.Option value={'3'} key={'3'}>
                  日
                </Select.Option>
              </Select>
            ) : (
              <Select
                allowClear
                placeholder={`请选择`}
                defaultValue={'1'}
                onChange={(v) => onQueryChange(v, 'statues')}
              >
                <Select.Option value={'1'} key={'1'}>
                  刻钟
                </Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="用电类型">
            <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={"企业总电"}
              value={paramsData.dev_type}
              onChange={(v) => onQueryChange(v, 'dev_type')}
              options={devType}>
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
