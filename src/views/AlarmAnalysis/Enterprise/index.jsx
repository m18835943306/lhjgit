import React, { useState, useEffect } from 'react'
import { Card } from '&/appComponents/Antd'
import { Row, Col, Table } from 'antd'
import Echarts from '&/baseUI/EChartsUI'
import './index.scss'

const Enterprise = ({ dataList }) => {
  const [data, setData] = useState([])
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      width: 100,
      title: '企业',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'center'
    },
    {
      width: 100,
      title: '区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'center'
    },
    {
      width: 100,
      title: '行业',
      dataIndex: 'industry_type',
      key: 'industry_type',
      align: 'center'
    },
    {
      width: 100,
      title: '报警次数',
      dataIndex: 'warn_num',
      key: 'warn_num',
      align: 'center'
    },
  ]
  const [option, setOption] = useState()
  useEffect(() => {
    setData(dataList?.ent_list)
    const dataArr = dataList?.ratio.map(item => {
      return {
        value: (item[1] * 100).toFixed(2),
        name: item[0]
      }
    })
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params?.name+"   "+ params?.value+"%"
        }
      },
      // legend: {
      //   top: '5%',
      //   left: 'center'
      // },
      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: dataArr
        }
      ]
    };
    setOption(option)
  }, [dataList])
  return (
    <div className='Enterprise' style={{width:"50%",height:"100%",display: 'flex', flex: 1}}>
      <Card
        size="small"
        title="报警企业TOP30"
        style={{ flex: 1 }}
        bodyStyle={{ height: 'calc(100% - 38px)' }}
      >
        <div style={{display:"flex",justifyContent:"space-evenly",height:"100%",width:"100%"}}>
          <div style={{height:"100%",width:"60%"}}>
            <Table bordered columns={columns} dataSource={data} scroll={{ y: "27vh" }} pagination={false}></Table>
          </div>
          <div style={{height:"100%",width:"40%"}}>
            <Echarts option={option} />
          </div>
        </div>
      </Card>
    </div>
  )
}
export default Enterprise