import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from '&/components'
import Container from '@/appComponents/Container'
import _ from 'lodash'
import {
  BaseForm,
  SocketUseChart,
  HistoryAlarm,
  EmerManager,
  Production,
  Draw
} from './components'
const { TabPane } = Tabs

import './index.scss'

const EnterpriseDetail = (props) => {
  const [defaultIndex, setDefaultIndex] = useState(0)
  const [componentId, setComponentId] = useState(1)
  const [contextValue, setContextValue] = useState(null)
  const record = useSelector((state) => state.getRecordReducer)
  const panse = useSelector((state) => state.getPanesReducer)
  const entData = useSelector((state) => state.getEntDefaultData)
  useEffect(() => {
    if (entData) {
      setContextValue(entData)
    }
  }, [entData])
  useEffect(() => {
    if (panse.activeKey === 'EnterpriseDetail') {
      const item = Array.isArray(record) && record.length > 0 && record.at(-1)
      if (item.__source === '列表') {
        item.__source = null
        setDefaultIndex(0)
        setComponentId(_.random(0, 9999999))
        setContextValue(item)
      }
    }
  }, [panse, record])
  if (!contextValue) return '未找到企业信息'
  return (
    <Container>
      <Container.ContainerContent>
        <div>
          <Tabs
            contextValue={contextValue}
            defaultIndex={defaultIndex}
            key={componentId}
          >
            <TabPane tab="企业基础信息">
              <BaseForm />
            </TabPane>
            <TabPane tab="生产工艺流程">
              <Production></Production>
            </TabPane>
            <TabPane tab="实时用电数据">
              <SocketUseChart />
            </TabPane>
            <TabPane tab="历史报警查询">
              <HistoryAlarm />
            </TabPane>
            <TabPane tab="应急措施管理">
              <EmerManager />
            </TabPane>
            <TabPane tab="企业特征画像">企业特征画像</TabPane>
            <TabPane tab="流程绘制">
              <Draw></Draw>
            </TabPane>
          </Tabs>
        </div>
      </Container.ContainerContent>
    </Container>
  )
}

export default EnterpriseDetail
