import React, { useState, useEffect } from 'react'
import './index.scss'
import { Table, Button, Tooltip, Image } from 'antd'
import { useTableData } from '&/hooks'
import Filter from './Filter'
import dayjs from 'dayjs'
import Container from '@/appComponents/Container'
import { getClueGeneral } from '&/api/electricity'
const OverviewOfClues = () => {
  const values = JSON.parse(localStorage.getItem('user'))
  const [paramsData, setParamsData] = useState({
    // project_id: values.project_id,
    start_time: dayjs().subtract(1, 'd').format('YYYY-MM-DD 00:00:00'),
    end_time: dayjs().format('YYYY-MM-DD 00:00:00'),
    assign_to_adm_id: '-2', //区
    clue_code: '',
    push_type: 1,
    time_type: 1

  })
  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != '-2') {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }
  const [tableData, , loading, onQuery, , , loadDataAll] =
    useTableData(getClueGeneral, {
      params: getParams(),
      disabledPage: true
    })

  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '编号',
      dataIndex: 'clue_code',
      key: 'clue_code',
      align: 'center',
      width: 80,
    },
    {
      title: '问题描述',
      dataIndex: 'clue_content',
      key: 'clue_content',
      align: 'center'
    },
    {
      title: '开始时间',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      width: 80,
    },
    {
      title: '结束时间',
      dataIndex: 'closed_time',
      key: 'closed_time',
      align: 'center',
      width: 80,
    },
    {
      title: '是否关闭',
      dataIndex: 'is_closed',
      key: 'is_closed',
      align: 'center',
      width: 80,
      render: (text, record) => {
        return (
          <span>{text == 0 ? "已关闭" : "未关闭"}</span>
        )
      }
    },
    {
      title: '线索生成人',
      dataIndex: 'created_from',
      key: 'created_from',
      align: 'center',
      width: 100,
    },
    {
      title: '线索下发人员',
      dataIndex: 'assign_from',
      key: 'assign_from',
      align: 'center',
      width: 120,
    },
    {
      title: '线索接收人员',
      dataIndex: 'assign_to',
      key: 'assign_to',
      align: 'center',
      width: 120,
    },
    {
      title: '下发时间',
      dataIndex: 'assign_start_at',
      key: 'assign_start_at',
      align: 'center',
      width: 80,
    },
    {
      title: '反馈人员',
      dataIndex: 'feedback_from',
      key: 'feedback_from',
      align: 'center',
      width: 80,
    },
    {
      title: '反馈信息',
      dataIndex: 'feedback_content',
      key: 'feedback_content',
      align: 'center',
      width: 80,
    },
    {
      title: '反馈时间',
      dataIndex: 'feedback_time',
      key: 'feedback_time',
      align: 'center',
      width: 80,
    },
    {
      title: '反馈图片',
      dataIndex: 'file_url',
      key: 'file_url',
      align: 'center',
      width: 120,
      render: (value, row, index) => {
        return (
          value?.length > 0 ?
            <span>
              <Image.PreviewGroup items={value}>
                <Image width={60} height={80} src={value[0]} />
              </Image.PreviewGroup>
            </span> : <span></span>
        )
      }
    },
  ]
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
          bordered
          dataSource={tableData}
          size="small"
          pagination={false}
          scroll={{ y: '62vh' }}
        />
      </Container.ContainerContent>
    </Container>
  )
}
export default OverviewOfClues
