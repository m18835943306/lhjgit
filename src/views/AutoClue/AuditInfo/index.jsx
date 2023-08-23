import React, { useState, useEffect } from 'react'
import { Space, Row, Col, Input, Upload, Button, Image, message } from 'antd'
import {
  UploadOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import Chunk from '&/components/Chunk'
import Item from '&/components/Item'
import Echarts from '&/baseUI/EChartsUI'
import { dataURLtoFile, FiletoDataURL } from '&/utils/file.help'
import { options } from './options'
import { getMacroElecDetail, postMacroElecDetail } from '&/api/electricity'
import dayjs from 'dayjs'
import _ from 'lodash'
const { TextArea } = Input
import './index.scss'

const AuditInfo = ({
  clue_date,
  company,
  increace_value,
  modalRef,
  t_start,
  t_end,
  type
}) => {
  const [textareaValue, setTextAreaValue] = useState('') // 反馈描述
  const [file, setFile] = useState(null) // 反馈描述
  const [selectFileUrl, setSelectFileUrl] = useState(null)
  const [basicInfo, setBasicInfo] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const value = JSON.parse(localStorage.getItem('user'))
  const uploadProps = {
    beforeUpload: async (file) => {
      const isIMG = file.type === 'image/png' || file.type === 'image/jpeg'
      if (!isIMG) {
        message.error(`${file.name} 不是张图片`)
        return Upload.LIST_IGNORE
      }
      return false
    },
    onChange: async ({ file }) => {
      setFile(file)
      const url = await FiletoDataURL(file)
      setSelectFileUrl(url)
    }
  }

  const onChartReady = (instance) => {
    // 暂时这样处理
    setTimeout(() => {
      const dataurl = instance.getDataURL({
        type: 'png'
      })
      setFile(dataURLtoFile(dataurl, '线索推荐原因'))
      // downloadIMG(dataurl, 'xiazai', 'base64');
    }, 1000)
  }

  const onCancel = () => {
    modalRef.current.hideModelRef()
  }

  const postRequest = async () => {
    const formData = new FormData()
    formData.append('description', textareaValue)
    formData.append('clue_date', clue_date)
    formData.append('file', file)
    formData.append('company', company)
    formData.append('project_id', value?.project_id)

    try {
      const {
        data: { code, result }
      } = await postMacroElecDetail(formData)
      if (code === 2000 && result === '线索提交成功') {
        modalRef.current.hideModelRef()
        message.success('已成功提交至线索库')
      }
    } catch (error) {
      message.success(`线索提交失败`)
    }
  }

  const processDate = (date) => {
    if (!date) return date
    return dayjs(date).format('M月DD日')
  }
  const generateTimesByDuration = (durations, cb, format = 'MM-DD') => {
    if (!durations.length) return []
    const times = []
    const [startTime, endTime] = durations
    const diffDay = dayjs(endTime).diff(dayjs(startTime), 'days')
    for (let i = 0; i < diffDay + 1; i++) {
      times.push(dayjs(startTime).add(i, 'd').format(format))
    }
    return _.isFunction(cb) ? cb(times) : times
  }
  useEffect(() => {
    const loadData = async (p) => {
      const { basic_info, problem, day30_timelist, day30_data } =
        await getMacroElecDetail(p)
      setBasicInfo(basic_info)
      const text = `${processDate(p.clue_date)}平均用电比（${processDate(
        t_start
      )}-${processDate(t_end)}）平均用电增加${p.increace_value}`

      setTextAreaValue(type ? text : problem)
      options.xAxis.data = generateTimesByDuration(day30_timelist)
      options.title.text = basic_info.company
      options.series[0].data = day30_data.map((item) => {
        return item < 0 ? 0 : item
      })
      // console.log(options.series[0].data,"optionsoptionsoptionsoptions");
      // if (day30_timelist.length) {
      //   options.series[0].name = `${processDate(
      //     day30_timelist[0]
      //   )} - ${processDate(day30_timelist[1])}`;
      // }

      // options.series[1].data = last_week_data;
      // if (last_week_timelist.length) {
      //   options.series[1].name = `上周${processDate(
      //     last_week_timelist[0]
      //   )} - ${processDate(last_week_timelist[1])}`;
      // }

      setChartOptions(options)
    }
    if (clue_date && company && increace_value) {
      loadData({
        clue_date,
        company,
        increace_value: `${Number(increace_value * 100).toFixed()}%`,
        project_id: value.project_id
      })
    }
  }, [clue_date, company, increace_value])

  return (
    <div className="AuditInfo">
      <Row>
        <Col span={13}>
          <Chunk title="线索基本信息">
            <Item label="线索日期" value={basicInfo.clue_date} />
            <Item label="企业名称" value={basicInfo.company} />
            <Item
              label="统一社会信用代码"
              value={basicInfo.social_redit_code}
            />
            <Item label="所属地区" value={basicInfo.county} />
            <Item label="所属街乡" value={basicInfo.town} />
            <Item label="行业类型" value={basicInfo.main_type} />
            <Item label="管控类型" value={basicInfo.level} />
            <Item label="联系人" value={basicInfo.person} />
            <Item label="联系方式" value={basicInfo.phone} />
          </Chunk>
          <Chunk title="线索推荐原因">
            {!selectFileUrl ? (
              <Echarts
                option={chartOptions}
                height="150px"
                onChartReady={onChartReady}
              />
            ) : (
              <Image height={150} alt="线索推荐原因.png" src={selectFileUrl} />
            )}
          </Chunk>
        </Col>
        <Col span={11}>
          <Chunk title="线索审核备注">
            <TextArea
              rows={7}
              placeholder="请输入线索审核内容"
              value={textareaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
            />
            <div className="AuditInfo_upload">
              <div className="AuditInfo_upload__content">
                <span className="AuditInfo_upload__lable">文件上传：</span>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Upload {...uploadProps} maxCount={1}>
                    <Button icon={<UploadOutlined />}>选择文件</Button>
                  </Upload>
                </Space>
              </div>
              <div className="AuditInfo_upload__tips">
                <div>* 支持一个图片文件替换线索推荐原因</div>
              </div>
            </div>
          </Chunk>
          <div className="AuditInfo_btns">
            <Button
              type="default"
              icon={<CloseCircleOutlined />}
              onClick={onCancel}
            >
              取消
            </Button>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={postRequest}
              disabled={!file}
            >
              提交
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AuditInfo
