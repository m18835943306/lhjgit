import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useRef,
  createElement
} from 'react'
import { Dropdown, Tooltip, Tabs, Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import screenfull from 'screenfull'
import {
  LogoutOutlined,
  UserOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  HomeOutlined,
  AlertOutlined,
  AreaChartOutlined,
  CreditCardOutlined,
  ThunderboltOutlined,
  PicLeftOutlined,
  PicRightOutlined
} from '@ant-design/icons'
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg'
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg'
import { Modal } from '&/appComponents/Antd'
import Version from './Version'
import { ReactComponent as ChangeLog } from '@/assets/header/changelog.svg'
import Map from '@/views/Maphome'
import { centerMenu } from '@/config/menuData'
import { globalAction } from '@/store/globas.store'
import { LayoutContext } from '../context'
import logo from '@/images/login/logo.png'
import out from '@/assets/maphomeimages/out.png'

const iconNodes = [
  <HomeOutlined />,
  <AlertOutlined />,
  <AreaChartOutlined />,
  <CreditCardOutlined />,
  <ThunderboltOutlined />
]

const Header = () => {
  const { collapsed, setCollapsed, tabIndex, setTabIndex } =
    useContext(LayoutContext)
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [visible, setVisible] = useState(false)
  const { theme } = useSelector((state) => state.globalStore)
  const modalRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'

    localStorage.setItem('theme', newTheme)
    dispatch(
      globalAction({
        theme: newTheme
      })
    )
  }

  const onChangeFull = () => {
    if (screenfull.isEnabled) {
      if (!screenfull.isFullscreen) {
        screenfull.request()
      } else {
        screenfull.exit()
      }
    }
  }

  const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('theme', theme)
    navigate('/login')
  }
  const color = useMemo(() => {
    return theme === 'dark' ? '#fff' : '#000'
  }, [theme])

  const change = () => {
    setIsFullscreen(screenfull.isFullscreen)
  }

  useEffect(() => {
    screenfull.isEnabled && screenfull.on('change', change)
    return () => {
      screenfull.isEnabled && screenfull.off('change', change)
    }
  }, [])
  const justFullPage = () => {
    setVisible(true)
    // window.open(`${window.location.origin}/#/fullpage`)
  }

  const generateItem = () => {
    return centerMenu.map((m, i) => {
      return {
        key: m.key,
        label: (
          <span>
            {iconNodes[i]}
            {m.label}
          </span>
        )
      }
    })
  }
  const onTabChange = (key) => {
    if (key === 'center_electric_power_map') {
      justFullPage()
      return
    }
    localStorage.removeItem('openKey')
    localStorage.setItem('tabIndex', key)
    setTabIndex(key)
  }

  const onClickChangeLog = () => {
    modalRef.current.showModelRef()
  }

  const renderNodalTitle = () => {
    return (
      <div>
        历史版本
        <span style={{ fontSize: '12px', color: 'gray' }}>
          （更新日期：2023-08-15）
        </span>
      </div>
    )
  }
  return (
    <div className="layout_page_header">
      <div className="logo">
        {/* <Button
          type="text"
          icon={collapsed ? <PicLeftOutlined /> : <PicRightOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        ></Button> */}
        <div className="collapse_btn" onClick={() => setCollapsed(!collapsed)}>
          <span
            className="collapse_btn_icon"
            style={{
              width: collapsed ? '17px' : '20px'
            }}
          >
            <span
              className="line"
              style={{ width: collapsed ? '50%' : '100%' }}
            ></span>
          </span>
        </div>
        <img
          src={logo}
          style={{ height: '80%', cursor: 'pointer' }}
          alt="LOGO"
        />
        {/* <span className="logo_text">企电通平台</span> */}
      </div>
      <div className="layout_page_header__right">
        <div className="layout_page_btns">
          {user.role_level === 1 ? (
            <Tabs
              activeKey={tabIndex}
              items={generateItem()}
              onChange={onTabChange}
            />
          ) : null}
        </div>
        <div className="actions">
          <Tooltip title="点击查看历史版本">
            <span className="theme">
              {createElement(ChangeLog, {
                style: { color: ' #000', fontWeight: 'bold', fontSizi: '24px' },
                onClick: onClickChangeLog
              })}
            </span>
          </Tooltip>
          <Tooltip title={!isFullscreen ? '切换全屏模式' : '退出全屏模式 '}>
            <span className="theme" onClick={onChangeFull}>
              {!isFullscreen ? (
                <FullscreenOutlined style={{ color }} />
              ) : (
                <FullscreenExitOutlined style={{ color }} />
              )}
            </span>
          </Tooltip>
          {/* <Tooltip title={theme === 'dark' ? '切换至浅色模式' : '切换至深色模式'}>
          <span className="theme">
            {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
              style: { color },
              onClick: onChangeTheme
            })}
          </span>
        </Tooltip> */}

          <Dropdown
            menu={{
              items: [
                {
                  key: '2',
                  // icon: <LogoutOutlined />,
                  label: (
                    <span
                      style={{ width: '100%', display: 'inline-block' }}
                      onClick={logout}
                    >
                      <span style={{ marginRight: '10px' }}>
                        <LogoutOutlined></LogoutOutlined>
                      </span>
                      退出
                    </span>
                  )
                }
              ]
            }}
          >
            <span className="user-action">
              <UserOutlined style={{ color }} />
              <span className="actions_user">（{user.adm}）</span>
            </span>
          </Dropdown>
        </div>
      </div>
      <Modal
        title={renderNodalTitle()}
        ref={modalRef}
        footer={false}
        style={{ top: 180 }}
        width={800}
        centered={false}
      >
        <Version />
      </Modal>
      <Drawer
        placement={'top'}
        headerStyle={{ display: 'none' }}
        onClose={() => setVisible(false)}
        destroyOnClose={true}
        open={visible}
        mask={false}
        height={'100%'}
        bodyStyle={{
          padding: 0
        }}
      >
        <div className="drawer-close" onClick={() => setVisible(false)}>
          <img src={out} />
        </div>
        <Map />
        {/* <EnterpriseDetail  /> */}
      </Drawer>
    </div>
  )
}

export default Header
