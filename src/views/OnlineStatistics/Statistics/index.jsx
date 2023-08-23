import React, { useState, useMemo, useRef, useEffect } from 'react'
import { downloadExcel } from '&/commonjs/util'
import Chart from './Chart'
import { Card } from '&/appComponents/Antd'
import Tabs from './Tabs'
import Table from './Table'
import './index.scss'

const Statistics = ({ barChart, tableChart,lineData }) => {
  const [tabIndex, setTabIndex] = useState('1')
  const [option, setOption] = useState({})
  const [options, setOptions] = useState({})
  const [tipsLabel, setTipsLabel] = useState([])

  useEffect(() => {
    // console.log(lineData,"lineData--");
    const { left, right } = barChart || {}
    const option = {
      grid: {
        left: 30,
        top: 20,
        right: 20,
        bottom: 20
      },
      xAxis: {
        type: 'category',
        data: left?.area || []
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        show: true,
        right: '5px',
        feature: {
          // 下载保存为图片
          saveAsImage: {
            show: true,
            // icon: `image://${echartsDown}`, // 内部相对路径
            connectedBackgroundColor: '#fff',
            title: '保存图片',
            type: 'png',
            pixelRatio: 1
          }
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: left?.data || [],
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#76cae5',
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                formatter: ({ value }) => `${value}%`,
                textStyle: {
                  //数值样式
                  color: '#333',
                  fontSize: 12
                }
              }
            }
          }
        }
      ]
    }
    setOption(option)

    // const { series, axisLabel, zeroAxisLabel } = handleSplitZero(right)
    // setTipsLabel(zeroAxisLabel)
    // const options = {
    //   grid: {
    //     left: 30,
    //     top: 20,
    //     right: 20,
    //     bottom: 80
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'shadow'
    //     }
    //   },
    //   xAxis: {
    //     type: 'category',
    //     data: axisLabel,
    //     //设置文本过长超出隐藏...表示
    //     axisLabel: {
    //       color: '#333',
    //       //  让x轴文字方向为竖向
    //       interval: 0,
    //       rotate: -40, // 标签倾斜角度
    //       // formatter: function (value) {
    //       //   return value.split('').join('\n')
    //       // },
    //       fontSize: 10
    //     }
    //   },
    //   toolbox: {
    //     show: true,
    //     feature: {
    //       // 下载保存为图片
    //       saveAsImage: {
    //         show: true,
    //         // icon: `image://${echartsDown}`, // 内部相对路径
    //         connectedBackgroundColor: '#fff',
    //         title: '保存图片',
    //         type: 'png',
    //         pixelRatio: 1
    //       }
    //     }
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: series,
    //       type: 'bar',
    //       // itemStyle: {
    //       //   color: '#64d1b6'
    //       // }
    //       itemStyle: {
    //         normal: {
    //           color: '#64d1b6',
    //           label: {
    //             show: true, //开启显示
    //             position: 'top', //在上方显示
    //             formatter: ({ value }) => `${value}%`,
    //             textStyle: {
    //               //数值样式
    //               color: '#333',
    //               fontSize: 12
    //             }
    //           }
    //         }
    //       }
    //     }
    //   ]
    // }
    const brr=lineData?.online_ratio.map(item=>{
      return item.adm
    })
  const arr=lineData?.online_ratio.map(item=>{
      return {
        name: item.adm,
        type: 'line',
        data: item.data_list
      }
  })
   const options = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: brr
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: lineData?.time_list
      },
      yAxis: {
        type: 'value'
      },
      series: arr
    };
    setOptions(options)
  }, [barChart])

  // // 处理零数据
  // const handleSplitZero = (data = { data: [] }, key = 'industry') => {
  //   const sortData = data.data
  //   const tempObj = {}
  //   for (let i = 0; i < sortData.length; i++) {
  //     const d = sortData[i]
  //     tempObj[data[key][i]] = d
  //   }
  //   const sortValues = Object.values(tempObj).sort((a, b) => b - a)
  //   const sorteKeys = Object.keys(tempObj).sort(
  //     (a, b) => tempObj[b] - tempObj[a]
  //   )
  //   const srotObj = {}
  //   for (let i = 0; i < sortValues.length; i++) {
  //     const d = sortValues[i]
  //     srotObj[sorteKeys[i]] = d
  //   }
  //   const series = []
  //   const axisLabel = []
  //   const zeroAxisLabel = []
  //   for (const [k, value] of Object.entries(srotObj)) {
  //     if (value) {
  //       series.push(value)
  //       axisLabel.push(k)
  //     } else {
  //       zeroAxisLabel.push(k)
  //     }
  //   }
  //   return { series, axisLabel, zeroAxisLabel }
  // }

  return (
    <div className="Statistics">
      <div className="Statistics_chart">
        <Card size="small">
          <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
          {tabIndex === '1' ? (
            <Chart
              areaOptions={option}
              busOptions={options}
              // tipsLabel={tipsLabel}
            />
          ) : (
            <Table tableChart={tableChart} />
          )}
        </Card>
      </div>
    </div>
  )
}
export default Statistics
