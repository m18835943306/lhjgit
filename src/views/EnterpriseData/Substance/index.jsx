import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import { Spin } from "antd";
import { Context } from "./context";
import Content from "../Substance/Content";
import dayjs from 'dayjs'
import Container from '@/appComponents/Container'
import { getCompare } from '&/api/electricity'
import { Card } from '&/appComponents/Antd'

const Substance = ({ entId }) => {
  const [loading, setLoading] = useState(true);
  const [paramsData, setParamsData] = useState({
    start_time: dayjs().subtract(7, 'day').format("YYYY-MM-DD 00:00:00"),
    end_time: dayjs().format("YYYY-MM-DD 23:59:59"),
    time_type: '3',
  })
  const [data,setData]=useState()
  useEffect(() => {
    if (entId) {

      paramsData.ent_id = entId
      getData(paramsData)
    }
  }, [entId])

  const getData = async (value) => {
    // console.log(value, "value");
    setLoading(true)
    const res = await getCompare(value)
    if (res) {
      setData(res)
      setLoading(false)
    }

  }

  return (
    <Spin tip="Loading......" spinning={loading}>
      <div style={{ height: "100%" }}>
        <Context.Provider value={{ entId, paramsData }} >
          <Container>

            <Container.ContainerQuery title="查询条件">
              <div>
                <Filter
                  onQuery={getData}
                  paramsData={paramsData}
                  setParamsData={setParamsData}
                />
              </div>
            </Container.ContainerQuery>
            <Container.ContainerContent
              title="查询结果"
            >
              <Content data={data}></Content>
            </Container.ContainerContent>

          </Container>

        </Context.Provider>
      </div>
    </Spin>
  )
}

export default Substance;