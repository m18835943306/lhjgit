import React, { useState, useEffect, useCallback } from 'react'
import MapCard from '@/views/Maphome/Container/Components/Card'
import MapSmallTab from '@/views/Maphome/Container/Components/SmallTab'
import MapNumber from '@/views/Maphome/Container/Components/Number'
import SecondaryTitle from '@/views/Maphome/Container/Components/SecondaryTitle'
import MapTab from '@/views/Maphome/Container/Components/Tab'
import Echarts from '&/baseUI/EChartsUI'
import { getHomeOverviewEnt, getHomeRealtimeEn } from '&/api/electricity'
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

const EntInfo = () => {
  const [options, setOptions] = useState({})
  const [count, setCount] = useState()
  const [tabIndex, setTabIndex] = useState(1)
  const [smallTabIndex, setSmallTabIndex] = useState(1)
  const [county, setCounty] = useState()
  const [industry, setIndustry] = useState()

  const onChange = (tab, index) => {
    setTabIndex(index)
  }

  const getHomeRequestTask = useCallback(async () => {
    const api = tabIndex === 1 ? getHomeRealtimeEn : getHomeOverviewEnt
    try {
      const { county, industry, ent_count } = await api()
      setCount(ent_count)
      setCounty(county)
      setIndustry(industry)
    } catch (error) {
      console.error(error)
    }
  }, [tabIndex])

  useEffect(() => {
    getHomeRequestTask()
  }, [getHomeRequestTask])

  useEffect(() => {
    setOptions(null)
    const data = smallTabIndex === 1 ? county : industry
    if (data) {
      generateOptions(data, smallTabIndex)
    }
  }, [smallTabIndex, county, industry])

  const generateOptions = (opts, index) => {
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
        // rigth: 0
      },
      series: [
        {
          type: 'bar',
          barWidth: index == 1 ? 40 : 12,
          data: vertical,
          showBackground: true,
          backgroundStyle: {
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
          symbolOffset: [0, index == 1 ? -8 : -15],
          symbolPosition: 'end',
          itemStyle: {
            color: '#1bafc2'
          },
          data: maxDatas
        }
      ]
    }
    setOptions(option)
  }

  return (
    <div className="EntInfo MapItem">
      <MapCard
        title="企业"
        pos="left"
        extra={
          <MapTab tabs={tabs} defaultIndex={tabIndex} onChange={onChange} />
        }
      >
        <MapNumber
          title={tabIndex === 1 ? '当天在线企业总数' : '在线企业总数'}
          num={count}
        />
        <SecondaryTitle
          title={
            smallTabIndex === 1 ? '企业在各区分布数量' : '行业在各区分布数量'
          }
          extra={
            <MapSmallTab
              tabs={tabs1}
              defaultIndex={smallTabIndex}
              onChange={(_, index) => setSmallTabIndex(index)}
            />
          }
        />
        <div style={{ flex: 1 }}>
          <Echarts option={options} />
        </div>
      </MapCard>
    </div>
  )
}

export default EntInfo
