import React, { useState, useEffect } from 'react'
import AirEcharts from './AirEcharts'
import List from './List'
import Dinaecharts from './Dinaecharts'
import PoliceEacharts from './PoliceEacharts'
import { getCertainTimeData } from '&/api/electricity'
import Container from '@/appComponents/Container'
import _ from "lodash"
import './index.scss'
const PlanAssessment = () => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [params, setParams] = useState({
    auditflag: '0',
    endTime: '',
    rankid: '110',
    startTime: '',
    timeType: '1',
    token: sessionStorage.getItem('tokenv2'),
    varid: '209002', //污染物Id
    admid: value.project_id == 32 ? 17 : value.project_id == 225 ? 1 : ''
  })
  const [paramsDian, setParamsDian] = useState({
    dian: '1' //电
  })
  const [paramsPolice, setParamsPolice] = useState({
    police: '1' //报警
  })
  const [values, setValues] = useState({})
  const [airX, setAirX] = useState([]) //空气质量X轴数据
  const [airY, setAirY] = useState([]) //空气质量y轴数据
  //  污染物
  const onQuery = async (param) => {
    if (param.startTime !== '' && param.startTime) {
      getCertainTimeDataRequest(param)
    }

  }
  //  污染物接口
  const getCertainTimeDataRequest = (params) => {
    getCertainTimeData(params).then((res) => {
      // console.log(res, 'resresresresresresres');
      setAirX(res?.ctime)
      setAirY(res?.list[0]?.vardata[0]?.value)
    })
  }
  // 电
  const onQueryDian = async (paramDian) => {
    await console.log(paramDian, 'paramDianparamDianparamDian')
  }
  //报警
  const onQueryPolice = async (paramPolice) => {
    await console.log(paramPolice, 'paramPoliceparamPolice')
  }
  const onClickText = (value) => {
    // console.log(value, 'valuevaluevaluevaluevaluevalue');
    setValues(value)
    setParams((state) => {
      state.endTime = value.endtime
      state.startTime = value.starttime
      return {
        ...state
      }
    })
  }
  useEffect(() => {
    if (params.startTime !== '' && params.startTime) {
      console.log(params);
      getCertainTimeDataRequest(params)
    }
  }, [params])

  return (
    <Container>
      {/* <Container.ContainerQuery >
     
      </Container.ContainerQuery> */}
      <Container.ContainerContent>
      <div className="planAssessment">
      <div className="planAssessment-left">
        <List click={onClickText}></List>
      </div>
      <div className="planAssessment-right">
      <div className="planAssessment-right-top">
          {values.starttime}启动重污染天气
          <span
            style={
              values.text == '红色预案'
                ? { color: 'red' }
                : values.text == '橙色预案'
                  ? { color: '#f2cbaa' }
                  : values.text == '黄色预案'
                    ? { color: 'yellow' }
                    : { color: 'black' }
            }
          >
            {values.text}
          </span>
          ，预警时间{values.starttime}~{values.endtime}
        </div>
        <div className="planAssessment-right-air">
          <AirEcharts
            params={params}
            setParams={setParams}
            onQuery={onQuery}
            airX={airX}
            airY={airY}
          ></AirEcharts>
        </div>
        <div className="planAssessment-right-dian">
          <Dinaecharts
            params={paramsDian}
            setParams={setParamsDian}
            onQuery={onQueryDian}
          ></Dinaecharts>
        </div>
        <div className="planAssessment-right-police">
          <PoliceEacharts
            params={paramsPolice}
            setParams={setParamsPolice}
            onQuery={onQueryPolice}
          ></PoliceEacharts>
        </div>
        {/* <div className="planAssessment-right-list">
          <PoliceList
            PoliceValue={values.text && values.text}
            starttime={values.starttime && values.starttime}
            endtime={values.endtime && values.endtime}
          ></PoliceList>
        </div> */}
      </div>
    </div>
      </Container.ContainerContent>
    </Container>

  )
}

export default PlanAssessment
