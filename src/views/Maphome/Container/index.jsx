import React, { useState, useEffect } from 'react'
import { getHomeRandom } from '&/api/electricity'
import HeadContainer from './HeadContainer'
import LeftContaine from './LeftContainer'
import RightContainer from './RightContainer'
import Map from '../map'
import './index.scss'

const Container = () => {
  const [textData, setTextData] = useState()
  useEffect(() => {
    setInterval(() => {
      getHomeRandom().then((res) => {
        // console.log(res, "res");
        setTextData(res)
      })
    }, 300000)
  }, [])
  useEffect(() => {
    getHomeRandom().then((res) => {
      setTextData(res)
    })
  }, [])
  return (
    <div className="Container">
      <HeadContainer />
      <div className="Container-content">
        <LeftContaine />
        <Map />

        <RightContainer />
        {textData ? (
          <div className="Content-text">
            当前报警信息：<span>{textData}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Container
