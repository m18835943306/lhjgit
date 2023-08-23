import React, { useState, useEffect } from 'react'
import './index.scss'

const MapCard = ({ title, extra, pos, children }) => {
  return (
    <div
      className={`MapCard_container ${
        pos === 'left' ? 'MapCard-bg_left' : 'MapCard-bg_right'
      }`}
    >
      <div className="MapCard">
        <div className="MapCard-title">
          <div className="MapCard-title--text">{title}</div>

          <div className="MapCard-title--extra">{extra}</div>
        </div>
        <div className="MapCard-body">{children}</div>
      </div>
    </div>
  )
}

export default MapCard
