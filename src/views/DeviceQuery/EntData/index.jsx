import React, { useState, useEffect, useContext } from 'react'
import { Spin } from 'antd'
import { Card } from '&/appComponents/Antd'
import Filter from './Filter'
import EchartsData from './EchartsData'
import CanvasImage from './CanvasImage'
import Info from './Info'
import { getRealtimeMonitor } from '&/api/electricity'
import dayjs from 'dayjs'
import { Context } from '../context'
import './index.scss'

const EntData = ({ devCodeList, devDataCode }) => {
  const { value, entId, devTypes } = useContext(Context)
  const [refresh, setRefresh] = useState(false)
  const [chartData, setChartData] = useState()
  const [chartType, setChartType] = useState('0')
  const [loading, setLoading] = useState(false)
  const dateFormat = 'YYYY-MM-DD HH:mm:00'
  const time = dayjs().format(dateFormat)
  const timestr = time.slice(14, 16)
  const timenum = Number(timestr) % 15
  const resultnum = Number(timestr) - timenum
  const e =
    resultnum == 0 ? `YYYY-MM-DD HH:00:00` : `YYYY-MM-DD HH:${resultnum}:00`
  const [paramsData, setParamsData] = useState({
    project_id: value.project_id,
    start_time: dayjs().subtract(1, 'day').format(e),
    end_time: dayjs().format(e),
    data_type_id: 8,
    time_type: '1',
    format_type: 1
  })

  const [selectedDevTypes, setSelectedDevTypes] = useState([])

  // 获取产治污折线数据
  const getData = async () => {
    if (devCodeList) {
      setLoading(true)
      setRefresh(false)
      const data = await getRealtimeMonitor({
        ...paramsData,
        get_warn: 1,
        dev_code_list: devCodeList
      })
      setChartData(data)
      setLoading(false)
      setRefresh(true)
    }
  }
  useEffect(() => {
    if (devCodeList) {
      getData()
    }
  }, [devCodeList])

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
  }, [entId, devTypes])
  return (
    <div className="EntData">
      <Spin style={{ height: '100%' }} tip="Loading......" spinning={loading}>
        <section>
          <Filter
            onQuery={getData}
            paramsData={paramsData}
            setParamsData={setParamsData}
            chartType={chartType}
            setChartType={setChartType}
            selectedDevTypes={selectedDevTypes}
            setSelectedDevTypes={setSelectedDevTypes}
          />
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#ccc',
              marginBottom: '10px'
            }}
          ></div>
          {refresh && (
            <EchartsData
              data={chartData}
              chartType={chartType}
              selectedDevTypes={selectedDevTypes}
            />
          )}
        </section>
        <section className="EntData_second" style={{ gap: 10 }}>
          <Card size="small" title="企业基础信息">
            <Info ent_id={entId} />
          </Card>
          <Card
            style={{ flex: 1 }}
            bodyStyle={{ height: 'calc(100% - 38px)' }}
            size="small"
            title="企业关系图"
          >
            <CanvasImage ent_id={entId} devDataCode={devDataCode} />
          </Card>
        </section>
      </Spin>
    </div>
  )
}

export default EntData
