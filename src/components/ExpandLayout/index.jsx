import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'

import './index.scss'

const ExpandLayout = (props) => {
  const { leftSlot, rightSlot, onLayoutChange, gutter = 20, layouts } = props
  const defaultLayouts = [
    [24, 0],
    [18, 6],
    [0, 24]
  ]
  const [defaultIndex, setDefaultIndex] = useState(1)
  const [defaultLayout, setDefaultLayout] = useState(layouts || defaultLayouts)

  const layoutChange = (type) => {
    let i = defaultIndex
    if (type === 'right') {
      i--
      i = i < 0 ? 2 : i
    } else {
      i++
      i = i > 3 ? 0 : i
    }
    setDefaultIndex(i)
    onLayoutChange && onLayoutChange()
  }

  return (
    <div className="expand_layout">
      <Row gutter={gutter}>
        <Col
          span={defaultLayout[defaultIndex][0]}
          className="expand_layout__left"
        >
          {leftSlot}
          <span
            tabIndex={0}
            role="button"
            className="arrow arrow-left"
            style={{ right: gutter / 2 + 'px' }}
            onClick={() => layoutChange('left')}
          ></span>
        </Col>
        <Col
          span={defaultLayout[defaultIndex][1]}
          className="expand_layout__right"
        >
          {rightSlot}
          <span
            tabIndex={0}
            role="button"
            className="arrow arrow-right"
            style={{ left: gutter / 2 + 'px' }}
            onClick={() => layoutChange('right')}
          ></span>
        </Col>
      </Row>
    </div>
  )
}

export default ExpandLayout
