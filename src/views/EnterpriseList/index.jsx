import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Input, message, Drawer } from 'antd'
import { changePanesAction, changeRecordAction } from '&/store/actions'
import { connect, useDispatch } from 'react-redux'
import { DownloadOutlined } from '@ant-design/icons'
import Map from 'ol/Map'
import Tile from 'ol/layer/Tile'
import View from 'ol/View'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import workAction from './workAction'
import { setEnterprise } from '&/api/electricity'
import getColumns1 from './index-data'
import { getList1 } from './index-query'
import columnnew from './index-newdata'
import Filter from '&/components/Filter'
import Pagination from './Pagination'
import { filterOptions1 } from './filterOptions'
import SelectArea from './SelectArea'
import Container from '@/appComponents/Container'
import { downloadExcel } from '&/commonjs/util'
import EnterpriseDetail from '../EnterpriseDetail'
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

const EditableCell = ({
  editing,
  children,
  dataIndex,
  record,
  ...restProps
}) => {
  const [value, setValue] = useState('')
  const onTbaleChange = (v, record) => {
    record.remark = v.target.value
    setValue(v.target.value)
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Input
          defaultValue={record.remark}
          onChange={(e) => onTbaleChange(e, record)}
          value={value}
        />
      ) : (
        children
      )}
    </td>
  )
}

const EnterpriseList = ({
  getPanesReducer,
  getRecordReducer,
  changeRecordAction,
  changePanesAction
}) => {
  const [downloading, setDownloading] = useState(false)
  const valuetext = JSON.parse(localStorage.getItem('user'))
  const [darwerOpen, setdarwerOpen] = useState(false)
  const [record, setrecord] = useState({})

  //打开Drawer
  const goDetail = (record) => {
    record.recordName = 'RefuelTrack'
    const recordList = getRecordReducer.filter(
      (o) => o.recordName !== 'EnterpriseDetail'
    )
    record.__source = '列表'
    changeRecordAction([...recordList, record])
    let data = { ...getPanesReducer }
    data.activeKey = 'EnterpriseDetail'
    changePanesAction(data)
    setdarwerOpen(true)
    setrecord(record)
  }

  const onSaveData = (v, type) => {
    if (type == 'save') {
      SaveControlIndex(v)
    }
  }
  const SaveControlIndex = async (v) => {
    const json = {
      ent_id: v.ent_id,
      update_json: JSON.stringify(v),
      project_id: valuetext.project_id
    }
    const res = await setEnterprise(json)
    if (res) {
      message.success('修改成功！')
      filterRef.current.toSearch()
    }
  }

  const columns1 = getColumns1(goDetail, onSaveData)
  const [list1, setList1] = useState([])
  const [excelData, setExcelData] = useState([])
  const [tableHeight, setTableHeight] = useState(0)
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 20,
    total: 0
  })
  const [list1Loading, setList1Loading] = useState(false)
  const [height, setHeight] = useState(null)
  const [instances, setInstances] = useState({
    map: null,
    workAction: null
  })
  const dispatch = useDispatch()
  const filterRef = useRef()
  const contentRef = useRef()
  const user =
    JSON.parse(sessionStorage.getItem('userv2')) ||
    JSON.parse(sessionStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('userv2')) ||
    JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    setTableHeight(contentRef.current.offsetHeight - 53)
    let map = new Map({
      target: 'EnterpriseList-map',
      layers: [
        new Tile({
          source: new XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
          })
        })
      ],
      view: new View({
        center: transform([116.395645, 40.229986], 'EPSG:4326', 'EPSG:3857'),
        zoom: 9,
        maxZoom: 19
      })
    })
    const t = new workAction(map)
    setInstances((o) => {
      return {
        ...o,
        map: map,
        workAction: t
      }
    })
  }, [])

  const download = async () => {
    setDownloading(true)
    const loadData = await getList1(
      setExcelData,
      setDownloading,
      instances.workAction,
      setPageInfo,
      null,
      user,
      dispatch
    )
    const params = filterRef.current.getParams({})
    const newParams = {}
    for (const key in params) {
      if (key === 'page' || key === 'page_size') continue
      newParams[key] = params[key]
    }
    const data = await loadData(newParams)
    downloadExcel(data, columnnew, '企业列表')
    setDownloading(false)
  }
  return (
    <div className="EnterpriseList-wrap">
      <Container>
        <Container.ContainerQuery title="查询条件">
          <Filter
            ref={filterRef}
            loading={list1Loading}
            options={filterOptions1}
            isPage={true}
            hasMarginBottom={false}
            filterItem={
              <SelectArea
                change={(params) => filterRef.current.setParams(params)}
              ></SelectArea>
            }
            hasBorder={false}
            search={getList1(
              setList1,
              setList1Loading,
              instances.workAction,
              setPageInfo,
              pageInfo,
              user,
              dispatch
            )}
          ></Filter>
        </Container.ContainerQuery>

        <Container.ContainerContent
          title="查询结果"
          extra={
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              loading={downloading}
              disabled={!list1.length}
              onClick={download}
            >
              导出
            </Button>
          }
        >
          <div className="EnterpriseList-content" ref={contentRef}>
            {/* <ExpandLayout
          onLayoutChange={() => {
            setTimeout(() => {
              instances.map.handleResize_()
            })
          }} */}
            {/* leftSlot={ */}
            <>
              {/* <div className="EnterpriseList-downloadExcel">
                <Button
                  style={{
                    float: 'right',
                    marginBottom: '5px'
                  }}
                  icon={<DownloadOutlined />}
                  loading={downloading}
                  onClick={download}
                ></Button>
              </div> */}
              <Table
                bordered
                size="small"
                components={{
                  body: {
                    cell: EditableCell
                  }
                }}
                loading={list1Loading}
                dataSource={list1}
                columns={columns1}
                pagination={false}
                scroll={{
                  // x: 'max-content',
                  y: tableHeight
                }}
                rowKey={(row) => {
                  return JSON.stringify(row)
                }}
              />
              <Pagination
                pageInfo={pageInfo}
                pageChange={(page) => {
                  filterRef.current.toSearch({ page })
                }}
                pageSizeChange={(page_size) => {
                  filterRef.current.toSearch({ page: 1, page_size: page_size })
                }}
              ></Pagination>
            </>
            {/* }·
          // rightSlot={<div id="EnterpriseList-map"></div>}
        ></ExpandLayout> */}
          </div>
        </Container.ContainerContent>
        {darwerOpen && (
          <Drawer
            placement={'bottom'}
            size="small"
            title={<h4>{record.ent_name}</h4>}
            onClose={() => setdarwerOpen(false)}
            open={darwerOpen}
            mask={false}
            height={'112%'}
            getContainer={() => document.querySelector('.LayoutContainer')}
            rootStyle={{
              position: 'relative',
              height: '100%'
            }}
          >
            <EnterpriseDetail />
          </Drawer>
        )}
      </Container>
    </div>
  )
}

const EnterpriseListConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    forwardRef: true
  }
)(EnterpriseList)
export default EnterpriseListConnect
