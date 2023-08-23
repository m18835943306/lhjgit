import React from 'react'
import { Input, Button, Form, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const onQueryChange = (v, t) => {
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
    <Form>
      <Form layout="inline">
        <Form.Item label="企业名称：">
          <Input
            placeholder="请输入企业名称"
            onChange={(v) => onQueryChange(v, 'text')}
          />
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
  )
}

export default Filter
