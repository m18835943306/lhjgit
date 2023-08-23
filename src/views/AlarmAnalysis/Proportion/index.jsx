import React, { useState, useEffect } from 'react'
import { Card } from '&/appComponents/Antd'
import Echarts from '&/baseUI/EChartsUI'
import './index.scss'

const Proportion = ({ dataPropor }) => {
  const [option, setOption] = useState()
  useEffect(() => {
    const leftNameArr = dataPropor?.map(item => {
      return item.industry_type
    })
    const leftDataArr = dataPropor?.map(item => {
      return ((0 - item.ratio) * 100).toFixed(2)
    })
    const rightNameArr = dataPropor?.map(item => {
      return item.industry_type
    })
    const rightDataArr = dataPropor?.map(item => {
      return item.warn_num+200
    })
    const data1 = rightDataArr// 走访数
    const data22 = leftDataArr // 完成率
    const data2 = []
    const maxPerCent = Math.min.apply(null, data22) // 完成率中的最大值
    data22?.forEach(function (ele) {
      data2.push(Math.abs(ele) * Math.max.apply(null, data1) / maxPerCent)
    }) // 完成率换算成走访数，形成新数组
    let max = Math.max.apply(null, data1)
    console.log(max,"max---");
    const b = Math.ceil(max).toString()
    const c = Math.pow(10, b.length - 1)
    max = (Number(b[0]) + 1) * c
    // const data =  [-max, -max / 4 * 3, -max / 2, -max / 4, 0, max / 4, max / 2, max / 4 * 3, max]
    const option = {
      title: {
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          return params[0]?.name +
            '<br>报警企业数' + params[1]?.value +
            '<br>报警企业比例数' + Math.abs(data22[params[0]?.dataIndex]) + '%' // 换算
        }
      },
      legend: {
        data: ['报警企业比例数', '报警企业数'],
        left: 'center'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          name:"(报警企业比例)",
          nameLocation:"center",
          nameGap:20,
          position: 'top',
          min: 100,
          max: -100,
          splitNumber: 8,
          interval: 100/4, // 强制设置坐标轴分割间隔。
          axisLabel: {
            formatter: function (value, index) {
              // console.log(value,"value--");
              return -value+"%"
              // if (data[index] < 0) {
              //   return Math.abs(data[index]) + '%'
              // } else {
              //   return Math.abs(data[index])
              // }
            }
          }
        },
        {
          type: 'value',
          position: 'bottom',
          nameLocation:"center",
          nameGap:20,
          name:"报警企业数",
          min: -max,
          max: max,
          splitNumber: 8,
          interval: max/4, // 强制设置坐标轴分割间隔。
          axisLabel: {
            formatter: function (value, index) {
              // console.log(value,"value--");
              // if (data[index] < 0) {
              //   return Math.abs(data[index]) + '%'
              // } else {
              //   return Math.abs(data[index])
              // }
              return value
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          position: 'right',
          axisTick: { show: false },
          data: leftNameArr, // 更改数组
          axisLabel: {
            color: '#000',
            interval: 0,
            formatter: function (value) {
              if (value.length > 7) {
                return value.substring(0, 7) + '...'
              } else {
                return value
              }
            }
          }
        },
        {
          type: 'category',
          position: 'left',
          axisTick: { show: false },
          data: rightNameArr, // 更改数组
          axisLabel: {
            color: '#000',
            interval: 0,
            formatter: function (value) {
              if (value.length > 7) {
                return value.substring(0, 7) + '...'
              } else {
                return value
              }
            }
          }
        }
      ],
      series: [
        {
          name: '报警企业比例数',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return Math.abs(data22[params.dataIndex]) + '%' // 换算
              }
            }
          },
          xAxisIndex: 0,
          itemStyle: {
            normal: {
              color: '#89C0FF'
            }
          },
          barWidth: 10,
          data: data22
        },
        {
          name: '报警企业数',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return params.value
              }
            }
          },
          xAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#FF6938'
            }
          },
          barWidth: 10,
          data: data1
        }
      ]
    }
    setOption(option)
  }, [dataPropor])

  return (
    <div style={{width:"50%",height:"100%",display: 'flex', flex: 1}}>
      <Card
        size="small"
        title="各行业报警数量及报警企业比例"
        style={{ flex: 1 }}
        bodyStyle={{ height: 'calc(100% - 38px)' }}
      >
        <Echarts option={option} />
      </Card>
    </div>
  )
}
export default Proportion