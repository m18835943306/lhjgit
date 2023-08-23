import React, { useState, useEffect } from 'react'
import { Select, Button, Form, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { FilterContainer } from '@/appComponents/Filter'
import { getMacroElecItems } from '&/api/electricity'
const Filter = ({ handleQuery, paramsData, setParamsData }) => {
  const [data, setData] = useState({
    areas: [],
    industrys: [],
    controls: []
  })
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const click = () => {
    handleQuery && handleQuery(paramsData)
  }
  const onQueryChange = (v, t) => {
    setParamsData((state) => {
      state[t] = v
      return {
        ...state
      }
    })
  }
  const getSelectOptions = (arr) => {
    const options = arr.map((item) => ({
      label: item,
      value: item
    }))
    options.unshift({
      label: '全部',
      value: ''
    })
    return options || []
  }
  useEffect(() => {
    const getMacroElecItemApi = async () => {
      const { area, control, industry } = await getMacroElecItems({
        project_id: user.project_id
      })
      setData({
        areas: getSelectOptions(area),
        industrys: getSelectOptions(industry),
        controls: getSelectOptions(control)
      })
    }
    if (user.project_id) {
      getMacroElecItemApi()
    }
  }, [user.project_id])
  return (
    <FilterContainer>
      <Form name="horizontal_login" layout="inline">
        <Form.Item label="区域选择：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.county_name}
            onChange={(v) => onQueryChange(v, 'county_name')}
          >
            {data.areas?.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="行业选择：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.industry}
            onChange={(v) => onQueryChange(v, 'industry_type')}
          >
            {data.industrys?.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="管控类型：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.level}
            onChange={(v) => onQueryChange(v, 'control_type')}
          >
            {data.controls?.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => click('query')}
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
