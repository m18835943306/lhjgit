import React, { useState, useEffect, useContext } from 'react'
const RealTime = ({headertitle}) => {
    return (
      <div className='PointModal-RealTime'>
          <div>{headertitle("实时数据")}</div>
          <div className='RealTime-content'></div>
      </div>
    )
  }
  export default RealTime