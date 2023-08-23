import React, { useState, useEffect } from 'react'
import './index.scss'

const MapNumber = ({ title, num, color = 'orange' }) => {
  const [nums, setNums] = useState([])
  useEffect(() => {
    if (typeof num === 'number' || typeof num === 'string') {
      const str = num + ''
      setNums(str.split(''))
      // console.log(str.split(''))
      // const nums = str
    }
  }, [num])
  return (
    <div className="MapNumber">
      <div className="MapNumber-text">{title}：</div>
      <div className="MapNumber-num">
        {nums.map((num, i) => (
          <span key={i} className={`MapNumber-num--item ${color}`}>
            {num}
          </span>
        ))}
      </div>
    </div>
  )
}

export default MapNumber
