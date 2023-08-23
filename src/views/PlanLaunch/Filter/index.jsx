import React from 'react'
import { DatePicker, Button, Form } from 'antd'
import { SearchOutlined} from '@ant-design/icons'
import dayjs from 'dayjs'

const dateFormat = 'YYYY-MM-DD'
const Filter = ({ handleQuery, handleAdd, paramsData, setParamsData }) => {
  const click = (type) => {
    if (type === 'query') {
      handleQuery && handleQuery(paramsData)
    } 
    // else {
    //   handleAdd && handleAdd('add')
    // }
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
    }
  }
  return (
    <Form>
      <Form layout='inline'>
        <Form.Item label="企业名称">
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
          <Button type="primary" onClick={() => click('query')} icon={<SearchOutlined></SearchOutlined>}>
            查询
          </Button>
        </Form.Item>
        {/* <Form.Item>
          <Button type="primary" onClick={() => click('add')}>
            新增
          </Button>
        </Form.Item> */}
      </Form>
    </Form>
  )
}

export default Filter
