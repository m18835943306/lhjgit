import React, { useState, useEffect } from 'react'
import { Card } from '&/appComponents/Antd'
import Echarts from '&/baseUI/EChartsUI'
import './index.scss'

const Change = ({dataBar}) => {
    const [option,setOption]=useState()
    useEffect(()=>{
      const xData=dataBar?.map(item=>{
        return item.county_name
      })
      const thisWeek=dataBar?.map(item=>{
        return item.this_data
      })
      const lastWeek=dataBar?.map(item=>{
        return item.last_data
      })
      const addData=dataBar?.map(item=>{
        return item.ratio_data*100
      })
       const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['本周期', '上周期', '环比增幅']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: [0, 0.01],
              data: xData
        },
        yAxis:[
          {
            type: 'value',
          },
          {
            type: 'value',
            // name: 'Temperature',
            // min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '本周期',
            type: 'bar',
            data: thisWeek
          },
          {
            name: '上周期',
            type: 'bar',
            data: lastWeek
          },
          {
            name: '环比增幅',
            type: 'line',
            data: addData,
            yAxisIndex: 1,
          }
        ]
      };
      setOption(option)
    },[dataBar])
    return (
        <div style={{width:"50%",height:"100%",display: 'flex', flex: 1}}>
            <Card
                size="small"
                title="各区报警数量及环比变化"
                style={{ flex: 1 }}
                bodyStyle={{ height: 'calc(100% - 38px)' }}
            >
                <Echarts option={option} />
            </Card>
        </div>
    )
}
export default Change