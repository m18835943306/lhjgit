import React, { useState, useEffect } from 'react'
import { Spin, Row, Col, Radio } from 'antd'
import Container from '@/appComponents/Container'
import List from './List'
import Substance from './Substance'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import './index.scss'



const EntData = () => {
  const record = useSelector((state) => state.getRecordReducer)
  const value = JSON.parse(localStorage.getItem('user'))
  const [paramsData] = useState({
    project_id: value.project_id,
    data_time: record.date
      ? dayjs(record.date).format('YYYY-MM-DD 00:00:00')
      : dayjs().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'),
    type: 1
  })

  // list tab
  const [tap, setTap] = useState('1')

  const [valueId, setValueId] = useState()

 
  const handleClick = (value) => {
    // console.log("🚀 ~ file: index.jsx:30 ~ handleClick ~ value:", value)
    setValueId(value)
   

  }
  

  return (
 <div style={{ height: "100%" }}>
    <div className='EntData'>

            <Row gutter={[16,16]}>
              <Col span={19}>
                <Substance entId={valueId}/>
              </Col>
              <Col span={5}>
              <div className='list'>
                <List click={handleClick} tap={tap} setTap={setTap} />
                </div>
              </Col>
            </Row>

      </div>
      </div>
)
}

export default EntData
