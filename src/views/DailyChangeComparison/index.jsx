import React, { useState, useRef, useEffect } from 'react'
import { Spin,Space,Popover,Radio} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Filter from './Filter'
import Coaxial from './Coaxial'
import Heteroaxis from './Heteroaxis'
import { getAnalysisDailyChange } from '&/api/electricity'
import dayjs from 'dayjs'
import Container from '@/appComponents/Container'
import './index.scss'
const DailyChangeComparison = (props) => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [paramsData, setParamsData] = useState({
    project_id: value.project_id,
    county_id: -1, //区
    industry_type_id: -1, //行业
    dev_type: 2, //用电类型
    ent_id: "全部", //企业选择：
    end_time_up: dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'),
    start_time_up: dayjs().subtract(1, 'month').format('YYYY-MM-DD 00:00:00'),
    start_time_down: dayjs()
      .subtract(2, 'month')
      .subtract(1, 'days')
      .format('YYYY-MM-DD 00:00:00'),
    end_time_down: dayjs()
      .subtract(1, 'month')
      .subtract(1, 'days')
      .format('YYYY-MM-DD 00:00:00'),
    duration_type: 1
  })
  const [mode, setmode] = useState(1)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const onQuery = async (params) => {
    setLoading(true)
    await getAnalysisDailyChangeRequire(params)
  }
  const onQueryTime = async (json) => {
    // setLoading(true)
    await getAnalysisDailyChangeRequire(json)
  }
  const onQueryTimes = async (jsons) => {
    // setLoading(true)
    await getAnalysisDailyChangeRequire(jsons)
  }
  useEffect(() => {
    setLoading(true)
    let newParamsData = {}
    for (let key in paramsData) {
      if ((paramsData[key] != -1)&&(paramsData[key] != "全部")) {
        newParamsData[key] = paramsData[key]
      }
    }
    setParamsData(newParamsData)
    getAnalysisDailyChangeRequire(newParamsData)
  }, [])
  // mode?.modes
  const getAnalysisDailyChangeRequire = (json) => {
    getAnalysisDailyChange(json).then((res) => {
      // console.log(res,"resresresresresresres");
      setData(res)
      setLoading(false)
    })
  }
  const renderContainerTitle = () => {
    const content = (
      <div style={{ marginBottom: 5, padding: 5 }}>
        <p>
          1.
          所选时间段内，各个小时所有设备总用电量/天数=各小时的用电量均值
        </p>
      </div>
    )
    return (
      <Space>
        查询结果
        <Popover
          content={content}
          title="规则说明："
          placement="rightTop"
        >
          <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
        </Popover>
      </Space>
    )
  }
  const optionsWithDisabled = [
    {
      label: '同轴模式',
      value: 1,
      data: 1
    },
    {
      label: '异轴模式',
      value: 2,
      data: 2
    }
  ]
  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          onQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent title={renderContainerTitle()} extra={ <Radio.Group
            options={optionsWithDisabled}
            onChange={(e) => setmode(e.target.value)}
            value={mode}
            optionType="button"
            buttonStyle="solid"
          />} >
        <Spin spinning={loading}>
          <div className="DailyChangeComparison">
            {mode === 1 ? (
              <Coaxial
                paramsData={paramsData}
                setParamsData={setParamsData}
                onQueryTimes={onQueryTimes}
                data={data}
              ></Coaxial>
            ) : (
              <Heteroaxis
                paramsData={paramsData}
                setParamsData={setParamsData}
                onQueryTime={onQueryTime}
                data={data}
              ></Heteroaxis>
            )}
          </div>
        </Spin>
      </Container.ContainerContent>
    </Container>
  )
}
export default DailyChangeComparison
