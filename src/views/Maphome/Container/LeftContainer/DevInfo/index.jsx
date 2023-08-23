import React, { useState, useEffect, useCallback } from 'react'
import { Spin } from 'antd'
import MapCard from '@/views/Maphome/Container/Components/Card'
import MapSmallTab from '@/views/Maphome/Container/Components/SmallTab'
import MapNumber from '@/views/Maphome/Container/Components/Number'
import SecondaryTitle from '@/views/Maphome/Container/Components/SecondaryTitle'
import MapTab from '@/views/Maphome/Container/Components/Tab'
import Echarts from '&/baseUI/EChartsUI'
import { getHomeOverviewDevice, getHomeRealtimeDevice } from '&/api/electricity'
import * as echarts from 'echarts'
const tabs = [
  {
    label: '实时',
    value: '1'
  },
  {
    label: '概况',
    value: '2'
  }
]
const tabs1 = [
  {
    label: '各区',
    value: '1'
  },
  {
    label: '行业',
    value: '2'
  }
]

const DevInfo = () => {
  const [options, setOptions] = useState({})
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState()
  const [tabIndex, setTabIndex] = useState(1)
  const [smallTabIndex, setSmallTabIndex] = useState(1)
  const [county, setCounty] = useState()
  const [industry, setIndustry] = useState()
  const [trend, setTrend] = useState()

  const onChange = (tab, index) => {
    setTabIndex(index)
    setOptions({})
  }

  const getHomeRequestTask = useCallback(async () => {
    setLoading(true)
    const api = tabIndex === 1 ? getHomeRealtimeDevice : getHomeOverviewDevice
    try {
      const { county, industry, dev_count, trend } = await api()
      setCount(dev_count)
      setCounty(county)
      setIndustry(industry)
      setTrend(trend)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }, [tabIndex])

  useEffect(() => {
    getHomeRequestTask()
  }, [getHomeRequestTask])

  const generateBarOptions = (opts, index) => {
    const { horizontal, vertical } = opts
    const maxYAxis = Math.max(...vertical)
    const maxDatas = []
    vertical.forEach(() => {
      maxDatas.push(maxYAxis)
    })

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{b} : {c}',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },

      xAxis: {
        type: 'category',
        data: horizontal,
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
            color: '#979797',
            opacity: 0.22
          }
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: 'ArialMT',
          color: '#E2F0FF',
          rotate: 40 // 文本旋转角度
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
            color: '#979797',
            opacity: 0.22
          }
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: 'ArialMT',
          color: '#E2F0FF'
        }
      },
      grid: {
        top: 20,
        bottom: index == 1 ? 30 : 40,
        right: '5px'
      },
      series: [
        {
          type: 'bar',
          barWidth: index == 1 ? 40 : 12,
          data: vertical,
          // showBackground: true,
          // backgroundStyle: {
          //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //       offset: 0,
          //       color: 'rgba(143, 236, 244, 0.2)'
          //     },
          //     {
          //       offset: 1,
          //       color: 'rgba(1, 225, 255, 0.7)'
          //     }
          //   ])
          // },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(1, 225, 255, 0.7)'
              },
              {
                offset: 1,
                color: '#4DA3F0'
              }
            ])
          }
        },
        // 顶部圆
        {
          type: 'pictorialBar',
          symbolSize: [index == 1 ? 40 : 12, 5],
          symbolOffset: [-0, -3],
          z: 12,
          itemStyle: { color: '#01E2FF' },
          symbolPosition: 'end',

          data: vertical
        },
        {
          type: 'pictorialBar',
          symbolSize: [index == 1 ? 40 : 12, 5],
          symbolOffset: [-0, -0],
          z: 12,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#4DA3F0'
              },
              {
                offset: 1,
                color: '#29D5FF'
              }
            ])
          },
          symbolPosition: 'start',
          data: vertical
        },
        {
          type: 'pictorialBar',
          symbolSize: [index == 1 ? 40 : 12, 8],
          symbolOffset: [0, index == 1 ? -8 : -5],
          symbolPosition: 'end',
          itemStyle: {
            color: '#1bafc2'
          },
          data: maxDatas
        },
        {
          type: 'bar',
          barWidth: index === 1 ? 40 : 12,
          barGap: '-100%',
          z: 0,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(143, 236, 244, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(1, 225, 255, 0.7)'
              }
            ])
          },
          data: maxDatas.map((num) => num + 20)
        }
      ]
    }
    setOptions(option)
  }
  const generateLineOptions = (opts, index) => {
    const { horizontal, vertical } = opts

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
        }
      },

      xAxis: {
        type: 'category',
        data: horizontal,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#979797',
            opacity: 0.22
          }
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: 'ArialMT',
          color: '#E2F0FF',
          rotate: 20 // 文本旋转角度
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#979797',
            opacity: 0.22
          }
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: 'ArialMT',
          color: '#E2F0FF'
        }
      },
      grid: {
        top: 20,
        bottom: index == 1 ? 30 : 40,
        right: '5px'
      },
      series: [
        {
          type: 'line',
          data: vertical,
          smooth: true,
          lineStyle: {
            color: '#72e3ea'
          },
          itemStyle: {
            normal: {
              color: '#72e3ea', //折线点的颜色
              borderColor: '#72e3ea', //拐点边框颜色
              borderWidth: 2 //拐点边框大小
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                // 渐变颜色
                {
                  offset: 0,
                  color: 'rgba(67,126,140,0.36)'
                },
                {
                  offset: 1,
                  color: 'rgba(67,126,140,0)'
                }
              ],
              global: false
            }
          }
        }
      ]
    }
    setOptions(option)
  }

  useEffect(() => {
    const data = smallTabIndex === 1 ? county : industry
    if (data) {
      generateBarOptions(data, smallTabIndex)
    }
  }, [smallTabIndex, county, industry])

  useEffect(() => {
    if (tabIndex === 1 && trend) {
      generateLineOptions(trend, 1)
    }
  }, [tabIndex, trend])

  return (
    <div className="DevInfo MapItem">
      <MapCard
        title="设备"
        pos="left"
        extra={
          <MapTab tabs={tabs} defaultIndex={tabIndex} onChange={onChange} />
        }
      >
        <Spin
          tip="加载中"
          size="small"
          spinning={loading}
          style={{ height: '100%' }}
        >
          <MapNumber
            title={tabIndex === 1 ? '当前小时设备在线总数' : '设备在线总数'}
            num={count}
            color="skyblue"
          />
          <SecondaryTitle
            title={
              tabIndex === 1
                ? '设备每日在线数量'
                : smallTabIndex === 1
                ? '设备在各区分布数量'
                : '设备在各行业分布数量'
            }
            extra={
              tabIndex === 2 ? (
                <MapSmallTab
                  tabs={tabs1}
                  defaultIndex={smallTabIndex}
                  onChange={(_, index) => setSmallTabIndex(index)}
                />
              ) : null
            }
          />
          <div style={{ flex: 1 }}>
            <Echarts option={options} />
          </div>
        </Spin>
      </MapCard>
    </div>
  )
}

export default DevInfo
