import React, { useState, useEffect } from 'react'
import { useTableData } from '&/hooks'
import { Table, Button, Tooltip } from 'antd'
import { getDeviceWarnList } from '&/api/electricity'
import _ from "lodash"
import './index.scss'
const PoliceList = (props) => {
  const { PoliceValue, starttime, endtime } = props
  // 1 黄 2 橙 3 红
  const value = JSON.parse(sessionStorage.getItem('userv2'))

  const [paramsData, setParamsData] = useState({
    project_id: value.project_id,
    // ent_id: ent_id,
    warn_type:
      PoliceValue && PoliceValue === '黄色预案'
        ? 3
        : PoliceValue && PoliceValue === '橙色预案'
        ? 2
        : PoliceValue && PoliceValue === '黄色预案'
        ? 1
        : 4, //报警类型
    // release_status: 1, //报警状态
    start_time: starttime,
    end_time: endtime
  })
  useEffect(() => {
    if (PoliceValue) {
      const params = {
        project_id: value.project_id,
        // ent_id: ent_id,
        warn_type:
          PoliceValue && PoliceValue === '红色预案'
            ? 3
            : PoliceValue && PoliceValue === '橙色预案'
            ? 2
            : PoliceValue && PoliceValue === '黄色预案'
            ? 1
            : 4, //报警类型
        // release_status: 1, //报警状态
        start_time: starttime,
        end_time: endtime
      }
      setParamsData(params)
      onQuery && onQuery(params)
    }
  }, [endtime])

  const renderFun = (text, item) => {
    return <span>{text}</span>
  }
  const columns = [
    {
      title: '序号',
      width: 50,
      align: 'center',
      render: (text, item, index) => {
        return index + 1
      }
    },
    {
      title: '企业名称',
      width: 100,
      dataIndex: 'ent_name',
      align: 'center',
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
              <a>{text}</a>
            </div>
          </Tooltip>
        )
      }
    },
    {
      width: 100,
      title: '触发点位',
      dataIndex: 'dev_name',
      align: 'center',
      render: renderFun
    },
    {
      title: '点位类型',
      width: 100,
      dataIndex: 'dev_type_name',
      align: 'center',
      render: renderFun
    },
    {
      width: 100,
      title: '报警类型',
      dataIndex: 'warn_type_name',
      align: 'center',
      render: renderFun
    },
    {
      title: '报警级别',
      dataIndex: 'warn_level_value',
      width: 100,
      align: 'center',
      render: renderFun
    },
    {
      title: '报警时间',
      dataIndex: 'warn_time',
      width: 100,
      align: 'center',
      render: renderFun
    },
    {
      title: '持续时长',
      width: 100,
      dataIndex: 'duration',
      align: 'center',
      render: renderFun
    },
    {
      title: '所属区',
      width: 100,
      dataIndex: 'county_name',
      align: 'center',
      render: renderFun
    },
    {
      title: '所属街乡',
      dataIndex: 'town_name',
      align: 'center',
      width: 100,
      render: renderFun
    },
    {
      title: '行业类型',
      dataIndex: 'industry_type_name',
      width: 100,
      align: 'center',
      render: renderFun
    },
    {
      title: '报警状态',
      dataIndex: 'release_status_value',
      width: 100,
      align: 'center',
      render: renderFun
    },
    {
      title: '处理状态',
      dataIndex: 'process_status_value',
      width: 100,
      align: 'center',
      render: (_, record) => {
        const style = {
          color: record.process_status_value === '已反馈' ? 'green' : 'red'
        }
        return <span style={style}>{record.process_status_value}</span>
      }
    }
    // {
    //   title: '操作',
    //   key: 'action',
    //   width: 80,
    //   align: 'center',
    //   render: (_, record) => (
    //     <a role={'button'} tabIndex={0} onClick={() => handleItemclick(record)}>
    //       处理
    //     </a>
    //   ),
    // },
  ]
  const [tableData, pagination, loading, onQuery, onReload] = useTableData(
    getDeviceWarnList,
    {
      params: paramsData,
      isWaitExec: !PoliceValue
    }
    // [paramsData]
  )
  return (
    <div className="PoliceList">
      <Table
        loading={loading}
        columns={columns}
        dataSource={tableData}
        // bordered
        size="middle"
        pagination={pagination}
        scroll={{
          x: 'calc(700px + 50%)',
          y: 240
        }}
      />
    </div>
  )
}
export default PoliceList
