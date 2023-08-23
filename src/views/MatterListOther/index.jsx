import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Table, Button, Tag, message, Modal, Result, Space } from 'antd'
import {
  DownloadOutlined,
  MailOutlined,
  VerticalAlignBottomOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import Filter from './Filter'
import sourceImg from '&/assets/images/imgs'
import Container from '@/appComponents/Container'
import ConText from './ConText'
import ModerOther from './ModerOther'
import ModerFeed from './ModerFeed'
import {
  getClueList,
  postWarnClueAssign,
  postWarnClueClose
} from '&/api/electricity'
import { useTableData } from '&/hooks'
import { downloadExcel } from '&/commonjs/util'
import TagCompent from '@/appComponents/TagCompent'
import SpanNum from '@/appComponents/SpanNum'
import './index.scss'

const { confirm } = Modal
const MatterListOther = () => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [checkStrictly, setCheckStrictly] = useState(false)
  const [listArr, setListArr] = useState([])
  // const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [newRecordData, setNewRecordData] = useState([])
  const [visible, setVisible] = useState(false)
  const [feedVisible, setFeedVisible] = useState(false) //反馈弹窗
  const [records, setRecords] = useState() //点击详情所拿到的数据
  const [feedRecord, setFeedRecord] = useState() //点击已反馈所拿到的数据
  const [downLoading, setDownLoading] = useState(false)
  const [paramsData, setParamsData] = useState({
    adm_id: value?.adm_id,
    ent_name: '',
    userid: value?.userid,
    role_level: value?.role_level,
    assign_status: 1,
    feedback_status: '-1',
    type: 1
  })

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      const arr = selectedRows.map((item) => {
        return item.clue_code
      })
      setListArr(arr)
      setNewRecordData(selectedRows)
    }
  }
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
    useTableData(getClueList, {
      params: getParams()
      // formatcb: (data) => formatData(data)
    })

  // 点击详情
  const handClickDeile = (data) => {
    setRecords(data)
    setVisible(true)
  }

  //批量点击关闭
  const handClickAllClose = async () => {
    // setIsModalOpen(true)
    setMode('4')
    Confirm('4')
  }
  //关闭接口
  const postWarnClueCloseRequest = async (jsonP) => {
    const { data } = await postWarnClueClose(jsonP)
    if (data.code == 2000) {
      message.success(data.result)
      onReload()
    } else {
      message.error('下发失败')
    }
  }
  const Confirm = (modes, text) => {
    let formData
    switch (modes) {
      case '4':
        // 点击批量关闭时
        if (listArr.length > 0) {
          formData = new FormData()
          formData.append('userid', value?.userid)
          formData.append('clue_code', JSON.stringify(listArr))
          postWarnClueCloseRequest(formData)
          // onQuery(paramsData)
          setSelectedRowKeys([])
        }
    }
    return
  }
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (text, item, index) => {
        return index + 1
      },
      align: 'center'
    },
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center',
      width: 150
    },
    {
      title: '接收方',
      dataIndex: 'assign_object',
      key: 'assign_object',
      align: 'center',
      width: 150
    },
    {
      width: 100,
      title: '编号',
      dataIndex: 'clue_code',
      key: 'clue_code',
      align: 'center',
      render: (_, record) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div>{_}</div>
          </div>
        )
      }
    },
    {
      title: '问题描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
      width: 700,
      render: (text) => {
        if (text) {
          return (
            <div
              style={{
                // overflowY: 'auto',
                // maxHeight: '240px',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center'
              }}
            >
              <ConText data={text}></ConText>
            </div>
          )
        }
      }
    },
    {
      title: '触发点位',
      dataIndex: 'dev_name',
      key: 'dev_name',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div className="dev_name">
            {record?.content.map((item) => {
              // console.log(item, "item---");
              return (
                <div
                  style={{
                    padding: '5px',
                    height: '50px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  {item.dev_name}
                </div>
              )
            })}
          </div>
        )
      }
    },
    {
      title: '下发时间',
      dataIndex: 'assign_time',
      key: 'assign_time',
      align: 'center',
      width: 120
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div className="start_time">
            {record?.content.map((item) => {
              // console.log(item, "item---");
              return (
                <div
                  style={{
                    padding: '5px',
                    height: '50px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  {item.start_time}
                </div>
              )
            })}
          </div>
        )
      }
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div className="end_time">
            {record?.content.map((item) => {
              // console.log(item, "item---");
              return (
                <div
                  style={{
                    padding: '5px',
                    height: '50px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  {item.end_time}
                </div>
              )
            })}
          </div>
        )
      }
    },
    {
      title: '总持续时长',
      dataIndex: 'total_duration',
      key: 'total_duration',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div className="total_duration">
            {record?.content.map((item) => {
              // console.log(item, "item---");
              return (
                <div
                  style={{
                    padding: '5px',
                    height: '50px',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {item.total_duration}
                </div>
              )
            })}
          </div>
        )
      }
    },
    {
      title: '报警次数',
      dataIndex: 'warn_count',
      key: 'warn_count',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return <SpanNum record={record}></SpanNum>
      }
    },
    {
      title: '最高报警级别',
      dataIndex: 'highest_level',
      key: 'highest_level',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return <TagCompent record={record}></TagCompent>
      }
    },
    {
      title: '报警类型',
      dataIndex: 'warn_type_name',
      key: 'warn_type_name',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div className="warn_type_name">
            {record?.content.map((item) => {
              // console.log(item, "item---");
              return (
                <div
                  style={{
                    padding: '5px',
                    height: '50px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  {item.warn_type_name}
                </div>
              )
            })}
          </div>
        )
      }
    },
    {
      title: '下发状态',
      dataIndex: 'assign_status',
      key: 'assign_status',
      align: 'center',
      width: 80,
      render: (text) => {
        const color = text == 0 ? 'red' : 'green'
        return <Tag color={color}>{text == 0 ? '未下发' : '已下发'}</Tag>
      }
    },
    {
      title: '反馈状态',
      dataIndex: 'feedback_status',
      key: 'feedback_status',
      align: 'center',
      width: 120,
      render: (text, record) => {
        const color = text == 0 ? 'red' : 'green'
        return (
          <>
            <Tag color={color}>{text == 0 ? '未反馈' : '已反馈'}</Tag>
            {/* <MailOutlined /> */}
            {text !== 0 ? (
              <Button
                // disabled={true}
                size="small"
                type="primary"
                shape="circle"
                icon={<MailOutlined />}
                onClick={() => {
                  setFeedVisible(true)
                  setFeedRecord(record)
                }}
              ></Button>
            ) : null}
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'caozuo',
      key: 'caozuo',
      align: 'center',
      width: 150,
      //  fixed: 'right',
      render: (_, record) => {
        // console.log(record,"record--");
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => handClickDeile(record)}
              // disabled={record.is_closed == 0 ? false : true}
            >
              详情
            </Button>
          </Space>
        )
      }
    }
  ]
  const formatExeclData = (data) => {
    const cloneData = data.map((item) => {
      const [{ warn_count, warn_type_name }] = item.content || []
      return {
        ...item,
        feedback_status: item.feedback_status == 0 ? '未反馈' : '已反馈',
        assign_status: item.assign_status == 0 ? '未下发' : '已下发',
        warn_count,
        warn_type_name
      }
    })
    return cloneData
  }
  const download = async () => {
    setDownLoading(true)
    const data = await loadDataAll()
    const execlData = formatExeclData(data)
    console.log(execlData, 'result')
    downloadExcel(execlData, columns, '问题下发列表')
    setDownLoading(false)
  }
  return (
    <div className="MatterListOther">
      <Container>
        <Container.ContainerQuery title="查询条件">
          <div className="MatterListOther-top">
            <div>
              <Filter
                onQuery={onQuery}
                paramsData={paramsData}
                setParamsData={setParamsData}
              />
            </div>
          </div>
        </Container.ContainerQuery>
        <Container.ContainerContent
          title="查询结果"
          extra={
            <Space>
              <Button
                type="primary"
                danger
                disabled={selectedRowKeys.length > 0 ? false : true}
                onClick={handClickAllClose}
                icon={<CloseCircleOutlined />}
              >
                批量关闭
              </Button>
              <Button
                type="primary"
                loading={downLoading}
                disabled={!tableData.length}
                icon={<DownloadOutlined />}
                onClick={async () => {
                  setDownLoading(true)
                  await download()
                  setDownLoading(false)
                }}
              >
                导出
              </Button>
            </Space>
          }
        >
          <Table
            bordered
            tableLayout="fixed"
            loading={loading}
            columns={columns}
            dataSource={tableData}
            size="small"
            rowSelection={{
              ...rowSelection,
              checkStrictly
            }}
            rowKey={(row) => {
              return JSON.stringify(row)
            }}
            pagination={pagination}
            scroll={{
              y: '62vh'
            }}
          />
          <ModerOther
            visible={visible}
            setVisible={setVisible}
            records={records}
          />
          <ModerFeed
            visible={feedVisible}
            setVisible={setFeedVisible}
            records={feedRecord}
          ></ModerFeed>
        </Container.ContainerContent>
      </Container>
    </div>
  )
}
export default MatterListOther
