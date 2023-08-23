import React, { useState, useEffect } from 'react'
import { Input, Select, Cascader, Button, DatePicker } from 'antd'

import { getMonitorItems } from '&/api/electricity'
import dayjs from 'dayjs'

import './index.scss'

const Filter = ({
  onQuery,
  paramsData,
  setParamsData,
  devTypes,
  selectedDevTypes,
  setSelectedDevTypes
}) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'
  const [queryData, setQueryData] = useState({
    monitor_items: [],
    total_elec: [],
    production: [],
    control_equip: []
  })

  useEffect(() => {
    getMonitorItems({ project_id: values?.project_id })
      .then((res) => {
        //.then是接收正确返回的信息
        // console.log(res) // {...}
        setQueryData(res)
      })
      .catch((err) => {
        // .catch 返回报错信息
        console.log(err)
      })
  }, [values])

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
    if (t === 'data_type_id') {
      setParamsData((state) => {
        state.data_type_id = v
        return {
          ...state
        }
      })
    }
  }

  const click = () => {
    onQuery && onQuery(paramsData)
  }
  return (
    <div className="filter">
      <div className="filter_query">
        <div className="filter_query__item">
          <div className="filter_query__item--label">时间：</div>
          <div className="filter_query__item--value">
            <DatePicker.RangePicker
              showTime
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
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">监测项：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={paramsData.data_type_id}
              onChange={(v) => onQueryChange(v, 'data_type_id')}
            >
              {queryData.monitor_items.map((item) => (
                <Select.Option
                  value={item.data_type_id}
                  key={item.data_type_id}
                >
                  {item.data_type}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">设备类型：</div>
          <div className="filter_query__item--value">
            <Select
              mode="multiple"
              allowClear
              style={{ minWidth: '280px' }}
              placeholder={`请选择设备类型（可多选）`}
              value={selectedDevTypes}
              onChange={setSelectedDevTypes}
            >
              {devTypes.map((dev) => (
                <Select.Option value={dev.dev_type} key={dev.dev_type}>
                  {dev.dev_type_name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        {/* <div className="filter_query__item">
          <div className="filter_query__item--label">总表：</div>
          <div className="filter_query__item--value">
            <Select allowClear placeholder={`请选择`}>
              {queryData.total_elec.map((item) => (
                <Select.Option value={item.dev_id} key={item.dev_id}>
                  {item.dev_name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">产物设施：</div>
          <div className="filter_query__item--value">
            <Select allowClear placeholder={`请选择`}>
              {queryData.production.map((item) => (
                <Select.Option value={item.dev_id} key={item.dev_id}>
                  {item.dev_name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">治污设施：</div>
          <div className="filter_query__item--value">
            <Select allowClear placeholder={`请选择`}>
              {queryData.control_equip.map((item) => (
                <Select.Option value={item.dev_id} key={item.dev_id}>
                  {item.dev_name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div> */}
      </div>
      <div className="filter_button">
        <Button type="primary" onClick={click}>
          查询
        </Button>
      </div>
    </div>
  )
}

export default Filter
