import React, { useState, useEffect } from 'react'
import { Table, Button, Popover, message, Upload, Tag, Timeline } from 'antd'
import Filter from './Filter'
import ConText from "./ConText"
import debounce from 'lodash/debounce'
import Container from '@/appComponents/Container'
import {
  MailOutlined,
  CloseCircleOutlined,
  VerticalAlignBottomOutlined
} from '@ant-design/icons'
import Modal from './Modal'
import ModerOther from './ModerOther'
import ModerFeed from './ModerFeed'
import TagCompent from '@/appComponents/TagCompent'
import SpanNum from '@/appComponents/SpanNum'
import { getClueList } from '&/api/electricity'
import './index.scss'

const MatterFeedback = () => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [records, setRecords] = useState({})
  // const [listArr, setListArr] = useState([])
  const [mode, setMode] = useState()
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [moderOtherVisible, setModerOtherVisible] = useState(false)
  const [data, setData] = useState([])
  // const [dataArr, setDataArr] = useState([])
  const [feedRecord, setFeedRecord] = useState() //点击已反馈所拿到的数据
  const [feedVisible, setFeedVisible] = useState(false)//反馈弹窗
  const [newRecordData, setNewRecordData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [total, setTotal] = useState()
  const [paramsData, setParamsData] = useState({
    adm_id: value?.adm_id,
    ent_name: '',
    userid: value?.userid,
    role_level: value?.role_level,
    page: 1,
    page_size: 10
  })
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      // const arr = selectedRows.map(item => {
      //     return item.clue_code
      // })
      // setListArr(arr)
      setNewRecordData(selectedRows)
    },
  };
  useEffect(() => {
    onQuery(paramsData)
  }, [])
  const onQuery = async (value) => {
    value.page = 1
    getClueListRequest(value)

  }
  const getClueListRequest = async (value) => {
    value.type = 2
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
  const handClickXiaFa = async (text) => {
    setMode("1")
    setVisible(true)
    let newARR = []
    newARR.push(text)
    setNewRecordData(newARR)
    // setDataArr(newARR)

  }
  //批量点击下发
  const handClickAllXiaFa = async () => {
    setMode("3")
    setVisible(true)

  }

  // 点击反馈打开弹窗
  const handleItemclick = (record) => {
    setMode("5")
    setVisible(true)
    setRecords(record)
  }
  // 点击详情
  const handClickDeile = (data) => {
    setRecords(data)
    setModerOtherVisible(true)
  }
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (text, item, index) => {
        return index + 1;
      },
      align: 'center'
    },
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center',
      width: 100
    },
    {
      width: 250,
      title: '编号',
      dataIndex: 'clue_code',
      key: 'clue_code',
      align: 'center',
      render: (_, record) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <h3>{_}</h3>
            {/* <p>创建时间：{record.created_at}</p>
            <p>{record.ent_name}</p> */}
          </div>
        )
      }
    },
    // {
    //     title: '创建时间',
    //     dataIndex: 'created_at',
    //     key: 'created_at',
    //     align: 'center',
    //     width: 100
    // },
    // {
    //     width: 160,
    //     title: '企业名称',
    //     dataIndex: 'ent_name',
    //     key: 'ent_name',
    //     align: 'center',
    // },
    value?.role_level == 2 ?
    {
      title: '报警状态',
      dataIndex: 'from_warn',
      key: 'from_warn',
      align: 'center',
      width: 150,
      render: (text, record) => {
        return (
          <span>{record.from_warn == "" ? "" : record.from_warn == 1 ? "历史报警" : "实时报警"}</span>
        )
      }
    } : {},
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
      width: 250,
      render: (_, record) => {
        return (
          <>
            <Button style={{ marginRight: 10 }} size='small' type="primary" onClick={() => handClickXiaFa(record)} disabled={record.assign_status == 0 ? false : true} icon={<VerticalAlignBottomOutlined />}>下发</Button>
            <Button style={{ marginRight: 10 }} size='small' danger type="primary" onClick={() => handleItemclick(record)} disabled={record.feedback_status == 0 ? false : true}>反馈</Button>
            <Button
              type="primary"
              danger
              size='small'
              onClick={() => handClickDeile(record)}
            // disabled={record.is_closed == 0 ? false : true}
            >
              详情
            </Button>
          </>
        )
      }
    },
  ]
  return (
    <div className='MatterFeedback'>
      <Container>
        <Container.ContainerQuery title="查询条件">
          <div className="MatterFeedback-top">
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
            <div style={{ marginRight: 10 }}>
              <Button
                type="primary"
                onClick={handClickAllXiaFa}
                disabled={selectedRowKeys.length > 0 ? false : true}
                icon={<VerticalAlignBottomOutlined />}
              >批量下发</Button>
            </div>
          }
        >

          <div className="MatterFeedback-content">
            <Table
              bordered
              loading={loading}
              columns={columns}
              dataSource={data}
              size="middle"
              rowSelection={{
                ...rowSelection,
                checkStrictly,
              }}
              rowKey={(row) => {
                return JSON.stringify(row)
              }}
              pagination={{
                current: paramsData.page,
                pageSize: paramsData.page_size,
                position: ['bottomCenter'],
                showSizeChanger: true,
                total: total && total,
                onChange: (page, pageSize) => {
                  const obj = { ...paramsData }
                  obj.page = page
                  obj.page_size = pageSize
                  getClueListRequest(obj)

                }
              }}
              scroll={{
                y: '62vh'
              }}
            />
          </div>
          <Modal
            visible={visible}
            setVisible={setVisible}
            records={records}
            onReload={onQuery}
            paramsData={paramsData}
            mode={mode}
            // dataArr={dataArr}
            // listArr={listArr}
            newRecordData={newRecordData}
            setSelectedRowKeys={setSelectedRowKeys}

          />
          <ModerOther
            visible={moderOtherVisible}
            setVisible={setModerOtherVisible}
            records={records}
          />
          <ModerFeed
            visible={feedVisible}
            setVisible={setFeedVisible}
            records={feedRecord}
          ></ModerFeed>
        </Container.ContainerContent>
      </Container >
    </div>


  )
}
export default MatterFeedback;