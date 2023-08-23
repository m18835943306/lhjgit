import React, { useState, useEffect } from 'react'
import {
  Modal,
  Select,
  Form
} from 'antd'
import Container from '@/appComponents/Container'
import { FilterContainer } from '@/appComponents/Filter'
import {
  getWarnDeviceAlarmList,
  getWarnEnterpriseDetail
} from '&/api/electricity'
import Echarts from '&/baseUI/EChartsUI';
import { dataURLtoFile, FiletoDataURL } from '&/utils/file.help'
import dayjs from 'dayjs'
import './index.scss'

const EchartsDom = (props) => {
  const { records, setInstance } = props
  const [file, setFile] = useState(null) // 反馈描述
  const value = JSON.parse(localStorage.getItem('user'))
  const [selectData, setSelectData] = useState()
  const [defaultValue, setDefaultValue] = useState()
  const [options, setOptions] = useState()
  const [newData, setNewData] = useState()
  useEffect(() => {
    if (records) {
      let p = {
        role_level: value?.role_level,
        clue_code: records?.clue_code,
        adm_id: value?.adm_id
      }
      getWarnDeviceAlarmListRequest(p)
    }

  }, [records])
  //线索详情-报警基本数据接口
  const getWarnDeviceAlarmListRequest = async (json) => {
    const res = await getWarnDeviceAlarmList(json)
    if (res) {
      // 生成下拉框的数据
      setNewData(res)
      const ListDev = (origindata, index) => {
        const devlistA = origindata.warn_data.map(item => {
          if (item.other_data) {
            return JSON.parse(item.other_data)
          }
        })
        const devlistB = devlistA.filter(item => {
          return (item != undefined) && (item.yield_dev_id_list != undefined)
        }).map(it => {
          return JSON.parse(it.yield_dev_id_list)?.map(i => {
            return JSON.stringify(i[0])
          })
        })
        let str = origindata.dev_id + ""
        devlistB.map(item => {
          str += "," + item
        })
        return str
      }

      const selectArr = res.data[0].alarm_data.map((item, index) => {
        return {
          dev_id_list: ListDev(item, index),
          dev_name: item.dev_name,
          warn_type_id: item.warn_type_id,
          ent_id: item.ent_id,
          start_time: item.start_time,
          end_time: item.end_time
        }
      })
      setDefaultValue(selectArr[0].dev_id_list)
      setSelectData(selectArr)
      // 初始化掉用一次数据生成echarts
      let params = {
        dev_id_list: selectArr[0].dev_id_list,
        warn_type_id: selectArr[0].warn_type_id,
        ent_id: selectArr[0].ent_id,
        start_time: selectArr[0].start_time,
        end_time: selectArr[0].end_time
      }
      getDetailRequest(params, res)
    }
  }
  //线索详情-报警流水数据
  const getDetailRequest = async (json, data) => {
    const res = await getWarnEnterpriseDetail(json)
    if (res) {
      const arr = res.warn_detail.pollution_control_list.map(item => {
        return {
          name: item.dev_name,
          type: 'line',
          smooth: true,
          data: item.values.map(i => {
            return i < 0 ? '--' : i
          })
        }
      })
      const brr = res.warn_detail.production_list.map(item => {
        return {
          name: item.dev_name,
          type: 'line',
          smooth: true,
          data: item.values.map(i => {
            return i < 0 ? '--' : i
          })
        }
      })
      const crr = arr.concat(brr)
      const namedata = crr.map(item => {
        return item.name
      })
      let mark
      if (data) {
        //判断默认进页面后所用的数据
        mark = data.data[0].alarm_data.filter(item => {
          if (item.dev_id == json.dev_id_list) {
            return item
          }
        })
      } else {
        //判断进行select切换后所用的数据
        mark = newData.data[0].alarm_data.filter(item => {
          if (item.dev_id == json.dev_id_list) {
            return item
          }

        })
      }
      // 定义一个对象画echarts的markArea区域
      let obj = {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
        data: []
      }
      // 定义一个对象画echarts的markArea的时间范围
      const markdata = mark[0]?.warn_data.map(item => {
        return [{ xAxis: item.warn_time }, { xAxis: item.end_time }]
      })
      obj.data = markdata
      crr.forEach(item => {
        if (item.name == mark[0]?.dev_name) {
          item.markArea = obj
        }
      })
      const marktootlipData = mark[0]?.warn_data
      const option = {
        tooltip: {
          show: true,    // 是否显示提示框组件
          formatter: function (params) {
            if (params.componentType == "markArea") {
              return "企业名称：" + marktootlipData[params.dataIndex].ent_name + "<br/>触发点位：" + marktootlipData[params.dataIndex].dev_name + "<br/>点位类型：" + marktootlipData[params.dataIndex].dev_type_name + "<br/>报警类型：" + marktootlipData[params.dataIndex].warn_type_name + "<br/>报警级别：" + marktootlipData[params.dataIndex].warn_level + "<br/>报警时间：" + marktootlipData[params.dataIndex].warn_time + "<br/>持续时长：" + marktootlipData[params.dataIndex].duration + "<br/>报警状态：" + (marktootlipData[params.dataIndex].release_status === 1 ? '已解除' : '未解除')
            } else {
              return params.seriesName + "<br/>时间:" + params.name + "<br/>数值:" + params.value
            }
          }
        },

        xAxis: {
          type: 'category',
          data: res.warn_detail.time_list
        },
        grid:{
           left:30,
           bottom:20,
           right:10
        },
        dataZoom: [
          {
            start: 0, //默认为0
            end: 100, //默认为100
            type: "inside",
            show: true,
          },
        ],
        legend: {
          data: namedata
        },
        yAxis: {
          type: 'value'
        },
        series: crr
      };
      setOptions(option)
    }
  }
  const onQueryChange = (v, option) => {
    setDefaultValue(v)
    const json = JSON.parse(option.key)
    delete json.dev_name
    getDetailRequest(json)
  }
  const onChartReady = (instance) => {
    setInstance(instance)
    // // 暂时这样处理
    // setTimeout(() => {
    //   const dataurl = instance.getDataURL({
    //     type: 'png'
    //   })
    //   setFile(dataURLtoFile(dataurl, '线索推荐原因'))
    //   // downloadIMG(dataurl, 'xiazai', 'base64');
    // }, 1000)
  }
  return (
    <div style={{width:"100%",height:"100%"}}>
      <div>
        <FilterContainer>
          <Form name="horizontal_login" layout="inline">
            <Form.Item label="设施选择：">
              <Select
                allowClear
                placeholder={`请选择`}
                onChange={(v, option) => onQueryChange(v, option)}
                width={300}
                value={defaultValue}
              >
                {selectData &&
                  selectData.map((item) => (
                    <Select.Option value={item.dev_id_list} key={JSON.stringify(item)}>
                      {item.dev_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item >
          </Form>
        </FilterContainer>
      </div>
      <div style={{ height: "400px",width:"100%" }}>
        <Echarts option={options && options}    onChartReady={onChartReady} />
      </div>

    </div>

  )
}

export default EchartsDom
