import React, { useState, useEffect, useMemo } from 'react'
import Container from '@/appComponents/Container'
import { DownloadOutlined } from '@ant-design/icons'
import { downloadExcel } from '&/commonjs/util'
import { useTableData } from '&/hooks'
import Filter from './Filter'
import { getEmergencyList } from '&/api/electricity'
import { Table, Button, Image, Tooltip } from 'antd'
import './style.scss'
import dayjs from 'dayjs'
const EnterpriseEmergency = () => {
  const values = JSON.parse(localStorage.getItem('user')) || {}
  const [paramsData, setParamsData] = useState({
    role_level: values?.role_level,
    adm_id: values?.adm_id,
    county_id: -1, //区
    industry_type_id: -1, //行业
    warn_type: -1,
    ent_name: '',
    start_time: dayjs().subtract(1, 'd').format('YYYY-MM-DD 00:00:00'),
    end_time: dayjs().format('YYYY-MM-DD 00:00:00')
  })
  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != (-1 || '-1')) {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }
  const [tableData, pagination, loading, onQuery] = useTableData(
    getEmergencyList,
    {
      params: getParams()
      // formatcb: (data) => formatData(data),
    }
  )
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      width: 80,
      title: '区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'center'
    },
    {
      title: '行业',
      dataIndex: 'industry_type_name',
      key: 'industry_type_name',
      align: 'center',
      width: 100
    },
    {
      width: 160,
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
    // {
    //     title: '报警类型',
    //     dataIndex: 'warn_type_name',
    //     key: 'warn_type_name',
    //     align: 'center',
    //     width: 80,
    // },
    {
      title: '报警原因',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      width: 80
    },
    {
      title: '街乡镇名',
      dataIndex: 'town_name',
      key: 'town_name',
      align: 'center',
      width: 80
    },
    {
      title: '报警编号',
      dataIndex: 'warn_code',
      key: 'warn_code',
      align: 'center',
      width: 80
    },
    {
      title: '报警时间',
      dataIndex: 'warn_time',
      key: 'warn_time',
      align: 'center',
      width: 80
    }
  ]
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          onQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
          //   downConfig={{
          //     loading: loading,
          //     downEvent: download,
          //     disabled: !tableData.length
          //   }}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent title="查询结果">
        <Table
          loading={loading}
          columns={columns}
          dataSource={tableData}
          bordered
          size="middle"
          pagination={pagination}
          scroll={{
            // x: 'calc(700px + 50%)',
            y: '67vh'
          }}
        />
      </Container.ContainerContent>
    </Container>
  )
}
export default EnterpriseEmergency
