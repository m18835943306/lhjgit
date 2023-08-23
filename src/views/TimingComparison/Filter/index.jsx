import React, { useState, useEffect } from 'react'
import { Select, Button, TreeSelect, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { getStatisticalAnalysis } from '&/api/electricity'

const Filter = ({ onQuery, paramsData, setParamsData }) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const [treeData, setTreeData] = useState([])
  const [industryList, setIndustryList] = useState([])
  const [qiyes, setQiYes] = useState([])
  const [yongdians, setYongDians] = useState([])
  const [value, setValue] = useState()
  useEffect(() => {
    getStatisticalAnalysisrequire(handleParams())
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
      const qiye = [
        {
          ent_name: '全部',
          ent_id: '全部'
        }
      ]
      result.enterprise.map((o) => {
        qiye.push({
          ent_name: o.ent_name,
          ent_id: o.ent_id
        })
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

  const handleParams = (paramsData) => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != -1 && paramsData[key] != '全部') {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }
  const onChange = (newValue) => {
    onQueryChange(newValue, 'area')
    setValue(newValue)
  }

  const onQueryChange = (v, t, option) => {
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

    if (t === 'statues') {
      setParamsData((state) => {
        state.dev_type = v
        return {
          ...state
        }
      })
    }
    if (t === 'xuanze') {
      setParamsData((state) => {
        state.ent_id = option?.key
        return {
          ...state
        }
      })
    }
  }

  const click = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != -1 && paramsData[key] != '全部') {
        newParamsData[key] = paramsData[key]
      }
    }
    onQuery && onQuery(newParamsData)
  }
  return (
    <Form layout="inline">
      <Form.Item label="区域选择">
        <TreeSelect
          allowClear
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
      <Form.Item label="用电类型">
        <Select
          allowClear
          placeholder={`请选择`}
          defaultValue={paramsData.dev_type}
          value={paramsData.dev_type}
          onChange={(v) => onQueryChange(v, 'statues')}
        >
          {yongdians &&
            yongdians.map((item) => (
              <Select.Option value={item.dev_type} key={item.dev_type}>
                {item.dev_type_name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="企业选择">
        <Select
          showSearch
          allowClear
          placeholder={`请选择`}
          defaultValue={paramsData.ent_id}
          onChange={(v, option) => onQueryChange(v, 'xuanze', option)}
          style={{ width: '250px' }}
        >
          {qiyes &&
            qiyes.map((item) => (
              <Select.Option value={item.ent_name} key={item.ent_id}>
                {item.ent_name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      {/* <Form.Item label="时间粒度">
        <Select
          allowClear
          placeholder={`请选择`}
          defaultValue={mode.time_type}
          onChange={(v) => onQueryChange(v, 'lidu')}
        >
          <Select.Option value={'3'} key={'3'}>
            日
          </Select.Option>
        </Select>
      </Form.Item> */}
      <Form.Item>
        <Button
          type="primary"
          onClick={click}
          icon={<SearchOutlined></SearchOutlined>}
        >
          查询
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Filter
