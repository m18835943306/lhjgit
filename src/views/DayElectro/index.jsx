import React, { useState, useEffect } from 'react'
import './index.scss'
import { Table, Button, Tooltip } from 'antd'
import { useTableData } from '&/hooks'
import dayjs from 'dayjs'
import { downloadExcel } from '&/commonjs/util'
import { getMacroElecEnterprise } from '&/api/electricity'
import Container from '@/appComponents/Container'
import Filter from './Filter'
import { DownloadOutlined } from '@ant-design/icons'

const DayElectro = () => {
  const values = JSON.parse(localStorage.getItem('user'))
  const [paramsData, setParamsData] = useState({
    project_id: values.project_id,
    time_type: 1,
    start_time: dayjs().subtract(1, 'd').format('YYYY-MM-DD 00:00:00'),
    end_time: dayjs().format('YYYY-MM-DD 00:00:00'),
    county_name: '全部', //区
    industry_type: '全部', //行业
    control_type: '全部' //管控类型
  })
  const [downLoading, setDownLoading] = useState(false)

  const [columns, setColumns] = useState([])
  const [tableData, setTableData] = useState([])
  const staticColumns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center',
      fixed: 'left'
    },
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center',
      width: 150,
      fixed: 'left'
    },
    {
      title: '所属区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'center',
      width: 100,
      fixed: 'left'
    },
    {
      title: '所属行业',
      dataIndex: 'industry_type',
      key: 'industry_type',
      align: 'center',
      width: 100,
      fixed: 'left'
    },
    {
      title: '管控类型',
      dataIndex: 'control_type',
      key: 'control_type',
      align: 'center',
      width: 100,
      fixed: 'left'
    }
  ]

  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != '全部') {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }

  const [, pagination, loading, onQuery, , originData, loadDataAll] =
    useTableData(getMacroElecEnterprise, {
      params: getParams()
    })
  useEffect(() => {
    // console.log(originData, 'originData');
    if (Object.keys(originData).length) {
      const columns = []
      originData?.time_data.forEach((item) => {
        columns.push({
          title: item,
          dataIndex: `${item}`,
          key: `${item}`,
          align: 'center',
          width: 80,
          render: (data, text) => {
            let dataColor
            switch (data.mark) {
              case -1:
                dataColor = 'black'
                break
              case 0:
                dataColor = 'black'
                break
              case 1:
                dataColor = '#BBD9E5'
                break
              case 2:
                dataColor = '#A0C3EC'
                break
              case 3:
                dataColor = '#E7E8A0'
                break
              case 4:
                dataColor = '#D195B7'
                break
              case 5:
                dataColor = '#7AB7B1'
                break
              default:
                break
            }
            return <span style={{ color: dataColor }}>{data.index_value}</span>
          }
        })
      })
      const mergeColumns = staticColumns.concat(columns)
      setColumns(mergeColumns)
      const keys = Object.values(originData.time_data)
      // console.log(keys,"keyskeyskeyskeyskeys");
      const data = originData?.ent_data.map((ent) => {
        const { control_type, county_name, ent_name, industry_type, values } =
          ent
        const o = {
          control_type,
          county_name,
          ent_name,
          industry_type
        }
        values?.forEach((s, i) => {
          o[keys[i]] = s
        })
        return o
      })
      setTableData(data)
    }
  }, [originData])
  const download = async () => {
    setDownLoading(true)
    const { ent_data, time_data } = await loadDataAll()
    const keys = Object.values(time_data)
    const data = ent_data?.map((ent) => {
      const { control_type, county_name, ent_name, industry_type, values } = ent
      const o = {
        control_type,
        county_name,
        ent_name,
        industry_type
      }
      values?.forEach((s, i) => {
        o[keys[i]] = s.index_value
      })
      return o
    })
    downloadExcel(data, columns, '小时用电列表')
    setDownLoading(false)
  }
  const colorData = [
    { color: 'black', text: '用电指数正常' },
    { color: '#BBD9E5', text: '用电指数为0' },
    { color: '#A0C3EC', text: '用电指数为null' },
    { color: '#E7E8A0', text: '用电指数日环比上升或下降50%' },
    { color: '#D195B7', text: '用电指数月同比上升或下降50%' },
    { color: '#7AB7B1', text: '环比上周平均用电指数上升或下降50%' }
  ]
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          handleQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent
        title="查询结果"
        extra={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            loading={downLoading}
            disabled={!tableData.length}
            onClick={download}
          >
            导出
          </Button>
        }
      >
        <h5 style={{ fontSize: '16px', marginBottom: '10px' }}>
          *
          {colorData.map((item, index) => {
            return (
              <span style={{ marginLeft: '10px' }}>
                <Tooltip title={item.text}>等级{index}对应</Tooltip>
                <span
                  style={{
                    backgroundColor: `${item.color}`,
                    height: '10px',
                    width: '10px',
                    borderRadius: '5px',
                    display: 'inline-block',
                    margin: '0 5px'
                  }}
                ></span>
              </span>
            )
          })}
        </h5>
        <div className="DayElectro_content">
          <Table
            loading={loading}
            columns={columns}
            dataSource={tableData}
            bordered
            size="small"
            pagination={pagination}
            scroll={{ x: 1500, y: '62vh' }}
          />
        </div>
      </Container.ContainerContent>
    </Container>
  )
}

export default DayElectro
