import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef
} from 'react'
import { Spin } from 'antd'
import MapCard from '@/views/Maphome/Container/Components/Card'
import MapTab from '@/views/Maphome/Container/Components/Tab'
import { getHomeWarnWeek } from '&/api/electricity'
import ScrollList from '&/components/ScrollList'
import { ContentlayersContext } from '@ysrd/ol5-react-ts/context'
import '&/components/ScrollList/index.scss'
import './index.scss'
const tabs = [
  {
    label: '实时',
    value: '1'
  },
  {
    label: '概况',
    value: '2'
  }
]

const nowColumns = [
  {
    title: '企业名称',
    dataIndex: 'ent_name',
    render: (text) => <span>{text}</span>
  },
  {
    title: '报警次数',
    dataIndex: 'alarm_num'
  },
  {
    title: '报警总时长',
    dataIndex: 'duration'
  }
]
const AlermInfo = () => {
  const { layers, setLayers } = useContext(ContentlayersContext)
  const layerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState()
  const [entData, setEntData] = useState([])
  const [tabIndex, setTabIndex] = useState(1)

  const onChange = (tab, index) => {
    setTabIndex(index)
  }

  const getHomeRequestTask = useCallback(async () => {
    setLoading(true)
    try {
      const json = tabIndex === 1 ? '2' : '1'
      const { alarm_num, ent_list } = await getHomeWarnWeek(json)
      setCount(alarm_num)
      setEntData(ent_list)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }, [tabIndex])

  const handleClick = (ele) => {
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

  useEffect(() => {
    getHomeRequestTask()
  }, [getHomeRequestTask])

  return (
    <div className="AlermInfo MapItem">
      <MapCard
        title="报警"
        pos="right"
        extra={
          <MapTab tabs={tabs} defaultIndex={tabIndex} onChange={onChange} />
        }
      >
        <Spin
          tip="加载中"
          size="small"
          spinning={loading}
          style={{ height: '100%' }}
        >
          <div className="AlermInfo-title">
            <div className="AlermInfo-title--text">
              <div className="nums">{count}</div>
              <div className="text">
                {tabIndex === 1 ? '当前小时报警数量' : '报警总数量'}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }} className="scrollList">
            <ScrollList
              columns={nowColumns}
              data={entData}
              step={1}
              autoScroll={4}
              onClick={handleClick}
            />
          </div>
        </Spin>
      </MapCard>
    </div>
  )
}

export default AlermInfo
