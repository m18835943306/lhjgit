import React, { useState, useEffect } from 'react'
import { Card } from '&/appComponents/Antd'
import Echarts from '&/baseUI/EChartsUI'
import './index.scss'
const HourEachers = ({ hourEachers }) => {
  const [option, setOption] = useState()
  const [options, setOptions] = useState()
  useEffect(() => {
    // console.log(hourEachers, 'hourEachershourEachershourEachers');

    if (Object.keys(hourEachers).length > 0 && hourEachers) {
      //日变化趋势折线图
      const option = {
        color: ['#ff9831', '#4581f1', '#43cf7c'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          y: 'top',
          data: ['当日', '近7日', '近30日']
        },
        grid: {
          left: 40,
          right: 10,
          top: 30,
          bottom: 20
        },
        xAxis: {
          type: 'category',
          data: hourEachers?.change_data.time_list,
          splitLine: { show: true }
        },
        yAxis: {
          type: 'value',
          name: '用电指数',
          // show: false,
          splitLine: {
            show: false
          },
          axisTick: { show: false }
        },
        series: [
          {
            data: hourEachers?.change_data.day_value,
            type: 'line',
            name: '当日',
            symbol: 'circle'
          },
          {
            data: hourEachers?.change_data.week_value,
            type: 'line',
            name: '近7日',
            symbol: 'circle'
          },
          {
            data: hourEachers?.change_data.month_value,
            type: 'line',
            name: '近30日',
            symbol: 'circle'
          }
        ]
      }
      setOption(option)

      // 昼夜用电比折线图
      const options = {
        color: ['#ff9831', '#4581f1', '#43cf7c'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          y: 'top',
          data: ['昼间用电', '夜间用电', '夜间用电比']
        },
        grid: {
          left: 40,
          right: 30,
          top: 30,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            data: hourEachers?.ratio_data.time_list,
            axisPointer: {
              type: 'shadow'
            },
            splitLine: { show: true }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '用电指数',

            splitLine: {
              show: false
            },
            axisTick: { show: false }
          },
          {
            type: 'value',
            name: '夜间用电比',
            // show: false,
            // min: 0,
            // max: 25,
            // interval: 5,
            // axisLabel: {
            //   formatter: '{value} °C',
            // },
            splitLine: {
              show: false
            },
            axisTick: { show: false }
          }
        ],
        series: [
          {
            name: '昼间用电',
            type: 'bar',
            // tooltip: {
            //   valueFormatter: function (value) {
            //     return value + ' ml';
            //   },
            // },
            data: hourEachers?.ratio_data.day_value,
            itemStyle: {
              // borderRadius: [55, 55, 0, 0],
            }
          },
          {
            name: '夜间用电',
            type: 'bar',
            // tooltip: {
            //   valueFormatter: function (value) {
            //     return value + ' ml';
            //   },
            // },
            data: hourEachers?.ratio_data.night_value,
            itemStyle: {
              // borderRadius: [5, 5, 0, 0],
            }
          },
          {
            name: '夜间用电比',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'circle',

            // tooltip: {
            //   valueFormatter: function (value) {
            //     return value + ' °C';
            //   },
            // },
            data: hourEachers?.ratio_data.ratio_value
          }
        ]
      }
      setOptions(options)
    }
  }, [hourEachers])
  return (
    <div className="HourEachers">
      <Card size="small" title="日变化趋势" bodyStyle={{ height: '350px' }}>
        <Echarts option={option} />
      </Card>
      <Card
        size="small"
        title="昼夜用电比"
        style={{ marginTop: '10px' }}
        bodyStyle={{ height: '350px' }}
      >
        <Echarts option={options} />
      </Card>
    </div>
  )
}
export default HourEachers
