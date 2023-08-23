import React from 'react'

const renderFun = (text, item) => {
  return <span>{text}</span>
}

export const getColumns1 = (onClick, onCellClick) => {
  return [
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
      // width: 310,
      dataIndex: 'company',
      align: 'center',
      ellipsis: true,
      render: (text, record, index) => {
        return <a>{text}</a>
      },
      onCell: (record) => ({
        onClick: () => onCellClick(record)
      })
    },
    {
      width: 200,
      title: '所属区',
      dataIndex: 'district',
      align: 'center',
      render: renderFun
    },
    {
      width: 200,
      title: '行业类型',
      dataIndex: 'industry',
      align: 'center'
    },
    {
      width: 200,
      title: '管控类型',
      dataIndex: 'control_type',
      align: 'center'
    },
    {
      width: 200,
      title: '本周平均用电',
      dataIndex: 'A',
      align: 'center'
    },
    {
      width: 200,
      title: '上周平均用电',
      dataIndex: 'B',
      align: 'center'
    },
    {
      width: 200,
      title: '用电增幅',
      dataIndex: 'increace_value',
      align: 'center',
      render: (_, record) => {
        return Number(_ * 100).toFixed() + '%'
      }
    },
    {
      title: '用电增幅排名',
      width: 200,
      dataIndex: 'rank',
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => {
        if (record._isMake) {
          return (
            <span
              style={{
                color: '#666'
              }}
            >
              已审核
            </span>
          )
        } else {
          return (
            <a
              role={'button'}
              tabIndex={0}
              onClick={() => {
                onClick(record)
              }}
            >
              审核
            </a>
          )
        }
      }
    }
  ]
}
