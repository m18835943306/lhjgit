import React, { useState, useRef } from 'react'
import { Table, Button } from 'antd'
import dayjs from 'dayjs'
import Filter from './Filter'
import { useTableData } from '&/hooks'
import Charts from './charts'
import { downloadExcel } from '&/commonjs/util'
import { DownloadOutlined } from '@ant-design/icons'
import Container from '@/appComponents/Container'
import { getMacroElecList } from '&/api/electricity'
import './index.scss'

const format = 'YYYY-MM-DD'
const ClueCollect = () => {
  const value = JSON.parse(localStorage.getItem('user')) || {}
  const chartRef = useRef()
  const [downLoading, setDownLoading] = useState(false)
  const [paramsData, setParamsData] = useState({
    county_name: '',
    industry: '',
    level: '',
    start_time: dayjs().add(-1, 'M').startOf('day').format(format),
    end_time: dayjs().endOf('day').format(format),
    project_id: value?.project_id
  })
  const [tableData, pagination, loading, onQuery, , , loadDataAll] =
    useTableData(getMacroElecList, {
      params: paramsData
    })
  const download = async () => {
    setDownLoading(true)
    const { data } = await loadDataAll()
    downloadExcel(data, columns, '线索统计列表')
    setDownLoading(false)
  }
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '线索日期',
      dataIndex: 'clue_date',
      key: 'clue_date',
      align: 'center'
    },
    {
      title: '企业名称',
      dataIndex: 'company',
      key: 'company',
      align: 'center'
    },
    {
      title: '社会信用代码',
      dataIndex: 'social_credit_code',
      key: 'social_credit_code',
      align: 'center'
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
      title: '行业类型',
      dataIndex: 'industry',
      key: 'industry',
      align: 'center'
    },
    {
      title: '管控类型',
      dataIndex: 'level',
      key: 'level',
      align: 'center'
    },
    {
      title: '联系人',
      dataIndex: 'person',
      key: 'person',
      align: 'center'
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center'
    },
    {
      title: '问题表述',
      dataIndex: 'problem',
      key: 'problem',
      align: 'center'
    }
  ]
  const onSearch = () => {
    onQuery(paramsData)
    chartRef.current.loadCumlative()
    chartRef.current.loadTrends()
  }

  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          handleQuery={onSearch}
          paramsData={paramsData}
          setParamsData={setParamsData}
          downConfig={{
            loading: downLoading,
            disabled: !tableData.length,
            downEvent: download
          }}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent>
        <div className="ClueCollect_content">
          <Charts params={paramsData} onRef={chartRef} />

          <Table
            loading={loading}
            columns={columns}
            bordered
            dataSource={tableData}
            size="small"
            pagination={pagination}
            scroll={{ y: '40vh' }}
          />
        </div>
      </Container.ContainerContent>
    </Container>
  )
}

export default ClueCollect
