import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import config from './config'
import './index.scss'

const Version = () => {
  const generateItems = () => {
    const renderLable = (item) => {
      return (
        <div>
          <p>{item.label}</p>
          <p>v{item.version}</p>
        </div>
      )
    }
    return config.map((item) => {
      return {
        label: renderLable(item),
        key: item.key,
        children: item.list.map((it) => {
          return (
            <div style={{ marginBottom: '10px' }} key={it.key}>
              <h4>
                {it.label}
                <span style={{ fontSize: '14px', color: 'gray' }}>
                  （{it.desc}）
                </span>
              </h4>
              <ul>
                {it.children.map((t) => (
                  <li key={t.key} style={{ textIndent: '20px' }}>
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>
          )
        })
      }
    })
  }
  return (
    <div className="Version">
      <Tabs
        defaultActiveKey="19"
        tabPosition={'left'}
        size="small"
        tabBarGutter={5}
        style={{
          height: 420
        }}
        items={generateItems()}
      />
    </div>
  )
}

export default Version
