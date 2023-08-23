import React, { useState, useEffect, useMemo } from 'react'
import { Button, Space } from 'antd'
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons'

const useColumns = (callback) => {
  const defaultColumns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '应急管理类型',
      dataIndex: 'alert_name',
      key: 'alert_name'
    },
    {
      title: '企业总线点位名称',
      dataIndex: 'dev_name',
      key: 'dev_name'
    },
    {
      title: '设备编号',
      dataIndex: 'dev_code',
      key: 'dev_code'
    },
    {
      title: '监测设备额定功率（Kw）',
      dataIndex: 'rated_power',
      key: 'rated_power'
    },
    {
      title: '停限指标（%）',
      dataIndex: 'control_index',
      key: 'control_index',

      editable: true
    },
    {
      title: '操作',
      key: 'action',
      width: 160,

      render: (_, record) => (
        <Space>
          {!isEditing(record) ? (
            <Button
              type="primary"
              size="small"
              disabled={editingKey !== ''}
              icon={<EditOutlined />}
              onClick={() => onUpdate(record)}
            >
              修改
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              icon={<CheckSquareOutlined />}
              onClick={() => onSave(record)}
            >
              保存
            </Button>
          )}
        </Space>
      )
    }
  ]

  const defaultColumns1 = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '应急管理类型',
      dataIndex: 'alert_name',
      key: 'alert_name'
    },
    {
      title: '生产线名称',
      dataIndex: 'line_name',
      key: 'line_name'
    },
    {
      title: '工艺名称',
      dataIndex: 'process_name',
      key: 'process_name'
    },
    {
      title: '监测点位名称',
      dataIndex: 'dev_name',
      key: 'dev_name',
      render: (_, record) => {
        return record?.devs.map((item) => (
          <div key={item.dev_id} style={{ margin: '5px 0' }}>
            {item.dev_name}
          </div>
        ))
      }
    },
    {
      title: '设备编号',
      dataIndex: 'dev_code',
      key: 'dev_code',
      render: (_, record) => {
        return record?.devs.map((item) => (
          <div key={item.dev_id} style={{ margin: '5px 0' }}>
            {item.dev_code}
          </div>
        ))
      }
    },
    {
      title: '监测设备额定功率（Kw）',
      dataIndex: 'rated_power',
      key: 'rated_power',
      render: (_, record) => {
        return record?.devs.map((item) => (
          <div key={item.dev_id} style={{ margin: '5px 0' }}>
            {item.rated_power}
          </div>
        ))
      }
    },
    {
      title: '停限指标（%）',
      dataIndex: 'control_index',
      key: 'control_index',
      editable: true
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space>
          {!isEditing(record) ? (
            <Button
              type="primary"
              size="small"
              disabled={editingKey !== ''}
              icon={<EditOutlined />}
              onClick={() => onUpdate(record)}
            >
              修改
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              icon={<CheckSquareOutlined />}
              onClick={() => onSave(record)}
            >
              保存
            </Button>
          )}
        </Space>
      )
    }
  ]

  const defaultColumns2 = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: '应急管理类型',
      dataIndex: 'alert_name',
      key: 'alert_name'
    },
    {
      title: '生产线名称',
      dataIndex: 'line_name',
      key: 'line_name'
    },
    {
      title: '工艺名称',
      dataIndex: 'process_name',
      key: 'process_name'
    },
    {
      title: '监测点位名称',
      dataIndex: 'dev_name',
      key: 'dev_name'
    },
    {
      title: '设备编号',
      dataIndex: 'dev_code',
      key: 'dev_code'
    },
    {
      title: '监测设备额定功率（Kw）',
      dataIndex: 'rated_power',
      key: 'rated_power'
    },
    {
      title: '停限指标（%）',
      dataIndex: 'control_index',
      key: 'control_index',
      editable: true
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space>
          {!isEditing(record) ? (
            <Button
              type="primary"
              size="small"
              disabled={editingKey !== ''}
              icon={<EditOutlined />}
              onClick={() => onUpdate(record)}
            >
              修改
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              icon={<CheckSquareOutlined />}
              onClick={() => onSave(record)}
            >
              保存
            </Button>
          )}
        </Space>
      )
    }
  ]
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record) => record.emergency_id === editingKey

  const mergeColumnsFn = (col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        editing: isEditing(record)
      })
    }
  }

  const onUpdate = (record) => {
    setEditingKey(record.emergency_id)
    callback && callback(record, 'update')
  }
  const onSave = (record) => {
    setEditingKey('')
    callback && callback(record, 'save')
  }

  const columns = defaultColumns.map(mergeColumnsFn)
  const columns1 = defaultColumns1.map(mergeColumnsFn)
  const columns2 = defaultColumns2.map(mergeColumnsFn)

  return [columns, columns1, columns2]

  // const obj = {
  //   editingKey,
  //   setEditingKey,
  //   isEditing,
  //   mergeColumnsFn,
  //   onclick,
  // };
}

export default useColumns
