import React, { useState, useRef, useEffect } from 'react'
import Echarts from '&/baseUI/EChartsUI'
import { Select, Button, DatePicker } from 'antd'
import dayjs from 'dayjs'
import './index.scss'
const Heteroaxis = ({ paramsData, setParamsData, onQueryTime, data }) => {
  // console.log(data,"datadatadata");
  const [option, setoption] = useState({})
  const [options, setoptions] = useState({})
  useEffect(() => {
    if (Object.keys(paramsData).length > 0) {
      const option = {
        xAxis: {
          type: 'category',
          data: data?.data_up?.time_list || []
        },
        legend: {
          data: [
            `${dayjs(paramsData.start_time_up).format('YYYY-MM-DD')}~${dayjs(
              paramsData.end_time_up
            ).format('YYYY-MM-DD')}用电量日变化`
          ]
        },
        grid: {
          left: '5%',
          top: '10%',
          bottom: '6%',
          right: '5%'
        },
        toolbox: {
          show: true,
          right: '20px',
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
          type: 'value',
          name: '单位（kW·h）'
        },
        series: [
          {
            name: `${dayjs(paramsData.start_time_up).format(
              'YYYY-MM-DD'
            )}~${dayjs(paramsData.end_time_up).format(
              'YYYY-MM-DD'
            )}用电量日变化`,
            data: data?.data_up?.data_list || [],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#4590e6',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'black'
                  }
                }
              }
            }
          }
        ],
      }

      const options = {
        xAxis: {
          type: 'category',
          data: data?.data_down?.time_list || []
        },
        legend: {
          data: [
            `${dayjs(paramsData.start_time_down).format('YYYY-MM-DD')}~${dayjs(
              paramsData.end_time_down
            ).format('YYYY-MM-DD')}用电量日变化`
          ]
        },
        grid: {
          left: '5%',
          top: '10%',
          bottom: '6%',
          right: '5%'
        },
        toolbox: {
          show: true,
          right: '20px',
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
          type: 'value',
          name: '单位（kW·h）'
        },
        series: [
          {
            name: `${dayjs(paramsData.start_time_down).format(
              'YYYY-MM-DD'
            )}~${dayjs(paramsData.end_time_down).format(
              'YYYY-MM-DD'
            )}用电量日变化`,
            data: data?.data_down?.data_list || [],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ef994e',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'black'
                  }
                }
              }
            }
          }
        ],
      }
      setoption(option)
      setoptions(options)
    }
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
    <div className="Heteroaxis">
      <div className="Heteroaxis-top">
        <div className="Heteroaxis-top-time">
          <div className="Heteroaxis-top-time-picker">
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
        <div className="Heteroaxis-top-eachers">
          <Echarts option={option} />
        </div>
      </div>
      <div className="Heteroaxis-bottom">
        <div className="Heteroaxis-bottom-time">
          <div className="Heteroaxis-bottom-time-picker">
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
        <div className="Heteroaxis-bottom-eachers">
          <Echarts option={options} />
        </div>
      </div>
    </div>
  )
}
export default Heteroaxis
