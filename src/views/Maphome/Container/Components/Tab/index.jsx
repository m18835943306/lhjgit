import React, { useState, useEffect } from 'react'
import './index.scss'

const MapTab = ({ tabs = [], defaultIndex = 1, onChange }) => {
  const [tabIndex, setTabIndex] = useState(defaultIndex)
  const onTabChange = (tab, index) => {
    setTabIndex(index)
    onChange && onChange(tab, index)
  }
  return (
    <div className="MapTab">
      {tabs.map((tab, index) => (
        <span
          className={`MapTab-item ${++index === tabIndex && 'tab-active'}`}
          onClick={() => onTabChange(tab, index)}
        >
          {tab.label}
        </span>
      ))}
    </div>
  )
}

export default MapTab
