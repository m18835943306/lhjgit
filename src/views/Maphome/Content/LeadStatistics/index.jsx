import { useState, useContext, useEffect } from 'react'
import { getHomeOverviewClue } from '&/api/electricity'
import Pagelay from '&/components/Pagelay'
import PageHeader from '&/components/PageHeader'
import PageBody from '&/components/PageBody'
import TextAllNum from '&/components/TextAllNum'
import EchartsNum from './EchartsNum'
import './index.scss'
const LeadStatistics = () => {
  const [options, setOptions] = useState({})
  const [params, setParams] = useState({
    xiansuo: '1',
    typedata: '1'
  })
  const [leftNames, setLeftNames] = useState()
  const [leftVals, setLeftVals] = useState()
  const [rightNames, setRightNames] = useState()
  const [rightVals, setRightVals] = useState()
  const [strText, setText] = useState()
  const checktext = ['各区', '中心']
  const onQuery = (paramxiansuo) => {
    // console.log(paramxiansuo, 'paramxiansuoparamxiansuoparamxiansuo')
    let obj = {
      role_level: '',
      type: ''
    }
    if (paramxiansuo.typedata == '1') {
      obj.type = '2'
      if (paramxiansuo.xiansuo == '1') {
        obj.role_level = '2'
      } else if (paramxiansuo.xiansuo == '2') {
        obj.role_level = '1'
      }
    } else if (paramxiansuo.typedata == '2') {
      obj.type = '1'
      if (paramxiansuo.xiansuo == '1') {
        obj.role_level = '2'
      } else if (paramxiansuo.xiansuo == '2') {
        obj.role_level = '1'
      }
    }
    // console.log(obj,"obj-----");
    getHomeOverviewClueRequest(obj)
  }
  useEffect(() => {
    if (leftNames && leftVals && rightNames && rightVals) {
      const arr = leftVals.map((item) => {
        return 0 - item
      })
      let leftName = [
        '昌平区0',
        '昌平区1',
        '昌平区2',
        '昌平区3',
        '昌平区4',
        '昌平区5',
        '昌平区6',
        '昌平区7',
        '昌平区8',
        '昌平区9'
      ]
      let leftVal = [
        -0.6, -0.51, -0.47, -0.36, -0.34, -0.34, -0.33, -0.33, -0.32, -0.32
      ]
      let rightName = [
        '制造业',
        '制造业1',
        '制造业2',
        '制造业3',
        '制造业4',
        '制造业5',
        '制造业6',
        '制造业7',
        '制造业8',
        '制造业9'
      ]
      let rightVal = [0.57, 0.32, 0.32, 0.31, 0.3, 0.29, 0.28, 0.27, 0.26, 0.25]
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
      type: '2',
      role_level: '2'
    })
  }, [])
  //  接口调用
  const getHomeOverviewClueRequest = async (json) => {
    const res = await getHomeOverviewClue(json)
    if (res) {
      const str = res.clue_num
      setText(str)
      // console.log(res, "res----");
      let obj = {}
      for (let key in res.county_num) {
        if (res.county_num[key] != 0) {
          obj[key] = res.county_num[key]
        }
      }

      // console.log(obj,"obj--");
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
  return (
    <div className="LeadStatistics">
      <Pagelay>
        <PageHeader
          text="线索"
          checkdata={true}
          params={params}
          setParams={setParams}
          onQuery={onQuery}
        ></PageHeader>
        <PageBody>
          <TextAllNum
            text="总线索数量"
            str={strText}
            //  textother="当天在线企业总数"
            //  strother={strother}
          ></TextAllNum>
          <EchartsNum
            text="企业分布"
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
export default LeadStatistics
