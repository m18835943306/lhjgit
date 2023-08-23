import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal } from 'antd'

const ModalCom = (
  {
    title,
    onClick,
    destroyOnClose = true,
    footer,
    width = 1100,
    style,
    bodyStyle,
    centered = true,
    maskClosable = false,
    keyboard = true,
    okText = '确认',
    cancelText = '取消',
    children,
    ...rest
  },
  ref
) => {
  const [visible, setVisible] = useState(false)
  const onModalClick = async (type) => {
    if (type === 'cancel') hideModal()
    onClick && onClick(type)
  }

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  useImperativeHandle(ref, () => ({
    showModelRef: showModal,
    hideModelRef: hideModal
  }))
  return (
    <Modal
      title={title}
      destroyOnClose={destroyOnClose}
      open={visible}
      footer={footer}
      width={width}
      style={style}
      bodyStyle={bodyStyle}
      centered={centered}
      maskClosable={maskClosable}
      keyboard={keyboard}
      onOk={() => onModalClick('ok')}
      onCancel={() => onModalClick('cancel')}
      okText={okText}
      cancelText={cancelText}
      {...rest}
    >
      {children}
    </Modal>
  )
}

export default forwardRef(ModalCom)
