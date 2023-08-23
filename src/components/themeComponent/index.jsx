import React, { useState, useEffect } from 'react'
import { darkAlgorithm } from './theme/dark-algorithm'
import { defaultAlgorithm } from './theme/default-algorithm'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'

const ThemeComponent = ({ children }) => {
  const localTheme = localStorage.getItem('theme')
  const [themes, setThemes] = useState(
    localTheme === 'dark' ? darkAlgorithm : defaultAlgorithm
  )
  const { theme } = useSelector((state) => state.globalStore)
  const changeColor = (themeName) => {
    if (themeName === 'dark') {
      setThemes(darkAlgorithm)
    } else {
      setThemes(defaultAlgorithm)
    }
  }

  useEffect(() => {
    if (theme) {
      changeColor(theme)
    }
  }, [theme])

  return (
    <ConfigProvider locale={zhCN} theme={themes}>
      {children}
    </ConfigProvider>
  )
}
export default ThemeComponent
