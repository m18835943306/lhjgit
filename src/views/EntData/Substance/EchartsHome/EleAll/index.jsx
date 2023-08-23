import React, { useState } from 'react'
import Echarts from '&/baseUI/EChartsUI'
import { useEffect, useContext, useCallback } from 'react'
import { Context } from '../../context'
import { cloneDeep } from 'lodash';

const options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    show: true
  },
  grid: {
    top: 30,
    right: 30,
    left: 30,
    bottom: 20
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    name: 'kW·h',
    nameTextStyle: {
      align: 'right'
    },
    type: 'value'
  },
  series: []
};

const EleAll = ({ industryOn, areaOn }) => {
  const { eleData, entData, paramsData } = useContext(Context);
  const [option, setOption] = useState({});

  const getSeries = (list = []) => {
    return list.map(item => {
      return {
        type: 'line',
        smooth: true,
        data: item.data,
        name: item.name
      }
    })
  }

  const getOptions = (eleData, entData, industryOn, areaOn) => {
    const cloneOption = cloneDeep(options)
    const { data_info } = entData
    const { county_value, industry_value } = eleData
    const devData = data_info[paramsData.dev_type]
    const list = [{
      name: paramsData.dev_type,
      data: devData
    }]
    if (industryOn) {
      list.push({
        name: '行业均值',
        data: industry_value
      })
    }
    if (areaOn) {
      list.push({
        name: '区均值',
        data: county_value
      })
    }
    cloneOption.series = getSeries(list)
    return cloneOption
  }

  useEffect(() => {
    if (entData && eleData) {
      setOption({})
      setOption(getOptions(eleData, entData, industryOn, areaOn))
    }
  }, [entData, eleData, paramsData.dev_type, industryOn, areaOn])






  return (
    <div style={{height:'100%'}}>
      <Echarts option={option} width={'100%'} />
    </div>
  )
}

export default EleAll
