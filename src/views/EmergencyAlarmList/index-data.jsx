import { Tooltip } from 'antd'

const renderFun = (text, item) => {
  return <span>{text}</span>
}

export const getColumns1 = (goDetail) => {
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
      width: 100,
      dataIndex: 'ent_name',
      align: 'center',
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <Tooltip placement="top" title={text}>
            <div
              style={{
                width: 180,
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
    // {
    //   width: 100,
    //   title: '触发点位',
    //   dataIndex: 'dev_name',
    //   align: 'center',
    //   render: renderFun
    // },
    // {
    //   title: '点位类型',
    //   width: 100,
    //   dataIndex: 'dev_type_name',
    //   align: 'center',
    //   render: renderFun
    // },
    // {
    //   width: 100,
    //   title: '报警类型',
    //   dataIndex: 'warn_type_name',
    //   align: 'center',
    //   render: renderFun
    // },
    // {
    //   title: '报警级别',
    //   dataIndex: 'warn_level_value',
    //   width: 100,
    //   align: 'center',
    //   render: renderFun
    // },
    {
      title: '报警时间',
      dataIndex: 'warn_time',
      width: 100,
      align: 'center',
      render: renderFun
    },
    // {
    //   title: '持续时长',
    //   width: 100,
    //   dataIndex: 'duration',
    //   align: 'center',
    //   render: renderFun
    // },
    {
      title: '所属区',
      width: 100,
      dataIndex: 'county_name',
      align: 'center',
      render: renderFun
    },
    {
      title: '所属街乡',
      dataIndex: 'town_name',
      align: 'center',
      width: 100,
      render: renderFun
    },
    {
      title: '行业类型',
      dataIndex: 'industry_type_name',
      width: 100,
      align: 'center',
      render: renderFun
    }
    // {
    //   title: '报警状态',
    //   dataIndex: 'release_status_value',
    //   width: 100,
    //   align: 'center',
    //   render: renderFun
    // },
    // {
    //   title: '处理状态',
    //   dataIndex: 'process_status_value',
    //   width: 100,
    //   align: 'center',
    //   render: renderFun
    // },
    // {
    //   title: '操作',
    //   key: 'action',
    //   width: 80,
    //   align: 'center',
    //   render: (_, record) => (
    //     <a
    //       role={'button'}
    //       tabIndex={0}
    //       onClick={() => {
    //         goDetail(record)
    //       }}
    //     >
    //       处理
    //     </a>
    //   )
    // }
  ]
}
