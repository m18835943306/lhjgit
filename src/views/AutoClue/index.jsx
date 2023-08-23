import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changePanesAction, changeRecordAction } from '&/store/actions'
import { Table, Button } from 'antd'

import { getColumns1 } from './index-data'
import { useNavigate } from 'react-router-dom'
import Filter from './Filter'
import { downloadExcel } from '&/commonjs/util'
import { getFilterClueAutoMacro } from '&/api'
import { useTableData } from '&/hooks'
import dayjs from 'dayjs'
import TimeView from './TimeView'
import { Modal } from '&/appComponents/Antd'
import AuditInfo from './AuditInfo'
import Container from '@/appComponents/Container'
import { DownloadOutlined } from '@ant-design/icons'
import './index.scss'
const format = 'YYYY-MM-DD'
const AutoClue = () => {
  const value = JSON.parse(localStorage.getItem('user')) || {}
  const navtion = useNavigate()
  const [paramsData, setParamsData] = useState({
    county_name: '',
    industry_type: '',
    control_type: '',
    project_id: value?.project_id
  })
  const viewTimeParams = useRef({
    time_type: '1',
    clue_date: dayjs().add(-1, 'd').format(format)
  })
  const [company, setCompany] = useState(null)
  const [increaceValue, setIncreaceValue] = useState(null)
  const [downLoading, setDownLoading] = useState(false)
  const modalRef = useRef(null)
  const modalChildRef = useRef(null)

  const [tableData, , loading, onQuery] = useTableData(getFilterClueAutoMacro, {
    params: { ...paramsData, ...viewTimeParams.current },
    disabledPage: true
  })

  const onClick = (_record) => {
    setCompany(_record.company)
    setIncreaceValue(_record.increace_value)
    modalRef.current.showModelRef()
  }
  const onModalClick = () => {
    modalChildRef.current?.postRequest()
  }

  const panse = useSelector((state) => state.getPanesReducer)
  const dispatch = useDispatch()

  const onCellClick = (_record) => {
    _record.date = viewTimeParams.current.clue_date
    const data = { ...panse }
    data.activeKey = 'DayElectroList'
    dispatch(changePanesAction(data))
    dispatch(changeRecordAction(_record))
    navtion('/DayElectroList')
  }
  const columns1 = getColumns1(onClick, onCellClick)

  const RenderTitle = () => {
    return (
      <div style={{ display: 'flex' }}>
        查询结果
        <div
          style={{
            marginLeft: '20px'
          }}
        >
          <div
            style={{
              float: 'right',
              marginBottom: '5px'
            }}
          >
            <span
              style={{
                color: 'red',
                marginRight: '10px'
              }}
            >
              * 用电指数≥1，用电增幅TOP50企业推荐
            </span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          handleQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
        <TimeView params={viewTimeParams} />
      </Container.ContainerQuery>
      <Container.ContainerContent
        title={<RenderTitle />}
        extra={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            loading={downLoading}
            disabled={!tableData.length}
            onClick={async () => {
              setDownLoading(true)
              await downloadExcel(tableData, columns1, '自动线索推荐列表')
              setDownLoading(false)
            }}
          >
            导出
          </Button>
        }
      >
        <Table
          size="small"
          bordered
          loading={loading}
          dataSource={tableData}
          columns={columns1}
          pagination={false}
          scroll={{
            y: '57vh'
          }}
          rowKey={(row) => JSON.stringify(row)}
        />
      </Container.ContainerContent>

      <Modal ref={modalRef} onClick={onModalClick} footer={false}>
        <AuditInfo
          clue_date={viewTimeParams.current.clue_date}
          company={company}
          increace_value={increaceValue}
          modalRef={modalRef}
        />
      </Modal>
    </Container>
  )
}

export default AutoClue
