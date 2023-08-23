import React, { useState, useEffect } from 'react'
import { Input, Select, Button, TreeSelect, Form, Space } from 'antd'
import { DownloadOutlined,SearchOutlined } from '@ant-design/icons'
import { FilterContainer } from '@/appComponents/Filter'

const Filter = ({ onQuery, paramsData, setParamsData, downConfig = {} }) => {
  const values = JSON.parse(localStorage.getItem('user'))

  const onQueryChange = (v, t) => {

    if (t === 'shuxing') {
      setParamsData((state) => {
        state.who_construct = v
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
      <Form name="horizontal_login" layout="inline">
        <Form.Item label="数据来源：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.who_construct}
            value={paramsData.who_construct}
            onChange={(v) => onQueryChange(v, 'shuxing')}
          >
            <Select.Option value={'-1'} key={'-1'}>
              全部
            </Select.Option>
            <Select.Option value={'接入'} key={'接入'}>
              接入
            </Select.Option>
            <Select.Option value={'自建'} key={'自建'}>
              自建
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={() => click('query')} icon={<SearchOutlined></SearchOutlined>}>
              查询
            </Button>
            
          </Space>
        </Form.Item>
      </Form>
    </FilterContainer>
  )
}

export default Filter
