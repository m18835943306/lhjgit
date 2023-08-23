import React from 'react'
import { Input, Button, Form } from 'antd'

const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const values = JSON.parse(localStorage.getItem('user'))


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
    <Form layout='inline'>
      <Form.Item label="企业名称">
        <Input
          placeholder="请输入企业名称"
          onChange={(v) => onQueryChange(v, 'text')}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={click}>
          查询
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Filter
