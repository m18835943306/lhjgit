import React, { useState, useEffect, useContext } from 'react'
import { Select, Button, DatePicker, Form, Radio } from 'antd'
import { getRealtimeItems } from '&/api/electricity'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'dayjs'
import { Context } from '../../context'

const Filter = ({
  onQuery,
  paramsData,
  setParamsData,
  chartType,
  setChartType,
  selectedDevTypes,
  setSelectedDevTypes
}) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const { devTypes } = useContext(Context)
  const [selectData, setSelectData] = useState([])
  const [industryNumber, setIndustryNumber] = useState(8)
  // const [date_type, setDate_type] = useState(0)
  const [dateFormats, setDateFormats] = useState('YYYY-MM-DD HH:mm:00')
  const [dateFormatsData, setDateFormatsData] = useState('YYYY-MM-DD HH:mm:00')
  useEffect(() => {
    getRealtimeItemsData()
  }, [])
  //  监测像接口
  const getRealtimeItemsData = () => {
    getRealtimeItems({ project_id: values?.project_id }).then((result) => {
      const list = result.monitor_items.filter((item) => {
        return item.data_type_id == 7 || item.data_type_id == 8
      })
      setSelectData(list)
    })
  }

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
      // state.start_time = moment()
      //   .subtract(24, 'h')
      //   .format('YYYY-MM-DD HH:00:00')
      // state.end_time = moment().format('YYYY-MM-DD HH:00:00')
      state.start_time = moment(state.start_time).format('YYYY-MM-DD HH:00:00')
      state.end_time = moment(state.end_time).format('YYYY-MM-DD HH:00:00')
      setDateFormats('YYYY-MM-DD HH:00:00')
      setDateFormatsData('YYYY-MM-DD HH')
    } else {
      // state.start_time = moment()
      //   .subtract(30, 'd')
      //   .format('YYYY-MM-DD 00:00:00')
      // state.end_time = moment().format('YYYY-MM-DD 00:00:00')
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

  const radioOptions = [
    { label: '默认', value: '0' },
    { label: '周末', value: '1' },
    { label: '报警', value: '2' }
  ]
  return (
    <div className="EntQuery">
      <Form layout="inline">
        {/* <Form.Item label="时间速选">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={date_type}
            onChange={(v) => onQueryChange(v, 'date_type')}
          >
            <Select.Option value={0} key={0}>
              自定义
            </Select.Option>
            <Select.Option value={1} key={1}>
              1天
            </Select.Option>
            <Select.Option value={2} key={2}>
              7天
            </Select.Option>
            <Select.Option value={3} key={3}>
              1个月
            </Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item label="时间">
          <DatePicker.RangePicker
            showTime={dateFormatsData == 'YYYY-MM-DD' ? false : true}
            showNow
            minuteStep={15}
            defaultValue={[
              moment(paramsData.start_time),
              moment(paramsData.end_time)
            ]}
            value={[moment(paramsData.start_time), moment(paramsData.end_time)]}
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
        <Form.Item label="监测项">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.data_type_id}
            onChange={(v) => onQueryChange(v, 'industry')}
          >
            {selectData &&
              selectData.map((item) => (
                <Select.Option
                  value={item.data_type_id}
                  key={item.data_type_id}
                >
                  {item.data_type}
                </Select.Option>
              ))}
          </Select>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'nowrap'
        }}
      >
        <Form layout="inline">
          <Form.Item label="设备类型">
            <Select
              mode="multiple"
              allowClear
              style={{ minWidth: '280px' }}
              placeholder={`请选择设备类型（可多选）`}
              value={selectedDevTypes}
              onChange={setSelectedDevTypes}
            >
              {devTypes.map((dev) => (
                <Select.Option value={dev.dev_type} key={dev.dev_type}>
                  {dev.dev_type_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <Radio.Group
          options={radioOptions}
          onChange={(e) => setChartType(e.target.value)}
          value={chartType}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
    </div>
  )
}

export default Filter
