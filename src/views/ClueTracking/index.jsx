import React, { useState, useRef } from 'react'
import { Table, Button, Tooltip, Image } from 'antd'
import dayjs from 'dayjs'
import Filter from './Filter'
import { useTableData } from '&/hooks'
import { downloadExcel } from '&/commonjs/util'
import { DownloadOutlined } from '@ant-design/icons'
import { getClueMacro } from '&/api/electricity'
import Container from '@/appComponents/Container'
import './index.scss'
const format = 'YYYY-MM-DD'
const ClueTracking = () => {
  const value = JSON.parse(localStorage.getItem('user')) || {}
  const [downloading, setDownloading] = useState(false)
  const [paramsData, setParamsData] = useState({
    county_name: '',
    industry: '',
    level: '',
    start_time: dayjs().add(-1, 'M').startOf('day').format(format),
    end_time: dayjs().endOf('day').format(format),
    project_id: value?.project_id
  })
  const [tableData, pagination, loading, onQuery, , , loadDataAll] =
    useTableData(getClueMacro, {
      params: paramsData
    })

  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '线索日期',
      dataIndex: 'monitor_time',
      key: 'monitor_time',
      align: 'center',
      width: 80
    },
    {
      title: '企业名称',
      dataIndex: 'company',
      key: 'company',
      align: 'center',
      width: 80
    },
    {
      title: '社会信用代码',
      dataIndex: 'credit_code',
      key: 'credit_code',
      align: 'center',
      width: 80
    },
    {
      title: '所属区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'center',
      width: 80
    },
    {
      title: '所属街乡',
      dataIndex: 'town_name',
      key: 'town_name',
      align: 'center',
      width: 80
    },
    {
      title: '行业类型',
      dataIndex: 'industry',
      key: 'industry',
      align: 'center',
      width: 80
    },
    {
      title: '管控类型',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      width: 80
    },
    {
      title: '联系人',
      dataIndex: 'person',
      key: 'person',
      align: 'center',
      width: 80
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: 80
    },
    {
      title: '问题表述',
      dataIndex: 'problem',
      key: 'problem',
      align: 'center',
      width: 80,
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
      title: '问题附图',
      dataIndex: 'file',
      key: 'file',
      align: 'center',
      width: 80,
      render: (value, row, index) => {
        return (
          <span>
            <Image
              // width={200}
              src={value}
            />
          </span>
        )
      }
    },
    {
      title: '是否查实',
      dataIndex: 'is_issue_found',
      key: 'is_issue_found',
      align: 'center',
      width: 80,
      render: (text, record, index) => <span>{text == '1' ? '是' : '否'}</span>
    },
    {
      title: '执法反馈',
      dataIndex: 'feedback_content',
      key: 'feedback_content',
      align: 'center',
      width: 80,
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
      title: '线索追踪',
      dataIndex: 'future_pic',
      key: 'future_pic',
      align: 'center',
      width: 80,
      render: (value, row, index) => {
        return (
          <span>
            <Image
              // width={200}
              src={value}
            />
          </span>
        )
      }
    },
    {
      title: '追踪结论',
      dataIndex: 'result',
      key: 'result',
      align: 'center',
      width: 80,
      render: (value, row, index) => {
        if (value === -99) {
          return null
        } else {
          return (
            <span style={value > 0 ? { color: 'red' } : { color: 'green' }}>
              {(value * 100).toFixed(1)}%
            </span>
          )
        }
      }
    }
  ]
  const download = async () => {
    setDownloading(true)
    const { data } = await loadDataAll()
    downloadExcel(data, columns, '线索追踪列表')
    setDownloading(false)
  }
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          handleQuery={onQuery}
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
            loading={downloading}
            disabled={!tableData.length}
            onClick={download}
          >
            导出
          </Button>
        }
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={tableData}
          bordered
          size="small"
          pagination={pagination}
          scroll={{
            // x: 'calc(700px + 50%)',
            y: '78vh'
          }}
        />
      </Container.ContainerContent>
    </Container>
  )
}
export default ClueTracking
