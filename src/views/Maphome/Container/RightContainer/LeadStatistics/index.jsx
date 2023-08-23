import { useState, useContext, useEffect } from 'react'
import { getHomeOverviewClue } from '&/api/electricity'
import MapCard from '@/views/Maphome/Container/Components/Card'
import MapSmallTab from '@/views/Maphome/Container/Components/SmallTab'
import MapNumber from '@/views/Maphome/Container/Components/Number'
import SecondaryTitle from '@/views/Maphome/Container/Components/SecondaryTitle'
import MapTab from '@/views/Maphome/Container/Components/Tab'
import Echarts from '&/baseUI/EChartsUI'
const LeadStatistics = () => {
  const tabs = [
    {
      label: '实时',
      value: 2
    },
    {
      label: '概况',
      value: 1
    }
  ]
  const tabs1 = [
    {
      label: '各区',
      value: 2
    },
    {
      label: '中心',
      value: 1
    }
  ]
  const [tabIndex, setTabIndex] = useState(1)
  const [smallTabIndex, setSmallTabIndex] = useState(1)
  const [options, setOptions] = useState({})
  const [count, setCount] = useState()

  const [leftNames, setLeftNames] = useState()
  const [leftVals, setLeftVals] = useState()
  const [rightNames, setRightNames] = useState()
  const [rightVals, setRightVals] = useState()
  useEffect(() => {
    if (leftNames && leftVals && rightNames && rightVals) {
      const arr = leftVals.map((item) => {
        return 0 - item
      })
      const option = {
        // backgroundColor: '#000',
        color: ['#00deff', '#00deff'], //依次选择颜色，默认为第一个颜色，多根柱子多个颜色
        tooltip: {
          trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow' | 'cross' , shadow表示阴影，cross为十字准星
          },
          formatter: function (params) {
            // console.log(params, "params--");
            //params[0].marker,marker参数为提示语前面的小圆点
            return (
              `${params[0]?.name}` +
              params[0]?.value * -1 +
              '<br>' +
              `${params[1]?.name}` +
              params[1]?.value
            )
          }
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 5,
          top: 1,
          containLabel: true
        },
        yAxis: [
          {
            type: 'category',
            position: 'left',
            data: leftNames,
            axisTick: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              //让x轴左边的数显示为正数
              interval: 0,
              rich: {
                name: {
                  'font-family': 'SourceHanSansCN-Regular',
                  fontSize: 10,
                  color: '#eef9ff'
                },
                val: {
                  'font-family': 'PangMenZhengDao',
                  fontSize: 10,
                  //  fontWeight: 'bold',
                  color: '#00deff'
                }
              },
              formatter: (name, i) => {
                return `{name|${name}} {val| ${arr[i] * -1}}`
              }
            }
          },
          {
            type: 'category',
            position: 'right',
            data: rightNames,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              //让x轴左边的数显示为正数
              textStyle: {
                color: '#eef9ff',
                fontSize: 10
              },
              // interval: 0,
              // rich: {
              //    name: {
              //       'font-family': 'SourceHanSansCN-Regular',
              //       fontSize: 10,
              //       color: '#eef9ff'
              //    },
              //    val: {
              //       'font-family': 'PangMenZhengDao',
              //       fontSize: 10,
              //       //  fontWeight: 'bold',
              //       color: '#00deff'
              //    }
              // },
              formatter: (name, i) => {
                if (name.length > 4) {
                  return name.substring(0, 4) + '…' + rightVals[i]
                } else {
                  return `{name|${name}} {val| ${rightVals[i]}}`
                }
              }
            }
          }
        ],
        xAxis: [
          {
            name: '',
            type: 'value',
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 1,
                color: 'rgba(141,188,215, .5)'
              },
              show: true
            },
            axisLabel: {
              //让x轴左边的数显示为正数
              textStyle: {
                color: '#eef9ff',
                fontSize: 10
              },
              formatter: (value) => {
                // 负数取反 显示的就是正数了
                if (value < 0) return -value
                else return value
              }
            }
          }
        ],
        series: [
          {
            name: '负相关',
            type: 'bar',
            stack: '总量',
            label: {
              show: false
            },
            barWidth: 8,
            data: arr,
            yAxisIndex: 0,
            showBackground: true,
            backgroundStyle: {
              borderWidth: 12,
              color: 'rgba(119,210,255, .14)'
            },
            itemStyle: {
              color: {
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(212,161,87,0.35)'
                  },
                  {
                    offset: 1,
                    color: '#D4A157'
                  }
                ]
              }
            }
          },
          {
            name: '正相关',
            type: 'bar',
            stack: '总量',
            barWidth: 8,
            label: {
              show: false //控制柱状图是否显示数值
            },
            itemStyle: {
              color: {
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#1EE7E7'
                  },
                  {
                    offset: 1,
                    color: 'rgba(30,231,231,0.35)'
                  }
                ]
              }
            },
            yAxisIndex: 1,
            showBackground: true,
            backgroundStyle: {
              barWidth: 10,
              color: 'rgba(119,210,255, .14)'
            },
            data: rightVals
          }
        ]
      }
      setOptions(option)
    }
  }, [leftNames, leftVals, rightNames, rightVals])
  useEffect(() => {
    getHomeOverviewClueRequest({
      type: tabIndex == 1 ? 2 : 1,
      role_level: smallTabIndex == 1 ? 2 : 1
    })
  }, [tabIndex, smallTabIndex])
  //  接口调用
  const getHomeOverviewClueRequest = async (json) => {
    const res = await getHomeOverviewClue(json)
    if (res) {
      const str = res.clue_num
      setCount(str)
      // console.log(res, "res----");
      let obj = {}
      for (let key in res.county_num) {
        if (res.county_num[key] != 0) {
          obj[key] = res.county_num[key]
        }
      }

      let leftNamearr = Object.keys(obj)
      let leftValarr = Object.values(obj)
      let rightNamearr = Object.keys(res.industry_num)
      let rightValarr = Object.values(res.industry_num)
      setLeftNames(leftNamearr)
      setLeftVals(leftValarr)
      setRightNames(rightNamearr)
      setRightVals(rightValarr)
    }
  }
  const onChange = (tab, index) => {
    setTabIndex(index)
    // setOptions({})
  }
  return (
    <div className="LeadStatistics MapItem">
      <MapCard
        title="线索"
        pos="right"
        extra={
          <MapTab tabs={tabs} defaultIndex={tabIndex} onChange={onChange} />
        }
      >
        <MapNumber title="总线索数量" num={count} color="skyblue" />
        <SecondaryTitle
          title="企业分布"
          extra={
            <MapSmallTab
              tabs={tabs1}
              defaultIndex={smallTabIndex}
              onChange={(_, index) => setSmallTabIndex(index)}
            />
          }
        />
        <div style={{ flex: 1 }}>
          <Echarts option={options} />
        </div>
      </MapCard>
    </div>
  )
}
export default LeadStatistics
