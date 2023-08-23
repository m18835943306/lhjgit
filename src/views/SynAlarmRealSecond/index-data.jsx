import React from 'react'
import { Radio, Select, Button, Tooltip, Tag } from 'antd'

const renderFun = (text, item) => {
  return <span>{text}</span>
}

export const getColumns1 = (goDetail, DownData) => {
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
      width: 120,
      dataIndex: 'ent_name',
      align: 'center',
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <Tooltip placement="top" title={text}>
            <div
              style={{
                // width: 180,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center'
              }}
            >
              <a 
               onClick={() => {
                let getTimestamps = new Date().getTime()
                // console.log(record, 'record.dev_id--')
                window.open(
                  `${window.location.origin}/#/devicepage?ent_name=${record.ent_name}&dev_id=${record.dev_id}&ent_id=${record.ent_id}&timestamps=${getTimestamps}`
                )
              }}
              >{text}</a>
            </div>
          </Tooltip>
        )
      }
    },
    {
      width: 80,
      title: '触发点位',
      dataIndex: 'dev_name',
      align: 'center',
      render: renderFun
    },
    // {
    //   title: '点位类型',
    //   width: 80,
    //   dataIndex: 'other_data',
    //   align: 'center',
    //   render: renderFun,
    // },
    {
      width: 80,
      title: '报警类型',
      dataIndex: 'warn_type_name',
      align: 'center',
      render: renderFun
    },
    {
      width: 150,
      title: '问题描述',
      dataIndex: 'other_data',
      align: 'center',
      render: (text, record) => {
        return (
          <>
            {text?.map((item, index) => {
              if (item) {
                return <p>{item[1]}启用</p>
              }
            })}
            <span>
              <p>{record.dev_name}未同步开启</p>
            </span>
          </>
        )
      }
    },
    {
      title: '报警级别',
      dataIndex: 'warn_level_value',
      width: 80,
      align: 'center',
      render: (text, record) => {
        const color =
          text == '一级' ? '#d02d22' : text == '二级' ? '#e28336' : '#f6ca49'
        const colors =
          record.highest_level == '一级'
            ? '#d02d22'
            : text == '二级'
            ? '#e28336'
            : '#f6ca49'
        return text ? (
          <Tag style={{ borderColor: color, backgroundColor: '#fff1f0' }}>
            <span style={{ color: color }}>{text}</span>
          </Tag>
        ) : (
          <Tag style={{ borderColor: colors, backgroundColor: '#fff1f0' }}>
            <span style={{ color: colors }}>{record.highest_level}</span>
          </Tag>
        )
      }
    },
    {
      title: '报警时间',
      dataIndex: 'warn_time',
      width: 80,
      align: 'center',
      render: renderFun
    },
    {
      title: '持续时长',
      width: 80,
      dataIndex: 'duration',
      align: 'center',
      render: renderFun
    },
    {
      title: '所属区',
      width: 80,
      dataIndex: 'county_name',
      align: 'center',
      render: renderFun
    },
    {
      title: '所属街乡',
      dataIndex: 'town_name',
      align: 'center',
      width: 80,
      render: renderFun
    },
    {
      title: '行业类型',
      dataIndex: 'industry_type_name',
      width: 80,
      align: 'center',
      render: renderFun
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              type="primary"
              size="small"
              // disabled={true}
              onClick={() => {
                DownData(record)
              }}
            >
              下发
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                goDetail(record)
              }}
            >
              详情
            </Button>
          </div>
        )
      }
    }
  ]
}
