import React, { useState, useRef } from 'react'
import { Table, Space, Button, message } from 'antd'
import dayjs from 'dayjs'
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  StopOutlined
} from '@ant-design/icons'
import { useTableData } from '&/hooks'
import { Modal } from '&/appComponents/Antd'
import Info from './Info'
import _ from 'lodash'
import {
  getWarnPlanList,
  saveWarnPlan,
  deleteWarnPlanById
} from '&/api/electricity'
import Container from '@/appComponents/Container'
import './index.scss'

const PlanLaunch = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}

  const [formData, setFormData] = useState(null)
  const [modalTitle, setModalTitle] = useState('')
  const [modalType, setModalType] = useState('')
  const ref = useRef(null)
  const [tableData, , loading, , onReload] = useTableData(getWarnPlanList, {
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
      title: '预案类型',
      dataIndex: 'plan_type',
      key: 'plan_type',
      align: 'center'
    },
    {
      title: '预案名称',
      dataIndex: 'plan_name',
      key: 'plan_name',
      align: 'center'
    },
    {
      title: '预案开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      align: 'center'
    },
    {
      title: '预案结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      align: 'center'
    },
    {
      title: '启动状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, record) => {
        return <div>{text == 0 ? '未启动' : '已启动'}</div>
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 240,
      align: 'center',
      render: (_, record) => (
        <Space nowrap>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onClick('edit', record)}
          >
            编辑
          </Button>
          <Button
            type="primary"
            size="small"
            danger
            disabled={record.status == 0 ? true : false}
            icon={<StopOutlined />}
            onClick={() => onClosePlan(record)}
          >
            停止
          </Button>
          <Button
            type="primary"
            size="small"
            danger
            disabled={record.plan_type === '重污染应急预案'}
            icon={<DeleteOutlined />}
            onClick={() => onDeletePlan(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ]

  const onClick = (type, row) => {
    const data = _.cloneDeep(row)
    if (data) {
      data.start_time = data.start_time && dayjs(data.start_time)
      data.end_time = data.end_time && dayjs(data.end_time)
    }
    setModalType(type)
    setFormData(data)

    if (type === 'edit') {
      setModalTitle(`编辑（${data.plan_type})`)
    } else if (type === 'add') {
      setModalTitle(`新增（重大活动保障）`)
    }
    ref.current.showModelRef()
  }
  const onDeletePlan = async (row) => {
    try {
      await deleteWarnPlanById({ plan_id: row.plan_id, userid: user.userid })
      await onReload()
      message.success(`删除成功！`)
    } catch (error) {
      message.error(`删除失败！`)
    }
  }
  const onClosePlan = async (row) => {
    const { plan_type, status, ...rest } = _.cloneDeep(row)
    rest.end_time = dayjs().format('YYYY-MM-DD HH:mm:ss')

    try {
      await saveWarnPlan({ userid: user.userid, ...rest })
      await onReload()
      message.success(`关闭成功！`)
    } catch (error) {
      message.error(`关闭失败！`)
    }
  }

  return (
    <div className="PlanLaunch">
      <Container>
        {/* <Container.ContainerQuery title="查询条件">
        <Filter
          handleQuery={onQuery}
          // handleAdd={onClick}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
      </Container.ContainerQuery> */}
        <Container.ContainerContent
          title="查询结果"
          extra={
            <Button type="primary" onClick={() => onClick('add')}>
              新增
            </Button>
          }
        >
          <Table
            bordered
            loading={loading}
            columns={columns}
            dataSource={tableData}
            size="small"
            pagination={false}
            scroll={{ y: '62vh' }}
          />
          <Modal ref={ref} width={450} title={modalTitle} footer={null}>
            <Info
              formData={formData}
              modalRef={ref}
              modalType={modalType}
              project_id={user.project_id}
              onReload={onReload}
            />
          </Modal>
        </Container.ContainerContent>
      </Container>
    </div>
  )
}

export default PlanLaunch
