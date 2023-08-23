import React, { useEffect, useState, useImperativeHandle } from 'react'
import { Row, Col } from 'antd'
import dayjs from 'dayjs'
import Echarts from '&/baseUI/EChartsUI'
import { Card } from '&/appComponents/Antd'
import { options } from './options'
import {
  getMacroElecRegionCumlative,
  getMacroElecRegionTrends
} from '&/api/electricity'
import _ from 'lodash'
import './index.scss'
const Charts = ({ params, onRef }) => {
  const [chart, setChart] = useState({})
  const [regionData, setRegionData] = useState({})
  const [len, setLen] = useState([...new Array(10).keys()])
  const [values, setValues] = useState([])
  const generationP = (params) => {
    const p = {}
    for (const key in params) {
      if (params[key]) {
        p[key] = params[key]
      }
    }
    return p
  }
  const loadCumlative = async () => {
    const data = await getMacroElecRegionCumlative(generationP(params))
    const { value } = data
    const rate = Math.max(...value) / 10
    const items = value
      ?.map((item) => Math.ceil(item / rate))
      ?.map((v) => (v > 10 ? 10 : !v ? 0 : v))
    setValues(items)
    setRegionData(data)
  }
  const loadTrends = async () => {
    const { values = [], time_list = [] } = await getMacroElecRegionTrends(
      generationP(params)
    )
    options.xAxis.data = time_list?.map((item) => dayjs(item).format('MM-DD'))
    options.series[0].data = values?.map((item) => (item === -99 ? 0 : item))
    setChart(_.cloneDeep(options))
  }
  useEffect(() => {
    if (Object.keys(params).length) {
      loadCumlative()
      loadTrends()
    }
  }, [])

  useImperativeHandle(onRef, () => {
    return {
      loadCumlative,
      loadTrends
    }
  })

  const colors = [
    {
      index: 0,
      color: '#d43030'
    },
    {
      index: 1,
      color: '#ff8d1a'
    },
    {
      index: 1,
      color: '#ffeb3b'
    }
  ]

  return (
    <div className="Charts">
      <Row gutter={8}>
        <Col span={18}>
          <Card size="small" title="线索数量变化趋势">
            <Echarts height={250} option={chart} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" title="线索数量各区分布">
            <ul className="Charts_region">
              {regionData.county_list?.map((item, i) => (
                <li className="Charts_region__item">
                  <div className="Charts_region__label">{item.county_name}</div>
                  <div className="Charts_region__diagram">
                    <div className="diagram_value">
                      {[...new Array(values[i]).keys()]?.map(() => (
                        <span
                          className="Charts_region__diagram--item"
                          style={{
                            backgroundColor: colors[i]?.color
                          }}
                        ></span>
                      ))}
                    </div>
                    <div className="diagram_bg">
                      {len?.map(() => (
                        <span
                          className="Charts_region__diagram--item"
                          style={{
                            backgroundColor: colors[i]?.color,
                            opacity: 0.2
                          }}
                        ></span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="Charts_region__value"
                    style={{
                      color: colors[i]?.color
                    }}
                  >
                    <span>{`${regionData.value[i]}`}</span>
                    <span>{`${Number(
                      regionData.ratio[i] * 100
                    ).toFixed()}%`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Charts
