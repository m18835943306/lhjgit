import { useState, useEffect, useMemo, useCallback } from 'react'
import Icon, { MailOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { centerMenu, regionMenu } from '@/config/menuData'
import { LayoutContext } from './context'
import LayoutSider from './Sider'
import LayoutContent from './Content'
import LayoutHeader from './Header'
import './index.scss'

const App = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const [menuDataArr, setMenuDataArr] = useState([])
  const [collapsed, setCollapsed] = useState(false)
  //Header Tab index
  const [tabIndex, setTabIndex] = useState(
    localStorage.getItem('tabIndex') || 'center_electric_power_alarm'
  )
  const [openKeys, setOpenKeys] = useState([''])
  const [activeKey, setActiveKey] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePath = useMemo(
    () => location.pathname.endsWith('Maphome') || location.pathname === '/',
    [location]
  )
  const isCenter = useMemo(() => user.role_level === 1, [user.role_level])
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/SynAlarmList')
    } else {
      setActiveKey(location.pathname.slice(1))
    }
  }, [location, navigate])

  const generateMenu = useCallback(
    (menus) => {
      const realTabIndex = localStorage.getItem('tabIndex') || tabIndex
      const findMenu = menus.find((menu) => menu.key === realTabIndex)
      const menuTemp = []
      if (findMenu) {
        findMenu.children.forEach((item) => {
          menuTemp.push({
            ...item,
            icon: item.icon ? (
              <Icon
                component={item.icon}
                fill="#fff"
                style={{ color: '#fff' }}
              />
            ) : (
              <MailOutlined />
            )
          })
        })

        if (!isHomePath) {
          const defaultOpenKeys = menuTemp.map((m) => m.key)
          setActiveKey(menuTemp[0].children[0].key)
          setOpenKeys(defaultOpenKeys)
          navigate(menuTemp[0].children[0].key)
        }
      }
      return menuTemp
    },
    [tabIndex, isHomePath, navigate]
  )

  useEffect(() => {
    const menu = isCenter ? centerMenu : regionMenu
    if (Array.isArray(menu)) {
      setMenuDataArr(generateMenu(menu))
    }
  }, [generateMenu, isCenter])

  const onClick = (e) => {
    setActiveKey(e.key)
    navigate(`/${e.key}`)
  }
  const onOpenChange = (keys) => {
    setOpenKeys(keys)
  }
  return (
    <LayoutContext.Provider
      value={{
        menus: menuDataArr,
        openKeys,
        activeKey,
        tabIndex,
        setTabIndex,
        collapsed,
        setCollapsed
      }}
    >
      {menuDataArr.length ? (
        <Layout style={{ height: '100%' }} className="layout_page">
          <LayoutHeader tabIndex={tabIndex} setTabIndex={setTabIndex} />

          <Layout>
            <LayoutSider handleMenuItem={onClick} onOpenChange={onOpenChange} />
            <LayoutContent />
          </Layout>
        </Layout>
      ) : null}
    </LayoutContext.Provider>
  )
}
export default App
