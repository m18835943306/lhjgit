import React, { useState, useRef, useEffect } from 'react'
import Echarts from '&/baseUI/EChartsUI'
import dayjs from 'dayjs'
import { Select, Button, DatePicker } from 'antd'
import './index.scss'
const Coaxial = ({ paramsData, setParamsData, onQueryTimes, data }) => {
  const [option, setoption] = useState({})
  useEffect(() => {
    // console.log(paramsData,"paramsDataparamsDataparamsData");
    if (Object.keys(paramsData).length > 0) {
      const option = {
        xAxis: {
          type: 'category',
          data: data?.data_down?.time_list || []
        },
        legend: {
          data: [
            `${dayjs(paramsData.start_time_up).format('YYYY-MM-DD')}~${dayjs(
              paramsData.end_time_up
            ).format('YYYY-MM-DD')}用电量日变化`,
            `${dayjs(paramsData.start_time_down).format('YYYY-MM-DD')}~${dayjs(
              paramsData.end_time_down
            ).format('YYYY-MM-DD')}用电量日变化`
          ]
        },
        yAxis: {
          type: 'value',
          name: '单位（kW·h）'
        },
        grid: {
          left: '5%',
          top: '10%',
          bottom: '6%',
          right: '5%'
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
          },
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
        ]
      }
      setoption(option)
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
      onQueryTimes && onQueryTimes(paramsData)
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
      onQueryTimes && onQueryTimes(paramsData)
    }
  }
  return (
    <div className="Coaxial">
      <div className="Coaxial-time">
        <div className="Coaxial-time-container">
          <div className="Coaxial-time-one">
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
          <div className="Coaxial-time-two">
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
      </div>
      <div className="Coaxial-eachers">
        <Echarts option={option} />
      </div>
    </div>
  )
}
export default Coaxial
