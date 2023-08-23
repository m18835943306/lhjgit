import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext
} from 'react'
import Echarts from '&/baseUI/EChartsUI'
import { Card } from '&/appComponents/Antd'
import { getDeviceRelList } from '&/api/electricity'
import _ from 'lodash'
import dayjs from 'dayjs'
import defaultOptions from './options'
import { color, color1, color2 } from './colors'
import { Context } from '../../context'
import './index.scss'

const EchartsData = ({ data = {}, chartType = '0', selectedDevTypes = [] }) => {
  const { devData, value, entId } = useContext(Context)
  const [relList, setRelList] = useState([])
  const [options, setOptions] = useState({})
  const [options1, setOptions1] = useState({})
  const [options2, setOptions2] = useState({})
  const [options3, setOptions3] = useState({})
  const [options4, setOptions4] = useState({})

  const getDevRelList = async () => {
    let jsonparam = {
      project_id: value?.project_id,
      ent_id: entId
    }
    const res = await getDeviceRelList(jsonparam)
    setRelList(res)
  }

  const getDevsOfDevType = useCallback(() => {
    let arr = []
    if (Object.keys(devData).length) {
      for (const key in devData) {
        // 2 产污
        // 3 治污
        // 4 间接用电
        // 5 产治一体
        if ([2, 3, 4, 5].includes(Number(key))) {
          arr.push(...devData[key])
        }
      }
      return arr
    }
    return arr
  }, [devData])

  const getSeries = (list = [], warn_info = [], chartType) => {
    const warnList = warn_info.map((warn) => {
      return {
        ...warn,
        start_time: dayjs(warn.start_time).format('MM-DD HH:mm'),
        end_time: dayjs(warn.end_time).format('MM-DD HH:mm')
      }
    })
    const getWarnLevelColor = (level) => {
      return level == 1 ? '#d02d22' : level == 2 ? '#e28336' : '#f6ca49'
    }
    const series = list.map((item) => ({
      type: 'line',
      smooth: true,
      name: item.dev_name,
      dev_id: item.dev_id,
      data: item.values.map((i) => {
        return i < 0 ? '--' : i
      }),
      markArea:
        chartType === '2'
          ? {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: warnList
                .filter((w) => w.dev_id === item.dev_id)
                .map((warn) => {
                  return [
                    {
                      xAxis: warn.start_time,
                      itemStyle: {
                        color: getWarnLevelColor(warn.warn_level)
                      }
                    },
                    {
                      xAxis: warn.end_time,
                      itemStyle: {
                        color: getWarnLevelColor(warn.warn_level)
                      }
                    }
                  ]
                })
            }
          : false,

      markLine:
        chartType === '1'
          ? {
              symbol: ['none', 'none'],
              label: {
                formatter: function () {
                  return ''
                }
              },
              data: time_list
                .filter((item) => [5, 6].includes(dayjs(item).weekday()))
                .map((time) => {
                  return {
                    xAxis: dayjs(time).format('MM-DD HH:mm'),
                    name: '周末',
                    lineStyle: {
                      color: '#fb7603'
                    }
                  }
                })
            }
          : false
    }))
    const lenged = list?.map((item) => ({
      name: item.dev_name,
      dev_type: item.dev_type,
      dev_id: item.dev_id
    }))
    return {
      series,
      lenged
    }
  }

  const getToolTip = (series) => {
    return (params) => {
      if (params.componentType == 'markArea') {
        const filterWarnData =
          warn_info.filter(
            (warn) => warn.dev_id === series[params.seriesIndex].dev_id
          ) || {}
        return (
          '企业名称：' +
          filterWarnData[params.dataIndex].ent_name +
          '<br/>触发点位：' +
          filterWarnData[params.dataIndex].dev_name +
          '<br/>点位类型：' +
          filterWarnData[params.dataIndex].dev_type_name +
          '<br/>报警类型：' +
          filterWarnData[params.dataIndex].dev_type +
          '<br/>报警级别：' +
          filterWarnData[params.dataIndex].warn_level +
          '<br/>报警时间：' +
          filterWarnData[params.dataIndex].start_time +
          '<br/>持续时长：' +
          filterWarnData[params.dataIndex].duration +
          '<br/>报警状态：' +
          filterWarnData[params.dataIndex].release_status
        )
      } else {
        return (
          params.seriesName +
          '<br/>时间:' +
          params.name +
          '<br/>数值:' +
          params.value
        )
      }
    }
  }

  const getRelKey = useCallback(
    (curentKey, dev_type) => {
      let keys = []
      // 点击的key
      let threshKey =
        dev_type === 2 ? 'yield_dev_id' : dev_type === 3 ? 'treat_dev_id' : ''
      // 映射的key
      let mapKey =
        dev_type === 2 ? 'treat_dev_id' : dev_type === 3 ? 'yield_dev_id' : ''

      if (threshKey && mapKey) {
        const ks = relList
          .filter((item) => item[threshKey] === curentKey)
          .map((rel) => rel[mapKey])
        keys = [...new Set([curentKey, ...ks])]
        const relKeys = keys.reduce((cur, item) => {
          cur.push({ dev_id: item })
          return cur
        }, [])

        return relKeys
      }
      return []
    },
    [relList]
  )

  const setSeleted = (lenged, devs) => {
    const setLengedSeleted = (keys = []) => {
      return lenged.reduce((cur, item) => {
        cur[item.name] = false
        keys.forEach((e) => {
          if (item.dev_id === e.dev_id) {
            cur[item.name] = true
          }
        })
        return cur
      }, {})
    }

    // 点击设备
    if (devs && devs.length && devs.every((dev) => dev.clickType === 'dev')) {
      const { dev_type, dev_id } = devs[0]
      const keys = getRelKey(dev_id, dev_type)
      return setLengedSeleted(keys)
    }
    // 点击分组
    if (devs && devs.length) {
      return setLengedSeleted(devs)
    }
    return false
  }
  const {
    summation_list = [],
    production_list = [],
    pollution_control_list = [],
    all_in_one_list = [],
    indirect_list = [],
    time_list = [],
    warn_info = []
  } = data
  const times = useMemo(() => {
    return time_list.map((time) => dayjs(time).format('MM-DD HH:mm'))
  }, [time_list])
  // 总电
  useEffect(() => {
    setOptions({})
    if (summation_list && summation_list.length) {
      const { series, lenged } = getSeries(summation_list, warn_info, null)
      const options = _.cloneDeep(defaultOptions)
      options.series = series
      options.xAxis.data = times
      options.legend.data = lenged
      options.color = color2
      setOptions(options)
    }
  }, [summation_list, warn_info, times])
  // 产治一体
  useEffect(() => {
    setOptions3({})
    if (all_in_one_list && all_in_one_list.length) {
      const devs = getDevsOfDevType()
      const { series, lenged } = getSeries(all_in_one_list, warn_info, null)
      const options = _.cloneDeep(defaultOptions)
      options.series = series
      options.xAxis.data = times
      // options.legend.data = lenged
      options.legend = {
        data: lenged,
        selected: setSeleted(lenged, devs)
      }
      setOptions3(options)
    }
  }, [all_in_one_list, warn_info, times, getDevsOfDevType])
  // 间接用电
  useEffect(() => {
    setOptions4({})
    if (indirect_list && indirect_list.length) {
      const devs = getDevsOfDevType()
      const { series, lenged } = getSeries(indirect_list, warn_info, null)
      const options = _.cloneDeep(defaultOptions)
      options.series = series
      options.xAxis.data = times
      // options.legend.data = lenged
      options.legend = {
        data: lenged,
        selected: setSeleted(lenged, devs)
      }
      setOptions4(options)
    }
  }, [indirect_list, warn_info, times, getDevsOfDevType])
  // 产污设施
  useEffect(() => {
    setOptions1({})
    if (production_list && production_list.length) {
      const devs = getDevsOfDevType()
      const { series, lenged } = getSeries(
        production_list,
        warn_info,
        chartType
      )
      const options = _.cloneDeep(defaultOptions)
      options.series = series
      options.xAxis.data = times
      options.color = color
      options.legend = {
        data: lenged,
        selected: setSeleted(lenged, devs)
      }
      if (chartType === '2') {
        options.tooltip.trigger = 'item'
        options.tooltip.formatter = getToolTip(series)
      }
      setOptions1(options)
    }
  }, [production_list, warn_info, times, getDevsOfDevType, chartType])
  // 治污设施
  useEffect(() => {
    setOptions2({})
    if (pollution_control_list && pollution_control_list.length) {
      const devs = getDevsOfDevType()
      const { series, lenged } = getSeries(
        pollution_control_list,
        warn_info,
        chartType
      )
      const options = _.cloneDeep(defaultOptions)
      options.series = series
      options.xAxis.data = times
      options.color = color1
      options.legend = {
        data: lenged,
        selected: setSeleted(lenged, devs)
      }
      if (chartType === '2') {
        options.tooltip.trigger = 'item'
        options.tooltip.formatter = getToolTip(series)
      }
      setOptions2(options)
    }
  }, [pollution_control_list, warn_info, times, getDevsOfDevType, chartType])

  const isShowCard = useCallback(
    (devType) => {
      return selectedDevTypes.includes(devType)
    },
    [selectedDevTypes]
  )

  useEffect(() => {
    if (entId) {
      getDevRelList()
    }
  }, [entId])
  if (!data) return null
  return (
    <div className="EchartsData">
      {isShowCard(1) ? (
        <Card
          style={{ flex: 1, maxHeight: '350px', minHeight: '350px' }}
          bodyStyle={{ height: 'calc(100% - 38px)' }}
          size="small"
          title="企业总电"
        >
          <Echarts option={options} />
        </Card>
      ) : null}

      {isShowCard(2) ? (
        <Card
          style={{ flex: 1, maxHeight: '350px', minHeight: '350px' }}
          bodyStyle={{ height: 'calc(100% - 38px)' }}
          size="small"
          title="产污设施"
        >
          <Echarts option={options1} />
        </Card>
      ) : null}
      {isShowCard(3) ? (
        <Card
          style={{ flex: 1, maxHeight: '350px', minHeight: '350px' }}
          bodyStyle={{ height: 'calc(100% - 38px)' }}
          size="small"
          title="治污设施"
        >
          <Echarts option={options2} />
        </Card>
      ) : null}
      {isShowCard(4) ? (
        <Card
          style={{ flex: 1, maxHeight: '350px', minHeight: '350px' }}
          bodyStyle={{ height: 'calc(100% - 38px)' }}
          size="small"
          title="间接用电"
        >
          <Echarts option={options4} />
        </Card>
      ) : null}
      {isShowCard(5) ? (
        <Card
          style={{ flex: 1, maxHeight: '350px', minHeight: '350px' }}
          bodyStyle={{ height: 'calc(100% - 38px)' }}
          size="small"
          title="产治一体"
        >
          <Echarts option={options3} />
        </Card>
      ) : null}
    </div>
  )
}
export default EchartsData
