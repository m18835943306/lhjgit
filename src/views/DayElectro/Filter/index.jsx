import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Button, Form, Space } from 'antd'
import { FilterContainer } from '@/appComponents/Filter'
import { getMacroElecItems } from '&/api/electricity'
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import './index.scss'

const Filter = ({
  handleQuery,
  paramsData,
  setParamsData,
  downConfig = {}
}) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const [treeData, setTreeData] = useState([])
  const [industryList, setIndustryList] = useState([])
  const [types, setTypes] = useState([])
  const { loading, disabled, downEvent } = downConfig

  useEffect(() => {
    getMacroElecItemsRequest()
  }, [])

  const getMacroElecItemsRequest = () => {
    const paramjson = {
      project_id: values.project_id
    }
    getMacroElecItems(paramjson).then((res) => {
      // console.log(res, 'resresresresresresresresresres');
      const areaAll = [
        {
          county_id: '全部',
          county_name: '全部'
        }
      ]
      res?.area.map((item) => {
        areaAll.push({
          county_id: item,
          county_name: item
        })
      })
      setTreeData(areaAll)

      const leixingAll = [{ control_id: '全部', control_type: '全部' }]
      res?.control.map((item) => {
        leixingAll.push({
          control_id: item,
          control_type: item
        })
      })
      setTypes(leixingAll)

      const industryAll = [
        {
          industry_id: '全部',
          industry_type: '全部'
        }
      ]
      res?.industry.map((item) => {
        industryAll.push({
          industry_id: item,
          industry_type: item
        })
      })
      setIndustryList(industryAll)
    })
  }

  const onQueryChange = (v, t) => {
    if (t === 'time' && Array.isArray(v)) {
      const st = v[0].format('YYYY-MM-DD 00:00:00')
      const et = v[1].format('YYYY-MM-DD 00:00:00')
      setParamsData((state) => {
        state.start_time = st
        state.end_time = et
        return {
          ...state
        }
      })
    }
    if (t === 'area') {
      setParamsData((state) => {
        // console.log(v, 'vvvvvvvvvv');
        state.county_name = v
        return {
          ...state
        }
      })
    }
    if (t === 'industry') {
      setParamsData((state) => {
        // console.log(v, 'vvvvvvvvvv');
        state.industry_type = v
        return {
          ...state
        }
      })
    }
    if (t === 'type') {
      setParamsData((state) => {
        state.control_type = v
        return {
          ...state
        }
      })
    }
  }
  const click = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != '全部') {
        newParamsData[key] = paramsData[key]
      }
    }
    handleQuery && handleQuery(newParamsData)
  }
  return (
    <FilterContainer>
      <Form name="horizontal_login" layout="inline">
        <Form.Item label="时间：">
          <DatePicker.RangePicker
            showTime={'YYYY-MM-DD HH'}
            showNow
            defaultValue={[
              dayjs(paramsData.start_time),
              dayjs(paramsData.end_time)
            ]}
            value={[dayjs(paramsData.start_time), dayjs(paramsData.end_time)]}
            format={'YYYY-MM-DD HH'}
            onChange={(v) => {
              onQueryChange(v, 'time')
            }}
          />
        </Form.Item>
        <Form.Item label="所属区：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.county_name}
            onChange={(v) => onQueryChange(v, 'area')}
            // value={paramsData.county_name}
          >
            {treeData &&
              treeData.map((item) => (
                <Select.Option value={item.county_name} key={item.county_name}>
                  {item.county_id}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="所属行业：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.industry_type}
            onChange={(v) => onQueryChange(v, 'industry')}
            // value={paramsData.industry_type}
          >
            {industryList &&
              industryList.map((item) => (
                <Select.Option
                  value={item.industry_type}
                  key={item.industry_type}
                >
                  {item.industry_id}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="管控类型：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.control_type}
            onChange={(v) => onQueryChange(v, 'type')}
            // value={paramsData.leixing_type}
          >
            {types &&
              types.map((item) => (
                <Select.Option
                  value={item.control_type}
                  key={item.control_type}
                >
                  {item.control_id}
                </Select.Option>
              ))}
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
