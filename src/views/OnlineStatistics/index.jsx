import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import Tabs from './Tabs'
import Rank from './Rank'
import Statistics from './Statistics'
import { getDeviceOnlineRatio, getOnlinetrend } from '&/api/electricity'
import dayjs from 'dayjs'
import './index.scss'
import Container from '@/appComponents/Container'
const OnlineStatistics = () => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [check, setCheck] = useState('1')

  const [time, setTime] = useState({
    startTime: dayjs().format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().format('YYYY-MM-DD 23:59:59')
  })
  const [barChart, setBarChart] = useState()
  const [entData, setEntData] = useState()
  const [devData, setDevData] = useState()
  const [tableChart, setTableChart] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [lineData, setLineData] = useState()
  useEffect(() => {
    handlyQuest()
  }, [check])
  const handlyQuest = async () => {
    setIsLoading(true)
    let json = {
      project_id: value?.project_id,
      type: '0'
    }
    let params = {
      project_id: value?.project_id,
      type: '1',
      start_time: time.startTime,
      end_time: time.endTime
    }
    const res = await getDeviceOnlineRatio(check == '1' ? json : params)
    let jsons = {
      type: '0'
    }
    let parames = {
      type: '1',
      start_time: time.startTime,
      end_time: time.endTime
    }
    const result = await getOnlinetrend(check == '1' ? jsons : parames)
    setBarChart(res?.bar_chart)
    setEntData(res?.ent_data)
    setDevData(res?.dev_data)
    setTableChart(res?.table_chart)
    setLineData(result)

    if (res && result) setIsLoading(false)
  }
  return (
    <Container>
      <Container.ContainerContent>
        <Spin tip="Loading......" spinning={isLoading}>
          <Tabs
            tabIndex={check}
            setTabIndex={setCheck}
            time={time}
            setTime={setTime}
            queryEvent={handlyQuest}
          />

          <Statistics
            barChart={barChart}
            tableChart={tableChart}
            lineData={lineData}
          ></Statistics>

          <Rank check={check} entData={entData} devData={devData}></Rank>
        </Spin>
      </Container.ContainerContent>
    </Container>
  )
}
export default OnlineStatistics
