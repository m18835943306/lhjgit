import React from 'react'
import { Input, Button, Form, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const assginOptions = [
    {
      value: '-1',
      label: '全部'
    },
    {
      value: 1,
      label: '已下发'
    },
    {
      value: 0,
      label: '未下发'
    }
  ]
  const feedbackOptions = [
    {
      value: '-1',
      label: '全部'
    },
    {
      value: 1,
      label: '已反馈'
    },
    {
      value: 0,
      label: '未反馈'
    }
  ]
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
        <Form.Item label="下发状态：">
          <Select
            allowClear
            placeholder="请选择"
            defaultValue={paramsData.assign_status}
            onChange={(v) => {
              setParamsData((state) => {
                return {
                  ...state,
                  ...{
                    assign_status: v
                  }
                }
              })
            }}
          >
            {assginOptions?.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="反馈状态">
          <Select
            allowClear
            placeholder="请选择"
            defaultValue={paramsData.feedback_status}
            onChange={(v) => {
              setParamsData((state) => {
                return {
                  ...state,
                  ...{
                    feedback_status: v
                  }
                }
              })
            }}
          >
            {feedbackOptions?.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
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
  )
}

export default Filter
