import React, { useState, useRef, useEffect } from 'react'
import { Table, Button } from 'antd'
import dayjs from 'dayjs'
import { useTableData } from '&/hooks'
import { getAnalysisElecConsume } from '&/api/electricity'
import { downloadExcel } from '&/commonjs/util'
import { DownloadOutlined } from '@ant-design/icons'
import Container from '@/appComponents/Container'
import Filter from './Filter'
import './index.scss'
const EnterprisePowerConsumption = () => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [downloading, setDownloading] = useState(false)
  const [summarystr, setSummarystr] = useState('')
  const [paramsData, setParamsData] = useState({
    project_id: value.project_id,
    county_id: -1, //区
    industry_type_id: -1, //行业
    start_time: dayjs().subtract(10, 'day').format('YYYY-MM-DD 00:00:00'),
    end_time: dayjs().format('YYYY-MM-DD 00:00:00'),
    duration_type: 1
  })

  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != (-1 || '-1')) {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }

  const formatData = (data) => {
    return data.map((item, index) => {
      return {
        xuhao: index + 1,
        name: item.ent_name,
        area: item.county_name,
        street: item.town_name,
        hangye: item.industry_type,
        zong: item.total_value,
        product: item.yield_value,
        huanbao: item.treat_value,
        qita: item.other_value < 0 ? '--' : item.other_value
      }
    })
  }

  const [tableData, pagination, loading, onQuery, , originData, loadDataAll] =
    useTableData(getAnalysisElecConsume, {
      params: getParams(),
      formatcb: (data) => formatData(data)
    })

  const columns = [
    {
      title: '序号',
      width: 50,
      dataIndex: 'xuhao',
      key: 'xuhao',
      align: 'center'
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      width: 550,
      align: 'center'
    },
    {
      title: '所属区',
      dataIndex: 'area',
      key: 'area',
      // width: 150,
      align: 'center'
    },
    {
      title: '所属街乡',
      dataIndex: 'street',
      key: 'street',
      // width: 150,
      align: 'center'
    },
    {
      title: '所属行业',
      dataIndex: 'hangye',
      key: 'hangye',
      // width: 150,
      align: 'center'
    },
    {
      title: '用电量统计（kW·h）',
      align: 'center',
      children: [
        {
          title: '总生产用电',
          dataIndex: 'zong',
          key: 'zong',
          width: 150,
          align: 'center'
        },
        {
          title: '生产设施用电',
          dataIndex: 'product',
          key: 'product',
          width: 150,
          align: 'center'
        },
        {
          title: '治污设施用电',
          dataIndex: 'huanbao',
          key: 'huanbao',
          width: 150,
          align: 'center'
        },
        {
          title: '其他用电',
          dataIndex: 'qita',
          key: 'qita',
          width: 150,
          align: 'center'
        }
      ]
    }
  ]
  const columnsNew = [
    {
      title: '序号',
      width: 50,
      dataIndex: 'xuhao',
      key: 'xuhao',
      align: 'center'
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      // width: 450,
      align: 'center'
    },
    {
      title: '所属区',
      dataIndex: 'area',
      key: 'area',
      // width: 150,
      align: 'center'
    },
    {
      title: '所属街乡',
      dataIndex: 'street',
      key: 'street',
      // width: 150,
      align: 'center'
    },
    {
      title: '所属行业',
      dataIndex: 'hangye',
      key: 'hangye',
      // width: 150,
      align: 'center'
    },

    {
      title: '总生产用电',
      dataIndex: 'zong',
      key: 'zong',
      // width: 150,
      align: 'center'
    },
    {
      title: '生产设施用电',
      dataIndex: 'product',
      key: 'product',
      // width: 150,
      align: 'center'
    },
    {
      title: '治污设施用电',
      dataIndex: 'huanbao',
      key: 'huanbao',
      // width: 150,
      align: 'center'
    },
    {
      title: '其他用电',
      dataIndex: 'qita',
      key: 'qita',
      // width: 150,
      align: 'center'
    }
  ]

  useEffect(() => {
    if (Object.keys(originData).length) {
      const { amount_data = {} } = originData
      const str = `${amount_data.county_name} ${amount_data.industry_type}   总生产用电: ${amount_data.total_value}（kW·h） 生产设施用电: ${amount_data.yield_value}（kW·h） 治污设施用电: ${amount_data.treat_value}（kW·h） 其他用电: ${amount_data.other_value}（kW·h）`
      setSummarystr(str)
    }
  }, [originData])

  const download = async () => {
    setDownloading(true)
    const { data } = await loadDataAll()
    const excelData = formatData(data)
    downloadExcel(excelData, columnsNew, '用电量统计列表')
    setDownloading(false)
  }
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          onQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent
        title={`查询结果 （${paramsData.start_time}~
          ${paramsData.end_time.replace('00:00:00', '23:59:59')}用电量统计）`}
        extra={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            loading={downloading}
            disabled={!tableData.length}
            onClick={async () => {
              setDownloading(true)
              await download()
              setDownloading(false)
            }}
          >
            导出
          </Button>
        }
      >
        <div className="EnterprisePowerConsumption">
          {/* <div className="EnterprisePowerConsumption-biaoti">
            {paramsData.start_time}~
            {paramsData.end_time.replace('00:00:00', '23:59:59')}用电量统计
          </div> */}
          <div className="EnterprisePowerConsumption-downloadExcel">
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                float: 'right',
                marginBottom: '10px'
              }}
            >
              {summarystr}
            </span>
          </div>
          <Table
            loading={loading}
            columns={columns}
            dataSource={tableData}
            bordered
            size="small"
            pagination={pagination}
            scroll={{
              y: '62vh'
            }}
          />
        </div>
      </Container.ContainerContent>
    </Container>
  )
}
export default EnterprisePowerConsumption
