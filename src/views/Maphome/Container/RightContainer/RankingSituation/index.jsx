import React, { useEffect, useState, useRef, useContext } from 'react'
import MapCard from '@/views/Maphome/Container/Components/Card'
import { getClueRank } from '&/api/electricity'
import { ContentlayersContext } from '@ysrd/ol5-react-ts/context'
import ScrollList from '&/components/ScrollList'
import '&/components/ScrollList/index.scss'
import './index.scss'

export default function RankingSituation() {
  const { layers, setLayers } = useContext(ContentlayersContext)
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
    <div className="RankInfo MapItem">
      <MapCard title="排名" pos="right">
        <div className="scrollList" style={{ flex: 1 }}>
          <ScrollList
            columns={nowColumns}
            data={listData}
            step={1}
            autoScroll={4}
            onClick={handleClick}
          />
        </div>
      </MapCard>
    </div>
  )
}
