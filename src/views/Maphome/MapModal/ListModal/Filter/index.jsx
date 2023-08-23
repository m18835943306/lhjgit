import React, { useState, useEffect } from 'react'
import { Input, Select, Button, TreeSelect } from 'antd'
import query from '&/api/electricity/query'
import { SearchOutlined } from '@ant-design/icons'

import './index.scss'

const Filter = ({ onQuery, paramsData, setParamsData, type }) => {
  const values = JSON.parse(localStorage.getItem('user')) || {}
  const [value, setValue] = useState()
  const [treeData, setTreeData] = useState([])
  const [industryList, setIndustryList] = useState([])
  useEffect(() => {
    getArea()
    getIndustry()
  }, [])
  // 区域接口
  const getArea = () => {
    query(
      `/v1/adm-list?json={"adm_level":3,"city_id":1,"project_id":${values?.project_id}}`
    ).then((res) => {
      // console.log(res, 'resresresresresres');
      const area = [
        {
          id: -1,
          pId: 0,
          value: -1,
          title: '全部',
          isLeaf: false
        }
      ]
      res.map((o) => {
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
    })
  }
  // 行业接口
  const getIndustry = () => {
    query(`/v1/industry-list?json={"project_id":${values?.project_id}}`).then(
      (res) => {
        // console.log(res, 'resresresresresresresres');
        const hangye = [
          {
            industry_type: '全部',
            industry_type_id: -1
          }
        ]
        res.map((o) => {
          hangye.push({
            industry_type: o.industry_type,
            industry_type_id: o.industry_type_id
          })
        })
        setIndustryList(hangye)
      }
    )
  }

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
    // console.log(newValue, 'newValuenewValuenewValue');
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
    if (newValue === -1) {
      params.county_id = ''
      params.town_id = ''
    }
    // change({
    //   ...params,
    // });
    setValue(newValue)
  }

  const onQueryChange = (v, t) => {
    // console.log(v,t,"11111111");
    if (t === 'area') {
      setParamsData((state) => {
        state.county_id = v
        state.page = 1
        state.page_size = 10
        return {
          ...state
        }
      })
    }
    if (t === 'industry') {
      setParamsData((state) => {
        //  console.log(v,"vvvvvvvvvv");
        state.industry_type_id = `${v}`
        state.page = 1
        state.page_size = 10
        return {
          ...state
        }
      })
    }
    if (t === 'name') {
      setParamsData((state) => {
        state.ent_name = v.target.value
        state.page = 1
        state.page_size = 10
        return {
          ...state
        }
      })
    }
    if (t === 'statues') {
      setParamsData((state) => {
        state.if_online = v
        state.page = 1
        state.page_size = 10
        return {
          ...state
        }
      })
    }
  }

  const click = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != -1) {
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
              defaultValue={paramsData.county_id}
              dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto'
              }}
              placeholder="请选择区域"
              onChange={onChange}
              loadData={onLoadData}
              treeData={treeData}
            />
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">行业选择：</div>
          <div className="filter_query__item--value">
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
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">企业名称：</div>
          <div className="filter_query__item--value">
            <Input
              placeholder="请输入"
              onChange={(v) => onQueryChange(v, 'name')}
            />
          </div>
        </div>
        {type === 'equipment' && (
          <div className="filter_query__item">
            <div className="filter_query__item--label">在线状态：</div>
            <div className="filter_query__item--value">
              <Select
                allowClear
                placeholder={`请选择`}
                defaultValue={paramsData.if_online}
                onChange={(v) => onQueryChange(v, 'statues')}
              >
                <Select.Option value={'1'} key={'1'}>
                  在线
                </Select.Option>
                <Select.Option value={'0'} key={'0'}>
                  离线
                </Select.Option>
              </Select>
            </div>
          </div>
        )}
      </div>
      <div className="filter_button">
        <Button type="primary" icon={<SearchOutlined />} onClick={click}>
          查询
        </Button>
      </div>
    </div>
  )
}

export default Filter
