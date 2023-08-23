import React, { useState, useEffect } from 'react'
import './index.scss'

const TextAllNum = ({ text, str, textother, strother }) => {
  const [data, setData] = useState([])
  const [dataOther, setDataOther] = useState([])
  useEffect(() => {
    if (str || str == 0) {
      let arr = []
      const number = str + ''
      for (var i = 0; i < number.length; i++) {
        arr.push(number[i])
      }
      setData(arr)
    }
    if (strother) {
      let arrother = []
      const numberother = strother + ''
      for (var i = 0; i < numberother.length; i++) {
        arrother.push(numberother[i])
      }
      setDataOther(arrother)
    }
  }, [str, strother])
  return (
    <div className="TextAllNum">
      <div className="TextAllNum-this">
        <div className="TextAllNum-text">{text}:</div>
        <div className="TextAllNum-num">
          {data &&
            data.map((item) => {
              return <span className="num">{item}</span>
            })}
        </div>
      </div>
      {strother ? (
        <div className="TextAllNum-that">
          <div className="TextAllNum-text">{textother}:</div>
          <div className="TextAllNum-num">
            {dataOther &&
              dataOther.map((item) => {
                return <span className="num">{item}</span>
              })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TextAllNum
