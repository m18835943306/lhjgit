import React, { useState, useEffect } from 'react'
import { Table, Modal } from 'antd'
import { getLatestData } from '&/api/electricity'
// import { Modal } from '&/appComponents/Antd'
import './index.scss'
//
const AlarmModal = ({ visible, setVisible, dataList }) => {
  const [tableData, setTableData] = useState([])
  const [pagetion, setPagination] = useState(false)
  const [loading, setLoading] = useState(false)
  // 企业设备数据详情接口
  const getEnterpriseMonitorData = async (param) => {
    setTableData([])
    setPagination(false)
    setLoading(true)
    const res = await getLatestData(param)
    const newArr = res?.data.map((item, index) => {
      return {
        key: index + 1,
        project: item.name,
        equipmentno: item.point_code,
        data: item.data_value,
        time: item.data_time
      }
    })
    setTableData(newArr)
    const paginationDraw = {
      position: ['bottomCenter'],
      showTotal: (total, range) => `共${total}条数据`
    }
    setPagination(paginationDraw)
    setLoading(false)
  }

  useEffect(() => {
    if (dataList.dev_code) {
      getEnterpriseMonitorData({ dev_code: dataList.dev_code })
    }
  }, [dataList.dev_code])
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '监测项目',
      dataIndex: 'project',
      key: 'project',
      align: 'center'
    },
    {
      title: '监测点编号',
      dataIndex: 'equipmentno',
      key: 'equipmentno',
      align: 'center'
    },
    {
      title: '数据',
      dataIndex: 'data',
      key: 'data',
      align: 'center'
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center'
    }
  ]

  return (
    <Modal
      title="设备参数详情"
      className="AlarmModal"
      centered
      open={visible}
      footer={null}
      width={1100}
      onCancel={() => setVisible(false)}
    >
      <div className="model-top">
        <div className="top-first">
          <div className="first-text">
            <span style={{ color: '#4793e6', fontWeight: 700 }}>
              企业名称：
            </span>
            <span>{dataList?.ent_name}</span>
          </div>
          <div className="first-text">
            <span style={{ color: '#4793e6', fontWeight: 700 }}>
              设备编号：
            </span>
            <span>{dataList?.dev_code}</span>
          </div>
        </div>
      </div>
      <div className="model-bottom">
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          size="small"
          pagination={pagetion}
          loading={loading}
          // scroll={{ y: '400px' }}
          // pagination={false}
        />
      </div>
    </Modal>
  )
}

export default AlarmModal
