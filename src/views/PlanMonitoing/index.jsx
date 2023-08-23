import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'dayjs'
import { Table } from 'antd'
import { useTableData } from '&/hooks'
import { getPlanMonitor } from '&/api/electricity'
import Container from '@/appComponents/Container'
import './index.scss'
const defaultColumns = [
  {
    title: '序号',
    width: 70,
    render: (_, __, index) => `${index + 1}`,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '企业名称',
    width: 260,
    dataIndex: 'ent_name',
    key: 'ent_name',
    align: 'center',
    fixed: 'left'
  },
  {
    title: '设备安装数',
    width: 100,
    dataIndex: 'dev_num',
    key: 'dev_num',
    align: 'center',
    fixed: 'left'
  },
  {
    title: '实时状态',
    align: 'center',
    children: []
  }
]
const renderPolygon = (type) => {
  return <span className={type ? 'square' : 'triangle'} />
}

const PlanMonitoing = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [curretTime, setCurrentTime] = useState(moment())
  const [planData, setPlanData] = useState({})
  const [tableData, setTableData] = useState([])
  const [columns] = useState(defaultColumns)
  const panse = useSelector((state) => state.getPanesReducer)
  const [colors] = useState([
    {
      name: '红色预案',
      color: '#fc6315'
    },
    {
      name: '橙色预案',
      color: '#f0945d'
    },
    {
      name: '黄色预案',
      color: '#ffc90c'
    }
  ])
  const [, pagination, loading, , onReload, originData] = useTableData(
    getPlanMonitor,
    {
      params: { project_id: user.project_id }
    }
  )

  useEffect(() => {
    if (Object.keys(originData).length) {
      setPlanData(originData.plan_data)
      const children = originData.time_data?.map((t) => {
        return {
          title: t,
          dataIndex: `${t}`,
          key: `${t}`,
          align: 'center',
          width: originData.time_data?.length <= 12 ? null : 80,
          render: renderPolygon
        }
      })
      columns[3].className = originData.time_data.length ? 'colspan_name' : ''
      columns[3].children = children
      const keys = Object.values(originData.time_data)
      const data = originData.ent_data.map((ent) => {
        const { ent_id, ent_name, dev_num, status } = ent
        const o = {
          ent_id,
          ent_name,
          dev_num
        }
        status?.forEach((s, i) => {
          o[keys[i]] = s
        })
        return o
      })
      setTableData(data)
    }
  }, [originData])

  useEffect(() => {
    // 不是第一次进入，刷新列表
    if (panse.activeKey === 'PlanMonitoing' && tableData.length) {
      onReload()
      setCurrentTime(moment())
    }
  }, [panse])

  return (
    <Container>
      <Container.ContainerContent>
        <div className="PlanMonitoing_title">
          {Object.keys(planData).length ? (
            <div className="PlanMonitoing_title__left">
              {`${planData.start_time}:00:00 -至${planData.end_time}:00:00 ${planData.plan_name} `}
              <span
                className="alert_important"
                style={{
                  color:
                    colors.find((c) => c.name === planData.alert_name)?.color ||
                    '#000'
                }}
              >
                {planData.alert_name}
              </span>
            </div>
          ) : null}
          <div className="PlanMonitoing_title__right">
            刷新时间：{curretTime.format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={tableData}
          pagination={pagination}
          size="small"
          scroll={{
            y: '78vh',
            x: 2000
          }}
        />
      </Container.ContainerContent>
    </Container>
  )
}
export default PlanMonitoing
