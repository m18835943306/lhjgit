import React, { useState, useMemo } from 'react'
import { DatePicker, Radio, Space } from 'antd'
import SimpleCalendar from './SimpleCalendar'
import dayjs from 'dayjs'
import './index.scss'

const format = 'YYYY-MM-DD'
const TimeView = ({ params }) => {
  const [clueDate, setClueDate] = useState(params.current.clue_date)
  const [timeType, setTimeType] = useState(params.current.time_type)
  // 判断周末
  const isSelectWeekEnd = useMemo(
    () => [0, 5, 6].includes(dayjs(clueDate).weekday()),
    [clueDate]
  )
  return (
    <div className="timeView">
      <div className="timeView_time">
        <div className="timeView_time_item">
          <div className="timeView_time_label">工作日期：</div>
          <div className="timeView_time_value">
            <DatePicker
              showTime
              format={format}
              defaultValue={dayjs(clueDate)}
              value={dayjs(clueDate)}
              onChange={(v) => {
                setClueDate(dayjs(v).format(format))
                params.current.clue_date = dayjs(v).format(format)
              }}
            />
          </div>
        </div>
        <div className="timeView_time_item">
          <div className="timeView_time_label">数据日期：</div>
          <div className="timeView_time_value">
            <SimpleCalendar time_type={timeType} clue_date={clueDate} />
          </div>
        </div>
      </div>
      <div className="timeView_type">
        <div className="timeView_type__title">推荐模式：</div>
        <Radio.Group
          value={timeType}
          defaultValue={timeType}
          onChange={(v) => {
            setTimeType(v.target.value)
            params.current.time_type = v.target.value
          }}
        >
          <Space direction="vertical">
            <Radio value="1">工作日比较</Radio>
            <Radio value="2">全周期比较</Radio>
            <Radio value="3" disabled={!isSelectWeekEnd}>
              休息日比较
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  )
}

export default TimeView
