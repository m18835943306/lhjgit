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
import { getStatisticalAnalysis } from '&/api/electricity'
import query from '&/api/electricity/query'
import dayjs from 'dayjs'

const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const values = JSON.parse(localStorage.getItem('user')) || {}
  const [disabled, setDisabled] = useState(false)
  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    getStatisticalAnalysisrequire()
  }, [])
  const getStatisticalAnalysisrequire = async () => {
    const res = await getStatisticalAnalysis({
      project_id: values?.project_id
    })
    const area = [
      {
        id: '-2',
        pId: 0,
        value: '-2',
        title: '全部',
        isLeaf: false
      }
    ]
    res.area.map((o) => {
      area.push({
        id: o.county_id,
        pId: 0,
        value: o.county_id,
        title: o.county_name,
        isLeaf: false
      })
    })
    // console.log(area,"areaareaareaarea")
    setTreeData(area)
  }
  const onQueryChange = (v, t) => {
    if (t === 'area') {
      if (v > 100) {
        setParamsData((state) => {
          state.town_id = v
          delete state.assign_to_adm_id
          return {
            ...state
          }
        })
      } else {
        setParamsData((state) => {
          state.assign_to_adm_id = v
          delete state.town_id
          return {
            ...state
          }
        })
      }
    }
    if (t === 'time' && Array.isArray(v)) {
      const st = v[0].format("YYYY-MM-DD 00:00:00")
      const et = v[1].format("YYYY-MM-DD 00:00:00")
      setParamsData((state) => {
        state.start_time = st
        state.end_time = et
        return {
          ...state
        }
      })
    }
    if (t === 'text') {
      setParamsData((state) => {
        state.clue_code = v.target.value
        return {
          ...state
        }
      })
    }
    if (t === 'push_type') {
      setParamsData((state) => {
        state.push_type = v
        return {
          ...state
        }
      })
    }
    if (t === 'time_type') {
      setParamsData((state) => {
        state.time_type = v
        return {
          ...state
        }
      })
    }
  }
  const onChange = (newValue) => {
    onQueryChange(newValue, 'area')
    const params = {
      assign_to_adm_id: newValue,
      town_id: newValue
    }
    if (newValue > 100) {
      params.assign_to_adm_id = ''
    } else {
      params.town_id = ''
    }
    if (newValue === -2) {
      params.assign_to_adm_id = ''
      params.town_id = ''
    }
  }
  const click = () => {
    const getParams = () => {
      let newParamsData = {}
      for (let key in paramsData) {
        if (paramsData[key] != '-2') {
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
      <Form.Item label="区域选择：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.assign_to_adm_id}
            onChange={onChange}
          >
            {treeData &&
              treeData.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.title}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
          <Form.Item label="下发时间">
          <Select
            placeholder={`请选择`}
            defaultValue={paramsData.time_type}
            onChange={(v) => onQueryChange(v, 'time_type')}
          >
            <Select.Option value={1}>下发时间</Select.Option>
            <Select.Option value={2}>线索创建时间</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="推送方式">
          <Select
            placeholder={`请选择`}
            defaultValue={paramsData.push_type}
            onChange={(v) => onQueryChange(v, 'push_type')}
          >
            <Select.Option value={2}>中心推送给各区</Select.Option>
            <Select.Option value={3}>中心推送企业</Select.Option>
            <Select.Option value={4}>区级推送到企业</Select.Option>
            <Select.Option value={1}>中心推送精细化平台</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="编号搜索">
          <Input
            placeholder="请输入编号"
            onChange={(v) => onQueryChange(v, 'text')}
          />
        </Form.Item>
        <Form.Item label="时间">
          <DatePicker.RangePicker
            showTime
            showNow
            defaultValue={[
              dayjs(paramsData.start_time),
              dayjs(paramsData.end_time)
            ]}
            value={[dayjs(paramsData.start_time), dayjs(paramsData.end_time)]}
            // format={dateFormat}
            onChange={(v) => {
              onQueryChange(v, 'time')
            }}
          />
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
