import React, { useState, useEffect, useContext } from 'react'
import { Tabs } from 'antd';
import Card from './Card'
import RealTimeData from './RealTimeData'
import Information from './Information'
import RealTime from './RealTime'
import List from './List'
import { getHomeEnterpriseDetail } from '&/api/electricity'
import sourceImg from '&/assets/maphomeimages/imgs';
import { OpenlayersContext, ContentlayersContext } from '@ysrd/ol5-react-ts/context'
import './index.scss'

const PointModal = ({ modalType }) => {
  const [entInfo, setEntInfo] = useState({})
  const [devInfo, setDevInfo] = useState([])
  // 产治污对应关系
  const [relInfo, seTrelInfo] = useState([])
  const { info, user } = useContext(ContentlayersContext)
  const getData = async () => {
    const json = {
      project_id: user.project_id,
      ent_id: info?.ent_id
    }
    const { ent_info, dev_info, rel_info } = await getHomeEnterpriseDetail(json)
    setEntInfo(ent_info)
    setDevInfo(dev_info)
    seTrelInfo(rel_info)
  }

  useEffect(() => {
    if (info?.ent_id) {
      getData()
    }
  }, [info])

  if (modalType) return null

  const headertitle = (text) => {
    return (
      <>
        <div className='headertitle-text'>{text}</div>
        <img src={sourceImg.modeline}></img>
      </>
    )

  }


  return (
    <div className="PointModal">
      <div>
        <Information headertitle={headertitle} entInfo={entInfo}></Information>
      </div>
      <div>
        <RealTime headertitle={headertitle}></RealTime>
      </div>
      <div>
        <List headertitle={headertitle}></List>
      </div>

    </div>
  )
}

export default PointModal
