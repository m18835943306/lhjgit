import ScrollList from '&/components/ScrollList'
import React, { useEffect, useState, useRef, useContext } from 'react'
import { getHomeWarnWeek } from '&/api/electricity'
import PageBody from '&/components/PageBody'
import Pagelay from '&/components/Pagelay'
import { transform } from 'ol/proj'
import PageHeader from '&/components/PageHeader'
import HomeImg from '&/assets/maphomeimages/imgs'
import { wgs84togcj02 } from '@ysrd/ol5-react-ts/utils'
import flashFeatureLayer from '../../layers/flashFeatureLayer'
import {
  OpenlayersContext,
  ContentlayersContext
} from '@ysrd/ol5-react-ts/context'
import '&/components/ScrollList/index.scss'
import './index.scss'

export default function EnterprisesAlarmsSituation() {
  const { maps, layers, setLayers } = useContext(ContentlayersContext)
  const layerRef = useRef(null)
  const [params, setParams] = useState({
    typedata: '1'
  })
  const [alarmNums, setAlarmNums] = useState('')
  const [listData, setlistData] = useState([])

  const onclickhand = (a) => {
    let obj = { type: '2' }
    if (a.typedata === '1') {
      obj.type = '2'
      getHomeWarnWeekData(obj.type)
    }
    if (a.typedata === '2') {
      obj.type = '1'
      getHomeWarnWeekData(obj.type)
    }
  }

  const getHomeWarnWeekData = async (query) => {
    const res = await getHomeWarnWeek(query)
    setAlarmNums(res.alarm_num)
    setlistData(res.ent_list)
  }

  useEffect(() => {
    getHomeWarnWeekData('2')
  }, [])

  const nowColumns = [
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      render: (text) => <span>{text}</span>
    },
    {
      title: '报警次数',
      // className: 'NumberOfAlarms',
      dataIndex: 'alarm_num'
    },
    {
      title: '报警总时长',
      dataIndex: 'duration'
    }
  ]

  const handleClick = (ele, index, data) => {
    // console.log(ele,"ele--");
    // console.log(data,"data--");

    const datas = []
    datas.push(ele)
    // 传入经纬度以及数据源
    if (!layerRef.current) {
      layerRef.current = layers
    }
    // 传入经纬度以及数据源
    layerRef.current.changeSource(
      Number(datas[0].latitude),
      Number(datas[0].longitude),
      datas[0]
    )
    layerRef.current.drawCircleSource(
      Number(datas[0].latitude),
      Number(datas[0].longitude)
    )
    setLayers(layerRef.current)
  }
  return (
    <div className="EnterprisesAlarmsSituation">
      <Pagelay>
        <PageHeader
          text="报警"
          checkdata={true}
          params={params}
          setParams={setParams}
          onQuery={onclickhand}
        />
        <PageBody>
          {params.typedata === '2' && (
            <div className="alarmItem">
              <img src={HomeImg.alarmItem} />
              <div className="nums">{alarmNums}</div>
              <div className="text">报警总数量</div>
            </div>
          )}
          {params.typedata === '1' && (
            <div className="alarmItem">
              <img src={HomeImg.alarmItem} />
              <div className="nums">{alarmNums}</div>
              <div className="text">当前小时报警数量</div>
            </div>
          )}
          <div className="scrollList">
            <ScrollList
              columns={nowColumns}
              data={listData}
              step={1}
              clickEvent={true}
              onClick={handleClick}
            />
          </div>
        </PageBody>
      </Pagelay>
    </div>
  )
}
