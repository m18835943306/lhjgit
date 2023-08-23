import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Radio, Table, InputNumber, Affix } from 'antd'
import { getEnterpriseEmergency, postControlIndex } from '&/api/electricity'
import useColumns from './useColumns'
import { Card } from '&/appComponents/Antd'

import './index.scss'

const EditableCell = ({
  editing,
  children,
  dataIndex,
  record,
  ...restProps
}) => {
  const [value, setValue] = useState('')
  const onTbaleChange = (v, record) => {
    record.control_index = v
    setValue(v)
  }
  return (
    <td {...restProps}>
      {editing ? (
        <InputNumber
          defaultValue={record.control_index}
          onChange={(e) => onTbaleChange(e, record)}
          value={value}
        />
      ) : (
        children
      )}
    </td>
  )
}

const EmerManager = ({ setLoading, contextValue: { ent_id } }) => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [alertLeave, setAlertLeave] = useState(1)
  const [alertData, setAlertData] = useState({
    bus_data: [],
    dev_data: [],
    line_data: []
  })

  const onTableClick = useCallback(
    async (v, type) => {
      if (type === 'save') {
        await SaveControlIndex(v)
      }
    },
    [alertData]
  )
  const [colunms1, colunms2, colunms3] = useColumns(onTableClick)
  const tables = [
    {
      title: '企业总线用电管理',
      colunms: colunms1,
      data: alertData.bus_data,
      key: 1
    },
    {
      title: '企业生产线管理',
      colunms: colunms2,
      data: alertData.line_data,
      key: 2
    },
    {
      title: '企业监测点位管理',
      colunms: colunms3,
      data: alertData.dev_data,
      key: 3
    }
  ]

  useEffect(() => {
    setLoading(true)
    getTableList()
  }, [alertLeave, ent_id])

  const getTableList = async () => {
    const json = {
      alert_level: alertLeave,
      project_id: value.project_id
    }
    if (ent_id) json.ent_id = ent_id
    const data = await getEnterpriseEmergency(json)
    setAlertData(data)
    setLoading(false)
  }

  const SaveControlIndex = async ({ emergency_id, control_index }) => {
    const params = {
      info: [
        {
          emergency_id,
          control_index
        }
      ]
    }
    const data = await postControlIndex(params)
    getTableList()
  }

  return (
    <div className="emermanager">
      <Affix offsetTop={133}>
        <div className="emermanager_type">
          <span className="emermanager_type__label">应急管理类型：</span>
          <Radio.Group
            onChange={(e) => setAlertLeave(e.target.value)}
            value={alertLeave}
          >
            <Radio value={1}>黄色预案</Radio>
            <Radio value={2}>橙色预案</Radio>
            <Radio value={3}>红色预案</Radio>
          </Radio.Group>
        </div>
      </Affix>
      <div className="emermanager_table">
        {tables.map((item) => (
          <Card
            key={item.key}
            style={{ flex: 1, maxHeight: '320px', minHeight: '320px' }}
            bodyStyle={{ height: '312px' }}
            size="small"
            title={item.title}
          >
            <Table
              rowKey="emergency_id"
              components={{
                body: {
                  cell: EditableCell
                }
              }}
              rowClassName={(record, index) =>
                index % 2 === 0 ? 'stripe' : ''
              }
              columns={item.colunms}
              dataSource={item.data}
              size="small"
              pagination={false}
            />
          </Card>
          // <div key={item.key}>
          //   <div className="emermanager_table__title">{item.title}</div>

          // </div>
        ))}
      </div>
    </div>
  )
}

export default EmerManager
