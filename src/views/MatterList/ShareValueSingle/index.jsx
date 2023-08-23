import React, {
    useState,
    useMemo,
    useEffect,
    useCallback,
    useImperativeHandle
  } from 'react'
  import { Radio, Space } from 'antd'
  import _ from 'lodash'
  import './index.scss'
  import { forwardRef } from 'react'
  
  const ShareValue = ({ handleShare, newRecordData }, ref) => {
    const values = JSON.parse(localStorage.getItem('user'))
    const [value, setValue] = useState(3)
    useEffect(() => {
      const valuesArr = newRecordData.map(item => {
        return {
          assign_to: 3,
          clue_codes: item.clue_code
        }
      })
      handleShare && handleShare(valuesArr)
    }, [newRecordData])
    const onChange = (e) => {
      setValue(e.target.value)
      const valuesArr = newRecordData.map((item) => {
        return {
          assign_to: e.target.value,
          clue_codes: item.clue_code
        }
      })
      handleShare && handleShare(valuesArr)
    }
    return (
      <>
        <div className="ShareValue">
          <div className="ShareValue-select">
            {/* <div>下发选择：</div> */}
            <div>
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
          </div>
        </div>
      </>
    )
  }
  export default forwardRef(ShareValue)
  