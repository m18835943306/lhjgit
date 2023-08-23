import { useState, useContext, useEffect } from 'react'
import { getHomeOverviewDevice, getHomeRealtimeDevice } from '&/api/electricity'
import Pagelay from '&/components/Pagelay'
import PageHeader from '&/components/PageHeader'
import PageBody from '&/components/PageBody'
import _ from "lodash"
import * as echarts from 'echarts';
import TextAllNum from '&/components/TextAllNum'
import EchartsNum from './EchartsNum'
import './index.scss'
const Equipmentall = ({ }) => {
  const [xData, setXData] = useState([])
  const [yData, setYData] = useState([])
  const [strText, setText] = useState()
  const [options, setOptions] = useState({})
  const [params, setParams] = useState({
    dian: '1',
    typedata: '1'
  })
  // const str = 3333
  // const strother = 3333
  const checktext = ['各区', '行业']
  const onQuery = (paramdian) => {
    if (paramdian.typedata == '1') {
      getHomeRealtimeDeviceRequest()
    } else {
      getHomeOverviewDeviceReauest(paramdian)
    }
  }
  //  概况的接口
  const getHomeOverviewDeviceReauest = async (paramdian) => {
    const res = await getHomeOverviewDevice()
    if (res) {
      const str = res.dev_count
      setText(str)
      if (paramdian.dian == '1') {
        setXData(res?.county.horizontal)
        setYData(res?.county.vertical)
      } else if (paramdian.dian == '2') {
        setXData(res?.industry.horizontal)
        setYData(res?.industry.vertical)
      }
    }
  }
  //实时的接口
  const getHomeRealtimeDeviceRequest = async () => {
    const res = await getHomeRealtimeDevice()
    if (res) {
      const str = res.dev_count
      setText(str)
      setXData(res?.trend.horizontal)
      setYData(res?.trend.vertical)
    }
  }
  useEffect(() => {
    getHomeRealtimeDeviceRequest()
  }, [])
  useEffect(() => {
    if (xData && yData) {
      const newyData = _.clone(yData).map(item => {
        return item = 3000
      })
      const linedata = [
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
      const bardata = [
        {
          type: 'bar',
          barWidth: params?.dian == "1" ? 48 : 12,
          data: yData,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(1, 225, 255, 0.7)',
              },
              {
                offset: 1,
                color: '#4DA3F0',
              },
            ]),
          },
        },
        {
          type: 'pictorialBar',
          symbolSize: [params?.dian == "1" ? 48 : 12, 10],
          symbolOffset: [-0, -3],
          z: 12,
          itemStyle: { color: '#01E2FF' },
          symbolPosition: 'end',

          data: yData,
        },
        {
          type: 'pictorialBar',
          symbolSize: [params?.dian == "1" ? 48 : 12, 10],
          symbolOffset: [-0, 3],
          z: 12,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#4DA3F0',
              },
              {
                offset: 1,
                color: '#29D5FF',
              },
            ]),
          },
          symbolPosition: 'start',
          data: newyData,
        },
        {
          type: 'pictorialBar',
          symbolSize: [params?.dian == "1" ? 48 : 12, 10],
          symbolOffset: [0, -4],
          z: 12,
          symbolPosition: 'end',
          itemStyle: {
            color: '#01E2FF',
            opacity: 0.2,
          },
          data: newyData,
        },
        {
          type: 'bar',
          barWidth: params?.dian == "1" ? 48 : 12,
          barGap: '-100%',
          z: 0,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(143, 236, 244, 0.2)',
              },
              {
                offset: 1,
                color: 'rgba(1, 225, 255, 0.7)',
              },
            ]),
          },
          data: newyData,
        },
      ]
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
          bottom: 60
        },
        series: params?.typedata == '1' ? linedata : bardata
      }
      setOptions(option)
    }
  }, [params, xData])
  return (
    <div className="Equipmentall">
      <Pagelay position="left">
        <PageHeader
          text="设备"
          checkdata={true}
          params={params}
          setParams={setParams}
          onQuery={onQuery}
        ></PageHeader>
        <PageBody>
          <TextAllNum
            text="当前小时设备在线总数"
            str={strText && strText}
          // strother={strother}
          // textother="当前小时设备在线总数"
          ></TextAllNum>
          <EchartsNum
            text="设备在各区分布数量"
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
export default Equipmentall
