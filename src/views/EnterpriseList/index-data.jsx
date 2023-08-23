import React, { useState } from 'react'
import { Button, Space } from 'antd'
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons'
const renderFun = (text, item) => {
  return <span>{text}</span>
}

const getColumns1 = (goDetail, onSaveData) => {
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record) => record.ent_id === editingKey
  const onUpdate = (record) => {
    setEditingKey(record.ent_id)
    onSaveData && onSaveData(record, 'update')
  }
  const onSave = (record) => {
    setEditingKey('')
    onSaveData && onSaveData(record, 'save')
  }
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

  const columns = [
    {
      title: '序号',
      width: 50,
      align: 'center',
      render: (text, item, index) => {
        return index + 1
      }
    },
    {
      title: '企业名称',
      width: 250,
      dataIndex: 'ent_name',
      align: 'center',
      render: renderFun
    },
    {
      width: 150,
      title: '区',
      dataIndex: 'county_name',
      align: 'center',
      render: renderFun
    },
    {
      title: '街乡镇',
      width: 150,
      dataIndex: 'town_name',
      align: 'center',
      render: renderFun
    },
    {
      width: 150,
      title: '所属工业园区',
      dataIndex: 'of_park',
      align: 'center',
      render: renderFun
    },
    {
      width: 150,
      title: '是否重点排污单位',
      dataIndex: 'if_key_discharge_unit',
      align: 'center',
      render: renderFun
    },
    {
      title: '是否纳入环境统计',
      width: 150,
      dataIndex: 'if_in_environment',
      align: 'center',
      render: renderFun
    },
    {
      title: '是否有在线监测',
      width: 150,
      dataIndex: 'if_online_monitor_avail',
      align: 'center',
      render: renderFun
    },
    {
      title: '重点行业类型',
      dataIndex: 'key_industry_type',
      width: 150,
      align: 'center',
      render: renderFun
    },
    {
      title: '其他行业类型',
      dataIndex: 'other_industry_type',
      width: 100,
      align: 'center',
      render: renderFun
    },
    {
      title: '管控类型',
      dataIndex: 'control_type',
      width: 100,
      align: 'center',
      render: renderFun
    },
    {
      title: '报告',
      dataIndex: '',
      width: 100,
      align: 'center'
      // render: renderFun,
    },
    // {
    //   title: '备注',
    //   dataIndex: 'remark',
    //   width: 100,
    //   // fixed: 'right',
    //   align: 'center',
    //   editable: true,
    // },
    // {
    //   title: '编辑',
    //   dataIndex: '编辑',
    //   width: 100,
    //   fixed: 'right',
    //   align: 'center',
    //   render: (_, record) => (

    //   ),
    // },
    {
      title: '操作',
      key: 'action',
      // fixed: 'right',
      width: 90,
      align: 'center',
      render: (_, record) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignContent: 'center'
          }}
        >
          {/* <Space>
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
          </Space> */}
          <Button
            type="primary"
            size="small"
            onClick={() => {
              goDetail(record)
            }}
          >
            详情
          </Button>
          {/* <Button
            type="primary"
            size="small"
            onClick={() => {
              // goDetail(record);
            }}
          >
            报告下载
          </Button> */}
        </div>
      )
    }
  ]
  const columns2222 = columns.map(mergeColumnsFn)
  return columns2222
}
export default getColumns1
