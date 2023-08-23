import React, { useState, useEffect } from 'react'
import { Tag } from 'antd';
import './index.scss'
const ConText = ({ data }) => {
  const dataArr = data.split('\n')
  dataArr.pop()
  const handcolor = (text) => {
    const color =
      text == '一级' ? '#d02d22' : text == '二级' ? '#e28336' : '#f6ca49'
    return { color: color, fontSize: "15px", fontWeight: "bolder" }
  }
  const handTagStyle = (text) => {
    const color =
      text == '一级' ? '#d02d22' : text == '二级' ? '#e28336' : '#f6ca49'
    return { borderColor: color, backgroundColor: "#fff1f0" }
  }
  return (
    <div className="ConText">
      <>
        <ul className="num">
          {dataArr?.map((item) => {
            return (
              <div className="num-ul" style={{height:"50px",borderBottom:"1px solid #f0f0f0"}}>
                <li className="li" >
                  {item}
                </li>
              </div>
            )
          })}
        </ul>
      </>
    </div>
  )
}
export default ConText
