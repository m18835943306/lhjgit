import React, { useState, useRef, useEffect } from 'react'
import Echarts from '&/baseUI/EChartsUI'
import { Select, Button, DatePicker } from 'antd'
import dayjs from 'dayjs'
import './index.scss'
const PowerConsumption = ({ paramsData, setParamsData, onQueryTime, data }) => {
  const [option, setoption] = useState({})
  const [options, setoptions] = useState({})
  useEffect(() => {
    const option = {
      xAxis: {
        type: 'category',
        data: data?.data_up?.time_list || []
      },
      legend: {
        data: ['日用电量']
      },
      yAxis: {
        type: 'value',
        name: '单位（kW·h）',
        min: 0,
        // max:data?.data_down?.max_data||"">data?.data_up?.max_data||""?data?.data_down?.max_data+10||"":data?.data_up?.max_data+10||""
        max:
          data?.data_down?.max_data > data?.data_up?.max_data
            ? data?.data_down?.max_data + 10
            : data?.data_up?.max_data + 10
      },
      toolbox: {
        show: true,
        right: '20px',
        feature: {
          // 下载保存为图片
          saveAsImage: {
            show: true,
            title: '下载'
          }
        }
      },
      grid: {
        left: '5%',
        top: '10%',
        bottom: '6%',
        right: '5%'
      },
      series: [
        {
          name: '日用电量',
          data: data?.data_up?.data_list || [],
          type: 'line',
          smooth: true,
          markLine: {
            data: [
              {
                type: 'max',
                lineStyle: {
                  color: 'blue'
                }
              },
              {
                name: '阈值',
                yAxis: data?.data_down?.max_data || '',
                // yAxis: 100,
                lineStyle: {
                  color: '#fb7603'
                }
              }
            ]
          },
          itemStyle: {
            color: '#bad9fc'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#bad9fc' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#eff5fe' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    const options = {
      xAxis: {
        type: 'category',
        data: data?.data_down?.time_list || []
      },
      yAxis: {
        type: 'value',
        name: '单位（kW·h）',
        min: 0,
        // max:data?.data_down?.max_data||"">data?.data_up?.max_data||""?data?.data_down?.max_data+10||"":data?.data_up?.max_data+10||""
        max:
          data?.data_down?.max_data > data?.data_up?.max_data
            ? data?.data_down?.max_data + 10
            : data?.data_up?.max_data + 10
      },
      legend: {
        data: ['日用电量']
      },
      toolbox: {
        show: true,
        right: '20px',
        feature: {
          // 下载保存为图片
          saveAsImage: {
            show: true,
            title: '下载'
          }
        }
      },
      grid: {
        left: '5%',
        top: '10%',
        bottom: '6%',
        right: '5%'
      },
      series: [
        {
          name: '日用电量',
          data: data?.data_down?.data_list || [],
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#ffdec1'
          },
          markLine: {
            data: [
              {
                type: 'max',
                lineStyle: {
                  color: '#fd7904'
                }
              },
              {
                name: '阈值',
                yAxis: data?.data_up?.max_data || '',
                lineStyle: {
                  color: 'blue'
                }
              }
            ]
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#ffdec1' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#fff5ed' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
    setoption(option)
    setoptions(options)
  }, [data])
  const onQueryChange = (v, t) => {
    if (t === 'time' && Array.isArray(v)) {
      const st = v[0].format('YYYY-MM-DD 00:00:00')
      const et = v[1].format('YYYY-MM-DD 00:00:00')
      setParamsData((state) => {
        state.start_time_up = st
        state.end_time_up = et
        return {
          ...state
        }
      })
      onQueryTime && onQueryTime(paramsData)
    }
    if (t === 'timeother' && Array.isArray(v)) {
      const stother = v[0].format('YYYY-MM-DD 00:00:00')
      const etother = v[1].format('YYYY-MM-DD 00:00:00')
      setParamsData((state) => {
        state.start_time_down = stother
        state.end_time_down = etother
        return {
          ...state
        }
      })
      onQueryTime && onQueryTime(paramsData)
    }
  }

  return (
    <div className="powerConsumption">
      <div className="powerConsumption-top">
        <div className="powerConsumption-top-time">
          <div className="powerConsumption-top-time-picker">
            时间：
            <DatePicker.RangePicker
              showNow
              defaultValue={[
                dayjs(paramsData.start_time_up),
                dayjs(paramsData.end_time_up)
              ]}
              value={[
                dayjs(paramsData.start_time_up),
                dayjs(paramsData.end_time_up)
              ]}
              //   format={dateFormatsData}
              onChange={(v) => {
                onQueryChange(v, 'time')
              }}
            />
          </div>
        </div>
        <div className="powerConsumption-top-eachers">
          <Echarts option={option}  />
        </div>
      </div>
      <div className="powerConsumption-bottom">
        <div className="powerConsumption-bottom-time">
          <div className="powerConsumption-bottom-time-picker">
            时间：
            <DatePicker.RangePicker
              showNow
              defaultValue={[
                dayjs(paramsData.start_time_down),
                dayjs(paramsData.end_time_down)
              ]}
              value={[
                dayjs(paramsData.start_time_down),
                dayjs(paramsData.end_time_down)
              ]}
              //   format={dateFormatsData}
              onChange={(v) => {
                onQueryChange(v, 'timeother')
              }}
            />
          </div>
        </div>
        <div className="powerConsumption-bottom-eachers">
          <Echarts option={options}  />
        </div>
      </div>
    </div>
  )
}
export default PowerConsumption
