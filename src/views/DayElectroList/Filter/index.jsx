import React, { useState, useEffect } from 'react'
import { DatePicker, Button, Input } from 'antd'

import dayjs from 'dayjs'

const Filter = ({ onQuery, paramsData, setParamsData, delit }) => {
  const dateFormat = 'YYYY/MM/DD'
  const onQueryChange = (v, t) => {
    if (t === 'time') {
      const st = dayjs(v._d).format('YYYY-MM-DD 00:00:00')
      setParamsData((state) => {
        state.data_time = st
        return {
          ...state
        }
      })
      onQuery && onQuery(paramsData)
    }
    if (t === 'day') {
      setParamsData((state) => {
        state.type = v
        return {
          ...state
        }
      })
      onQuery && onQuery(paramsData)
    }
    if (t === 'hour') {
      setParamsData((state) => {
        state.type = v
        return {
          ...state
        }
      })
      onQuery && onQuery(paramsData)
    }
  }
  return (
    <div className="DayElectroList-filter">
      <div className="filter_query">
        <div className="filter_query__item">
          <div className="filter_query__item--label">企业名称：</div>
          <div className="filter_query__item--value">
            <Input placeholder={delit?.ent_name} disabled />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">所属区：</div>
          <div className="filter_query__item--value">
            <Input placeholder={delit?.county_name} disabled />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">所属街道：</div>
          <div className="filter_query__item--value">
            <Input placeholder={delit?.town_name} disabled />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">管控类型：</div>
          <div className="filter_query__item--value">
            <Input placeholder={delit?.control_type} disabled />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">详细地址：</div>
          <div className="filter_query__item--value">
            <Input placeholder={delit?.address} disabled />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">时间：</div>
          <div className="filter_query__item--value">
            <DatePicker
              // value={dayjs(paramsData.data_time, dateFormat)}
              onChange={(v) => {
                onQueryChange(v, 'time')
              }}
              defaultValue={dayjs(paramsData.data_time, dateFormat)}
              format={dateFormat}
            />
          </div>
        </div>
      </div>
      {delit?.has_hour === 1 ? (
        <div className="filter_button">
          <div className="filter_filter_button-tap">
            <div
              className={paramsData.type === 1 ? 'active' : 'filter_day'}
              onClick={() => {
                onQueryChange(1, 'day')
              }}
            >
              日用电
            </div>
            <div
              className={paramsData.type === 2 ? 'active' : 'filter_hour'}
              onClick={() => {
                onQueryChange(2, 'hour')
              }}
            >
              小时用电
            </div>
          </div>
        </div>
      ) : (
        <div className="filter_button">
          <div className="filter_filter_button-tap">
            <div
              className={paramsData.type === 1 ? 'active' : 'filter_day'}
              onClick={() => {
                onQueryChange(1, 'day')
              }}
            >
              日用电
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
