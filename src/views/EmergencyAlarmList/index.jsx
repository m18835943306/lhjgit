import React, { useEffect, useState, useRef } from 'react'
import { Table, TreeSelect,Button} from 'antd'
import { changePanesAction, changeRecordAction } from '&/store/actions'
import { connect } from 'react-redux'

import { getColumns1 } from './index-data'
import { getList1 } from './index-query'
import Filter from '&/components/Filter'
import { filterOptions1 } from './filterOptions'
import Modal from './Modal'
import Container from '@/appComponents/Container'
import { DownloadOutlined } from '@ant-design/icons'
import { downloadExcel } from '&/commonjs/util'
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

const EnterpriseElectricityMonitorList = () => {
  const goDetail = (record) => {
    // console.log(record,"recordrecordrecordrecordrecord");
    setRecords(record)
    setVisible(true)
    // record.recordName = 'EnterpriseElectricityMonitorDetail';
    // const recordList = getRecordReducer.filter(
    //   (o) => o.recordName !== 'EnterpriseElectricityMonitorDetail'
    // );
    // record.__source = '列表';
    // changeRecordAction([...recordList, record]);
    // let data = { ...getPanesReducer };
    // data.activeKey = 'EnterpriseElectricityMonitorDetail';
    // changePanesAction(data);
  }
  const columns1 = getColumns1(goDetail)
  const [list1, setList1] = useState([])
  const [downLoading, setDownLoading] = useState(false)
  const [tableHeight, setTableHeight] = useState(0)
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 20,
    total: 0
  })
  const [visible, setVisible] = useState(false)
  const [list1Loading, setList1Loading] = useState(false)
  // const [height, setHeight] = useState(null)
  const filterRef = useRef()
  const contentRef = useRef()
  const [records, setRecords] = useState()

  // useEffect(() => {
  //   setTableHeight(contentRef.current.offsetHeight - 35 - 84 - 56 - 20)
  // }, [])
  const onClick = (value) => {
    // console.log(filterRef.current.filterParams,"filterRef.current.filterParams");
    if (value) {
      getList1(
        setList1,
        setList1Loading,
        setPageInfo
      )(filterRef.current.filterParams)
    }
  }
  const download = async () => {
    setDownLoading(true)

    downloadExcel(list1, columns1, '报警列表')
    setDownLoading(false)
  }
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          ref={filterRef}
          loading={list1Loading}
          showDownloadButton={true}
          showAddButton={false}
          // downloadConfig={{
          //   name: '报警列表',
          //   data: list1,
          //   columns: columns1
          // }}
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
          search={getList1(setList1, setList1Loading, setPageInfo)}
        ></Filter>
      </Container.ContainerQuery>
      <Container.ContainerContent
        title="查询结果"
          extra={
          <div>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              loading={downLoading}
              disabled={!list1.length}
              onClick={download}
            >
              导出
            </Button>
          </div>

        }
      >
           <Table
        size="small"
        loading={list1Loading}
        dataSource={list1}
        columns={columns1}
        pagination={{
          pageSize: 50,
          position: ['bottomCenter']
        }}
        scroll={{
          x: 'max-content',
          y: "62vh"
        }}
        onRow={(record) => {
          return {
            onClick: () => {}
          }
        }}
        rowKey={(row) => {
          return JSON.stringify(row)
        }}
      />
      <Modal
        visible={visible}
        setVisible={setVisible}
        records={records}
        click={onClick}
      />
      </Container.ContainerContent>
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
