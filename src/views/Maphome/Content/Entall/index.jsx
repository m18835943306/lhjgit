import { useState, useContext, useEffect } from 'react'
import { getHomeOverviewEnt, getHomeRealtimeEn } from '&/api/electricity'
import Pagelay from '&/components/Pagelay'
import PageHeader from '&/components/PageHeader'
import * as echarts from 'echarts'
import PageBody from '&/components/PageBody'
import _ from 'lodash'
import TextAllNum from '&/components/TextAllNum'
import EchartsNum from './EchartsNum'
import './index.scss'
const Entall = ({}) => {
  const [options, setOptions] = useState({})
  const [params, setParams] = useState({
    hangye: '1',
    typedata: '1'
  })
  const [xData, setXData] = useState([])
  const [yData, setYData] = useState([])
  const [strText, setText] = useState()
  // const strother = 3333
  const checktext = ['各区', '行业']
  const onQuery = (paramhangye) => {
    if (paramhangye.typedata == '1') {
      getHomeRealtimeEnRequest(paramhangye)
    } else {
      getHomeOverviewEntReauest(paramhangye)
    }
  }
  //  概况的接口
  const getHomeOverviewEntReauest = async (paramhangye) => {
    const res = await getHomeOverviewEnt()
    const str = res.ent_count
    setText(str)
    if (paramhangye.hangye == '1') {
      setXData(res?.county.horizontal)
      setYData(res?.county.vertical)
    } else if (paramhangye.hangye == '2') {
      setXData(res?.industry.horizontal)
      setYData(res?.industry.vertical)
    }
  }
  useEffect(() => {
    if (xData && yData) {
      const newyData = _.clone(yData).map((item) => {
        return (item = 500)
      })
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        xAxis: {
          type: 'category',
          data: xData,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#979797',
              opacity: 0.22
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
              opacity: 0.22
            }
          }
        },
        grid: {
          top: 10,
          bottom: 60
        },
        series: [
          {
            type: 'bar',
            barWidth: params?.hangye == '1' ? 40 : 12,
            data: yData,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(1, 225, 255, 0.7)'
                },
                {
                  offset: 1,
                  color: '#4DA3F0'
                }
              ])
            }
          },
          {
            type: 'pictorialBar',
            symbolSize: [params?.hangye == '1' ? 40 : 12, 10],
            symbolOffset: [-0, -3],
            z: 12,
            itemStyle: { color: '#01E2FF' },
            symbolPosition: 'end',

            data: yData
          },
          {
            type: 'pictorialBar',
            symbolSize: [params?.hangye == '1' ? 40 : 12, 10],
            symbolOffset: [-0, 3],
            z: 12,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#4DA3F0'
                },
                {
                  offset: 1,
                  color: '#29D5FF'
                }
              ])
            },
            symbolPosition: 'start',
            data: newyData
          },
          {
            type: 'pictorialBar',
            symbolSize: [params?.hangye == '1' ? 40 : 12, 10],
            symbolOffset: [0, -4],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              color: '#01E2FF',
              opacity: 0.2
            },
            data: newyData
          },
          {
            type: 'bar',
            barWidth: params?.hangye == '1' ? 40 : 12,
            barGap: '-100%',
            z: 0,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(143, 236, 244, 0.2)'
                },
                {
                  offset: 1,
                  color: 'rgba(1, 225, 255, 0.7)'
                }
              ])
            },
            data: newyData
          }
        ]
      }
      setOptions(option)
    }
  }, [xData])
  //实时的接口
  const getHomeRealtimeEnRequest = async (paramhangye) => {
    const res = await getHomeRealtimeEn()
    if (res) {
      const str = res.ent_count
      setText(str)
      if (paramhangye.hangye == '1') {
        setXData(res?.county.horizontal)
        setYData(res?.county.vertical)
      } else if (paramhangye.hangye == '2') {
        setXData(res?.industry.horizontal)
        setYData(res?.industry.vertical)
      }
    }
  }
  useEffect(() => {
    getHomeRealtimeEnRequest(params)
  }, [])
  return (
    <div className="Entall">
      <Pagelay position="left">
        <PageHeader
          text="企业"
          checkdata={true}
          params={params}
          setParams={setParams}
          onQuery={onQuery}
        ></PageHeader>
        <PageBody>
          <TextAllNum
            text={params.typedata == '1' ? '当天在线企业总数' : '企业总数'}
            str={strText}
            // textother="当天在线企业总数"
            // strother={strother}
          ></TextAllNum>
          <EchartsNum
            text="企业在各区分布数量"
            checktext={checktext}
            params={params}
            setParams={setParams}
            onQuery={onQuery}
            options={options}
          ></EchartsNum>
        </PageBody>
      </Pagelay>
    </div>
  )
}
export default Entall
