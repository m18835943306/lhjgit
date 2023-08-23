import { useState, useMemo } from 'react'
import { Table, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useTableData } from '&/hooks'
import { getDeviceRelInstallInfo } from '&/api/electricity'
import { downloadExcel } from '&/commonjs/util'
import './index.scss'

const Info = ({ record, tabIndex }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [downloading, setDownloading] = useState(false)

  const getParams = useMemo(() => {
    const params = {
      project_id: user.project_id
    }
    tabIndex === '1'
      ? !record.type
        ? (params.county_id = record.county_id)
        : (params.city_id = record.city_id)
      : (params.industry_type_id = record.industry_type_id)
    return params
  }, [tabIndex, user])

  const getTitle = useMemo(() => {
    return tabIndex === '1' ? record.county_name : record.industry_type_name
  }, [tabIndex])

  const [tableData, pagination, loading, , , , loadDataAll] = useTableData(
    getDeviceRelInstallInfo,
    {
      params: getParams
    },
    [record]
  )

  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },

    {
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center'
    },
    {
      title: tabIndex == '1' ? '行业' : '区',
      dataIndex: tabIndex == '1' ? 'industry_type' : 'county_name',
      key: tabIndex == '1' ? 'industry_type' : 'county_name',
      align: 'center',
      width: 140
    },
    {
      title: '设备安装情况',
      align: 'center',
      children: [
        {
          title: '总安装设备数',
          dataIndex: 'all_dev_num',
          key: 'all_dev_num',
          align: 'center',
          width: 140
        },
        {
          title: '企业总电安装数',
          dataIndex: 'total_dev_num',
          key: 'total_dev_num',
          align: 'center',
          width: 140
        },
        {
          title: '产污设施安装数',
          dataIndex: 'yield_dev_num',
          key: 'yield_dev_num',
          align: 'center',
          width: 140
        },
        {
          title: '治污设施安装数',
          dataIndex: 'treat_dev_num',
          key: 'treat_dev_num',
          align: 'center',
          width: 140
        },
        {
          title: '产治一体安装数',
          dataIndex: 'unify_dev_num',
          key: 'unify_dev_num',
          align: 'center'
        }
      ]
    }
  ]

  const download = async () => {
    setDownloading(true)
    const { data } = await loadDataAll()
    downloadExcel(data, columns, `${getTitle}安装统计列表`)
    setDownloading(false)
  }

  return (
    <div className="Info">
      <div className="Info_title">
        <div
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
            disabled={!tableData.length}
            onClick={download}
          >
            导出
          </Button>
        </div>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={tableData}
        pagination={pagination}
        size="small"
        bordered
        scroll={{
          y: 540
        }}
      />
    </div>
  )
}

export default Info
