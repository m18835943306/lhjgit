import { useContext, useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { LayoutContext } from '../context'

const { Sider } = Layout

const LayoutSider = ({ handleMenuItem, onOpenChange }) => {
  const { menus, activeKey, openKeys, collapsed } = useContext(LayoutContext)

  return (
    <div className="layout_page_sider">
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: '#edf2f9',
          height: '100%',
          width: `${collapsed ? 50 : 200}px !important`
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
            padding: '10px 0',
            borderRadius: '10px'
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            inlineCollapsed={collapsed}
            inlineIndent={15}
            defaultSelectedKeys={[activeKey]}
            selectedKeys={[activeKey]}
            onClick={handleMenuItem}
            items={menus}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              flex: 1,
              overflow: 'auto',
              height: '100vh',
              borderRadius: '10px',
              background: `linear-gradient(-45deg,rgba(0,160,255,0.86),#0048a2)`,
              color: '#fff'
            }}
          />
        </div>
      </Sider>
    </div>
  )
}

export default LayoutSider
