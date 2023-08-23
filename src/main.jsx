import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import ThemeComponent from '@/components/themeComponent'
import store from '@/store'
import moment from 'dayjs'
import 'dayjs/locale/zh-cn'
moment.locale('zh-cn')
import App from './App.jsx'
import '@/style/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeComponent>
      <React.Suspense fallback={'加载中...'}>
        <App />
      </React.Suspense>
    </ThemeComponent>
  </Provider>
)
