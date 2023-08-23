import React, { useState, useEffect, useMemo } from 'react'
import {
  Input,
  DatePicker,
  Select,
  Button,
  TreeSelect,
  Form,
  Space
} from 'antd'
import { FilterContainer } from '@/appComponents/Filter'
import { SearchOutlined } from '@ant-design/icons'
import { getMonitorItems, getStatisticalAnalysis } from '&/api/electricity'
import dayjs from 'dayjs'

const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const values = JSON.parse(localStorage.getItem('user')) || {}
  const [disabled, setDisabled] = useState(false)
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD HH:mm')
  const [queryData, setQueryData] = useState({
    monitor_items: [],
    total_elec: [],
    production: [],
    control_equip: []
  })
  const [treeData, setTreeData] = useState([])
  const [value, setValue] = useState()

  const minuteStep15Time = useMemo(
    () => dayjs().subtract(dayjs().minute() % 15, 'minute'),
    []
  )
  useEffect(() => {
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
    getStatisticalAnalysisrequire()
  }, [])
  const getStatisticalAnalysisrequire = async () => {
    const result = await getStatisticalAnalysis({
      project_id: values?.project_id
    })
    const areas = []
    result.area.map((o) => {
      areas.push({
        id: o.county_id,
        pId: 0,
        value: o.county_id,
        title: o.county_name,
        isLeaf: false,
        children: []
      })
    })
    const street = result.area.map((item) => {
      return item.towns.map((i) => {
        return {
          id: i.town_id,
          pId: item.county_id,
          value: i.town_id,
          title: i.town_name,
          isLeaf: true
        }
      })
    })
    // areas[1].children = street[0]
    areas.forEach((item, index) => {
      item.children = street[index]
    })
    areas.unshift({
      id: -1,
      pId: 0,
      value: -1,
      title: '全部',
      isLeaf: false
    })
    setTreeData(areas)
  }
  const onChange = (newValue) => {
    onQueryChange(newValue, 'area')
    setValue(newValue)
  }
  const onQueryChange = (v, t) => {
    if (t === 'area') {
      if (v > 100) {
        setParamsData((state) => {
          state.town_id = v
          delete state.county_id
          return {
            ...state
          }
        })
      } else {
        setParamsData((state) => {
          state.county_id = v
          delete state.town_id
          return {
            ...state
          }
        })
      }
    }
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
    if (t === 'data_type') {
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
    if (t === 'text') {
      setParamsData((state) => {
        state.ent_name = v.target.value
        return {
          ...state
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
      state.start_time = dayjs(minuteStep15Time).subtract(6, 'h').format(format)
    } else if (v === 2) {
      state.start_time = dayjs().subtract(24, 'h').format(format)
    } else {
      state.start_time = dayjs().subtract(30, 'd').format(format)
    }
    state.end_time = dayjs().format(format)
    if (v === 1) {
      state.end_time = dayjs(minuteStep15Time).format(format)
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
    <FilterContainer>
      <Form layout="inline">
        <Form.Item label="区域选择">
          <TreeSelect
            treeDataSimpleMode
            style={{
              width: '100%'
            }}
            value={value}
            defaultValue={paramsData.county_id}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto'
            }}
            placeholder="请选择区域"
            onChange={onChange}
            // loadData={onLoadData}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item label="企业名称">
          <Input
            placeholder="请输入企业名称"
            onChange={(v) => onQueryChange(v, 'text')}
          />
        </Form.Item>
        <Form.Item label="时间">
          <DatePicker.RangePicker
            showTime={dateFormat === 'YYYY-MM-DD' ? false : true}
            minuteStep={15}
            showNow
            defaultValue={[
              dayjs(paramsData.start_time),
              dayjs(paramsData.end_time)
            ]}
            value={[dayjs(paramsData.start_time), dayjs(paramsData.end_time)]}
            format={dateFormat}
            onChange={(v) => {
              onQueryChange(v, 'time')
            }}
          />
        </Form.Item>
        <Form.Item label="监测项">
          <Select
            placeholder={`请选择`}
            defaultValue={paramsData.data_type_id}
            onChange={(v) => onQueryChange(v, 'data_type')}
          >
            {/* 过滤掉其他，只留总有功功率和正向有功电能 */}
            {queryData?.monitor_items
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
        </Form.Item>
        <Form.Item label="时间粒度">
          <Select
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
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={click}
              icon={<SearchOutlined></SearchOutlined>}
            >
              查询
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </FilterContainer>
  )
}

export default Filter
