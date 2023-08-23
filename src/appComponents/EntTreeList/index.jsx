import React, { useState, useEffect, useRef } from 'react'
import { Tree, Spin, Input } from 'antd'
import { Card } from '&/appComponents/Antd'
import './index.scss'

const EntTreeList = ({ title, treeData, onTabChange, ...rest }) => {
  const treeRef = useRef(null)

  const [tap, setTap] = useState(1)
  const [entName, setEntName] = useState('')
  const [expandedKeys, setExpandedKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  // const [treedata1, setTreedata1] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [treeHeight, setTreeHeight] = useState(0)

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue)
  }
  const onSelect = () => {}
  const onInputChange = (e) => {
    setEntName(e.target.value)
  }
  const handleTab = (v) => {
    setTap(v)
    onTabChange && onTabChange(v)
  }

  const getDefaultKeys = (treeData, count) => {
    const checkKeys = []
    const expandedKeys = []
    const devCodes = []
    const getKeys = (data, index) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length) {
          ++index
          getKeys(data[i].children, index)
          if (index <= 2) {
            break
          }
        } else {
          if (data[i].dev_code) {
            devCodes.push(data[i].dev_code)
            checkKeys.push(data[i].key)
          }
        }
      }
    }
    getKeys(treeData, count)
    const existTreeData =
      treeData.find((item) => item.children && item.children.length) || {}
    expandedKeys.push(
      existTreeData.children[0]?.key,
      existTreeData.children[0]?.parentKey || []
    )
    return {
      devCodes,
      expandedKeys,
      checkKeys
    }
  }

  useEffect(() => {
    if (treeRef.current) {
      setTreeHeight(treeRef.current.clientHeight)
    }
  }, [treeRef])
  return (
    <div className="EntTreeList">
      <Card
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        bodyStyle={{ flex: 1, overflow: 'auto' }}
        size="small"
        title={title}
      >
        <div className="EntTreeList-list">
          <div className="EntTreeList-list-search">
            <div className="EntTreeList-list-search__input">
              <Input
                value={entName}
                placeholder="请输入公司名称"
                onChange={onInputChange}
                allowClear
              />
            </div>
          </div>
          <div className="EntTreeList-list-taps">
            <div
              className={`list-taps-item ${tap === 1 ? 'active' : ''}`}
              onClick={() => handleTab(1)}
            >
              地区
            </div>
            <div
              className={`list-taps-item ${tap === 2 ? 'active' : ''}`}
              onClick={() => handleTab(2)}
            >
              行业
            </div>
          </div>
          <div className="EntTreeList-list-tree">
            <Spin tip="Loading......" spinning={isLoading}>
              <div className="list-bottom">
                {treeData && treeData.length ? (
                  <Tree
                    showLine
                    onExpand={onExpand}
                    expandedKeys={expandedKeys} //（受控）展开指定的树节点s
                    selectedKeys={selectedKeys}
                    onSelect={onSelect}
                    treeData={treeData}
                    showIcon={true}
                    defaultExpandAll
                    height={treeHeight}
                    {...rest}
                    // defaultExpandedKeys={defaultKeys} //默认展开指定的树节点
                  />
                ) : entName ? (
                  <div>没有找到相关企业。。。</div>
                ) : null}
              </div>
            </Spin>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default EntTreeList
