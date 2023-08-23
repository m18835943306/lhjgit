import React from 'react'
import { Tooltip, Image } from 'antd'

const renderFun = (text, item) => {
  return <span>{text}</span>
}
export const getColumns1 = (onClick, onClickDelet) => {
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
      title: '线索日期',
      width: 100,
      dataIndex: 'clue_date',
      align: 'center',
      ellipsis: true,
      render: (text, record, index) => {
        return <a>{text}</a>
      }
    },
    {
      title: '企业名称',
      dataIndex: 'company',
      align: 'center',
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <Tooltip placement="top" title={text}>
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              <a>{text}</a>
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: '社会信用代码',
      width: 200,
      dataIndex: 'social_credit_code',
      align: 'center',
      render: renderFun
    },
    {
      title: '所属区',
      width: 200,
      dataIndex: 'county',
      align: 'center',
      render: renderFun
    },
    {
      title: '所属街乡',
      width: 200,
      dataIndex: 'town',
      align: 'center',
      render: renderFun
    },
    {
      title: '行业类型',
      width: 200,
      dataIndex: 'main_type',
      align: 'center'
    },
    {
      title: '管控类型',
      width: 200,
      dataIndex: 'level',
      align: 'center'
    },
    {
      title: '联系人',
      width: 200,
      dataIndex: 'person',
      align: 'center'
    },
    {
      title: '联系方式',
      width: 100,
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: '问题表述',
      width: 280,
      dataIndex: 'problem',
      align: 'center'
    },
    {
      title: '附图',
      width: 120,
      dataIndex: 'file',
      align: 'center',
      render: (_, record) => {
        return <Image src={_} />
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      align: 'center',
      render: (_, record) => {
        return (
          <div>
            <a
              role={'button'}
              tabIndex={0}
              onClick={() => {
                onClick(record)
              }}
            >
              通过
            </a>
            <a
              role={'button'}
              tabIndex={1}
              onClick={() => {
                onClickDelet(record)
              }}
              style={{ marginLeft: '10px' }}
            >
              删除
            </a>
          </div>
        )
      }
    }
  ]
}
