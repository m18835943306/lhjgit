import React, {
  useState,
  useEffect,
} from 'react'
import { Radio, Space } from 'antd'
import _ from 'lodash'
import './index.scss'

const ShareValue = ( {handleShare} ) => {
  const [value, setValue] = useState(3)
  const values = JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
    const values=value
    handleShare && handleShare(values)
},[value])
  const onChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <>
      <div className="ShareValue">
        <div className="ShareValue-select">
          {/* <div>下发选择：</div> */}
          <div>
            <Radio.Group onChange={(e) => onChange(e)} value={value}>
              <Space direction="vertical">
                <Radio  value={1}>
                  精细化平台
                </Radio>
                {values.role_level == 1 ? <Radio value={2}>区级用户</Radio> : null}
                <Radio value={3}>企业用户</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      </div>
    </>
  )
}
export default ShareValue
