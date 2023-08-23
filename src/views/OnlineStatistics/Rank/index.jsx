import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Row, Col } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { downloadExcel } from '&/commonjs/util'
import { Card } from '&/appComponents/Antd'
import { Modal } from '&/appComponents/Antd'
import ModelInfo from '../ModelInfo'
import './index.scss'
const Rank = ({ entData, check, devData }) => {
  const [downloading, setDownloading] = useState(false)
  const [downloadingList, setDownloadingList] = useState(false)
  const [data, setData] = useState([])
  const [record, setRecord] = useState({})
  useEffect(() => {
    if (entData) {
      setData(entData)
    }
  }, [entData])

  const columns = [
    {
      title: '倒排名',
      width: 70,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'center',
      width: 100
    },
    {
      title: '街乡镇',
      dataIndex: 'town_name',
      key: 'town_name',
      align: 'center',
      width: 100
    },
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center',
      width: 120,
      onCell: (record) => ({
        onClick: () => onCellClick(record)
      })
    },
    {
      title: '所属行业',
      dataIndex: 'industry_type',
      key: 'industry_type',
      align: 'center',
      width: 100
    },
    {
      title: '在线率（%）',
      dataIndex: 'online_ratio',
      key: 'online_ratio',
      align: 'center',
      width: 100,
      sorter: (a, b) => a.online_ratio - b.online_ratio
    }
  ]
  const columnslist = [
    {
      title: '倒排名',
      width: 70,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'center',
      width: 100
    },
    {
      title: '街乡镇',
      dataIndex: 'town_name',
      key: 'town_name',
      align: 'center',
      width: 100
    },
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center',
      width: 120,
    },
    // {
    //   title: '所属行业',
    //   dataIndex: 'industry_type',
    //   key: 'industry_type',
    //   align: 'center',
    //   width: 100
    // },
    {
      title: '设备名称',
      dataIndex: 'dev_name',
      key: 'dev_name',
      align: 'center',
      width: 100
    },
    {
      title: '设备类型',
      dataIndex: 'dev_type_name',
      key: 'dev_type_name',
      align: 'center',
      width: 100
    },
    {
      title: '设备在线率（%）',
      dataIndex: 'online_ratio',
      key: 'online_ratio',
      align: 'center',
      width: 150,
      sorter: (a, b) => a.online_ratio - b.online_ratio
    }
  ]
  const download = async () => {
    setDownloading(true)
    // const excelData = formatData(data);
    downloadExcel(data, columns, '各区及行业联网统计列表')
    setDownloading(false)
  }
  const downloadlist = async () => {
    setDownloadingList(true)
    // const excelData = formatData(data);
    downloadExcel(devData&&devData, columnslist, '设备倒排名统计列表')
    setDownloadingList(false)
  }
  const modalRef = useRef(null)
  const onCellClick =async (record) => {
    modalRef.current.showModelRef()
    setRecord(record)
  }
  return (
    <div className="Rank">
      {check == 2 ? (
        <Row gutter={16}>
          <Col span={12}>
            <Card
              title="企业倒排名（全市前50名）"
              style={{ width: '100%' }}
              size="small"
              bodyStyle={{ height: '300px' }}
              extra={
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  loading={downloading}
                  disabled={!data.length}
                  onClick={download}
                >
                  导出
                </Button>
              }
            >
              <Table
                columns={columns}
                dataSource={data.slice(0,50)}
                pagination={false}
                bordered
                scroll={{ y: "22vh"}}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="设备倒排名（全市前30名）"
              style={{ width: '100%' }}
              size="small"
              bodyStyle={{ height: '300px' }}
              extra={
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  loading={downloadingList}
                  disabled={!devData.length}
                  onClick={downloadlist}
                >
                  导出
                </Button>
              }
            >
              <Table
                columns={columnslist}
                dataSource={devData&&devData.slice(0,30)}
                pagination={false}
                bordered
                scroll={{ y: "22vh"}}
              />
            </Card>
          </Col>
        </Row>
      ) : (
        <Row gutter={16}>
          <Col span={24}>
            <Card
              title="各区及行业联网统计（全市前50名）"
              bodyStyle={{ height: '300px' }}
              style={{ width: '100%' }}
              size="small"
              extra={
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  loading={downloading}
                  disabled={!data.length}
                  onClick={download}
                >
                  导出
                </Button>
              }
            >
              <Table
                columns={columns}
                dataSource={data.slice(0,50)}
                pagination={false}
                bordered
                scroll={{ y: "22vh"}}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Modal
        title="企业数据"
        ref={modalRef}
        footer={false}
        style={{ top: 80 }}
        centered={false}
      >
        <ModelInfo record={record} />
      </Modal>
    </div>
  )
}
export default Rank
