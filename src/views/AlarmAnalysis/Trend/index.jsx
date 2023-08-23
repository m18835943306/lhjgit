import React, { useState, useEffect } from 'react'
import { Card } from '&/appComponents/Antd'
import Echarts from '&/baseUI/EChartsUI'
import './index.scss'

const Trend = ({ dataLine }) => {
  const [option, setOption] = useState()
  useEffect(() => {
    const arr=dataLine?.value_list.map(item=>{
      return  item==-99?"--":item
    })
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataLine?.date_list
      },
      // legend: {
      //   data: ['123', '456']
      // },
      yAxis: {
        type: 'value'
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '4%',
        bottom: '4%',
        containLabel: true
      },
      series: [
        {
          data: arr,
          type: 'line',
          // name: "123",
          areaStyle: {
            color: "#7fc1f6"
          },
          lineStyle: {
            color: "#7fc1f6",
            normal: {
              color: "#7fc1f6", // 折线点的颜色
            },
          },
          smooth: true
        },
        // {
        //   data: [620, 932, 101, 934, 120, 1330, 130],
        //   type: 'line',
        //   name: "456",
        //   areaStyle: {
        //     color: "#7beedd"
        //   },
        //   lineStyle: {
        //     color: "#7beedd",
        //     normal: {
        //       color: "#7beedd", // 折线点的颜色
        //     },
        //   },
        //   smooth: true
        // }
      ]
    };
    setOption(option)
  }, [dataLine])
  return (
    <div style={{width:"50%",height:"100%",display: 'flex', flex: 1}}>
      <Card
        size="small"
        title="全市报警总量的逐日变化趋势"
        style={{ flex: 1 }}
        bodyStyle={{ height: 'calc(100% - 38px)' }}
      >
        <Echarts option={option} />
      </Card>
    </div>
  )
}
export default Trend