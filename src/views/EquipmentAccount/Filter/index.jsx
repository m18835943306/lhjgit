import React, { useState, useEffect } from 'react'
import { Input, Select, Button, TreeSelect, Form, Space } from 'antd'
import { DownloadOutlined,SearchOutlined } from '@ant-design/icons'
import { getStatisticalAnalysis } from '&/api/electricity'
import { FilterContainer } from '@/appComponents/Filter'

const Filter = ({ onQuery, paramsData, setParamsData, downConfig = {} }) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const [treeData, setTreeData] = useState([])
  const [industryList, setIndustryList] = useState([])
  const { loading, disabled, downEvent } = downConfig
  const [yongdians, setYongDians] = useState([])
  const [value, setValue] = useState()

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
      areas.unshift(
        {
          id: -1,
          pId: 0,
          value: -1,
          title: '全部',
          isLeaf: false
        }
      )
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
      const yongdiantype = [
        {
          dev_type_name: '全部',
          dev_type: -1
        }
      ]
      // const yongdian = result.dev_type.map((o) => {
      //   return {
      //     dev_type_name: o.dev_type_name,
      //     dev_type: o.dev_type,
      //   };
      // });
      result.dev_type.map((o) => {
        yongdiantype.push({
          dev_type_name: o.dev_type_name,
          dev_type: o.dev_type
        })
      })
      setYongDians(yongdiantype)
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
    if (t === 'shuxing') {
      setParamsData((state) => {
        state.point_attribute = v
        return {
          ...state
        }
      })
    }
    if (t === 'type') {
      setParamsData((state) => {
        state.dev_type = v
        // state.page = 1;
        // state.page_size = 10;
        return {
          ...state
        }
      })
    }
    if (t == 'text') {
      setParamsData((state) => {
        state.ent_name = v.target.value
        return {
          ...state
        }
      })
    }
    if (t == 'who_construct') {
      setParamsData((state) => {
        state.who_construct = v
        return {
          ...state
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
      <Form name="horizontal_login" layout="inline">
        <Form.Item label="区域选择：">
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
        <Form.Item label="行业选择：">
          <Select
            allowClear
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
        <Form.Item label="点位属性：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.point_attribute}
            value={paramsData.point_attribute}
            onChange={(v) => onQueryChange(v, 'shuxing')}
          >
            <Select.Option value={'-1'} key={'-1'}>
              全部
            </Select.Option>
            <Select.Option value={'真实点位'} key={'真实点位'}>
              真实点位
            </Select.Option>
            <Select.Option value={'计算点位'} key={'计算点位'}>
              计算点位
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="点位类型：">
          <Select
            allowClear
            placeholder={`请选择`}
            defaultValue={paramsData.dev_type}
            value={paramsData.dev_type}
            onChange={(v) => onQueryChange(v, 'type')}
          >
            {yongdians &&
              yongdians.map((item) => (
                <Select.Option value={item.dev_type} key={item.dev_type}>
                  {item.dev_type_name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="企业名称：">
          <Input
            placeholder="请输入企业名称"
            onChange={(v) => onQueryChange(v, 'text')}
          />
        </Form.Item>
        <Form.Item label="数据来源：">
        <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={paramsData.who_construct}
              onChange={(v) => onQueryChange(v, 'who_construct')}
            >
              <Select.Option value={-1} key={-1}>
                全部
              </Select.Option>
              <Select.Option value={'接入'} key={'接入'}>
              接入
              </Select.Option>
              <Select.Option value={'自建'} key={'自建'}>
                自建
              </Select.Option>
            </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" onClick={() => click('query')} icon={<SearchOutlined></SearchOutlined>}>
              查询
            </Button>
            
          </Space>
        </Form.Item>
      </Form>
    </FilterContainer>
  )
}

export default Filter
