import React, { useState, useEffect } from 'react'
import {
  Modal,
  Row,
  Col,
  Input,
  Upload,
  Button,
  Tooltip,
  message,
  Spin
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Chunk from './Chunk'
import Item from './Itme'
// import ChartItem from '../../../../EnterpriseInfo/EnterpriseDetail/components/CharItem'
// import { option } from './echart_config';
import Steps from './Steps'
import debounce from 'lodash/debounce'
import {
  getEnterpriseWarnDetail,
  getWarnFeedbackSubmit
} from '&/api/electricity'
import dayjs from 'dayjs'

import './index.scss'

const AlarmModal = (props) => {
  const { visible, setVisible, records } = props
  const value = JSON.parse(localStorage.getItem('user'))
  const tokenv2 = localStorage.getItem('token')
  const { TextArea } = Input
  const [loadings, setLoadings] = useState(false)
  const [loading, setLoading] = useState(false) //文件上传
  const [imageList, setImageList] = useState([]) //文件上传
  const [images, setImages] = useState([]) //文件上传
  const [textareaValue, setTextAreaValue] = useState('') // 反馈描述
  const [information, setInformation] = useState({})
  const [details, setDetails] = useState([])
  const [journal, setJournal] = useState([])
  const [feedback, setFeedback] = useState({})
  useEffect(() => {
    if(records?.warn_id){
      getEnterpriseWarnDetailRequest()
    }
  }, [records?.warn_id])
  const getEnterpriseWarnDetailRequest = () => {
    const params = {
      project_id: value.project_id,
      warn_id: records?.warn_id,
      // warn_id: 1973,
      token: tokenv2
    }
    getEnterpriseWarnDetail(params).then((res) => {
      // console.log(res, 'resresresresresresresresres');
      setInformation(res.warn_info)
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
            return dayjs(item).format('MM-DD HH-MM')
          })
          // console.log(111111);
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
                }
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
                            dayjs(res?.warn_info?.start_time).format(
                              'MM-DD HH:mm'
                            ) || ''
                        },
                        {
                          xAxis:
                            dayjs(res?.warn_info?.end_time).format(
                              'MM-DD HH:mm'
                            ) || ''
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
      setJournal(res.logs)
      setFeedback(res.feedback)
    })
  }

  // 轮播图交互
  // const onChangeLunBo = (currentSlide) => {
  //   console.log(currentSlide);
  // };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const uploadProps = {
    listType: 'text',
    beforeUpload: async (file) => {
      // console.log(file,"filefilefilefile");
      const compareImages = imageList
      const isRepeat = compareImages.map(
        (item) => item.lastModified == file.lastModified
      )
      if (isRepeat.findIndex((item) => item === true) !== -1) {
        message.success('This is a success message')
        ;({
          content: '图片重复，请重新选择图片上传',
          duration: 6
        })
      } else {
        setImages(() => [...images, file])
      }
      return false
    }
  }
  const handleChangeImg = (file) => {
    setImageList(file.fileList)
  }
  const submit = async () => {
    setLoading(true)
    setLoadings(true)
    // let uploadList = '';
    if (imageList) {
      const imageListnew = imageList.map((item) => {
        return item.originFileObj
      })
      const formData = new FormData()
      formData.append('project_id', value?.project_id)
      formData.append('warn_id', records?.warn_id)
      formData.append('feedback_content', textareaValue)
      imageListnew.forEach((item) => formData.append('files', item))
      getWarnFeedbackSubmit(formData).then((res) => {
        console.log(res, 'resresresresresresresres')
        if (res) {
          setLoadings(false)
          message.info(res.data.result)
          clearAll()
        }
      })
    }
  }
  const onSubmitTask = debounce(submit, 2000, { leading: true })

  //用于清空所有选择的选项 重置
  const clearAll = () => {
    setImageList([])
    setTextAreaValue('')
  }

  const downloadFile = (imgsrc, name, type) => {
    if (type === ('jpg' || 'png')) {
      let image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        let url = canvas.toDataURL('image/png') //得到图片的base64编码数据
        let a = document.createElement('a') // 生成一个a元素
        let event = new MouseEvent('click') // 创建一个单击事件
        a.download = name || 'qrcode.jpg' // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc + '?time=' + new Date().getTime()
    } else {
      window.open(imgsrc)
    }
  }
  const handleCanle = (value) => {
    props.click(value)
  }
  return (
    <Modal
      className="EnterpriseElectricityMonitorList-AlarmModal"
      title=""
      centered
      visible={visible}
      footer={null}
      width={1100}
      onCancel={() => {
        setVisible(false)
        handleCanle(1)
      }}
    >
      <Spin spinning={loadings}>
        <Row>
          <Col span={10}>
            <Chunk title="报警基本信息：">
              <Item label="企业名称" value={information.ent_name} />
              <Item label="触发点位" value={information.dev_name} />
              <Item label="点位类型" value={information.dev_type_name} />
              <Item label="报警类型" value={information.warn_type_name} />
              <Item label="报警级别" value={information.warn_level} />
              <Item label="报警时间" value={information.start_time} />
              <Item label="持续时长" value={information.duration} />
              <Item
                label="报警状态"
                value={information.release_status === 1 ? '已解除' : '未解除'}
              />
            </Chunk>
            <Chunk title="报警详情：">
              {/* {details.map((item) => (
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
              ))} */}
            </Chunk>
          </Col>
          <Col span={7}>
            {records?.process_status_value === '未反馈' ? (
              <Chunk title="报警处理与反馈：">
                <Item label="反馈详情" />
                <div className="AlarmModalfankui-text">
                  <TextArea
                    rows={4}
                    placeholder="请输入反馈内容"
                    value={textareaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                  />
                </div>
                <div className="AlarmModalfankui-taskAdd-upload">
                  <div className="taskAdd-upload-tips">
                    <span className="taskAdd-upload-span">文件上传：</span>
                    <Upload
                      {...uploadProps}
                      fileList={imageList}
                      onChange={handleChangeImg}
                      maxCount={10}
                      multiple={true}
                      className="taskAdd-upload-button"
                    >
                      <Button icon={<UploadOutlined />}>选择文件</Button>
                      <div className="task-processing-upload">
                        <div>请上传附件，最多10个文件</div>
                        <div>同时支持视频、Word、PDF、Excel上传</div>
                      </div>
                    </Upload>
                  </div>
                </div>
                <div className="AlarmModalfankui-taskAdd-btn">
                  <div
                    className="taskAdd-btn-cancel"
                    onClick={() => clearAll()}
                  >
                    取消
                  </div>
                  <div
                    className="taskAdd-btn-sure"
                    onClick={onSubmitTask}
                    loading={loading}
                  >
                    确定
                  </div>
                </div>
              </Chunk>
            ) : (
              <Chunk title="报警处理与反馈：">
                <Item label="反馈时间" value={feedback?.feedback_time} />
                <Item label="反馈人员" value={feedback?.feedback_person} />
                <Item label="反馈级别" value={feedback?.feedback_level} />
                <Item label="反馈内容" />
                <Tooltip title={feedback?.feedback_content}>
                  <div className="AlarmModal-text">
                    {feedback?.feedback_content}
                  </div>
                </Tooltip>

                <div className="AlarmModal-wenjian">
                  {feedback?.files?.map((item) => {
                    return (
                      <div className="AlarmModal-FileView">
                        <div>{item.file_name}</div>
                        <div
                          onClick={() =>
                            downloadFile(
                              item.file_url,
                              item.file_name,
                              item.file_ext
                            )
                          }
                          className="AlarmModal-down"
                        >
                          下载
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Chunk>
            )}
          </Col>
          <Col span={7}>
            <Chunk title="任务日志：">
              <Steps journal={journal} />
            </Chunk>
          </Col>
        </Row>
      </Spin>
    </Modal>
  )
}

export default AlarmModal
