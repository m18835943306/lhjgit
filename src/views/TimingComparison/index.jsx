import React, { useState, useRef, useEffect } from 'react'
import Filter from './Filter'
import PowerConsumption from './PowerConsumption'
import dayjs from 'dayjs'
import { Spin } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { getAnalysisElec } from '&/api/electricity'
import Container from '@/appComponents/Container'
import './index.scss'
const TimingComparison = () => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(true)
  const [paramsData, setParamsData] = useState({
    project_id: value.project_id,
    county_id: -1, //区
    industry_type_id: -1, //行业
    dev_type: 2, //用电类型
    ent_id: "全部", //企业选择：
    // end_time_up
    end_time_up: dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'),
    start_time_up: dayjs().subtract(1, 'month').format('YYYY-MM-DD 00:00:00'),
    start_time_down: dayjs()
      .subtract(2, 'month')
      .subtract(1, 'days')
      .format('YYYY-MM-DD 00:00:00'),
    end_time_down: dayjs()
      .subtract(1, 'month')
      .subtract(1, 'days')
      .format('YYYY-MM-DD 00:00:00')
  })
  const [data, setData] = useState({})
  const [mode, setmode] = useState({
    time_type: '3'
  })
  const onQuery = async (params) => {
    setLoading(true)
    await getAnalysisElecRequire(params)
  }
  const onQueryTime = async (json) => {
    // setLoading(true)
    await getAnalysisElecRequire(json)
  }
  useEffect(() => {
    let newParamsData = {}
    for (let key in paramsData) {
      if ((paramsData[key] != -1)&&(paramsData[key] != "全部")) {
        newParamsData[key] = paramsData[key]
      }
    }
    setLoading(true)
    setParamsData(newParamsData)
    // console.log(newParamsData,"newParamsDatanewParamsData");
    getAnalysisElecRequire(newParamsData)
  }, [])
  const getAnalysisElecRequire = (jsons) => {
    // console.log(jsons,"jsonsjsonsjsonsjsons");
    getAnalysisElec(jsons).then((res) => {
      setData(res)
      setLoading(false)
    })
  }
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          onQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
          mode={mode}
          setmode={setmode}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent title="查询结果">
        <Spin spinning={loading}>
          <div className="TimingComparison">
            <PowerConsumption
              paramsData={paramsData}
              setParamsData={setParamsData}
              onQueryTime={onQueryTime}
              data={data}
            ></PowerConsumption>
          </div>
        </Spin>
      </Container.ContainerContent>
    </Container>
  )
}
export default TimingComparison
