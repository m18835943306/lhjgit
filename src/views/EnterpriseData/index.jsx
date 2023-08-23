import React, { useState, useEffect } from 'react'
import { Spin, Row, Col, Radio } from 'antd'
import Container from '@/appComponents/Container'
import List from './List'
import Substance from './Substance'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import './index.scss'
const EnterpriseData = () => {
    const [tap, setTap] = useState('1')
    const [valueId, setValueId] = useState()
    const handleClick = (value) => {
        setValueId(value)
    }
    return (
        <div style={{ height: "100%" }}>
            <div className="EnterpriseData">
                <Row gutter={[16, 16]}>
                    <Col span={19}>
                        <Substance entId={valueId} />
                    </Col>
                    <Col span={5}>
                        <div className='EnterpriseData_list'>
                            <List click={handleClick} tap={tap} setTap={setTap} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    )
}
export default EnterpriseData