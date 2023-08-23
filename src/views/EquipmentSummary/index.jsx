import React, { useState, useEffect, useMemo } from 'react'
import { Table, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import Filter from './Filter'
import { useTableData } from '&/hooks'
import { getDeviceList } from '&/api/electricity'
import { downloadExcel } from '&/commonjs/util'
import Container from '@/appComponents/Container'
import './index.scss'

const format = 'YYYY-MM-DD HH:mm'
const EquipmentSummary = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const minuteStep15Time = useMemo(
    () => dayjs().subtract(dayjs().minute() % 15, 'minute'),
    []
  )
  const [paramsData, setParamsData] = useState({
    start_time: dayjs(minuteStep15Time).subtract(6, 'h').format(format),
    end_time: dayjs(minuteStep15Time).format(format),
    time_type: 1,
    data_type_id: 8,
    project_id: user.project_id,
    county_id: -1, //区
    ent_name: ''
  })
  const staticColumns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center',
      fixed: 'left'
    },
    {
      title: '区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'center',
      width: 150,
      fixed: 'left'
    },
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center',
      width: 150,
      fixed: 'left'
    },
    {
      title: '点位名称',
      dataIndex: 'dev_name',
      key: 'dev_name',
      align: 'center',
      width: 100,
      fixed: 'left'
    }
  ]

  const obj = {
    title: '所属街镇',
    dataIndex: 'town_name',
    key: 'town_name',
    align: 'center',
    width: 100,
    fixed: 'left'
  }
  const newColums =
    user.project_id == 32 ? staticColumns.push(obj) : staticColumns
  const [columns, setColumns] = useState(newColums)
  const [downLoading, setDownLoading] = useState(false)

  const formatData = (data) => {
    const newData = data.map((item) => {
      const {
        ent_name,
        dev_name,
        dev_type_name,
        town_name,
        county_name,
        ...args
      } = item
      const times = getTimes(args)
      const obj = {
        ent_name,
        dev_name,
        town_name,
        county_name
      }
      times.forEach((time, index) => {
        obj[time] =
          Object.values(args)[index] === -99 ? '--' : Object.values(args)[index]
      })

      return obj
    })
    return newData
  }
  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != (-1 || '-1')) {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }
  const [tableData, pagination, loading, onQuery, , , loadDataAll] =
    useTableData(getDeviceList, {
      params: getParams(),
      formatcb: (data) => formatData(data)
    })

  const getTimes = (data) => {
    return Object.keys(data).map((time) => dayjs(time).format('MM-DD HH:mm'))
  }
  useEffect(() => {
    if (tableData.length) {
      const {
        ent_name,
        dev_name,
        dev_type_name,
        town_name,
        county_name,
        ...args
      } = tableData[0]

      const times = Object.keys(args)
      if (times && times.length) {
        const timeColumns = []
        times.forEach((time, i) => {
          timeColumns.push({
            title: time,
            dataIndex: `${time}`,
            key: `${time}`,
            align: 'center',
            width: 80
          })
        })
        const mergeColumns = staticColumns.concat(timeColumns)
        setColumns(mergeColumns)
      }
    }
  }, [tableData])

  const download = async () => {
    setDownLoading(true)
    const { data } = await loadDataAll()
    const excelData = formatData(data)
    downloadExcel(excelData, columns, '设备数据列表')
    setDownLoading(false)
  }
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          onQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent
        title="查询结果"
        extra={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            loading={downLoading}
            disabled={!tableData.length}
            onClick={async () => {
              setDownLoading(true)
              await download()
              setDownLoading(false)
            }}
          >
            导出
          </Button>
        }
      >
        <Table
          loading={loading}
          bordered
          columns={columns}
          dataSource={tableData}
          size="small"
          pagination={pagination}
          scroll={{ y: '65vh' }}
        />
      </Container.ContainerContent>
    </Container>
  )
}

export default EquipmentSummary
