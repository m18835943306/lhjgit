import React, { useState, useEffect } from 'react'
import { Radio, Button, DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import './index.scss'
const { RangePicker } = DatePicker

const Tabs = ({ tabIndex, setTabIndex, time, setTime, queryEvent }) => {
  // console.log(time, 'time')
  const [tabs] = useState([
    { label: '实时在线', value: '1' },
    { label: '指定日期', value: '2' }
  ])
  const onChange = (date, dateString) => {
    setTime((state) => {
      return {
        ...state,
        startTime: dateString[0] + ' 00:00:00',
        endTime: dateString[1] + ' 23:59:59'
      }
    })
  }
  return (
    <div className="OnlineStatistics-Tabs">
      <div className="Tabs_inner">
        <Radio.Group
          options={tabs}
          onChange={(e) => setTabIndex(e.target.value)}
          value={tabIndex}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      {tabIndex === '2' ? (
        <div className="Tabs_query">
          <Space>
            <RangePicker
              defaultValue={[dayjs(time.startTime), dayjs(time.endTime)]}
              onChange={onChange}
            />
            <Button type="primary" onClick={queryEvent}>
              查询
            </Button>
          </Space>
        </div>
      ) : null}
    </div>
  )
}

export default Tabs
