import React, { useState, useEffect } from 'react'
import {
  Input,
  Select,
  Button,
  DatePicker,
  TreeSelect,
  Form,
  Space
} from 'antd'
import query from '&/api/electricity/query'
import { getStatisticalAnalysis } from '&/api/electricity'
import { SearchOutlined } from '@ant-design/icons'
import { FilterContainer } from '@/appComponents/Filter'
import dayjs from 'dayjs'

const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const [treeData, setTreeData] = useState([])
  const [industryList, setIndustryList] = useState([])
  const [qiyes, setQiYes] = useState([])
  const [yongdians, setYongDians] = useState([])
  const [value, setValue] = useState()
  const [date_type, setDate_type] = useState(0)
  useEffect(() => {
    getStatisticalAnalysisrequire()
  }, [])
  const getStatisticalAnalysisrequire = () => {
    const params = {
      project_id: values.project_id
    }
    getStatisticalAnalysis(params).then((result) => {
      const areas = []
      result.area.map((o) => {
        areas.push({
          id: o.county_id,
          pId: 0,
          value: o.county_id,
          title: o.county_name,
          isLeaf: false,
          children: []
        })
      })
      const street = result.area.map((item) => {
        return item.towns.map((i) => {
          return {
            id: i.town_id,
            pId: item.county_id,
            value: i.town_id,
            title: i.town_name,
            isLeaf: true
          }
        })
      })
      // areas[1].children = street[0]
      areas.forEach((item, index) => {
        item.children = street[index]
      })
      areas.unshift({
        id: -1,
        pId: 0,
        value: -1,
        title: '全部',
        isLeaf: false
      })
      setTreeData(areas)
      const hangye = [
        {
          industry_type: '全部',
          industry_type_id: -1
        }
      ]
      result.industry.map((o) => {
        hangye.push({
          industry_type: o.industry_type,
          industry_type_id: o.industry_type_id
        })
      })
      setIndustryList(hangye)
      const qiye = result.enterprise.map((o) => {
        return {
          ent_name: o.ent_name,
          ent_id: o.ent_id
        }
      })
      setQiYes(qiye)

      const yongdian = result.dev_type.map((o) => {
        return {
          dev_type_name: o.dev_type_name,
          dev_type: o.dev_type
        }
      })
      setYongDians(yongdian)
    })
  }

  const onChange = (newValue) => {
    onQueryChange(newValue, 'area')
    setValue(newValue)
  }

  const onQueryChange = (v, t) => {
    if (t === 'area') {
      if (v > 100) {
        setParamsData((state) => {
          state.town_id = v
          delete state.county_id
          return {
            ...state
          }
        })
      } else {
        setParamsData((state) => {
          state.county_id = v
          delete state.town_id
          return {
            ...state
          }
        })
      }
    }
    if (t === 'industry') {
      setParamsData((state) => {
        state.industry_type_id = `${v}`
        return {
          ...state
        }
      })
    }
    if (t === 'shiduan') {
      setParamsData((state) => {
        state.duration_type = v
        return {
          ...state
        }
      })
    }
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
    if (t === 'date_type') {
      const dateType =
        v === 0 ? 0 : v === 1 ? 1 : v === 2 ? 7 : v === 3 ? 30 : 10
      const t = {
        start_time: dayjs()
          .subtract(dateType, 'day')
          .format('YYYY-MM-DD 00:00:00'),
        end_time: dayjs().format('YYYY-MM-DD 00:00:00')
      }
      setParamsData((state) => {
        return {
          ...state,
          ...t
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
    <FilterContainer>
      <Form layout="inline">
        <Form.Item label="区域选择">
          <TreeSelect
            treeDataSimpleMode
            style={{
              width: '100%'
            }}
            value={value}
            defaultValue={paramsData.county_id}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto'
            }}
            placeholder="请选择区域"
            onChange={onChange}
            // loadData={onLoadData}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item label="行业选择">
          <Select
            placeholder={`请选择`}
            defaultValue={Number(paramsData.industry_type_id)}
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
        <Form.Item label="时段选择">
          <Select
            placeholder={`请选择`}
            defaultValue={paramsData.duration_type}
            onChange={(v) => onQueryChange(v, 'shiduan')}
          >
            <Select.Option value={1} key={1}>
              全部
            </Select.Option>
            <Select.Option value={2} key={2}>
              工作日
            </Select.Option>
            <Select.Option value={3} key={3}>
              周末
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="日期速选">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={date_type}
            onChange={(v) => onQueryChange(v, 'date_type')}
          >
            <Select.Option value={0} key={0}>
              自定义
            </Select.Option>
            <Select.Option value={1} key={1}>
              1天
            </Select.Option>
            <Select.Option value={2} key={2}>
              7天
            </Select.Option>
            <Select.Option value={3} key={3}>
              1个月
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="日期">
          <DatePicker.RangePicker
            // showTime={dateFormatsData=="YYYY-MM-DD"?false:true}
            // showTime
            showNow
            // minuteStep={15}
            defaultValue={[
              dayjs(paramsData.start_time),
              dayjs(paramsData.end_time)
            ]}
            value={[dayjs(paramsData.start_time), dayjs(paramsData.end_time)]}
            // format={dateFormatsData}
            onChange={(v) => {
              onQueryChange(v, 'time')
            }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={click}
              icon={<SearchOutlined></SearchOutlined>}
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
