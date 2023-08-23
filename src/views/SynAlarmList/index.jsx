import React, { useEffect, useState, useRef } from 'react'
import {
  Table,
  TreeSelect,
  Modal,
  Result,
  message,
  Collapse,
  Spin,
  Space,
  Popover
} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { changePanesAction, changeRecordAction } from '&/store/actions'
import { connect } from 'react-redux'
import { getColumns1 } from './index-data'
import sourceImg from '&/assets/images/imgs'
import Pagination from './Pagination'
import { getList1 } from './index-query'
import Filter from '&/components/Filter'
import { filterOptions1 } from './filterOptions'
import ModerOther from './ModerOther'
import { downloadExcel } from '&/commonjs/util'
import { postClueSubmit, getWarnDeviceAlarmOuter } from '&/api/electricity'
import ShareValue from './ShareValue'
import Container from '@/appComponents/Container'
import './index.scss'

const mapStateToProps = (state) => {
  return {
    getFiveViewReducer: state.getFiveViewReducer,
    getPanesReducer: state.getPanesReducer,
    getRecordReducer: state.getRecordReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePanesAction: (...args) => dispatch(changePanesAction(...args)),
    changeRecordAction: (...args) => dispatch(changeRecordAction(...args))
  }
}
const { confirm } = Modal
const { Panel } = Collapse
const EnterpriseElectricityMonitorList = () => {
  const [checkStrictly, setCheckStrictly] = useState(false)
  const [key, setkey] = useState() //选中折叠面板的key
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRowes, setSelectedRowes] = useState([])
  const [mode, setMode] = useState()
  const [loading, setLoading] = useState(false)
  const [list1, setList1] = useState([]) //列表数据
  const [downLoading, setDownLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 20,
    total_number: 0,
  })
  const [visible, setVisible] = useState(false) //弹窗的打开与关闭
  const [list1Loading, setList1Loading] = useState(false)
  const [getList, setGetList] = useState([])
  const [numData, setNumData] = useState({}) //最下方统计数据
  const [downData, setDownData] = useState([]) //下载excle所需要的数据
  const filterRef = useRef()
  const [records, setRecords] = useState()
  const [paramJson, setParamJson] = useState({}) //调表格接口所需要的参数
  const value = JSON.parse(localStorage.getItem('user'))
  const [tableData, setTableData] = useState() //表格数据
  const [tableLoading, setTableLoading] = useState(false) //表格加载状态
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hareValue, setHareValue] = useState()
  const goDetail = (record, num) => {
    setRecords(record)
    setVisible(true)
    setMode(num)
  }

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys)
    // console.log(selectedRows,"selectedRows--");
    setGetList(selectedRows)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  // 生成线索
  const AddClick = async () => {
    if (getList.length <= 0) {
      message.info("请先选择触发点位")
    } else {
      if (getList.filter(item => item.children).length > 1) {
        message.info("每次只能生成一条线索")
        setSelectedRowKeys([])
        setGetList([])
      } else {
        confirm({
          title: '是否确定生成线索?',
          centered: true,
          content: (
            <Result
              // icon={Image(modes)}
              status="success"
            />
          ),
          onOk() {
            setLoading(true)
            const arr = getList.filter((item) => {
              return !item.children
            })
            const warnArr = arr.map((item) => {
              return {
                warn_code: item.warn_code,
                ent_name: item.ent_name
              }
            })
            // console.log(warnArr, 'warnArr--')
            let formData = new FormData()
            formData.append('userid', value?.userid)
            formData.append('role_level', value?.role_level)
            formData.append('adm_id', value?.adm_id)
            formData.append('warn_info', JSON.stringify(warnArr))
            postClueSubmit(formData)
              .then((res) => {
                message.info(res.data.result)
              })
              .catch((r) => {
                message.info(r.data.result)
              })
            setTimeout(() => {
              setSelectedRowKeys([])
              setGetList([])
              setLoading(false)
              setVisible(false)

            }, 1000)
          },
          onCancel() {
            console.log('Cancel')
          }
        })
      }

    }
  }
  // 直接下发
  const DownClick = async () => {
    if (getList.length <= 0) {
      message.info("请先选择触发点位")
    } else {
      if (getList.filter(item => item.children).length > 1) {
        message.info("每次只能下发一条线索")
        setSelectedRowKeys([])
        setGetList([])
      } else {
        setIsModalOpen(true)
      }

    }

  }
  const handleShare = (values) => {
    setHareValue(values)

  }
  const hasSelected = selectedRowKeys.length > 0
  const columns1 = getColumns1(goDetail, AddClick, loading, DownClick)
  const downColumns = [
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      align: 'center'
    },
    {
      title: '触发点位',
      dataIndex: 'dev_name'
    },
    {
      title: '点位类型',
      dataIndex: 'dev_type_name'
    },
    {
      title: '报警类型',
      dataIndex: 'warn_type_name'
    },
    {
      title: '报警级别',
      dataIndex: 'warn_level_value'
    },
    {
      title: '报警时间',
      dataIndex: 'warn_time'
    },
    {
      title: '持续时长',
      dataIndex: 'duration'
    },
    {
      title: '所属区',
      dataIndex: 'county_name'
    },
    {
      title: '所属街乡',
      dataIndex: 'town_name'
    },
    {
      title: '行业类型',
      dataIndex: 'industry_type_name'
    },
    {
      title: '报警状态',
      dataIndex: 'release_status_value'
    }
    // {
    //   title: '处理状态',
    //   dataIndex: 'process_status_value',
    //   width: 100,
    //   align: 'center',
    //   render: renderFun,
    // },
  ]
  const handText = (data) => {
    return (
      <div className="EnterpriseElectricityMonitorList-check">
        {/* <Checkbox onChange={(e) => onChangeCheck(data, e)}></Checkbox> */}
        <div>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {data.ent_name}{' '}
            <span
              style={{
                backgroundColor: '#ccf6e4',
                display: 'inline-block',
                borderRadius: '10px',
                color: '#00864e',
                paddingLeft: '10px',
                paddingRight: '10px',
                fontWeight: 'bold'
              }}
            >
              {data.warn_count}
            </span>
          </p>
          <p style={{ color: 'gray' }}>
            {data.county_name} {data.town_name} {data.industry_type_name}
          </p>
        </div>
      </div>
    )
  }

  const renderContainerTitle = () => {
    const content = (
      <div style={{ marginBottom: 5, padding: 5 }}>
        <p>
          1.
          额定电度计算：每个设备的单点电度值，过滤0值（0.2以下的），然后求平均值以上数据的众数，视为设备额定电度，作为负荷判断和报警的基础数据。暂定滑动60天的数据
        </p>
        <p>
          2.日常产治污不同步计算规则：针对生产中的企业（暂定产污设备电度数据大于等于0.2），产污设备单点电度值大于等于额定电度*0.2，同时治污设备单点电度值小于额定电度*0.1
        </p>
      </div>
    )
    return (
      <Space>
        查询结果
        <Popover
          content={content}
          title="产治污不同步的规则说明："
          placement="rightTop"
        >
          <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
        </Popover>
      </Space>
    )
  }

  const handleClick = async (data) => {
    setkey(data)
    if (data[0]) {
      setTableData([])
      setTableLoading(true)
      const json = { ...paramJson }
      json.ent_id = list1[Number(data[0])]?.ent_id
      delete json.page
      delete json.page_size
      let newJson = { ...json }
      const res = await getWarnDeviceAlarmOuter(newJson)
      const arr = res.data[0]?.alarm_data.map((item) => {
        return {
          dev_id: item.dev_id,
          dev_name: item.dev_name,
          highest_level: item.highest_level,
          total_duration: item.total_duration,
          warn_count: item.warn_count,
          action: '操作',
          children: item.warn_data
        }
      })
      setTableData(arr)
      setTableLoading(false)
    }
  }
  const handleOk = () => {
    if (hareValue && getList.length > 0) {
      // console.log(hareValue, "hareValue--");
      setLoading(true)
      const arr = getList.filter((item) => {
        return !item.children
      })
      const warnArr = arr.map((item) => {
        return {
          warn_code: item.warn_code,
          ent_name: item.ent_name
        }
      })
      let formData = new FormData()
      formData.append('userid', value?.userid)
      formData.append('role_level', value?.role_level)
      formData.append('adm_id', value?.adm_id)
      formData.append('warn_info', JSON.stringify(warnArr))
      formData.append('assign_to', hareValue)
      postClueSubmit(formData)
        .then((res) => {
          console.log(res, "res--");
          message.info(res.data.result)
        })
        .catch((r) => {
          message.info(r.data.result)
        })
      setTimeout(() => {
        setSelectedRowKeys([])
        setGetList([])
        setLoading(false)
        setIsModalOpen(false)
      }, 1000)
    }
  }
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          ref={filterRef}
          loading={list1Loading}
          showDownloadButton={true}
          isPage={true} //对分页组件很重要
          downloadConfig={{
            name: '报警列表',
            data: downData,
            columns: downColumns
          }}
          options={filterOptions1}
          hasMarginBottom={false}
          filterItem={
            <div className="Filter-item">
              <span>区域选择</span>
              <TreeSelect
                style={{
                  width: '100%'
                }}
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: 'auto'
                }}
                onChange={(v) => {
                  const p = {
                    [v < 1000 ? 'county_id' : 'town_id']: v
                  }
                  if (v < 1000) {
                    p.town_id = false
                  } else {
                    p.county_id = false
                  }
                  filterRef.current.setParams(p)
                }}
                placeholder="请选择区域"
                treeData={filterOptions1.__dict.area}
              />
            </div>
          }
          hasBorder={false}
          search={getList1(
            setList1,
            setList1Loading,
            setPageInfo,
            setNumData,
            pageInfo,
            setDownData,
            setParamJson,
            setkey
          )}
        ></Filter>
      </Container.ContainerQuery>
      <Container.ContainerContent
        title={renderContainerTitle()}
        extra={
          <div
            style={{
              width: '200px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
          </div>
        }
      >
        <div
          className="EnterpriseElectricityMonitorList-loading"
          style={
            list1Loading
              ? { overflowY: 'scroll', height: '90%' }
              : { overflowY: 'scroll', maxHeight: '90%' }
          }
        >
          <Spin spinning={list1Loading}>
            <Collapse
              activeKey={key}
              // collapsible='header'
              expandIconPosition={'end'}
              onChange={handleClick}
              accordion
            >
              {list1.length > 0 &&
                list1.map((item, index) => {
                  return (
                    <Panel header={handText(item)} key={index}>
                      <Table
                        // showHeader={false}
                        bordered
                        size="small"
                        loading={tableLoading}
                        dataSource={tableData && tableData}
                        columns={columns1}
                        rowSelection={{
                          // type:"radio",
                          type: 'checkbox',
                          hideSelectAll: true,
                          ...rowSelection,
                          checkStrictly
                        }}
                        pagination={false}
                        scroll={{
                          x: 'max-content',
                          y: '70vh'
                        }}
                        onRow={(record) => {
                          return {
                            onClick: () => { }
                          }
                        }}
                        rowKey={(row) => {
                          return JSON.stringify(row)
                        }}
                      />
                    </Panel>
                  )
                })}
            </Collapse>
          </Spin>
        </div>

        {list1.length > 0 ? (
          <>
            <Pagination
              pageInfo={pageInfo}
              pageChange={(page) => {
                filterRef.current.toSearch({ page })
              }}
              pageSizeChange={(page_size) => {
                filterRef.current.toSearch({ page: 1, page_size: page_size })
              }}
            />
            <div
              style={
                list1.length > 0 ? { marginTop: '-50px' } : { marginTop: '0px' }
              }
            >
              <p style={{ fontSize: '18px', color: 'gray' }}>
                当前页面总计
                <span style={{ fontWeight: 'bold' }}>
                  {' '}
                  {numData?.page_ent_count}{' '}
                </span>
                家企业，
                <span style={{ fontWeight: 'bold' }}>
                  {' '}
                  {numData?.page_warn_count}{' '}
                </span>
                条报警
              </p>
              <p style={{ fontSize: '18px', color: 'gray' }}>
                当前查询条件总计
                <span style={{ fontWeight: 'bold' }}>
                  {' '}
                  {numData?.total_ent_count}{' '}
                </span>
                家企业，
                <span style={{ fontWeight: 'bold' }}>
                  {' '}
                  {numData?.total_warn_count}{' '}
                </span>
                条报警
              </p>
            </div>
          </>
        ) : null}
      </Container.ContainerContent>
      <ModerOther
        visible={visible}
        setVisible={setVisible}
        records={records}
      />
      <Modal
        title="线索下发"
        destroyOnClose={true}
        open={isModalOpen}
        centered={true}
        width={400}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <ShareValue
          handleShare={handleShare}
        // newRecordData={newRecordData}
        ></ShareValue>
      </Modal>
    </Container>
  )
}

const EnterpriseElectricityMonitorListConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    forwardRef: true
  }
)(EnterpriseElectricityMonitorList)
export default EnterpriseElectricityMonitorListConnect
