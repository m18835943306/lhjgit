import { RouterProvider } from 'react-router-dom'
import axios from 'axios'
import { getParameter } from '&/utils'
import { setDataToLocalStorage } from '@/utils'
import router from '@/routes'

const App = () => {
  const login = async (username, password) => {
    const {
      data: { result, code }
    } = await axios({
      method: 'post',
      url: `${
        import.meta.env.VITE_MICRO_SERVICE_API_ELECTRICITY
      }/v1/login/login`,
      headers: { 'content-type': 'application/json;charset=utf-8' },
      data: {
        username,
        password
      }
    })
    if (code === 2000) {
      //  临时添加Project_id
      result.project_id = 225

      //正常登陆
      setDataToLocalStorage('user', JSON.stringify(result))
      setDataToLocalStorage('logined', true)
      setDataToLocalStorage('autologin', true)
      window.history.pushState(null, null, '/')
      window.history.go(0)
    }
  }
  //免密登录
  let skipLoginInfos = (() => {
    let autologin = getParameter('autologin')
    let ssoToken = getParameter('ssoToken')
    let nickname = ''
    console.log(window.location, '--window.location.search')
    if (window.location.search.indexOf('nickname=') !== -1) {
      nickname = window.location.search.split('&')[3].split('=')[1]
    }
    if (autologin) {
      localStorage.setItem('nickname', nickname)
      sessionStorage.setItem('autologin', autologin)
      if (getParameter('userclickbehavior') != null) {
        //用于区分是否需要记录用户行为日志，目前仅支持大兴部分系统免密登录的情况下点击一级菜单的行为
        sessionStorage.setItem(
          'userclickbehavior',
          getParameter('userclickbehavior')
        )
      }
      return ['', getParameter('username'), getParameter('password')]
    } else if (ssoToken === 'fa6825c5f4bc6dd1c04ce3d8b4f59602') {
      localStorage.setItem('ssoToken', 'yes')
      return ['', 's_jx_wangge', '', 'no_verify']
    } else {
      return []
    }
  })()
  if (skipLoginInfos.length) {
    login(skipLoginInfos[1], skipLoginInfos[2])
  }

  console.log(skipLoginInfos, 'skipLoginInfos')
  return (
    <div className="App">
      <RouterProvider router={router()} />
    </div>
  )
}

export default App
