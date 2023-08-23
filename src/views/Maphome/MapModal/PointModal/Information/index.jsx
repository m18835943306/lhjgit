import React, { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'antd';
import  "./index.scss"
const Information = ({ headertitle, entInfo }) => {
  return (
    <div className='PointModal-Information'>
      <div>{headertitle("基本信息")}</div>
      <div className='Information-content'>
        <div className='content'>
          <div style={{
            display:"flex",
            justifyContent:"flex-start"
          }}>
            <span className='content-name'style={{width:"70px"}}>企业名称：</span>
            <Tooltip placement="top" title={entInfo.ent_name}>
              <span className='ent_name'>{entInfo.ent_name}</span>
            </Tooltip>
          </div>
          <div>
            <span className='content-name'>行业类型：</span>
            <Tooltip placement="top" title={entInfo.industry_type}>
              <span>{entInfo.industry_type}</span>
            </Tooltip>
          </div>
          <div>
            <span className='content-name'>应急管控类型：</span>
            <Tooltip placement="top" title={entInfo.control_type}>
              <span>{entInfo.control_type}</span>
            </Tooltip>
          </div>
          <div>
            <span className='content-name'>所属区：</span>

            <Tooltip placement="top" title={entInfo.county_name}>
              <span>{entInfo.county_name}</span>
            </Tooltip>
          </div>
        </div>
        <div className='content'>
          <div>
            <span className='content-name'>所属街乡：</span>
            <Tooltip placement="top" title={entInfo.town_name}>
              <span>{entInfo.town_name}</span>
            </Tooltip>
          </div>
          <div
          style={{
            display:"flex",
            justifyContent:"flex-start"
          }}>
            <span className='content-name'style={{width:"70px"}}>详细地址：</span>
            <Tooltip placement="top" title={entInfo.address}>
              <span className='address'>{entInfo.address}</span>
            </Tooltip>
          </div>
          <div>
            <span className='content-name'>法人代表：</span>
            <Tooltip placement="top" title={entInfo.legal_person}>
              <span>{entInfo.legal_person}</span>
            </Tooltip>
          </div>
          <div>
            <span className='content-name'>企业联系人：</span>
            <Tooltip placement="top" title={entInfo.contacts}>
              <span>{entInfo.contacts}</span>
            </Tooltip>
          </div>
        </div>
        <div className='content'>
          <div>
            <span className='content-name'>联系人电话：</span>
            <Tooltip placement="top" title={entInfo.phone}>
              <span>{entInfo.phone}</span>
            </Tooltip>
          </div>
          <div>
            <span className='content-name'>总用电监控点位数：</span>
            <Tooltip placement="top" title={entInfo.total_dev_num}>
              <span>{entInfo.total_dev_num}</span>
            </Tooltip>
          </div>
          <div>
            <span className='content-name'>产污设备监控点位数：</span>
            <Tooltip placement="top" title={entInfo.yield_dev_num}>
              <span>{entInfo.yield_dev_num}</span>
            </Tooltip>
          </div>
          <div>
            <span className='content-name'>治污设备监控点位数：</span>
            <Tooltip placement="top" title={entInfo.treat_dev_num}>
              <span>{entInfo.treat_dev_num}</span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>)
}
export default Information