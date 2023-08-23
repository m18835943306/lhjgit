import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { changePanesAction, changeRecordAction } from '&/store/actions'
import Filter from './Filter'
import { useNavigate } from 'react-router-dom'
import { getFilterClueMacro } from '&/api/electricity'
import { useTableData } from '&/hooks'
import { defaultConfig, end_time } from './config/filter'
import getColumns from './config/table'
import { Modal } from '&/appComponents/Antd'
import AuditInfo from '../AutoClue/AuditInfo'
import Container from '@/appComponents/Container'

import './index.scss'

const EnterpriseElectricityMonitorList = () => {
  const navtion = useNavigate()
  const value = JSON.parse(localStorage.getItem('user'))
  const [tableHeight, setTableHeight] = useState(0)
  // 可选查询参数，用于切换模式及管控类型
  const [p, setP] = useState({ pattern_mode: 1, level: '' })
  const [params, setParams] = useState([
    {
      ...defaultConfig
    }
  ])
  const [company, setCompany] = useState(null)
  const [increaceValue, setIncreaceValue] = useState(null)
  const modalRef = useRef(null)
  const modalChildRef = useRef(null)

  const onClick = (_record) => {
    setCompany(_record.company)
    setIncreaceValue(_record.increase_value1)
    modalRef.current.showModelRef()
  }
  const onModalClick = () => {
    modalChildRef.current?.postRequest()
  }

  const panse = useSelector((state) => state.getPanesReducer)
  const dispatch = useDispatch()
  const onCellClick = (_record) => {
    _record.date = params[0]?.end_time || end_time
    const data = { ...panse }
    data.activeKey = 'DayElectroList'
    dispatch(changePanesAction(data))
    dispatch(changeRecordAction(_record))
    navtion('/DayElectroList')
  }

  const [defaultTableColumns, conditionFilterColumns, handleColumn] =
    getColumns(onCellClick, onClick)
  const [columns, setColumns] = useState(defaultTableColumns)

  const generateParams = useCallback(() => {
    // sickening
    const obj = {
      ...p
    }
    params.forEach((item, index) => {
      for (const [key, value] of Object.entries(item)) {
        if (key === 't_start') {
          obj[`t${index + 1}_start`] = value
        } else if (key === 't_end') {
          obj[`t${index + 1}_end`] = value
        } else {
          obj[`${key}${index + 1}`] = value
        }
      }
    })
    obj.project_id = value?.project_id
    return obj
  }, [params, p])
  const [tableData, , loading, onQuery] = useTableData(getFilterClueMacro, {
    params: generateParams(),
    disabledPage: true
  })
  // useEffect(() => {
  //   if (tableData.length) {
  //     let cols = defaultTableColumns;
  //     if (params.length === 2) {
  //       if (Object.values(generateParams()).every((v) => v)) {
  //         cols = cols.concat(conditionFilterColumns);
  //       }
  //     }
  //     cols = cols.concat(handleColumn);
  //     setColumns(cols);
  //   }
  // }, [tableData]);

  useEffect(() => {
    let cols = defaultTableColumns
    const { level, ...rest } = generateParams()
    if (params.length === 2) {
      if (Object.values(rest).every((v) => v)) {
        cols = cols.concat(conditionFilterColumns)
      }
    }
    cols = cols.concat(handleColumn)
    setColumns(cols)
  }, [params])

  useEffect(() => {
    setTableHeight('75vh')
  }, [])

  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          paramsData={params}
          setParamsData={setParams}
          p={p}
          setP={setP}
          handleQuery={() => onQuery(generateParams())}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent title="查询结果">
        <Table
          size="small"
          bordered
          loading={loading}
          dataSource={tableData}
          columns={columns}
          pagination={false}
          scroll={{
            x: 'max-content',
            y: '64vh'
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
      </Container.ContainerContent>
      <Modal ref={modalRef} onClick={onModalClick} footer={false}>
        <AuditInfo
          clue_date={params[0]?.end_time || end_time}
          company={company}
          increace_value={increaceValue}
          t_start={params[0]?.t_start}
          t_end={params[0]?.t_end}
          type="manual"
          modalRef={modalRef}
        />
      </Modal>
    </Container>
  )
}

export default EnterpriseElectricityMonitorList
