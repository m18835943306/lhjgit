import React from 'react'
import { Radio, Select, Button, Tooltip, Tag } from 'antd'

const renderFun = (text, item) => {
  if (text) {
    return <span>{text}</span>
  } else {
    return <span>{item.children[0].warn_type_name}</span>
  }
}

export const getColumns1 = (goDetail,AddClick,loading,DownClick) => {
  return [
    {
      title: '触发点位',
      dataIndex: 'warn_type_name',
      align: 'center',
      // ellipsis: true,
      width: 100,
      sorter: (a, b) =>
        new Date(a.warn_time).getTime() - new Date(b.warn_time).getTime(),
      render: (text, record, index) => {
        if (text) {
          return <div>{record?.warn_time}</div>
        } else {
          return (
            <div
              style={{
                // width: "200px",
                whiteSpace: 'nowrap',
                // textAlign: "right"
                display:'flex',
                justifyContent:'center'
              }}
            >
              <div style={{ fontWeight: 'bolder', display: 'flex' }}>
                {record?.children[0]?.dev_name}
                <div style={{ color: 'gray' }}>
                  （{record?.children[0]?.dev_type_name}）
                </div>
                <span
                  style={{
                    backgroundColor: '#ccf6e4',
                    display: 'inline-block',
                    borderRadius: '10px',
                    color: '#00864e',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    fontWeight: 'bold',
                    opacity: 0.5
                  }}
                >
                  {record?.warn_count}
                </span>
              </div>
            </div>
          )
        }
      }
    },
    {
      width: 80,
      title: '报警类型',
      dataIndex: 'warn_type_name',
      align: 'center',
      render: renderFun
    },
    {
      title: '最高报警级别',
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
    // {
    //   title: '报警时间',
    //   dataIndex: 'warn_time',
    //   width: 100,
    //   align: 'center',
    //   render: renderFun,
    // },
    {
      title: '持续时长',
      width: 80,
      dataIndex: 'duration',
      align: 'center',
      render: (text, record) => {
        if (text) {
          return <span>{text}</span>
        } else {
          return <span>{record.total_duration}</span>
        }
      }
    },
    // {
    //   title: '报警状态',
    //   dataIndex: 'release_status_value',
    //   width: 100,
    //   align: 'center',
    //   render: renderFun
    // }
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      width: 80,
      align: 'center',
      render: (_, record) => {
        if (!_) {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Button
                // role={'button'}
                // tabIndex={0}
                type="primary"
                size="small"
                onClick={() => {
                  goDetail(record, '2')
                }}
              >
                详情
              </Button>

              <Button
                type="primary"
                size="small"
                onClick={() => {
                  let getTimestamps = new Date().getTime()
                  // console.log(record, 'record.dev_id--')
                  window.open(
                    `${window.location.origin}/#/devicepage?ent_name=${record.ent_name}&dev_id=${record.dev_id}&ent_id=${record.ent_id}&timestamps=${getTimestamps}`
                  )
                }}
              >
                设备数据
              </Button>
            </div>
          )
        } else {
          return (
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Button
                // role={'button'}
                // tabIndex={0}
                type="primary"
                size="small"
                onClick={AddClick}
                // disabled={!hasSelected}
                loading={loading}
                disabled={true}
                
              >
                生成线索
              </Button>

              <Button
                type="primary"
                size="small"
                disabled={true}
                onClick={DownClick}
              >
                下发
              </Button>
            </div>
          )
        }
      }
    }
  ]
}
