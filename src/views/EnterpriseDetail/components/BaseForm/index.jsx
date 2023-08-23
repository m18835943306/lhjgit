import React, { useState, useEffect, useMemo } from 'react'
import {
  Col,
  Row,
  Image,
  Carousel,
  Card
} from 'antd'
import { getEnterpriseDetail, setEnterprise } from '&/api/electricity'

import './index.scss'
import _ from 'lodash'
import { Descriptions } from 'antd'


const CustomCard =
  ({ title, headColor, bodyColor, children }) => {
    return <Card title={title} bordered={false} headStyle={{ color: 'white', backgroundColor: headColor }} bodyStyle={{ backgroundColor: bodyColor }}>
      {children}
    </Card>


  }
const BaseForm = (props) => {
  const {
    setLoading,
    contextValue: { ent_id }
  } = props
  const value = JSON.parse(localStorage.getItem('user'))
  const [record, setrecord] = useState({})

  const getData = async () => {
    setLoading(true)
    const json = { ent_id, project_id: value.project_id }

    const data = await getEnterpriseDetail(json)
    setrecord(data)
    setLoading(false)
  }

  useEffect(() => {
    if (ent_id) {
      getData()
    }
  }, [ent_id])



  return (
    <div className="base_form">
      <Row gutter={2} >
        <Col className="img_box" span={8} >
        {record?.rotation_chart?.length ?
        <Carousel autoplay dotPosition='top'>
        {record.rotation_chart.map((item,index)=>{
          return <Image key={index} rootClassName={'carousel_img'} src={item} />

        })
        }
        </Carousel> 
        : <Image width={'100%'} height={'100%'}  src="error" /> }
        {record?.roration_chart && console.log(record.roration_chart)}
        </Col>
        
        <Col span={16} style={{ marginLeft: '-8px' }}>
          <div className='right_box'>
            <div className='right_box_top'>
              <div className='title'>企业基本信息</div>
              <div className='content'>
                <Descriptions bordered size="small" >
                  <Descriptions.Item label="企业名称" >
                    {record?.ent_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="社会信用代码">
                    {record?.credit_code}
                  </Descriptions.Item>
                  <Descriptions.Item label="法人代表">
                    {record?.legal_person}
                  </Descriptions.Item>
                  <Descriptions.Item label="所属区">
                    {record?.county_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="所属工业园区">
                    {record?.of_park}
                  </Descriptions.Item>
                  <Descriptions.Item label="详细地址">
                    {record?.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="经度">
                    {record?.longitude}
                  </Descriptions.Item>
                  <Descriptions.Item label="纬度">
                    {record?.latitude}
                  </Descriptions.Item>
                  <Descriptions.Item label="行业类型">
                    {record?.industry_type}
                  </Descriptions.Item>
                  <Descriptions.Item label="企业联系人">
                    {record?.contacts}
                  </Descriptions.Item>
                  <Descriptions.Item label="联系方式">
                    {record?.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="管控类型">
                    {record?.control_type}
                  </Descriptions.Item>
                  <Descriptions.Item label="主要产品">
                    {record?.main_product}
                  </Descriptions.Item>
                  <Descriptions.Item label="年产量">
                    {record?.annual_output}
                  </Descriptions.Item>
                  
                </Descriptions>
              </div>
              <div className='right_box_bottom'>
                <div className='title'>大气污染排放信息</div>
                <div className='content'>
                  <Descriptions bordered size="small" >
                    <Descriptions.Item label="排污许可管理类型" >
                      {record?.discharge_management_type}
                    </Descriptions.Item>
                    <Descriptions.Item label="许可证(登记)编号" >
                      {record?.discharge_permit_code}
                    </Descriptions.Item>

                    <Descriptions.Item label="主要污染物" >
                      {record?.main_pollutants}
                    </Descriptions.Item>
                    <Descriptions.Item label="*颗粒物" >
                      {record?.particle_emissions}
                    </Descriptions.Item>
                    <Descriptions.Item label="*氮氧化物">
                      {record?.NOx_emissions}
                    </Descriptions.Item>
                    <Descriptions.Item label="*二氧化硫">
                      {record?.SO2_emissions}
                    </Descriptions.Item>
                    <Descriptions.Item label="*VOCs" >
                      {record?.VOCs_emissions}
                    </Descriptions.Item>


                    <Descriptions.Item label="大气排放口数量" >
                      {record?.outlet_count}
                    </Descriptions.Item>
                    <Descriptions.Item label="主要排放口数量" >
                      {record?.main_outlet_count}
                    </Descriptions.Item>
                    <Descriptions.Item label="大气CEMS在线数量" >
                      {record?.cems_online_count}
                    </Descriptions.Item>
                    <Descriptions.Item label="电力局总表编号" >
                      {record?.general_code}
                    </Descriptions.Item>
                    <Descriptions.Item label="年用电量" >
                      {record?.annual_electricity_consumption}
                    </Descriptions.Item>
                    <Descriptions.Item label="是否已有用电监测" >
                      {record?.if_elec_system_avail ? record.if_elec_system_avail : '否'}
                    </Descriptions.Item>




                  </Descriptions>
                  

                </div>


              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className={'all_card'} gutter={16} >
        <Col span={8}>
          <CustomCard title="黄色预警执行措施" headColor='rgb(246, 202, 73)' bodyColor='rgb(248, 237, 200)'>
            {record?.yellow_control_measure}

          </CustomCard>
        </Col>
        <Col span={8}>
          <CustomCard title="橙色预警执行措施" headColor='rgb(226, 131, 54)' bodyColor='rgb(244, 223, 203)'>
            {record?.orange_control_measure}
          </CustomCard>
        </Col>
        <Col span={8}>
          <CustomCard title="红色预警执行措施" headColor='rgb(208, 45, 34)' bodyColor='rgb(240, 207, 208)'>
          {record?.red_control_measure}
          </CustomCard>
        </Col>
      </Row>

    </div>
  )
}

export default BaseForm
