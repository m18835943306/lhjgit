import React, { useState, useEffect } from 'react'
import Container from '@/appComponents/Container'
import Filter from './Filter';
import { Spin, Row, Col, Radio } from 'antd'
import { getDayTrends, getCountyRatio, getRankRatio, getIndustryCount } from '&/api/electricity'
import Change from './Change';//环比变化
import Enterprise from './Enterprise';//企业TOP30
import Proportion from './Proportion';// 报警企业比例
import Trend from './Trend';  //逐日变化趋势
import moment from 'dayjs';
import './index.scss'

const AlarmAnalysis = () => {
    const [paramsData, setParamsData] = useState({
        // project_id: value.project_id,
        // project_id: 32,
        // start_time: moment().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
        data_time: moment().startOf('week').format('YYYY-MM-DD'),
        time_type: "1"
    })
    const [dataLine, setDataLine] = useState()
    const [dataBar, setDataBar] = useState()
    const [dataList, setDataList] = useState()
    const [dataPropor, setDataPropor] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        onQuery(paramsData)
    }, [])
    const onQuery = async (value) => {
        setIsLoading(true)
        const resfirst = await getDayTrends(value)
        const ressecond = await getCountyRatio(value)
        const resthired = await getRankRatio(value)
        const resfourth = await getIndustryCount(value)
        if (resfirst && ressecond && resthired) {
            setDataLine(resfirst)
            setDataBar(ressecond)
            setDataList(resthired)
            setDataPropor(resfourth)
            setIsLoading(false)
        }
    }
    return (
        <div className='AlarmAnalysis'>
            <Container>
                <Container.ContainerQuery title="查询条件">
                    <Filter
                        onQuery={onQuery}
                        paramsData={paramsData}
                        setParamsData={setParamsData}
                    />
                </Container.ContainerQuery>
                <Container.ContainerContent
                    title="查询结果"
                >
                    <Spin tip="Loading......" spinning={isLoading}>
                        <div style={{ display: 'flex',width:"100%", height: '100%', flexDirection: 'column',justifyContent:"space-evenly", gap: '10px'}}>
                            <div style={{ height: "50%", width: "100%", display: "flex", justifyContent: "space-evenly",gap: '10px' }}>
                                <Trend dataLine={dataLine}></Trend>
                                <Change dataBar={dataBar}></Change>
                            </div>
                            <div style={{ height: "50%", width: "100%", display: "flex", justifyContent: "space-evenly",gap: '10px' }}>
                                <Enterprise dataList={dataList}></Enterprise>
                                <Proportion dataPropor={dataPropor}></Proportion>
                            </div>
                        </div>
                    </Spin>

                </Container.ContainerContent>
            </Container>
        </div>

    )
}
export default AlarmAnalysis