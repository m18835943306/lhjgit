import React, { useState, useMemo, useEffect, useCallback, useImperativeHandle } from 'react'
import { Radio, Space } from 'antd'
import _ from 'lodash'
import './index.scss'
import { forwardRef } from 'react'

const ShareValue = ({ handleShare, newRecordData }, ref) => {
    const [value, setValue] = useState(3);
    const onChange = (e) => {
        setValue(e.target.value);
        const valuesArr = newRecordData.map(item => {
            return {
                assign_to:3,
                clue_codes:item.clue_code
            }
        })
        handleShare && handleShare(valuesArr)
    };
    useEffect(()=>{
        const valuesArr = newRecordData.map(item => {
            return {
                assign_to:3,
                clue_codes:item.clue_code
            }
        })
        handleShare && handleShare(valuesArr)
    },[newRecordData,value])
    return (
        <>
            <div className='ShareValue'>
                <div className='ShareValue-select'>
                    <div>下发选择：</div>
                    <div>
                        <Radio.Group onChange={(e) => onChange(e)} value={value}>
                            <Space direction="vertical">
                                <Radio value={3}>企业</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        </>

    )
}
export default forwardRef(ShareValue) 