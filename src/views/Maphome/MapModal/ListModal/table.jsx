import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Table } from 'antd'
import { useTableData } from '&/hooks'
import {
  getEnterpriseDevice,
  getEnterpriseData,
  getDeviceWarnList
} from '&/api/electricity'
import dayjs from 'dayjs'
import { devColumns, entColumns, alermColums } from './columns'
import DevFilter from './Filter'
import Tip from './Tip'
import AlertFileter from './AlertFileter'

const ModalTable = ({ type }) => {
  const project_id = JSON.parse(localStorage.getItem('user')).project_id
  const [paramsData, setParamsData] = useState({
    project_id,
    county_id: -1,
    industry_type_id: '-1',
    ent_name: ''
    // if_online: '1',
  })
  const [alertParamsData, setAlertParamsData] = useState({
    project_id,
    ent_name: '',
    county_id: '',
    town_id: '',
    dev_type: '',
    industry_type_id: '',
    warn_type: '',
    warn_level: '',
    process_status: '',
    release_status: '',
    start_time: dayjs().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
    end_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
  })
  const getTypeTableParams = () => {
    let params = {
      project_id
    }
    if (type === 'equipment') {
      for (let key in paramsData) {
        if (paramsData[key] != -1) {
          params[key] = paramsData[key]
        }
      }
    }
    if (type === 'police') {
      for (let key in alertParamsData) {
        if (alertParamsData[key]) {
          params[key] = alertParamsData[key]
        }
      }
    }
    return params
  }
  const getTypeTableRequest = useMemo(() => {
    return type === 'equipment'
      ? getEnterpriseDevice
      : type === 'police'
      ? getDeviceWarnList
      : type === 'enterprise'
      ? getEnterpriseData
      : []
  }, [type])

  const getTypeTableColumns = useMemo(() => {
    return type === 'equipment'
      ? devColumns
      : type === 'police'
      ? alermColums
      : type === 'enterprise'
      ? entColumns
      : []
  }, [type])
  const [tableData, pagination, loading, onQuery, , originData] = useTableData(
    getTypeTableRequest,
    {
      params: getTypeTableParams()
    }
  )
  return (
    <div className="ModalTable">
      {(type === 'equipment' || type === 'enterprise') && (
        <DevFilter
          type={type}
          onQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
      )}
      {type === 'police' && (
        <AlertFileter
          onQuery={onQuery}
          paramsData={alertParamsData}
          setParamsData={setAlertParamsData}
          tableData={tableData}
          columns={alermColums}
        />
      )}
      {type === 'equipment' && (
        <Tip
          data={originData.other_info}
          tableData={tableData}
          columns={entColumns}
        />
      )}

      <Table
        loading={loading}
        columns={getTypeTableColumns}
        dataSource={tableData}
        size="small"
        pagination={pagination}
        scroll={{ y: '55vh' }}
      />
    </div>
  )
}

export default ModalTable
