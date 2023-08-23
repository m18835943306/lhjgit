import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  Modal,
  Row,
  Col,
  Input,
  Upload,
  Button,
  message,
  Spin,
  Result
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Chunk from './Chunk'
import Item from './Itme'
import debounce from 'lodash/debounce'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {
  postWarnClueFeedbackSubmit,
  postWarnClueAssign
} from '&/api/electricity'
import ShareValue from '../ShareValue'
import sourceImg from '&/assets/images/imgs';
import dayjs from 'dayjs'
import './index.scss'
const { confirm } = Modal;
const AlarmModal = (props) => {
  const { visible, setVisible, records, onReload, paramsData, mode, newRecordData, setSelectedRowKeys } = props
  const value = JSON.parse(localStorage.getItem('user'))
  const { TextArea } = Input
  const [loadings, setLoadings] = useState(false)
  const [loading, setLoading] = useState(false) //文件上传
  const [imageList, setImageList] = useState([]) //文件上传
  const [images, setImages] = useState([]) //文件上传
  const [textareaValue, setTextAreaValue] = useState('') // 反馈描述
  const [jsonValue, setJsonValue] = useState([])
  const shareRef = useRef()
  const uploadProps = {
    listType: 'text',
    beforeUpload: async (file) => {
      const compareImages = imageList
      const isRepeat = compareImages.map(
        (item) => item.lastModified == file.lastModified
      )
      if (isRepeat.findIndex((item) => item === true) !== -1) {
        message.success('This is a success message')
          ; ({
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
    Confirm("5")
  }
  const onSubmitTask = debounce(submit, 2000, { leading: true })

  //用于清空所有选择的选项 重置
  const clearAll = () => {
    setImageList([])
    setTextAreaValue('')
  }
  const Image = (modes) => {
    return (
      <div>
        <img src={sourceImg.confirmok} />
      </div>

    )
  }
  const handleValue = () => {
    switch (mode) {
      case "1":
        return "是否下发？"
      case "3":
        return "是否批量下发？"
      case "5":
        return "是否问题反馈？"
    }
  }
  const Confirm = (modes, text) => {
    let newARR = []
    let formData
    switch (modes) {
      case "1":
        jsonValue.map(item => {
          newARR.push(item.clue_codes)
        })
        formData = new FormData()
        formData.append('userid', value?.userid)
        formData.append('clue_codes', JSON.stringify(newARR))
        formData.append('assign_to', jsonValue[0]?.assign_to)
        postWarnRequest(formData)
        // onReload(paramsData)
        setVisible(false)
        //清除掉选中的key
        setSelectedRowKeys([])
        break;
      case "3":
        // console.log(111111);
        jsonValue.map(item => {
          newARR.push(item.clue_codes)
        })
        formData = new FormData()
        formData.append('userid', value?.userid)
        formData.append('clue_codes', JSON.stringify(newARR))
        formData.append('assign_to', jsonValue[0]?.assign_to)
        postWarnRequest(formData)
        // onReload(paramsData)
        setVisible(false)
        //清除掉选中的key
        setSelectedRowKeys([])
        break;
      case "5":
        setLoading(true)
        setLoadings(true)
        // let uploadList = '';
        if (imageList) {
          const imageListnew = imageList.map((item) => {
            return item.originFileObj
          })
          const formData = new FormData()
          formData.append('clue_code', records?.clue_code)
          formData.append('feedback_content', textareaValue)
          formData.append('userid', value?.userid)
          imageListnew.forEach((item) => formData.append('files', item))
          postWarnClueFeedbackSubmit(formData).then((res) => {
            if (res) {
              setLoading(false)
              setLoadings(false)
              message.info(res.data.result)
              clearAll()
            }
            onReload(paramsData)
            setVisible(false)
          })

          // setVisible(false)
        }
        break;

    }
  }
  const handleOk = async () => {
    // setVisible(false)
    //判断从shareValue组件春过来是否有值
    if (jsonValue.length > 0) {
      //点击下发掉接口
      if (mode == "1") {
        Confirm("1")
        //点击批量下发掉接口
      } else if (mode == "3") {
        Confirm("3")
      }
    }

  }
  // 下发接口
  const postWarnRequest = async (json) => {
    const res = await postWarnClueAssign(json)
    message.info(res.data.result)
    onReload(paramsData)
  }
  const handleShare = (value) => {
    setJsonValue(value)
  }
  return (
    <Modal
      className="AlarmModal"
      title={mode == "5" ? "问题反馈" : "问题下发"}
      centered
      open={visible}
      footer={null}
      width={400}
      onCancel={() => {
        setVisible(false)
      }}
      destroyOnClose={true}
    >
      <Spin spinning={loadings}>
        {mode == "5" ?
          <Row>
            <Col span={36}>
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
                  <Button
                    className="taskAdd-btn-cancel"
                    onClick={() => clearAll()}
                    icon={<CloseCircleOutlined></CloseCircleOutlined>}
                  >
                    取消
                  </Button>
                  <Button
                    className="taskAdd-btn-sure"
                    onClick={onSubmitTask}
                    loading={loading}
                    icon={<CheckCircleOutlined></CheckCircleOutlined>}
                  >
                    确定
                  </Button>
                </div>
              </Chunk>

            </Col>
          </Row> :
          <>
            <ShareValue handleShare={handleShare} ref={shareRef} newRecordData={newRecordData}></ShareValue>
            {/* <div style={{display:"flex",justifyContent:"center"}}>是否确定下发</div> */}
            <div className="AlarmModalfankui-taskAdd-btn">
              <Button
                className="taskAdd-btn-cancel"
                onClick={() => {
                  setVisible(false)
                }}
                icon={<CloseCircleOutlined></CloseCircleOutlined>}
              >
                取消
              </Button>
              <Button
                className="taskAdd-btn-sure"
                onClick={handleOk}
                loading={loading}
                icon={<CheckCircleOutlined></CheckCircleOutlined>}
              >
                确定
              </Button>
            </div>
          </>


        }

      </Spin>
    </Modal>
  )
}

export default AlarmModal
