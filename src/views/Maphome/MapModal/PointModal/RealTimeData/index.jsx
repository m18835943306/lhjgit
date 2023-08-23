import React, { useState, useEffect } from 'react'
import { Col, Row, Tree, DatePicker } from 'antd'
import Echarts from '&/baseUI/EChartsUI'
import { option } from './echart_config'
import sourceImg from '&/assets/images/imgs'
import './index.scss'
import Filter from './Filter'
import dayjs from 'dayjs'
import { getMonitorData } from '&/api/electricity'
import _ from 'lodash'

const RealTimeData = ({ devInfo, entInfo, relInfo }) => {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const [devIds, setDevIds] = useState('')
  const [treeData, setTreeData] = useState([])
  const [defaultKeys, setDefaultKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [options1, setOptions1] = useState({})
  const [options2, setOptions2] = useState({})
  const [devType, setDevType] = useState(null)
  const [cacheEventId, setCacheEventId] = useState(null)
  const [paramsData, setParamsData] = useState({
    project_id: user.project_id,
    start_time: dayjs().startOf('day').format(dateFormat),
    end_time: dayjs().format(dateFormat),
    data_type_id: 8,
    time_type: 1
  })
  const renderNodeIcon = (item) => {
    const src = item.if_online
      ? sourceImg.zhengchang
      : item.if_alarm
      ? sourceImg.baojing
      : sourceImg.lixian
    const Image = () => {
      return (
        <div>
          <img alt="" src={src} />
        </div>
      )
    }
    return Image
  }

  const generationTreeData = () => {
    const treeData = []
    const parent = {
      title: entInfo.ent_name,
      key: entInfo.ent_id,
      children: []
      // checkable: false,
    }
    devInfo.forEach((dev) => {
      parent.children.push({
        title: dev.dev_type_name,
        key: dev.dev_type,
        type: dev.dev_type,
        // checkable: false,
        children: dev.dev_list.map((item) => {
          return {
            title: item.dev_name,
            key: item.dev_id,
            parentKey: dev.dev_type,
            ids: item.dev_id + '',
            icon: renderNodeIcon(item)
          }
        })
      })
    })
    treeData.push(parent)
    setTreeData(treeData)
    setDefaultKeys([entInfo.ent_id])
    setSelectedKeys([entInfo.ent_id])
  }
  const getData = async (dev_type, dev_id_list) => {
    const json = _.cloneDeep(paramsData)
    if (dev_type) {
      json.dev_type = dev_type
    }
    if (dev_id_list) {
      json.dev_id_list = dev_id_list
    }
    if (entInfo.ent_id) {
      json.ent_id = entInfo.ent_id
    }
    const {
      time_list,
      summation_list,
      production_list,
      pollution_control_list
    } = await getMonitorData(json)
    option.xAxis.data = time_list?.map((time) =>
      dayjs(time).format('MM-DD HH:mm')
    )

    const o1 = getOption([...summation_list, ...production_list])
    const o2 = getOption(pollution_control_list)
    setOptions1(o1)
    setOptions2(o2)
    // setLoading(false);
  }
  const handleNullData = (v) => {
    v = Number(v)
    if (v === -99) {
      v = '-'
    }
    return v
  }
  const getOption = (list) => {
    const o = _.cloneDeep(option)

    const series = []
    list?.map((item, index) => {
      const values = item.values.map(handleNullData)
      series[index] = {
        data: values,
        type: 'line',
        name: item.dev_name
      }
    })
    o.series = series
    o.title = {
      // text: summation_list[0]['data_type'],
    }
    return o
  }

  useEffect(() => {
    if (paramsData && entInfo.ent_id) {
      getData(devType, devIds)
    }
  }, [paramsData, entInfo])

  useEffect(() => {
    if (devInfo.length) {
      generationTreeData()
    }
  }, [devInfo])

  const onSelect = (selectedKeys, info) => {
    const curentKey = Array.isArray(selectedKeys) ? selectedKeys.pop() : ''
    if (cacheEventId === info || !curentKey) {
      return
    }
    const threshKey = getRelKey(curentKey)
    const { type, ids } = info.node
    const paramIds = ids ? [curentKey, threshKey].filter((id) => id) : [ids]
    // 设置设备类型，接口调用
    setDevType(type)
    setDevIds(ids)
    setCacheEventId(curentKey)
    setSelectedKeys([curentKey, threshKey])
    getData(type, paramIds.join())
  }

  const getRelKey = (curentKey) => {
    let threshKey = ''
    const findObj =
      relInfo?.find(
        (rel) =>
          rel.treat_dev_id === curentKey || rel.yield_dev_id === curentKey
      ) || {}
    for (const [key, value] of Object.entries(findObj)) {
      if (value !== curentKey) {
        threshKey = key
        break
      }
    }
    return findObj[threshKey]
  }
  if (!defaultKeys.length) return null
  return (
    <div className="RealTimeData">
      <Row>
        <Col span={6}>
          <Tree
            showLine
            showIcon
            defaultExpandAll
            defaultExpandedKeys={defaultKeys}
            defaultSelectedKeys={defaultKeys}
            selectedKeys={selectedKeys}
            onSelect={onSelect}
            treeData={treeData}
            // checkable
            multiple
          />
        </Col>
        <Col span={18}>
          <div className="ReshengalTimeData_query">
            <Filter paramsData={paramsData} setParamsData={setParamsData} />
          </div>
          <div className="RealTimeData_body">
            <div className="RealTimeData_body_chart">
              <div className="RealTimeData_body_chart--title">
                企业总电/产污设施
              </div>
              <div className="RealTimeData_body_chart--chart red">
                <Echarts option={options1} group="charItem" />
              </div>
            </div>
            <div className="RealTimeData_body_chart">
              <div className="RealTimeData_body_chart--title">治污设施</div>
              <div className="RealTimeData_body_chart--chart greenYellow">
                <Echarts option={options2} group="charItem" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default RealTimeData
