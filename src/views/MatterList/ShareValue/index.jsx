import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useImperativeHandle
} from 'react'
import { Radio, Space, Input } from 'antd'
import _ from 'lodash'
import './index.scss'
import EchartsDom from "./EchartsDom"
import { forwardRef } from 'react'
const { TextArea } = Input;
const ShareValue = ({ handleShare, newRecordData, recordSing, setInstance }, ref) => {
  const [textareaValue, setTextAreaValue] = useState('') // 反馈描述
  const values = JSON.parse(localStorage.getItem('user'))
  const [value, setValue] = useState(3)
  useEffect(() => {
    const valuesArr = newRecordData.map(item => {
      return {
        assign_to: 3,
        clue_codes: item.clue_code,
        text_value: textareaValue
      }
    })
    handleShare && handleShare(valuesArr)
  }, [newRecordData])
  useEffect(() => {
    setInstance(null)
  }, [])
  const onChange = (e) => {
    setValue(e.target.value)
    const valuesArr = newRecordData.map((item) => {
      return {
        assign_to: e.target.value,
        clue_codes: item.clue_code,
        text_value: textareaValue
      }
    })
    handleShare && handleShare(valuesArr)
  }
  const handleValue = (e) => {
    setTextAreaValue(e.target.value)
    const valuesArr = newRecordData.map((item) => {
      return {
        assign_to: value,
        clue_codes: item.clue_code,
        text_value: e.target.value
      }
    })
    handleShare && handleShare(valuesArr)
  }
  return (
    <>
      <div className="ShareValue">
        <div className='ShareValue-top'>
          <div className="ShareValue-select">
            <Radio.Group onChange={(e) => onChange(e)} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  精细化平台
                </Radio>
                {values.role_level == 1 ? <Radio value={2}>区级用户</Radio> : null}
                <Radio value={3}>企业用户</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className='ShareValue-value'>
            <TextArea
              rows={4}
              placeholder="请填写描述信息" value={textareaValue}
              onChange={(e) => handleValue(e)} />
          </div>
        </div>
        <div className='ShareValue-bottom'></div>
        <EchartsDom records={recordSing} setInstance={setInstance}></EchartsDom>
      </div>
    </>
  )
}
export default forwardRef(ShareValue)
