import React, { useState, useEffect, useContext } from 'react'
const List = ({headertitle}) => {
    return (
      <div className='PointModal-List'>
          <div>{headertitle("实时数据")}</div>
          <div className='List-content'></div>
      </div>
    )
  }
  export default List