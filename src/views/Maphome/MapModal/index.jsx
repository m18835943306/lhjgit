import React, { useState, useEffect, useRef } from 'react'
import { Modal } from '&/appComponents/Antd'
import ListModal from './ListModal'
import PointModal from './PointModal'
import './index.scss'

const modalTypes = [
  {
    value: 'police',
    title: '总报警数'
  },
  {
    value: 'enterprise',
    title: '总企业数'
  },
  {
    value: 'equipment',
    title: '总设备数'
  }
]
const MapModal = ({ visible, setVisible, modalType }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (visible) {
      ref.current.showModelRef()
    }
  }, [visible])

  const getModalTitle = (type) => {
    return modalTypes.find((t) => t.value === type)?.title
  }
  return (
    <div  className="MapModalMap" >
      <Modal
        ref={ref}
        title={getModalTitle(modalType)}
        width={939}
        centered={false}
        footer={null}
        getContainer={false}
        onClick={() => setVisible(false)}
        
      >
        {/* <ListModal modalType={modalType} /> */}
        <PointModal modalType={modalType} />
      </Modal>
    </div>


  )
}

export default MapModal
