import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Input, message, Spin, Button } from 'antd'
import Chunk from './Chunk'
import Item from './Itme'

import ChartItem from '../../EnterpriseDetail/components/CharItem'
import debounce from 'lodash/debounce'
import {
  // getEnterpriseWarnDetail,
  getNewEnterpriseWarnDetail
} from '&/api/electricity'
import dayjs from 'dayjs'
import './index.scss'
const { TextArea } = Input
const AlarmModal = (props) => {
  const { visible, setVisible, records } = props
  const [loadings, setLoadings] = useState(false)
  const [details, setDetails] = useState([])
  useEffect(() => {
    if (records) {
      getEnterpriseWarnDetailRequest()
    }
  }, [records])
  const getEnterpriseWarnDetailRequest = () => {
    const params = {
      warn_type_id: records?.warn_type,
      dev_id: records?.dev_id,
      ent_id: records?.ent_id,
      start_time: records?.warn_time,
      end_time: records?.end_time,
      warn_code:records?.warn_code
    }
    getNewEnterpriseWarnDetail(params).then((res) => {
      // console.log(res, 'resresresresresresresresres');
      // setInformation(res.warn_info)
      const listnewArr = res?.warn_detail?.production_list.concat(
        res?.warn_detail?.pollution_control_list
      )
      const listnewBrr = listnewArr.concat(res?.warn_detail?.summation_list)
      if (listnewBrr.length > 0) {
        const listArr = listnewBrr.map((item) => {
          const valueList = item.values.map((i) => {
            return i < 0 ? '--' : i
          })
          const timelist = res?.warn_detail?.time_list.map((item) => {
            return dayjs(item).format('MM-DD HH:mm')
          })
          return {
            label: item.dev_name,
            color: '#ac33c1',
            option: {
              visualMap: [
                {
                  show: false,
                  type: 'continuous',
                  seriesIndex: 0,
                  min: 0,
                  max: 400
                },
                {
                  show: false,
                  type: 'continuous',
                  seriesIndex: 1,
                  dimension: 0,
                  min: 0,
                  max: res?.warn_detail?.time_list?.length - 1
                }
              ],
              tooltip: {
                axisPointer: {
                  type: 'shadow'
                },
                trigger: 'axis'
                // formatter: '{b} <br/>{a0}：{c0}KW <br/> {a1}：{c1}KW',
              },
              grid: {
                left: '12%',
                top: '30%',
                bottom: '22%',
                right: '5%'
              },
              xAxis: {
                type: 'category',
                data: timelist || []
                // axisTick: {
                //   show: false,
                // },
              },
              yAxis: {
                name: '单位KW',
                nameTextStyle: {
                  align: 'right'
                },
                type: 'value',
                splitLine: {
                  show: false
                },
                axisLabel: {
                  margin: '12'
                },
                interval: 4
              },
              series: [
                {
                  type: 'line',
                  name: item.data_type,
                  // showSymbol: false,
                  data: valueList,
                  smooth: true,
                  lineStyle: {
                    color: 'red'
                  },
                  markArea: {
                    itemStyle: {
                      color: 'rgba(255, 173, 177, 0.4)'
                    },
                    data: [
                      [
                        {
                          xAxis:
                            dayjs(records?.warn_time).format('MM-DD HH:mm') ||
                            ''
                        },
                        {
                          xAxis:
                            dayjs(records?.end_time).format('MM-DD HH:mm') || ''
                        }
                      ]
                    ]
                  }
                }
              ]
            }
          }
        })

        setDetails(listArr)
      }
    })
  }
  // if(Object.keys(xxxxx).length)

  return (
    <Modal
      className="EnterpriseElectricityMonitorList-AlarmModal"
      title={'报警详情'}
      centered
      open={visible}
      footer={null}
      width={700}
      onCancel={() => {
        setVisible(false)
        // handleCanle(1)
      }}
    >
      <Spin spinning={loadings}>
        <Row>
          <Col span={12}>
            <Chunk title="报警基本信息：">
              <Item label="企业名称" value={records?.ent_name} />
              <Item label="触发点位" value={records?.dev_name} />
              <Item label="点位类型" value={records?.dev_type_name} />
              <Item label="报警类型" value={records?.warn_type_name} />
              <Item label="报警级别" value={records?.warn_level} />
              <Item label="报警时间" value={records?.warn_time} />
              <Item label="持续时长" value={records?.duration} />
              <Item
                label="报警状态"
                value={records?.release_status === 1 ? '已解除' : '未解除'}
              />
              {/* <div style={{display:"flex"}}>
                <Item label="问题描述" />
                <div>
                  <TextArea rows={4} />
                </div>
              </div> */}
            </Chunk>
          </Col>
          <Col span={12}>
            <Chunk title="报警详情：">
              {details.map((item) => (
                <ChartItem
                  key={item.label}
                  label={item.label}
                  color={item.color}
                  option={item.option}
                  // height="100px"
                  labelStyle={{
                    fontSize: '12px',
                    marginRight: '20px'
                  }}
                />
              ))}
            </Chunk>
          </Col>
        </Row>
      </Spin>
    </Modal>
  )
}

export default AlarmModal
