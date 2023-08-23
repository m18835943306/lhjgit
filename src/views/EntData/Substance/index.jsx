import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Context } from "./context";
import dayjs from 'dayjs'
import Container from '@/appComponents/Container'
import EchartsHome from "./EchartsHome";
import {
  getEleData,getRank, getEntData,
  getEntRingData
} from "&/api/electricity";







const Substance = ({ entId }) => {
  const record = useSelector((state) => state.getRecordReducer)
  const [loading, setLoading] = useState(false);
  const [eleData, setEleData] = useState();
  const [entData, setEntData] = useState();
  const[rankData,setrankData]=useState();
  const [entRingData, setEntRingData] = useState();


  const dateFormat = 'YYYY-MM-DD HH:mm:00'
  const time = dayjs().format(dateFormat)
  const timestr = time.slice(14, 16)
  const timenum = Number(timestr) % 15
  const resultnum = Number(timestr) - timenum
  const e =
    resultnum == 0 ? `YYYY-MM-DD HH:00:00` : `YYYY-MM-DD HH:${resultnum}:00`

  const [paramsData, setParamsData] = useState({
    entId: entId && entId,
    start_time: dayjs().subtract(1, 'day').format(e),
    end_time: dayjs().format(e),
    data_type_id: 8,
    time_type: '1',
    format_type: 1,
    dev_type: '企业总电'
  })

  const devTypeMap = new Map([
    ["企业总电", 1],
    ["产污设施", 2],
    ["治污设施", 3],
    ["产治一体", 5],
    ["间接用电", 4]
  ]);

  useEffect(() => {
    setLoading(true)
    if (entId && entId.length > 0) {
      
      getData()
    }


  }, [entId])

  const getData = async () => {

    if (entId) {

      setLoading(true)
      //用电、行业数据
      const eleData = await getEleData({
        start_time: paramsData.start_time,
        end_time: paramsData.end_time,
        time_type: paramsData.time_type,
      })
      //排名
      const rankData=await getRank({
        ent_id:entId[0],
        start_time: paramsData.start_time,
        end_time: paramsData.end_time,
        time_type: paramsData.time_type,
        dev_type:devTypeMap.get(paramsData.dev_type)
      })
      //聚合企业数据
      const entAllData = await getEntData({
        ent_id: entId.join(','),
        start_time: paramsData.start_time,
        end_time: paramsData.end_time,
        time_type: paramsData.time_type,
      })
      //聚合企业数据同环比
      const entRingData = await getEntRingData({
        ent_id: entId[0],
        start_time: paramsData.start_time,
        end_time: paramsData.end_time,
        time_type: paramsData.time_type,
      })
      setEleData(eleData)
      setEntData(entAllData)
      setEntRingData(entRingData)
      setrankData(rankData)

      setLoading(false)
    }


  }

  return (
    <Spin tip="Loading......" spinning={loading}>
    <div style={{ height: "100%" }}>
    <Context.Provider value={{ entId, paramsData, eleData, entData, entRingData,rankData }} >

    <Container>
        <Container.ContainerQuery title="查询条件">
          <Filter
            entData={entData}
            onQuery={getData}
            paramsData={paramsData}
            setParamsData={setParamsData}
          />
        </Container.ContainerQuery>
        <Container.ContainerContent
              title="查询结果"
            >
          <EchartsHome />
          </Container.ContainerContent>
       
      </Container>
    </Context.Provider>
    </div>
    </Spin>)
}

export default Substance;