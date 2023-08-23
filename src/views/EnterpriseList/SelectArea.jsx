import { TreeSelect } from 'antd'
import React, { useState, useEffect } from 'react'
import query from '&/api/electricity/query'

const App = ({ change }) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const [value, setValue] = useState()
  const [treeData, setTreeData] = useState([])

  const getArea = () => {
    query(
      `/v1/adm-list?json={"adm_level":3,"city_id":1,"project_id":${values?.project_id}}`
    ).then((res) => {
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
      setTreeData(area)
    })
  }

  const getStreet = ({ id }) => {
    return new Promise((resolve) => {
      query('/v1/adm-list?json={"adm_level":4,"county_id":' + id + '}').then(
        (res) => {
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
        }
      )
    })
  }

  const genTreeNode = (parentId, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6)
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf
    }
  }

  const onLoadData = ({ id }) => {
    return getStreet({ id })
  }

  const onChange = (newValue) => {
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
    change({
      ...params
    })
    setValue(newValue)
  }

  useEffect(() => {
    getArea()
  }, [])
  return (
    <div className="Filter-item">
      <span>区域选择</span>
      <TreeSelect
        treeDataSimpleMode
        style={{
          width: '100%'
        }}
        value={value}
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
  )
}

export default App
