import React, { useState, useEffect, useRef } from 'react'
import { Table, Tooltip } from 'antd'
import Container from '@/appComponents/Container'
import { useTableData } from '&/hooks'
import { getEmergencyControlList } from '&/api'
import Filter from './Filter'

const defaultColumns = [
  {
    title: '序号',
    width: 50,
    render: (_, __, index) => `${index + 1}`,
    align: 'center'
  },
  {
    width: 280,
    title: '企业名称',
    dataIndex: 'ent_name',
    key: 'ent_name',
    align: 'center',
    ellipsis: {
      showTitle: false
    },
    render: (text) => {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    }
  },
  {
    title: '所属区',
    dataIndex: 'county_name',
    key: 'county_name',
    align: 'center'
  },
  {
    title: '所属街乡',
    dataIndex: 'town_name',
    key: 'town_name',
    align: 'center'
  },
  {
    title: '所属行业',
    dataIndex: 'industry_type',
    key: 'industry_type',
    align: 'center'
  }
]

const EmergentMeausere = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [columns, setColumns] = useState(defaultColumns)
  const [paramsData, setParamsData] = useState({
    role_level: user?.role_level,
    adm_id: user?.adm_id,
    county_id: -1, //区
    industry_type_id: -1, //行业
    warn_type: -1,
    ent_name: ''
  })

  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] && paramsData[key] != -1) {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }
  const [tableData, pagination, loading, onQuery, , originData, loadDataAll] =
    useTableData(
      getEmergencyControlList,
      {
        params: getParams()
        // formatcb: (data) => formatData(data),
      },
      []
    )
  useEffect(() => {
    if (Array.isArray(originData.head)) {
      const [, , , , , ...rest] = originData.head
      let dynamiColumns = []
      if (Array.isArray(rest)) {
        dynamiColumns = rest.map((item) => {
          return {
            title: item,
            dataIndex: item,
            key: item,
            align: 'center'
          }
        })
      }
      setColumns([...defaultColumns, ...dynamiColumns])
    }
  }, [originData.head])
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          onQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent title="查询结果">
        <Table
          loading={loading}
          columns={columns}
          dataSource={tableData}
          bordered
          size="small"
          pagination={pagination}
          scroll={{
            // x: 'calc(700px + 50%)',
            y: '62vh'
          }}
        />
      </Container.ContainerContent>
    </Container>
  )
}

export default EmergentMeausere
