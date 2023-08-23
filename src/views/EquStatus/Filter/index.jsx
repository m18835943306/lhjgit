import React, { useState, useEffect } from 'react'
import { Input, Select, Button, TreeSelect, Form, Space } from 'antd'
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import { FilterContainer } from '&/appComponents/Filter'
import query from '&/api/electricity/query'

import './index.scss'

const Filter = ({
  onQuery,
  paramsData,
  setParamsData,
  onReload,
  downConfig = {
    loading: false,
    disabled: true,
    downEvent: () => {}
  }
}) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const [value, setValue] = useState()
  const [treeData, setTreeData] = useState([])
  const [industryList, setIndustryList] = useState([])
  const [pointTypes, setpointTypes] = useState([])
  const { loading, disabled, downEvent } = downConfig
  useEffect(() => {
    getPointTypes()
  }, [])
  const getPointTypes = () => {
    query(
      `/v1/statistical-analysis-items?project_id=${values?.project_id}`
    ).then((res) => {
      const pointTypes = [
        {
          dev_type: '-2',
          dev_type_name: '全部'
        },
        ...res.dev_type.map((o) => ({
          dev_type: o.dev_type,
          dev_type_name: o.dev_type_name
        }))
      ]
      setpointTypes(pointTypes)
      const area = [
        {
          id: '-2',
          pId: 0,
          value: '-2',
          title: '全部',
          isLeaf: false
        }
      ]
      res.area.map((o) => {
        area.push({
          id: o.county_id,
          pId: 0,
          value: o.county_id,
          title: o.county_name,
          isLeaf: false
        })
      })
      // console.log(area,"areaareaareaarea")
      setTreeData(area)
      const hangye = [
        {
          industry_type: '全部',
          industry_type_id: '-2'
        }
      ]
      res.industry.map((o) => {
        hangye.push({
          industry_type: o.industry_type,
          industry_type_id: o.industry_type_id
        })
      })
      setIndustryList(hangye)
    })
  }
  const onChange = (newValue) => {
    onQueryChange(newValue, 'area')
    const params = {
      county_id: newValue,
      town_id: newValue
    }
    if (newValue > 100) {
      params.county_id = ''
    } else {
      params.town_id = ''
    }
    if (newValue === -2) {
      params.county_id = ''
      params.town_id = ''
    }
    setValue(newValue)
  }

  const onQueryChange = (v, t) => {
    if (t === 'area') {
      setParamsData((state) => {
        state.county_id = v
        return {
          ...state
        }
      })
    }
    if (t === 'industry') {
      setParamsData((state) => {
        state.industry_type_id = `${v}`
        return {
          ...state
        }
      })
    }
    if (t === 'name') {
      setParamsData((state) => {
        state.ent_name = v.target.value
        return {
          ...state
        }
      })
    }
    if (t === 'statues') {
      setParamsData((state) => {
        state.if_online = v
        return {
          ...state
        }
      })
    }
    if (t === 'type') {
      setParamsData((state) => {
        state.dev_type = v
        return {
          ...state
        }
      })
    }
  }

  const click = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != '-2') {
        newParamsData[key] = paramsData[key]
      }
    }
    onReload()
    onQuery && onQuery(newParamsData)
  }
  return (
    <FilterContainer>
      <Form layout="inline">
        <Form.Item label="区域选择：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.county_id}
            onChange={onChange}
          >
            {treeData &&
              treeData.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.title}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="行业选择：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.industry_type_id}
            onChange={(v) => onQueryChange(v, 'industry')}
          >
            {industryList &&
              industryList.map((item) => (
                <Select.Option
                  value={item.industry_type_id}
                  key={item.industry_type_id}
                >
                  {item.industry_type}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="企业名称：">
          <Input
            placeholder="请输入"
            onChange={(v) => onQueryChange(v, 'name')}
          />
        </Form.Item>
        <Form.Item label="点位类型：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.dev_type}
            value={paramsData.dev_type}
            onChange={(v) => onQueryChange(v, 'type')}
          >
            {pointTypes &&
              pointTypes.map((item) => (
                <Select.Option value={item.dev_type} key={item.dev_type}>
                  {item.dev_type_name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="在线状态：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.if_online}
            onChange={(v) => onQueryChange(v, 'statues')}
          >
            <Select.Option value={'-2'} key={'-2'}>
              全部
            </Select.Option>
            <Select.Option value={'1'} key={'1'}>
              在线设备
            </Select.Option>
            <Select.Option value={'0'} key={'0'}>
              离线设备
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => click('query')}
            >
              查询
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </FilterContainer>
  )
}

export default Filter
