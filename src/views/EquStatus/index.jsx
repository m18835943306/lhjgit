import React, { useState, useEffect } from 'react'
import { Table, Tag, Tooltip, Button, Space, Popover } from 'antd'
import { DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import Filter from './Filter'
import Modal from './Model'
import { getEnterpriseDevice, getLatestData } from '&/api/electricity'
import { useTableData } from '&/hooks'
import { downloadExcel } from '&/commonjs/util'
import './index.scss'
import Container from '@/appComponents/Container'
const EquStatus = () => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [drawData, setDrawData] = useState({})
  const [visible, setVisible] = useState(false)
  const [dataListData, setDataListData] = useState([]) //弹框表格数据
  const [paginationDraw, setPaginationDraw] = useState() //弹框分页
  const [list1Loading, setList1Loading] = useState(false)
  const [paramsData, setParamsData] = useState({
    project_id: value?.project_id,
    county_id: '-2',
    industry_type_id: '-2',
    ent_name: '',
    if_online: '-2'
  })
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      width: 100,
      title: '所属区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'center'
    },
    {
      width: 150,
      title: '所属行业',
      dataIndex: 'industy_type_name',
      key: 'industy_type_name',
      align: 'center'
    },
    {
      width: 200,
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center',
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
      width: 250,
      title: '点位名称',
      dataIndex: 'dev_name',
      key: 'dev_name',
      align: 'center',
      ellipsis: {
        showTitle: false
      },
      render: (text,record) => {
        const arr = text.split("_")
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "50%", borderRight: "1px solid #f0f0f0", height: "40px", textAlign: "center", whiteSpace: "normal", lineHeight: "40px" }}>
              {/* <Tooltip placement="topLeft" title={arr[0]}> */}
              {record.monitoring_object}
              {/* </Tooltip> */}

            </div>
            <div style={{ width: "50%", height: "40px", textAlign: "center", lineHeight: "40px" }}>
              {record.code_in_ent}
            </div>
          </div>
        )
      },
    },
    {
      width: 120,
      title: '点位类型',
      dataIndex: 'dev_type_name',
      key: 'dev_type_name',
      align: 'center'
    },
    {
      width: 200,
      title: '设备编号',
      dataIndex: 'dev_code',
      key: 'dev_code',
      align: 'center'
    },
    {
      width: 150,
      title: '设备实时状态',
      dataIndex: 'if_online',
      key: 'if_online',
      align: 'center',
      render: (_, record) => {
        const color = record.if_online === 1 ? 'green' : 'red'
        return (
          <Tag color={color}>
            {' '}
            {record.if_online === 1 ? '在线设备' : '离线设备'}
          </Tag>
        )
      }
    },
    {
      width: 150,
      title: '最后上传时间',
      dataIndex: 'data_time',
      key: 'data_time',
      align: 'center'
    },
    {
      width: 150,
      title: '有功功率（KW）',
      dataIndex: 'data_value',
      key: 'data_value',
      align: 'center'
    },
    {
      width: 150,
      title: '通信中断时长',
      dataIndex: 'offline_duration',
      key: 'offline_duration',
      align: 'center',
      render: (_, record) => {
        return (
          <span>
            {record.if_online == 1 ? ' ' : record.if_online == 0 ? _ : ' '}
          </span>
        )
      }
    },
    {
      title: '设备参数详情',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <a role={'button'} tabIndex={0} onClick={handleItemclick}>
          详情
        </a>
      )
    }
  ]
  const handleItemclick = () => {
    setVisible(true)
  }
  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != '-2') {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }
  // 企业设备状态接口
  const [
    tableData,
    pagination,
    loading,
    onQuery,
    onReload,
    originData,
    loadDataAll
  ] = useTableData(getEnterpriseDevice, {
    params: getParams()
  })

  const download = async () => {
    setList1Loading(true)
    const { data } = await loadDataAll()
    const excleData = data.map((item) => {
      item.if_online = item.if_online === 1 ? '通信正常' : '通信中断'
      return item
    })
    downloadExcel(excleData, columns, '设备状态列表')
    setList1Loading(false)
  }
  const renderContainerTitle = () => {
    const content = (
      <div>
        <p>离线设备：设备返回状态码 0</p>
        <p>在线设备：设备返回状态码 1</p>
        <p>更新频率：实时数据更新频率为每15分钟更新一次</p>
      </div>
    )
    return (
      <Space>
        查询结果
        <Popover
          content={content}
          title="设备在线状态规则说明："
          placement="rightTop"
        >
          <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
        </Popover>
      </Space>
    )
  }
  return (
    <div className='EquStatus'>
      <Container>
        <Container.ContainerQuery title="查询条件">
          <Filter
            onQuery={onQuery}
            paramsData={paramsData}
            setParamsData={setParamsData}
            onReload={onReload}
            downConfig={{
              loading: list1Loading,
              disabled: !tableData.length,
              downEvent: download
            }}
          />
        </Container.ContainerQuery>
        <Container.ContainerContent
          title={renderContainerTitle()}
          extra={
            <>
              {Object.keys(originData).length > 0 ? (
                <div style={{ display: 'inline-flex' }}>
                  <div
                    style={{
                      float: 'right',
                      marginBottom: '5px',
                      marginRight: '10px'
                    }}
                  >
                    <span>在线设备：</span>
                    <span style={{ color: 'green' }}>
                      {originData?.other_info.online_number}
                    </span>
                  </div>
                  <div
                    style={{
                      float: 'right',
                      marginBottom: '5px',
                      marginRight: '10px'
                    }}
                  >
                    <span>离线设备：</span>
                    <span style={{ color: 'red' }}>
                      {originData?.other_info.offline_number}
                    </span>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                loading={list1Loading}
                disabled={!tableData.length}
                onClick={download}
              >
                导出
              </Button>
            </>
          }
        >
          <Table
            loading={loading}
            columns={columns}
            bordered
            dataSource={tableData}
            size="small"
            pagination={pagination}
            scroll={{
              x: 1000,
              y: 'calc(100vh - 400px)'
            }}
            // pagination={false}
            onRow={(record) => {
              return {
                onClick: () => {
                  setDrawData(record)
                  // const obj = {
                  //   dev_code: record.dev_code
                  // }
                  // getEnterpriseMonitorData(obj)
                } // 点击行s
              }
            }}
          />
          {visible ? (
            <Modal
              visible={visible}
              setVisible={setVisible}
              dataList={drawData && drawData}
              dataListNewData={dataListData}
              paginationModal={paginationDraw}
            />
          ) : null}
        </Container.ContainerContent>
      </Container>
    </div>

  )
}

export default EquStatus
