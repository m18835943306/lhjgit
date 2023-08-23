import React, { useState, useEffect } from 'react'
import { Input, Select, Button, TreeSelect, DatePicker, Space } from 'antd'
import query from '&/api/electricity/query'
import { downloadExcel } from '&/commonjs/util'
import { DownloadOutlined } from '@ant-design/icons'
import { getDeviceWarnItems } from '&/api/electricity'
import { SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import './index.scss'

const AlertFileter = ({
  onQuery,
  paramsData,
  setParamsData,
  tableData,
  columns
}) => {
  const values = JSON.parse(localStorage.getItem('user')) || {}
  const [value, setValue] = useState()
  const [treeData, setTreeData] = useState([])
  const [options, setOptions] = useState({
    area: [],
    dev_type: [],
    industry: [],
    process_status: [],
    release_status: [],
    warn_level: [],
    warn_type: []
  })
  useEffect(() => {
    getDeviceItems()
  }, [])
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const getStreet = ({ id }) => {
    return new Promise((resolve) => {
      query(
        `/v1/adm-list?json={"adm_level":4,"county_id":'${id}',"project_id":${values?.project_id}}`
      ).then((res) => {
        const street = []
        res.map((o) => {
          street.push({
            id: o.town_id,
            pId: id,
            value: o.town_id,
            title: o.town_name,
            isLeaf: true
          })
        })
        setTreeData(treeData.concat(street))
        resolve(undefined)
      })
    })
  }

  const onLoadData = ({ id }) => {
    return getStreet({ id })
  }

  const onChange = (newValue) => {
    onQueryChange(newValue, 'county_id')
    const params = {
      county_id: newValue,
      town_id: newValue
    }
    if (newValue > 100) {
      params.county_id = ''
    } else {
      params.town_id = ''
    }
    if (newValue === -1) {
      params.county_id = ''
      params.town_id = ''
    }
    setValue(newValue)
  }

  const onQueryChange = (v, t) => {
    setParamsData((state) => {
      state[t] = String(v)
      return {
        ...state
      }
    })
  }
  const onQueryTimeChange = (v, t) => {
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

  const getDeviceItems = async () => {
    const json = {
      project_id: values.project_id
    }
    const result = await getDeviceWarnItems(json)
    result.area = result.area?.map((item) => {
      return {
        id: item.county_id,
        pId: 0,
        value: item.county_id,
        title: item.county_name,
        isLeaf: false
      }
    })

    setOptions(result)
  }

  const click = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key]) {
        newParamsData[key] = paramsData[key]
      }
    }
    onQuery && onQuery(newParamsData)
  }
  return (
    <div className="filter">
      <div className="filter_query">
        <div className="filter_query__item">
          <div className="filter_query__item--label">区域选择：</div>
          <div className="filter_query__item--value">
            <TreeSelect
              treeDataSimpleMode
              style={{
                width: '100%'
              }}
              value={value}
              // defaultValue={paramsData.county_id}
              dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto'
              }}
              placeholder="请选择区域"
              onChange={onChange}
              loadData={onLoadData}
              treeData={options.area}
            />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">行业选择：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={'请选择'}
              // defaultValue={paramsData.industry_type_id}
              onChange={(v) => onQueryChange(v, 'industry_type_id')}
            >
              {options.industry.map((item) => (
                <Select.Option
                  value={item.industry_type_id}
                  key={item.industry_type_id}
                >
                  {item.industry_type_name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">企业名称：</div>
          <div className="filter_query__item--value">
            <Input
              placeholder="请输入"
              onChange={(v) => onQueryChange(v, 'ent_name')}
            />
          </div>
        </div>

        <div className="filter_query__item">
          <div className="filter_query__item--label">点位类型：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder="请选择"
              // defaultValue={paramsData.dev_type}
              onChange={(v) => onQueryChange(v, 'dev_type')}
            >
              {options.dev_type.map((item) => (
                <Select.Option value={item.dev_type} key={item.dev_type}>
                  {item.dev_type_name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">报警类型：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              // defaultValue={paramsData.warn_type}
              onChange={(v) => onQueryChange(v, 'warn_type')}
            >
              {options.warn_type.map((item) => (
                <Select.Option value={item.warn_type} key={item.warn_type}>
                  {item.warn_type_name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">报警级别：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              // defaultValue={paramsData.warn_level}
              onChange={(v) => onQueryChange(v, 'warn_level')}
            >
              {options.warn_level.map((item) => (
                <Select.Option value={item.warn_level} key={item.warn_level}>
                  {item.warn_level_value}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">报警状态：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              // defaultValue={paramsData.release_status}
              onChange={(v) => onQueryChange(v, 'release_status')}
            >
              {options.release_status.map((item) => (
                <Select.Option
                  value={item.release_status}
                  key={item.release_status}
                >
                  {item.release_status_value}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">处理状态：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder={`请选择`}
              // defaultValue={paramsData.process_status}
              onChange={(v) => onQueryChange(v, 'process_status')}
            >
              {options.process_status.map((item) => (
                <Select.Option
                  value={item.process_status}
                  key={item.process_status}
                >
                  {item.release_status_value}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">时间：</div>
          <div className="filter_query__item--value">
            <DatePicker.RangePicker
              showTime={true}
              showNow
              defaultValue={[
                dayjs(paramsData.start_time),
                dayjs(paramsData.end_time)
              ]}
              value={[dayjs(paramsData.start_time), dayjs(paramsData.end_time)]}
              format={dateFormat}
              onChange={(v) => {
                onQueryTimeChange(v, 'time')
              }}
            />
          </div>
        </div>
      </div>
      <div className="filter_button">
        <Space>
          <Button type="primary" icon={<SearchOutlined />} onClick={click}>
            查询
          </Button>
          <Button
            type="primary"
            style={{
              float: 'right'
            }}
            icon={<DownloadOutlined />}
            onClick={() => {
              downloadExcel(tableData, columns, '报警列表')
            }}
          >
            导出
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default AlertFileter
