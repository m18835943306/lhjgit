import React, { useState, useEffect, useCallback } from 'react'
import { option } from './echart_config'
import Filter from './Filter'
import { getMonitorData } from '&/api/electricity'
import dayjs from 'dayjs'
import _ from 'lodash'
import Echarts from '&/baseUI/EChartsUI'
import { Card } from '&/appComponents/Antd'
import {
  SUMMATION_COLOR,
  PRODUCT_COLOR,
  CONTROL_COLOR
} from '&/constantces/colors'
import './index.scss'

const SocketUseChart = ({ setLoading, contextValue: { ent_id } }) => {
  const values = JSON.parse(localStorage.getItem('user'))
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'
  const [charts, setCharts] = useState([])
  const [paramsData, setParamsData] = useState({
    start_time: dayjs().startOf('day').format(dateFormat),
    end_time: dayjs().format(dateFormat),
    data_type_id: 8,
    project_id: values?.project_id
  })
  const [devTypes, setDevTypes] = useState([])
  const [selectedDevTypes, setSelectedDevTypes] = useState([])
  const [devData, setDevData] = useState([])
  const [times, setTimes] = useState([])

  const defaultCharts = [
    {
      label: '企业总表',
      value: 1,
      colors: SUMMATION_COLOR
    },

    {
      label: '产污设施',
      value: 2,
      colors: PRODUCT_COLOR
    },
    {
      label: '治污设施',
      value: 3,
      colors: CONTROL_COLOR
    },
    {
      label: '间接用电',
      value: 4
    },
    {
      label: '产治一体',
      value: 5
    }
  ]

  const getData = async (params) => {
    // params.project_id=values?.project_id
    if (ent_id) params.ent_id = ent_id
    const {
      summation_list = [],
      production_list = [],
      pollution_control_list = [],
      all_in_one_list = [],
      indirect_list = [],
      time_list = []
    } = await getMonitorData(params)
    getDevTypes([
      ...summation_list,
      ...production_list,
      ...pollution_control_list,
      ...all_in_one_list,
      ...indirect_list
    ])
    const list = [
      summation_list,
      production_list,
      pollution_control_list,
      indirect_list,
      all_in_one_list
    ]
    setDevData(list)
    setTimes(time_list)
    // setChartOptions(list, time_list, devTypes)
    setLoading(false)
  }

  const setChartOptions = useCallback(
    (list, times, selectedDevType) => {
      option.xAxis.data = times.map((time) => dayjs(time).format('MM-DD HH:mm'))
      const charts = []
      defaultCharts.forEach((c, i) => {
        if (selectedDevType.includes(c.value)) {
          const series = getOption(list, i)
          if (c.colors) {
            option.color = c.colors
          }
          option.series = series
          option.title = {
            // text: (summation_list[0] || {})['data_type'],
            textStyle: {
              fontSize: 14
            }
          }
          const o = _.cloneDeep(option)
          charts.push({
            label: c.label,
            option: o
          })
        }
        setCharts(charts)
      })
    },
    [defaultCharts]
  )

  const getDevTypes = (list) => {
    const result = list
      .map((item) => {
        return {
          dev_type: item.dev_type,
          dev_type_name: item.dev_type_name
        }
      })
      .reduce((pre, cur) => {
        var exists = pre.find(
          (item) => JSON.stringify(item) === JSON.stringify(cur)
        )
        if (!exists) {
          pre.push(cur)
        }
        return pre
      }, [])
    setDevTypes(result)
  }

  const handleNullData = (v) => {
    v = Number(v)
    if (v === -99) {
      v = '-'
    }
    return v
  }

  const getOption = (list, i) => {
    if (!list[i] || !list[i].length) {
      return [{ data: [], type: 'line', name: '暂无数据' }]
    }
    const series = []
    list[i].map((item, index) => {
      const values = item.values.map(handleNullData)
      series[index] = {
        data: values,
        type: 'line',
        name: item.dev_name
      }
    })
    return series
  }
  useEffect(() => {
    getData(paramsData)
  }, [paramsData])

  useEffect(() => {
    setSelectedDevTypes([])
    let devs = []
    devTypes.forEach((dev) => {
      if ([1, 2, 3].includes(dev.dev_type)) {
        devs.push(dev.dev_type)
      } else if (devTypes.length <= 3) {
        devs.push(dev.dev_type)
      }
    })
    setSelectedDevTypes(devs)
  }, [devTypes])

  useEffect(() => {
    if (devData.length && times.length) {
      setChartOptions(devData, times, selectedDevTypes)
    }
  }, [selectedDevTypes, times, devData])

  const onQuery = async (params) => {
    setLoading(true)
    await getData(params)
  }
  return (
    <div className="SocketUseChart">
      <Filter
        onQuery={onQuery}
        paramsData={paramsData}
        setParamsData={setParamsData}
        devTypes={devTypes}
        selectedDevTypes={selectedDevTypes}
        setSelectedDevTypes={setSelectedDevTypes}
      />
      <div className="SocketUseChart_box">
        {charts.map((item) => (
          // <ChartItem
          //   key={item.label}
          //   label={item.label}
          //   color={item.color}
          //   option={item.option}
          //   height="24vh"
          // />
          <Card
            style={{ flex: 1, maxHeight: '350px', minHeight: '350px' }}
            bodyStyle={{ height: '312px' }}
            size="small"
            title={item.label}
          >
            <Echarts option={item.option} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SocketUseChart
