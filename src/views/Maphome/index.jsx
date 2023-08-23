import React, { useState, useEffect, useCallback } from 'react'
import { ContentlayersContext } from '@ysrd/ol5-react-ts/context'
import { Tooltip } from 'antd'
import Legend from './Legend'
import Modal from './MapModal'
import Content from './Content'
import _, { debounce } from 'lodash'
import { getRegion } from '@/api'
import Container from './Container'

const MapPage = (props) => {
  // console.log(props, 'props')
  const [showComponents, setShowComponents] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [info, setInfo] = useState(null)
  const user = JSON.parse(localStorage.getItem('user')) || {}
  // const [data, setData] = useState([])
  const [maps, setMaps] = useState()
  const [layers, setLayers] = useState()
  useEffect(() => {
    const fetUserInfo = async () => {
      const data = await getRegion()
      localStorage.setItem('regionInfo', JSON.stringify(data))

      setShowComponents(true)
    }
    fetUserInfo()
  }, [])

  return (
    <div className="MapPage">
      {showComponents && (
        <ContentlayersContext.Provider
          value={{
            setModalVisible,
            setModalType,
            modalType,
            modalVisible,
            user,
            setMaps,
            maps,
            setLayers,
            layers,
            info,
            setInfo
          }}
        >
          <Container />
          {/* <div className='Content-input'>
            <Input prefix={<SearchOutlined />} placeholder="输入企业名称" allowClear onChange={onChange} />
          </div> */}
          <Modal
            visible={modalVisible}
            setVisible={setModalVisible}
            modalType={modalType}
          />
        </ContentlayersContext.Provider>
      )}
    </div>
  )
}

export default MapPage
