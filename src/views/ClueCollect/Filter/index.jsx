import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Button, Form, Space } from 'antd'
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import { FilterContainer } from '@/appComponents/Filter'
import { getMacroElecItems } from '&/api/electricity'
import dayjs from 'dayjs'
const dateFormat = 'YYYY-MM-DD'
const Filter = ({
  handleQuery,
  paramsData,
  setParamsData,
  downConfig = {
    loading: false,
    disabled: true,
    downEvent: () => {}
  }
}) => {
  const [data, setData] = useState({
    areas: [],
    industrys: [],
    controls: []
  })
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const { loading, disabled, downEvent } = downConfig
  const click = () => {
    handleQuery && handleQuery(paramsData)
  }
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
      return
    }
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
            onChange={(v) => onQueryChange(v, 'industry')}
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
            onChange={(v) => onQueryChange(v, 'level')}
          >
            {data.controls?.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="线索日期：">
          <DatePicker.RangePicker
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
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              loading={loading}
              disabled={disabled}
              onClick={downEvent}
            >
              导出
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </FilterContainer>
  )
}

export default Filter
