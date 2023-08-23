import React, { useState, useEffect } from 'react'
import './index.scss'

const SecondaryTitle = ({ title, extra }) => {
  return (
    <div className="SecondaryTitle">
      <div className="SecondaryTitle-text">{title}</div>
      <div className="SecondaryTitle-extra">{extra}</div>
    </div>
  )
}

export default SecondaryTitle
