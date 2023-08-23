import { Input, Select, Cascader, Button, DatePicker } from 'antd'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { getMonitorItems } from '&/api/electricity'
const { Option } = Select

import './index.scss'

const Filter = (props) => {
  const { json = [] } = props
  const formJson = json.filter((item) => item.type !== 'button')
  const buttonJson = json.filter((item) => item.type === 'button')

  const [from, setFrom] = useState([])
  const [isInit, setIsInit] = useState(false)
  const getOptions = async (item) => {
    if (item.api && typeof item.api === 'function') {
      const data = await item.api()
      item.options = data
    }
    return item
  }

  useEffect(async () => {
    if (!isInit) {
      await formJson.forEach(getOptions)
      setFrom([...formJson])
      setIsInit(true)
    }
  }, [formJson])

  const click = (api) => {
    api()
  }

  return (
    <div className="filter">
      <div className="filter_query">
        {from.map((item) => makeComponents(item))}
      </div>
      <div className="filter_button" style={{ gap: '8px' }}>
        {buttonJson.map((item) => (
          <Button
            key={item.key}
            {...item.settings}
            onClick={() => click(item.api)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

const makeComponents = ({
  key,
  type,
  label,
  value,
  placeholder,
  options,
  settings,
  show = true,
  mode,
  outSettings,
  isHasAllSelect = false
}) => {
  return (
    <div className="filter_query__item" key={key}>
      <div className="filter_query__item--label">{label}：</div>
      <div className="filter_query__item--value">
        {type === 'input' && (
          <Input defaultValue={value} placeholder={`请输入${label}`} />
        )}
        {type === 'select' && (
          <Select allowClear placeholder={`请选择${label}`}>
            {options.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
        {type === 'cascader' && <Cascader placeholder={`请选择${label}`} />}
        {type === 'dateTimeRange' && (
          <DatePicker.RangePicker
            {...settings}
            // value={filterParams[key]}
            onChange={(v) => {
              // setFilterParams({
              //   state: {
              //     [key]: v,
              //   },
              // });
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Filter
