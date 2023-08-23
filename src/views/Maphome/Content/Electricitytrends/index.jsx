import { useState, useContext, useEffect } from 'react'
import { getHomeConsumeTrend } from '&/api/electricity'
import PageHeader from '&/components/PageHeader'
import PageBody from '&/components/PageBody'
import Pagelay from '&/components/Pagelay'
import EchartsData from './EchartsData'
import './index.scss'
const Electricitytrends = ({ }) => {
  const [topOptions, setTopOptions] = useState({})
  const [bottomOptions, setBottomOptions] = useState({})
  const [params, setParams] = useState({
    type: '1',
    county_id: 3,
    industry_type_id: 2
  })
  const [xData, setXData] = useState([])
  const [yData, setYData] = useState([])
  const [yyData, setYYData] = useState([])
  const [text, setText] = useState()
  const onQuery = (paramtype) => {
    getHomeConsumeTrendRequest(paramtype)
  }
  useEffect(() => {
    const option = {
      xAxis: {
        type: 'category',
        data: xData,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#979797',
            opacity: 0.32
          }
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: 'ArialMT',
          color: '#E2F0FF',
          rotate: 40 // 文本旋转角度
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#979797',
            opacity: 0.32
          }
        }
      },
      grid: {
        top: 10,
        bottom: 25,
        right: 10,
        left: 60
      },
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#72e3ea'
          },
          itemStyle: {
            normal: {
              color: '#72e3ea', //折线点的颜色
              borderColor: '#72e3ea', //拐点边框颜色
              borderWidth: 2, //拐点边框大小
            },
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [  // 渐变颜色
                {
                  offset: 0,
                  color: 'rgba(67,126,140,0.36)',
                },
                {
                  offset: 1,
                  color: 'rgba(67,126,140,0)',
                },
              ],
              global: false,
            },
          },
        }
      ]
    }
    const NewOption = {
      xAxis: {
        type: 'category',
        data: xData,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#979797',
            opacity: 0.32
          }
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: 'ArialMT',
          color: '#E2F0FF',
          rotate: 40 // 文本旋转角度
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#979797',
            opacity: 0.32
          }
        }
      },
      grid: {
        top: 10,
        bottom: 25,
        right: 10,
        left: 60
      },
      series: [
        {
          data: yyData,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#72e3ea'
          },
          itemStyle: {
            normal: {
              color: '#72e3ea', //折线点的颜色
              borderColor: '#72e3ea', //拐点边框颜色
              borderWidth: 2, //拐点边框大小
            },
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [  // 渐变颜色
                {
                  offset: 0,
                  color: 'rgba(67,126,140,0.36)',
                },
                {
                  offset: 1,
                  color: 'rgba(67,126,140,0)',
                },
              ],
              global: false,
            },
          },
        }
      ]
    }
    setTopOptions(option)
    setBottomOptions(NewOption)
  }, [xData, yData, yyData])
  const getHomeConsumeTrendRequest = async (paramtype) => {
    let obj = { ...paramtype }
    delete obj.type
    const res = await getHomeConsumeTrend(paramtype ? obj : {})
    setXData(res.time_list)
    setYData(res.two_list)
    setYYData(res.yield_list)
    setText(
      <div>
        用电趋势
        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, .5)' }}>
          （{res.time_list[0]}至{res.time_list[res.time_list.length - 1]}）
        </span>
      </div>
    )
  }
  useEffect(() => {
    getHomeConsumeTrendRequest()
  }, [])
  return (
    <div className="Electricitytrends">
      <Pagelay position="left">
        <PageHeader text={text && text}></PageHeader>
        <PageBody>
          <EchartsData
            params={params}
            setParams={setParams}
            onQuery={onQuery}
            topOptions={topOptions}
            bottomOptions={bottomOptions}
          ></EchartsData>
        </PageBody>
      </Pagelay>
    </div>
  )
}
export default Electricitytrends
