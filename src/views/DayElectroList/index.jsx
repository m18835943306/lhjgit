import React, { useState, useEffect } from 'react'
import { Spin, Row, Col, Radio } from 'antd'
import List from './List'
import DayEachers from './DayEachers'
import HourEachers from './HourEachers'
import Desc from './Description'
import Tabs from './Tabs'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import {
  getMacroElecEnterpriseDetail,
  getMacroElecEnterpriseDetailDay,
  getMacroElecEnterpriseDetailHour
} from '&/api/electricity'
import Container from '@/appComponents/Container'
import './index.scss'

const DayElectroList = () => {
  const record = useSelector((state) => state.getRecordReducer)
  const values = JSON.parse(localStorage.getItem('user'))
  const [paramsData] = useState({
    project_id: values.project_id,
    data_time: record.date
      ? dayjs(record.date).format('YYYY-MM-DD 00:00:00')
      : dayjs().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'),
    type: 1
  })
  const [delit, setDelit] = useState({})
  // tree tab
  const [tap, setTap] = useState(1)
  // Radio Tab
  const [radioTab, setRadioTab] = useState(1)
  const [valueText, setValueText] = useState()
  const [dayEachers, setDayEachers] = useState({})
  const [hourEachers, setHourEachers] = useState({})

  useEffect(() => {
    const requesTask =
      radioTab === 1
        ? getMacroElecEnterpriseDetailDayRequest
        : getMacroElecEnterpriseDetailHourRequest

    const json = {
      ent_name: valueText,
      project_id: paramsData.project_id,
      data_time: paramsData.data_time
    }
    if (valueText) {
      requesTask(json)
    }
  }, [radioTab, paramsData, valueText])

  useEffect(() => {
    if (delit.has_hour !== 1) {
      setRadioTab(1)
    }
  }, [delit.has_hour])

  const handleClick = (value) => {
    setValueText(value)
    const params = { project_id: values.project_id, ent_name: value }
    getMacroElecEnterpriseDetailRequest(params)
  }
  //  上方数据详情接口
  const getMacroElecEnterpriseDetailRequest = async (json) => {
    await getMacroElecEnterpriseDetail(json).then((res) => {
      setDelit(res)
    })
  }
  //宏观用电-数据汇总-企业详情-日用电-echarts图接口
  const getMacroElecEnterpriseDetailDayRequest = async (json) => {
    await getMacroElecEnterpriseDetailDay(json).then((res) => {
      if (res) {
        setDayEachers(res)
      }
    })
  }
  //宏观用电-数据汇总-企业详情-小时用电-echarts图接口
  const getMacroElecEnterpriseDetailHourRequest = async (json) => {
    await getMacroElecEnterpriseDetailHour(json).then((res) => {
      if (res) {
        setHourEachers(res)
      }
    })
  }
  return (
    <Container>
      <Container.ContainerContent>
        <div className="DayElectroList">
          <Row gutter={10}>
            <Col span={5}>
              <List click={handleClick} tap={tap} setTap={setTap}></List>
            </Col>
            <Col span={19}>
              <div className="DayElectroList_content">
                <Desc data={delit} />
                <Tabs
                  value={radioTab}
                  delit={delit}
                  onChange={(e) => setRadioTab(e.target.value)}
                />
                {radioTab === 1 ? (
                  <DayEachers dayEachers={dayEachers}></DayEachers>
                ) : (
                  <HourEachers hourEachers={hourEachers}></HourEachers>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container.ContainerContent>
      {/* <div className="DayElectroList"></div> */}
    </Container>
  )
}

export default DayElectroList
