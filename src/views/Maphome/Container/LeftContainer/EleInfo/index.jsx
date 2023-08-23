import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Select } from 'antd'
import MapCard from '@/views/Maphome/Container/Components/Card'
import MapSmallTab from '@/views/Maphome/Container/Components/SmallTab'
import Echarts from '&/baseUI/EChartsUI'
import {
  getHomeConsumeTrend,
  getAdmList,
  getIndustryList
} from '&/api/electricity'
import './index.scss'
const tabs1 = [
  {
    label: '市',
    value: '1'
  },
  {
    label: '各区',
    value: '2'
  },
  {
    label: '各行业',
    value: '3'
  }
]

const EleInfo = () => {
  const [yieldOptions, setYieldOptions] = useState({})
  const [twoOptions, setTwoOptions] = useState({})
  const [selectData, setSelectData] = useState([])
  const [selectOptions, setSelectOptions] = useState([])
  const [timeList, setTimeList] = useState([])
  const [yieldList, setYieldList] = useState([])
  const [twoList, setTwoList] = useState([])
  const [smallTabIndex, setSmallTabIndex] = useState(1)
  const [params, setParams] = useState({
    county_id: 3,
    industry_type_id: 2
  })

  const getSelectValue = useMemo(() => {
    return smallTabIndex === 2
      ? params.county_id
      : smallTabIndex === 3
      ? params.industry_type_id
      : ''
  }, [smallTabIndex, params])

  const getTimer = useMemo(() => {
    if (Array.isArray(timeList) && timeList.length) {
      let str = `（${timeList[0]} 至 ${timeList[timeList.length - 1]}）`
      return (
        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, .5)' }}>
          {str}
        </span>
      )
    }
    return null
  }, [timeList])

  const getHomeRequestTask = useCallback(async () => {
    try {
      let json = {}
      if (smallTabIndex === 2) {
        json.county_id = params.county_id
      }
      if (smallTabIndex === 3) {
        json.industry_type_id = params.industry_type_id
      }
      const { time_list, two_list, yield_list } = await getHomeConsumeTrend(
        json
      )
      setTimeList(time_list)
      setYieldList(yield_list)
      setTwoList(two_list)
    } catch (error) {
      console.error(error)
    }
  }, [smallTabIndex, params])

  const onChangeType = (v) => {
    if (smallTabIndex === 2) {
      setParams((state) => {
        return {
          ...state,
          county_id: v
        }
      })
    } else if (smallTabIndex === 3) {
      setParams((state) => {
        return {
          ...state,
          industry_type_id: v
        }
      })
    }
  }

  const getSelectOptionsRequest = useCallback(async () => {
    try {
      const res = await Promise.all([
        getAdmList({ adm_level: '3' }),
        getIndustryList()
      ])
      setSelectData(res)
    } catch (error) {
      console.log(error, '--')
    }
  }, [])

  useEffect(() => {
    getSelectOptionsRequest()
  }, [getSelectOptionsRequest])

  useEffect(() => {
    setSelectOptions([])
    if (selectData.length) {
      let index = smallTabIndex === 2 ? 0 : smallTabIndex === 3 ? 1 : 0
      let pots = []
      if (smallTabIndex === 2) {
        pots = selectData[index]?.map((item) => ({
          value: item.county_id,
          title: item.county_name
        }))
      } else if (smallTabIndex === 3) {
        pots = selectData[index]?.map((item) => ({
          value: item.industry_type_id,
          title: item.industry_type
        }))
      }
      setSelectOptions(pots)
    }
  }, [selectData, smallTabIndex])

  useEffect(() => {
    getHomeRequestTask()
  }, [getHomeRequestTask])

  const generateLineOptions = useCallback(
    (data, title) => {
      if (timeList && data) {
        const option = {
          title: {
            text: title,
            left: 'center',
            textStyle: {
              color: '#E2F0FF',
              fontSize: 12
            },
            padding: 10
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
            }
          },

          xAxis: {
            type: 'category',
            data: timeList,
            axisLabel: {
              fontSize: 10,
              fontFamily: 'ArialMT',
              color: '#E2F0FF',
              rotate: 20 // 文本旋转角度
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#979797',
                opacity: 0.32
              }
            }
          },
          yAxis: {
            type: 'value',
            name: 'kw·h',
            nameTextStyle: {
              align: 'right',
              color: '#E2F0FF',
              verticalAlign: 'top'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#979797',
                opacity: 0.32
              }
            },
            axisLabel: {
              fontSize: 10,
              color: '#E2F0FF'
            }
          },
          grid: {
            top: 30,
            bottom: 20,
            right: '5px'
          },
          series: [
            {
              type: 'line',
              data: data,
              smooth: true,
              lineStyle: {
                color: '#72e3ea'
              },
              itemStyle: {
                normal: {
                  color: '#72e3ea', //折线点的颜色
                  borderColor: '#72e3ea', //拐点边框颜色
                  borderWidth: 0 //拐点边框大小
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
        return option
      }
      return {}
    },
    [timeList]
  )

  useEffect(() => {
    setYieldOptions(null)
    if (yieldList) {
      setYieldOptions(generateLineOptions(yieldList, '产污用电趋势'))
    }
    if (twoList) {
      setTwoOptions(generateLineOptions(twoList, '产治污用电趋势'))
    }
  }, [smallTabIndex, yieldList, twoList, generateLineOptions])

  return (
    <div className="EleInfo MapItem">
      <MapCard title="用电趋势" pos="left" extra={getTimer}>
        <div className="EleInfo-tabContainer">
          <MapSmallTab
            tabs={tabs1}
            defaultIndex={smallTabIndex}
            onChange={(_, index) => setSmallTabIndex(index)}
          />
          {smallTabIndex !== 1 ? (
            <Select
              size="small"
              placeholder={`请选择`}
              value={getSelectValue}
              onChange={(v) => onChangeType(v)}
            >
              {selectOptions.map((item) => {
                return (
                  <Select.Option key={item.value} value={item.value}>
                    {item.title}
                  </Select.Option>
                )
              })}
            </Select>
          ) : null}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ height: '50%' }}>
            <Echarts option={yieldOptions} />
          </div>
          <div style={{ height: '50%' }}>
            <Echarts option={twoOptions} />
          </div>
        </div>
      </MapCard>
    </div>
  )
}

export default EleInfo
