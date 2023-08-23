import React from 'react'
import { Radio, Select, Button } from 'antd'

const renderFun = (text, item) => {
  return <span>{text}</span>
}

export default (onCell, onClick) => {
  const defaultTableColumns = [
    {
      title: '企业名称',
      width: 150,
      dataIndex: 'company',
      align: 'center',
      sorter: (a, b) => {
        if (a.company && b.company) {
          return a.company.localeCompare(b.company)
        }
        if (a.company) {
          return -1
        }
        if (b.company) {
          return 1
        }
      },
      render: (_, record) => (
        <a
          role={'button'}
          tabIndex={0}
          onClick={() => {
            onCell(record)
          }}
        >
          {record.company}
        </a>
      )
    },
    {
      width: 150,
      title: '所属区',
      dataIndex: 'district',
      align: 'center',
      sorter: (a, b) => {
        if (a.district && b.district) {
          return a.district.localeCompare(b.district)
        }
        if (a.district) {
          return -1
        }
        if (b.district) {
          return 1
        }
      },
      render: renderFun
    },
    {
      title: '所属街乡',
      width: 150,
      dataIndex: 'town',
      align: 'center',
      sorter: (a, b) => {
        if (a.town && b.town) {
          return a.town.localeCompare(b.town)
        }
        if (a.town) {
          return -1
        }
        if (b.town) {
          return 1
        }
      },
      render: renderFun
    },
    {
      title: '行业类型',
      width: 150,
      dataIndex: 'industry',
      align: 'center',
      sorter: (a, b) => {
        if (a.industry && b.industry) {
          return a.industry.localeCompare(b.industry)
        }
        if (a.industry) {
          return -1
        }
        if (b.industry) {
          return 1
        }
      },
      render: renderFun
    },
    {
      title: '管控类型',
      width: 150,
      dataIndex: 'level',
      align: 'center',
      sorter: (a, b) => {
        if (a.level && b.level) {
          return a.level.localeCompare(b.level)
        }
        if (a.level) {
          return -1
        }
        if (b.level) {
          return 1
        }
      },
      render: renderFun
    },
    {
      width: 150,
      title: '线索均值1',
      dataIndex: 'X1',
      align: 'center',
      sorter: (a, b) => {
        if (a.X1 && b.X1) {
          return Number(a.X1) - Number(b.X1)
        }
        if (a.X1) {
          return -1
        }
        if (b.X1) {
          return 1
        }
      },
      render: renderFun
    },
    {
      width: 150,
      title: '增幅比例1(%)',
      dataIndex: 'increase_value1',
      sorter: (a, b) => {
        if (a.increase_value1 && b.increase_value1) {
          return Number(a.increase_value1) - Number(b.increase_value1)
        }
        if (a.increase_value1) {
          return -1
        }
        if (b.increase_value1) {
          return 1
        }
      },
      align: 'center',
      render: (_, record) => {
        return Number(_ * 100).toFixed() + '%'
      }
    }
  ]

  const conditionFilterColumns = [
    {
      width: 150,
      title: '线索均值2',
      dataIndex: 'X2',
      sorter: (a, b) => {
        if (a.X2 && b.X2) {
          return Number(a.X2) - Number(b.X2)
        }
        if (a.X2) {
          return -1
        }
        if (b.X2) {
          return 1
        }
      },
      align: 'center',
      render: renderFun
    },
    {
      width: 150,
      title: '增幅比例2(%)',
      dataIndex: 'increase_value2',
      sorter: (a, b) => {
        if (a.increase_value2 && b.increase_value2) {
          return Number(a.increase_value2) - Number(b.increase_value2)
        }
        if (a.increase_value2) {
          return -1
        }
        if (b.increase_value2) {
          return 1
        }
      },
      align: 'center',
      render: (_, record) => {
        return Number(_ * 100).toFixed() + '%'
      }
    }
  ]

  const handleColumn = [
    {
      title: '操作',
      key: 'action',
      width: 80,
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
  return [defaultTableColumns, conditionFilterColumns, handleColumn]
}
