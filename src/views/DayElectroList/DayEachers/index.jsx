import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col } from 'antd'
import Echarts from '&/baseUI/EChartsUI'
import { Card } from '&/appComponents/Antd'
import dayjs from 'dayjs'
import './index.scss'
const DayEachers = ({ dayEachers }) => {
  const [option, setOption] = useState()
  const [options, setOptions] = useState()
  const [optionss, setOptionss] = useState()

  const generateLevel = (list, index) => {
    let color = 'black'
    let level = 0
    switch (list[index]) {
      case 1:
        color = '#BBD9E5'
        level = 1
        break
      case 2:
        color = '#A0C3EC'
        level = 2
        break
      case 3:
        color = '#E7E8A0'
        break
        level = 3
      case 4:
        color = '#D195B7'
        level = 4
        break
      case 5:
        color = '#7AB7B1'
        level = 5
        break
      default:
        color = 'black'
        level = 0
        break
    }
    return {
      color,
      level
    }
  }
  useEffect(() => {
    if (Object.keys(dayEachers).length > 0 && dayEachers) {
      let endValues =
        dayEachers.year_data.time_list[
          dayEachers.year_data.time_list.length - 1
        ]
      let startValues = dayjs(endValues).subtract(15, 'day').format('MM-DD')
      // 周数据对比折线图
      const option = {
        color: ['#d02d22', '#3073ef'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          left: 40,
          right: 30,
          top: 40,
          bottom: 80
        },
        legend: {
          y: 'top',
          data: [
            dayEachers?.week_data.this_week,
            dayEachers?.week_data.last_week
          ]
        },
        xAxis: {
          type: 'category',
          data: dayEachers?.week_data.time_list,
          position: 'bottom',
          splitLine: { show: true },
          axisLabel: {
            align: 'center',
            interval: 0,
            formatter: (param, index) => {
              const lastMarks = dayEachers?.week_data.last_week_mark
              const thisMarks = dayEachers?.week_data.last_week_mark
              // const lastlevel =
              // return param
              // const lastcolor = `${index === 0 ? '{last|}' : ''}`
              // const thiscolor = `${index === 0 ? '{this|}' : ''}`
              return `${param}\n\n{this|} 等级${
                generateLevel(thisMarks, index).level
              }\n\n{last|} 等级${generateLevel(lastMarks, index).level}`
            },
            rich: {
              last: {
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: '#3073ef'
              },
              this: {
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: '#d02d22'
              }
            }
          }
        },
        yAxis: {
          name: '用电指数',
          type: 'value',
          // show: false,
          splitLine: {
            show: false
          },
          axisTick: { show: false }
        },
        series: [
          {
            data: dayEachers?.week_data.this_week_value,
            type: 'line',
            symbol: 'circle',
            name: dayEachers?.week_data.this_week
          },
          {
            data: dayEachers?.week_data.last_week_value,
            type: 'line',
            symbol: 'circle',
            name: dayEachers?.week_data.last_week
          }
        ]
      }
      setOption(option)
      //同环比及变幅折线图
      const options = {
        color: ['#43cf7c', '#ffeb3b', '#ff0000'],
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
          data: ['同比', '环比', '比基准']
        },
        grid: {
          left: 40,
          right: 30,
          top: 40,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            data: dayEachers?.echarts_data.time_list,
            // show: false,
            axisPointer: {
              type: 'shadow'
            },
            position: 'bottom',
            splitLine: { show: true },
            axisLabel: {
              align: 'center',
              interval: 0,
              formatter: (param, index) => {
                const marks = dayEachers?.echarts_data.mark_value
                // const lastlevel =
                // return param
                // const lastcolor = `${index === 0 ? '{last|}' : ''}`
                // const thiscolor = `${index === 0 ? '{this|}' : ''}`
                return `${param}\n\n等级${generateLevel(marks, index).level}`
              },
              rich: {
                last: {
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: '#3073ef'
                },
                this: {
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: '#d02d22'
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '用电增幅',

            splitLine: {
              show: false
            },
            axisTick: { show: false }
          },
          {
            type: 'value',
            name: '基准增幅',

            splitLine: {
              show: false
            },
            axisTick: { show: false }
          }
        ],
        series: [
          {
            name: '同比',
            type: 'bar',
            data: dayEachers?.echarts_data.same_value
          },
          {
            name: '环比',
            type: 'bar',
            data: dayEachers?.echarts_data.ring_value
          },
          {
            name: '比基准',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'circle',
            data: dayEachers?.echarts_data.standard_value
          }
        ]
      }
      setOptions(options)
      // 年数据对比
      const optionss = {
        color: ['#ff8d1a', '#4891fe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            startValue: startValues,
            endValue: endValues,
            // start: 50,
            // end: 100,
            type: 'inside',
            moveOnMouseWheel: true, // 内部滚动条使用鼠标滚轮滚动
            zoomOnMouseWheel: false // 鼠标滚轮放大缩小
          },
          {
            startValue: startValues,
            endValue: endValues,
            type: 'slider',
            height: 20,
            bottom: 7
          }
        ],
        legend: {
          y: 'top',
          data: [
            dayEachers?.year_data.this_year,
            dayEachers?.year_data.last_year
          ]
        },
        grid: {
          left: 40,
          right: 20,
          top: 40,
          bottom: 70
        },
        xAxis: {
          type: 'category',
          data: dayEachers?.year_data.time_list,
          splitLine: { show: true },
          axisLabel: {
            align: 'center',
            interval: 0,
            formatter: (param, index) => {
              const lastMarks = dayEachers?.year_data.last_year_mark
              const thisMarks = dayEachers?.year_data.this_year_mark

              return `${param}\n\n{this|} 等级${
                generateLevel(thisMarks, index).level
              }\n\n{last|} 等级${generateLevel(lastMarks, index).level}`
            },
            rich: {
              last: {
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: '#4891fe'
              },
              this: {
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: '#ff8d1a'
              }
            }
          }
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
            data: dayEachers?.year_data.this_year_value,
            type: 'line',
            symbol: 'circle',
            name: dayEachers?.year_data.this_year
          },
          {
            data: dayEachers?.year_data.last_year_value,
            type: 'line',
            symbol: 'circle',
            name: dayEachers?.year_data.last_year
          }
        ]
      }
      setOptionss(optionss)
    }
  }, [dayEachers])
  return (
    <div className="DayEachers">
      <div className="DayEachers-top">
        <Row gutter={10} style={{ flex: 1 }}>
          <Col span={12}>
            <Card
              size="small"
              title="周数据对比"
              bodyStyle={{ height: '300px' }}
            >
              <Echarts option={option} />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              size="small"
              title="同环比及变幅"
              bodyStyle={{ height: '300px' }}
            >
              <span className="DayEachers-top_tips">
                *年同比；月环比；前30日均值为基准值
              </span>
              <Echarts option={options} />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="DayEachers-bottom">
        <Card size="small" title="年数据对比" bodyStyle={{ height: '350px' }}>
          <Echarts option={optionss} />
        </Card>
      </div>
    </div>
  )
}
export default DayEachers
