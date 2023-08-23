import React, { useState, useEffect } from 'react'
import moment from 'dayjs'
import { getRealtimeMonitor } from '&/api/electricity'
import Container from '@/appComponents/Container'
import ExpandLayout from '&/components/ExpandLayout'
import { Context } from './context'
import EntData from './EntData'
import TreeList from './TreeList'
import './index.scss'

const DeviceQuery = () => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [devDataCode, setDevDataVode] = useState([])
  // 设备分组，设备数据
  const [devData, setDevData] = useState({})
  // 设备类型
  const [devTypes, setDevTypes] = useState([])
  const [entId, setEntId] = useState('')
  const [devCodeList, setDevCodeList] = useState('')

  const onClick = (devCodes) => {
    if (Array.isArray(devCodes)) {
      setDevCodeList(devCodes.join(','))
    }
  }
  const onClickDevCode = (value) => {
    setDevDataVode(value)
  }
  return (
    <Context.Provider
      value={{
        devData,
        setDevData,
        entId,
        setEntId,
        value,
        devTypes,
        setDevTypes
      }}
    >
      <Container>
        <Container.ContainerContent>
          <ExpandLayout
            gutter={10}
            leftSlot={
              <EntData
                value={value}
                devCodeList={devCodeList}
                devDataCode={devDataCode}
              />
            }
            rightSlot={
              <TreeList click={onClick} clickDevCode={onClickDevCode} />
            }
          />
        </Container.ContainerContent>
      </Container>
    </Context.Provider>
  )
}
export default DeviceQuery
