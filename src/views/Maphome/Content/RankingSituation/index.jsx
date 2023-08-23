import ScrollList from '&/components/ScrollList'
import React, { useEffect, useState, useRef, useContext } from 'react'
import PageBody from '&/components/PageBody'
import Pagelay from '&/components/Pagelay'
import { transform } from 'ol/proj'
import PageHeader from '&/components/PageHeader'
import { getClueRank } from '&/api/electricity'
import { wgs84togcj02 } from '@ysrd/ol5-react-ts/utils'
import '&/components/ScrollList/index.scss'
import './index.scss'
import '/node_modules/@ysrd/components/dist/index.css'
import flashFeatureLayer from '../../layers/flashFeatureLayer'
import {
  OpenlayersContext,
  ContentlayersContext
} from '@ysrd/ol5-react-ts/context'

export default function RankingSituation() {
  const { maps, layers, setLayers } = useContext(ContentlayersContext)
  const layerRef = useRef(null)
  const [listData, setlistData] = useState([])

  const getClueRankData = async () => {
    let res = await getClueRank()
    // console.log(res, 'res---')
    setlistData(res)
  }
  const nowColumns = [
    {
      title: '企业名称',
      dataIndex: 'ent_name',
      render: (text) => <span>{text}</span>
    },
    {
      title: '收到线索数量',
      dataIndex: 'clue_num'
    },
    {
      title: '反馈率',
      dataIndex: 'feedback_rate'
    }
  ]

  useEffect(() => {
    getClueRankData()
  }, [])

  const handleClick = (item, index, data) => {
    console.log(item, 'item--')
    const datas = []
    datas.push(item)

    // 传入经纬度以及数据源
    if (!layerRef.current) {
      // console.log(layers, "layers==");
      layerRef.current = layers
    }
    // maps.removeLayer(layers)
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
    <div className="RankingSituation">
      <Pagelay>
        <PageHeader text="排名"></PageHeader>
        <PageBody>
          <div className="scrollList">
            <ScrollList
              columns={nowColumns}
              data={listData}
              step={1}
              onClick={handleClick}
            />
          </div>
        </PageBody>
      </Pagelay>
    </div>
  )
}
