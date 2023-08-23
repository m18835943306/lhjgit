import React, { useState, useEffect } from 'react'
import { Table, Tooltip, Button, Tag } from 'antd'
import Filter from './Filter'
import Modal from './Modal'
import { useTableData } from '&/hooks'
import { getDeviceWarnList } from '&/api/electricity'
import dayjs from 'dayjs'
import { downloadExcel } from '&/commonjs/util'
import { DownloadOutlined } from '@ant-design/icons'

const HistoryAlarm = (props) => {
  const [list1Loading, setList1Loading] = useState(false)
  const {
    setLoading,
    contextValue: { ent_id }
  } = props
  const value = JSON.parse(localStorage.getItem('user'))
  const [records, setRecords] = useState({})
  const [paramsData, setParamsData] = useState({
    project_id: value.project_id,
    ent_id: ent_id,
    warn_type: -1, //报警类型
    release_status: -1, //报警状态
    start_time: dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
    end_time: dayjs().format('YYYY-MM-DD')
  })
  useEffect(() => {
    setLoading(false)
  }, [])
  const renderFun = (text, item) => {
    return <span>{text}</span>
  }
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (text, item, index) => {
        return index + 1
      }
    },
    {
      title: '企业名称',
      width: 180,
      dataIndex: 'ent_name',
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <Tooltip placement="top" title={text}>
            <div
              style={{
                width: 180,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {text}
            </div>
          </Tooltip>
        )
      }
    },
    {
      width: 160,
      title: '触发点位',
      dataIndex: 'dev_name',
      render: renderFun
    },
    {
      title: '点位类型',
      width: 80,
      dataIndex: 'dev_type_name',
      render: renderFun
    },
    {
      width: 120,
      title: '报警类型',
      dataIndex: 'warn_type_name',
      render: renderFun
    },
    {
      title: '报警级别',
      dataIndex: 'warn_level_value',
      width: 100,
      render: renderFun
    },
    {
      title: '报警时间',
      dataIndex: 'warn_time',
      width: 160,
      render: renderFun
    },
    {
      title: '持续时长',
      width: 80,
      dataIndex: 'duration',
      render: renderFun
    },
    {
      title: '所属区',
      width: 80,
      dataIndex: 'county_name',
      render: renderFun
    },
    {
      title: '所属街乡',
      dataIndex: 'town_name',
      width: 80,
      render: renderFun
    },
    {
      title: '行业类型',
      dataIndex: 'industry_type_name',
      width: 80,
      render: renderFun
    },
    {
      title: '报警状态',
      dataIndex: 'release_status_value',
      width: 100,
      render: (_, record) => {
        const color = record.release_status_value === '已解除' ? 'green' : 'red'
        return <Tag color={color}>{record.release_status_value}</Tag>
      }
    },
    {
      title: '处理状态',
      dataIndex: 'process_status_value',
      width: 100,
      render: (_, record) => {
        const color = record.process_status_value === '已反馈' ? 'green' : 'red'
        return <Tag color={color}>{record.process_status_value}</Tag>
      }
    }
    // {
    //   title: '操作',
    //   key: 'action',
    //   width: 80,
    //   render: (_, record) => (
    //     <a role={'button'} tabIndex={0} onClick={() => handleItemclick(record)}>
    //       处理
    //     </a>
    //   )
    // }
  ]
  const [visible, setVisible] = useState(false)
  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != (-1 || '-1')) {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }
  const [tableData, pagination, loading, onQuery, onReload, , loadDataAll] =
    useTableData(getDeviceWarnList, {
      params: getParams()
    })

  const handleItemclick = (record) => {
    setVisible(true)
    setRecords(record)
  }
  const download = async () => {
    setList1Loading(true)
    const { data } = await loadDataAll()
    downloadExcel(data, columns, '历史报警列表')
    setList1Loading(false)
  }
  return (
    <div className="HistoryAlarm">
      <Filter
        onQuery={onQuery}
        paramsData={paramsData}
        setParamsData={setParamsData}
      />
      <div>
        <Button
          style={{
            float: 'right'
          }}
          type="primary"
          icon={<DownloadOutlined />}
          loading={list1Loading}
          disabled={!tableData.length}
          onClick={
            download
            // downloadExcel(tableData && tableData, columns, '设备状态列表');
          }
        >
          导出
        </Button>
      </div>
      <Table
        loading={loading}
        columns={columns}
        bordered
        dataSource={tableData}
        size="small"
        pagination={pagination}
        scroll={{
          x: '100%',
          y: '60vh'
        }}
      />
      <Modal
        visible={visible}
        setVisible={setVisible}
        records={records}
        onReload={onReload}
      />
    </div>
  )
}

export default HistoryAlarm
