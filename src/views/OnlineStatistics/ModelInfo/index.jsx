import { useState, useMemo, useEffect } from 'react'
import { Table, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useTableData } from '&/hooks'
import { getOnlineDevice } from '&/api/electricity'
import { downloadExcel } from '&/commonjs/util'
import './index.scss'
const ModelInfo = ({ record }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [listData,setListData]=useState()
  // const [downloading, setDownloading] = useState(false)
  useEffect(() => {
    if (Object.keys(record).length > 0) {
        getOnlineDevice({
          ent_id:record.ent_id
        }).then(res=>{
          setListData(res)
        })
    }
  }, [record])
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },

    {
      title: '设备名称',
      dataIndex: 'dev_name',
      key: 'dev_name',
      align: 'center'
    },
    {
      title: '设备编号',
      dataIndex: 'dev_code',
      key: 'dev_code',
      align: 'center'
    },
    {
      title: '设备类型',
      dataIndex: 'dev_type_name',
      key: 'dev_type_name',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'if_online',
      key: 'if_online',
      align: 'center',
      render:(text,reor)=>{
        return (
          <span>{text==1?"在线":"离线"}</span>
        )
      }
    }
  ]

  // const download = async () => {
  //   setDownloading(true)
  //   const { data } = await loadDataAll()
  //   downloadExcel(data, columns, `安装统计列表`)
  //   setDownloading(false)
  // }
  return (
    <div className="ModelInfo">
      <div className="ModelInfo_title">
        {/* <div
          style={{
            marginBottom: '5px',
            marginTop: '-30px',
            float: 'right'
          }}
        >
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            loading={downloading}
            // disabled={!tableData.length}
            onClick={download}
          >
            导出
          </Button>
        </div> */}
      </div>
      <Table
        // loading={loading}
        columns={columns}
        dataSource={listData}
        pagination={false}
        size="small"
        bordered
        scroll={{
          y: 540
        }}
      />
    </div>
  )
}
export default ModelInfo
