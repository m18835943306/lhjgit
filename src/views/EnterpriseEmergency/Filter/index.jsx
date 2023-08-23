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
import { getEmergencyItems } from '&/api/electricity'
import dayjs from 'dayjs'

const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const [treeData, setTreeData] = useState([])
  const [industryList, setIndustryList] = useState([])
  const [warnType, setWarnType] = useState([])
  const [value, setValue] = useState()
  useEffect(() => {
    getEmergencyItemsRequest()
  }, [])
  const getEmergencyItemsRequest = async () => {
    const result = await getEmergencyItems()
    //  console.log(res,"res----");
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
    const hangye = [
      {
        industry_type: '全部',
        industry_type_id: -1
      }
    ]
    result.industry.map((o) => {
      hangye.push({
        industry_type: o.industry_type_name,
        industry_type_id: o.industry_type_id
      })
    })
    setIndustryList(hangye)
    const warn = [
      {
        warn_type: '全部',
        warn_type_id: -1
      }
    ]
    result.warn_type.map((o) => {
      warn.push({
        warn_type: o.warn_type_name,
        warn_type_id: o.warn_type_id
      })
    })
    setWarnType(warn)
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
      }
    }
    if (t === 'time' && Array.isArray(v)) {
      const st = v[0].format('YYYY-MM-DD HH:00:00')
      const et = v[1].format('YYYY-MM-DD HH:00:00')
      setParamsData((state) => {
        state.start_time = st
        state.end_time = et
        return {
          ...state
        }
      })
    }
    if (t === 'warn') {
      setParamsData((state) => {
        state.warn_type = `${v}`
        return {
          ...state
        }
      })
    }
    if (t === 'industry') {
      setParamsData((state) => {
        state.industry_type_id = `${v}`
        return {
          ...state
        }
      })
    }
    if (t == 'text') {
      setParamsData((state) => {
        state.ent_name = v.target.value
        return {
          ...state
        }
      })
    }
  }
  const click = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != (-1 || '-1')) {
        newParamsData[key] = paramsData[key]
      }
    }
    onQuery && onQuery(newParamsData)
  }

  return (
    <FilterContainer>
      <Form layout="inline">
        <Form.Item label="区域选择：">
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
        <Form.Item label="行业选择：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={Number(paramsData.industry_type_id)}
            onChange={(v) => onQueryChange(v, 'industry')}
          >
            {industryList &&
              industryList.map((item) => (
                <Select.Option
                  value={item.industry_type_id}
                  key={item.industry_type_id}
                >
                  {item.industry_type}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        {/* <Form.Item label="报警类型：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={Number(paramsData.warn_type)}
            onChange={(v) => onQueryChange(v, 'warn')}
          >
            {warnType &&
              warnType.map((item) => (
                <Select.Option
                  value={item.warn_type_id}
                  key={item.warn_type_id}
                >
                  {item.warn_type}
                </Select.Option>
              ))}
          </Select>
        </Form.Item> */}
        <Form.Item label="企业名称：">
          <Input
            placeholder="请输入企业名称"
            onChange={(v) => onQueryChange(v, 'text')}
          />
        </Form.Item>
        <Form.Item label="时间：">
          <DatePicker.RangePicker
            showTime={'YYYY-MM-DD HH'}
            showNow
            defaultValue={[
              dayjs(paramsData.start_time),
              dayjs(paramsData.end_time)
            ]}
            value={[dayjs(paramsData.start_time), dayjs(paramsData.end_time)]}
            format={'YYYY-MM-DD HH'}
            onChange={(v) => {
              onQueryChange(v, 'time')
            }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={() => click('query')}
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
