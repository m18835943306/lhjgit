import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Table, Button, Tag, message, Modal, Result, Space } from 'antd'
import {
  CheckCircleOutlined,
  MailOutlined,
  VerticalAlignBottomOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import Filter from './Filter'
import sourceImg from '&/assets/images/imgs'
import Container from '@/appComponents/Container'
import ConText from './ConText'
import ModerOther from './ModerOther'
import ModerFeed from './ModerFeed'
import ShareValue from './ShareValue'
import ShareValueSingle from './ShareValueSingle'
import { dataURLtoFile, FiletoDataURL } from '&/utils/file.help'
import {
  getClueList,
  postWarnClueAssign,
  postWarnClueClose,
  getClueDelete //线索删除
} from '&/api/electricity'
import TagCompent from '@/appComponents/TagCompent'
import SpanNum from '@/appComponents/SpanNum'
import './index.scss'
const { confirm } = Modal
const MatterList = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const value = JSON.parse(localStorage.getItem('user'))
  const [checkStrictly, setCheckStrictly] = useState(false)
  const [listArr, setListArr] = useState([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [mode, setMode] = useState()
  const shareRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [jsonValue, setJsonValue] = useState([])
  const [newRecordData, setNewRecordData] = useState([])
  const [visible, setVisible] = useState(false)
  const [feedVisible, setFeedVisible] = useState(false)//反馈弹窗
  const [records, setRecords] = useState() //点击详情所拿到的数据
  const [recordSing, setRecordSing] = useState() //点击详情所拿到的数据
  const [feedRecord, setFeedRecord] = useState() //点击已反馈所拿到的数据
  const [total, setTotal] = useState()
  const [clickType, setClickType] = useState()
  const [instance, setInstance] = useState(null);
  const [paramsData, setParamsData] = useState({
    adm_id: value?.adm_id,
    ent_name: '',
    userid: value?.userid,
    role_level: value?.role_level,
    assign_status: '-1',
    feedback_status: '-1',
    page: 1,
    page_size: 10
  })

  const json = useMemo(() => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != (-1 || '-1')) {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }, [paramsData.assign_status, paramsData.feedback_status])
  useEffect(() => {
    onQuery(json)
  }, [json])

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
  const onQuery = async (value) => {
    value.page = 1
    getClueListRequest(value)

  }
  const getClueListRequest = async (value) => {
    value.type = 1
    // console.log(value);
    setLoading(true)
    const res = await getClueList(value)
    // console.log(res, "res---");
    setTotal(res.page_info.total_number)
    setData(res.data)
    setParamsData(state => {
      state.page = res.page_info.page
      state.page_size = res.page_info.page_size
      return {
        ...state
      }
    })
    setLoading(false)
  }
  // 单个点击下发
  const handClickXiaFa = (text, type) => {
    setClickType(type)
    const newArr = []
    newArr.push(text)
    setRecordSing(text)
    setNewRecordData(newArr)
    setIsModalOpen(true)
    setMode('1')
  }
  //批量点击下发
  const handClickAllXiaFa = async (type) => {
    setClickType(type)
    // if (selectedRowsData.length) {
    setIsModalOpen(true)
    // setNewRecordData(selectedRowsData)
    setMode('3')
    // }
  }
  // 点击详情
  const handClickDeile = (data) => {
    setRecords(data)
    setVisible(true)
  }
  // 单个点击关闭
  const handClickClose = (text) => {
    // setIsModalOpen(true)
    setMode('2')
    Confirm('2', text)
  }
  //批量点击关闭
  const handClickAllClose = async () => {
    // setIsModalOpen(true)
    setMode('4')
    Confirm('4')
  }
  // 下发接口
  const postWarnRequest = async (jsonP) => {
    const { data } = await postWarnClueAssign(jsonP)
    if (data.code == 2000) {
      message.success(data.result)
      onQuery(json)
    } else {
      message.error('下发失败')
    }
  }
  //关闭接口
  const postWarnClueCloseRequest = async (jsonP) => {
    const { data } = await postWarnClueClose(jsonP)
    if (data.code == 2000) {
      message.success(data.result)
      onQuery(json)
    } else {
      message.error('下发失败')
    }
  }
  const Confirm = (modes, text) => {
    let newARR = []
    let formData
    switch (modes) {
      case '1':
        console.log(jsonValue, "jsonValue--");
        // 暂时这样处理
        setTimeout(() => {
          const dataurl = instance.getDataURL({
            type: 'png'
          })
          if (dataurl) setConfirmLoading(false);
          // dataURLtoFile(dataurl, '线索下发图片')
          console.log(    dataURLtoFile(dataurl, '线索下发图片'),"1111111111111111111");
          jsonValue.map((item) => {
            newARR.push(item.clue_codes)
          })
          formData = new FormData()
          formData.append('userid', value?.userid)
          formData.append('clue_codes', JSON.stringify(newARR))
          formData.append('assign_to', jsonValue[0]?.assign_to)
          postWarnRequest(formData)
          setIsModalOpen(false)
          //清除掉选中的key
          setSelectedRowKeys([])
        }, 1000)
        // onQuery(paramsData)
        break
      case '2':
        // 点击关闭时
        // let newARR = []
        newARR.push(text.clue_code)
        formData = new FormData()
        formData.append('userid', value?.userid)
        formData.append('clue_code', JSON.stringify(newARR))
        postWarnClueCloseRequest(formData)
        setSelectedRowKeys([])
        // onQuery(paramsData)
        break
      case '3':
        jsonValue.map((item) => {
          newARR.push(item.clue_codes)
        })
        formData = new FormData()
        formData.append('userid', value?.userid)
        formData.append('clue_codes', JSON.stringify(newARR))
        formData.append('assign_to', jsonValue[0]?.assign_to)
        postWarnRequest(formData)
        // onQuery(paramsData)
        setIsModalOpen(false)
        //清除掉选中的key
        setSelectedRowKeys([])
        break
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
  const handleOk = async () => {

    // setIsModalOpen(false);//关闭弹窗
    // 点击下发时
    if (mode == '1') {
      if (jsonValue.length > 0 && instance) {
        setConfirmLoading(true);
        Confirm('1')
      }
    } else if (mode == '3') {
      if (jsonValue.length > 0) {
        Confirm('3')
      }
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleShare = (value) => {
    console.log(value, "value---");
    setJsonValue(value)
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
      },
    },
    {
      title: '触发点位',
      dataIndex: 'dev_name',
      key: 'dev_name',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div className='dev_name'>
            {
              record?.content.map(item => {
                // console.log(item, "item---");
                return <div style={{ padding: "5px", height: "50px", borderBottom: "1px solid #f0f0f0" }}>{item.dev_name}</div>
              })
            }
          </div>

        )
      }
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div className='start_time'>
            {record?.content.map(item => {
              // console.log(item, "item---");
              return <div style={{ padding: "5px", height: "50px", borderBottom: "1px solid #f0f0f0" }}>{item.start_time}</div>
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
          <div className='end_time'>
            {
              record?.content.map(item => {
                // console.log(item, "item---");
                return <div style={{ padding: "5px", height: "50px", borderBottom: "1px solid #f0f0f0" }}>{item.end_time}</div>
              })
            }
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
          <div className='total_duration'>
            {
              record?.content.map(item => {
                // console.log(item, "item---");
                return <div style={{ padding: "5px", height: "50px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "center", alignItems: "center" }}>{item.total_duration}</div>
              })
            }
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
        return (
          <SpanNum record={record}></SpanNum>
        )
      }
    },
    {
      title: '最高报警级别',
      dataIndex: 'highest_level',
      key: 'highest_level',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <TagCompent record={record}></TagCompent>
        )
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
          <div className='warn_type_name'>
            {
              record?.content.map(item => {
                // console.log(item, "item---");
                return <div style={{ padding: "5px", height: "50px", borderBottom: "1px solid #f0f0f0" }}>{item.warn_type_name}</div>
              })
            }
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
      width: 180,
      //  fixed: 'right',
      render: (_, record) => {
        // console.log(record,"record--");
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => handClickXiaFa(record, "single")}
              icon={<VerticalAlignBottomOutlined />}
              disabled={
                record.is_closed == 0 && record.assign_status == 0
                  ? false
                  : true
              }
            >
              下发
            </Button>
            {/* <Button
              style={{ marginRight: 10 }}
              type="primary"
              danger
              size="small"
              onClick={() => handClickClose(record)}
              disabled={record.is_closed == 0 ? false : true}
            >
              关闭
            </Button> */}
            <Button
              type="primary"
              size="small"
              onClick={() => handClickDelet(record)}
            // disabled={record.is_closed == 0 ? false : true}
            >
              删除
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => handClickDeile(record)}
            // disabled={record.is_closed == 0 ? false : true}
            >
              详情
            </Button>
            {/* <Button
              type="primary"
              size="small"
              onClick={() => handClickDeile(record)}
              disabled={true}
            >
              反馈详情
            </Button> */}
          </Space>
        )
      }
    }
  ]
  const handleText = () => {
    return (
      <div>
        <icon>
          <CheckCircleOutlined></CheckCircleOutlined>
        </icon>{' '}
        确认
      </div>
    )
  }
  const handleCancelText = () => {
    return (
      <div>
        <icon>
          <CloseCircleOutlined></CloseCircleOutlined>
        </icon>{' '}
        取消
      </div>
    )
  }
  const handleValue = (modes) => {
    switch (modes) {
      case '1':
        return '请选择下发用户'
      case '2':
        return '关闭'
      case '3':
        return '请选择批量下发用户'
      case '4':
        return '批量关闭'
    }
  }
  return (
    <div className='MatterList'>
      <Container>
        <Container.ContainerQuery title="查询条件">
          <div className="MatterList-top">
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
            <div>
              <Button
                style={{
                  marginRight: 10
                }}
                type="primary"
                onClick={() => handClickAllXiaFa("all")}
                disabled={selectedRowKeys.length > 0 ? false : true}
                icon={<VerticalAlignBottomOutlined />}
              >
                批量下发
              </Button>

              <Button
                type="primary"
                danger
                disabled={selectedRowKeys.length > 0 ? false : true}
                onClick={handClickAllClose}
                icon={<CloseCircleOutlined />}
              >
                批量关闭
              </Button>
            </div>
          }
        >
          <Table
            bordered
            tableLayout="fixed"
            loading={loading}
            columns={columns}
            dataSource={data}
            size="small"
            rowSelection={{
              ...rowSelection,
              checkStrictly
            }}
            rowKey={(row) => {
              return JSON.stringify(row)
            }}
            pagination={{
              showTotal:(total) => `总共 ${total} 条线索`,
              current: paramsData.page,
              pageSize: paramsData.page_size,
              position: ['bottomCenter'],
              showSizeChanger: true,
              total: total && total,
              onChange: (page, pageSize) => {
                let newParamsData = {}
                for (let key in paramsData) {
                  if (paramsData[key] != (-1 || '-1')) {
                    newParamsData[key] = paramsData[key]
                  }
                }
                newParamsData.page = page
                newParamsData.page_size = pageSize
                // console.log(newParamsData, "newParamsData======");
                getClueListRequest(newParamsData)
              }
            }}
            scroll={{
              y: '62vh'
            }}
          />
          <Modal
            title={handleValue(mode)}
            destroyOnClose={true}
            open={isModalOpen}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered={true}
            width={clickType == "all" ? 400 : 600}
            okText={handleText()}
            cancelText={handleCancelText()}
          >
            <div>
              {
                clickType == "all" ?
                  <ShareValueSingle
                    ref={shareRef}
                    handleShare={handleShare}
                    newRecordData={newRecordData}
                  ></ShareValueSingle> :
                  <ShareValue
                    // ref={shareRef}
                    handleShare={handleShare}
                    newRecordData={newRecordData}
                    recordSing={recordSing}
                    setInstance={setInstance}
                  ></ShareValue>
              }
            </div>
          </Modal>
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
export default MatterList
