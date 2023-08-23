import React from 'react'
import axios from 'axios'
import { setDataToLocalStorage } from '@/utils'
import { LoginOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import logo from '@/images/login/logo.png'
import './index.scss'

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />
}
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tips: '',
      userName: '',
      userPwd: '',
      tipColor: '',
      btnText: '登 录',
      phone: '',
      tipsArray: [
        '登录中，请稍后...',
        '提示：用户名不能为空！',
        '提示：密码不能为空！',
        '用户名或密码错误！',
        '提示：手机号不能为空！',
        '提示：手机号格式有误！',
        '提示：请输入正确的6位验证码！',
        '用户名、密码或验证码错误！',
        '提示：未绑定手机号！请联系技术支持(010-82098830)。'
      ],
      btnTextArray: ['登 录', '登录中...'],
      colorArray: ['#2FA807', '#D36868'], //绿色 红色
      isClickable: false,
      msgBtnStyle: false,
      msgText: '获取验证码',
      isMsgShow: false,
      messageCode: ''
    }
    this.headers = { 'content-type': 'application/json;charset=utf-8' }
  }

  login() {
    let { btnTextArray, tipsArray, colorArray, userName, userPwd } = this.state

    //登陆，显示正在登陆中
    this.setState({
      tips: tipsArray[0],
      tipColor: colorArray[0],
      btnText: btnTextArray[1]
    })

    //验证用户名 密码是空
    if (userName == '' || userPwd == '') {
      let tip = userName == '' ? tipsArray[1] : tipsArray[2]
      this.setState({
        tips: tip,
        tipColor: colorArray[1],
        btnText: btnTextArray[0]
      })
      return
    }

    this.goVersion(userName, userPwd)
  }

  async goVersion(username, password) {
    let { btnTextArray, colorArray } = this.state
    const {
      data: { result, code, msg }
    } = await axios({
      method: 'post',
      url: `${
        import.meta.env.VITE_MICRO_SERVICE_API_ELECTRICITY
      }/v1/login/login`,
      headers: this.headers,
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
      this.props.navigate('/')
    } else {
      //用户不存在
      this.setState({
        tips: msg,
        tipColor: colorArray[1],
        btnText: btnTextArray[0]
      })
    }
  }

  getUserName(e) {
    this.setState({ userName: e.target.value })
  }

  getUserPwd(e) {
    this.setState({ userPwd: e.target.value })
  }

  onKeyup(e) {
    if (e.nativeEvent.keyCode === 13) this.login()
  }

  //当框获得焦点的时候 把提示删除
  inputFocus() {
    this.setState({
      tips: ''
    })
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  render() {
    return (
      <div className="login-Wrapper">
        <div className="title">
          <span>
            <img src={logo} alt="" />
          </span>
          <span>用电监控系统</span>
        </div>
        <div className="login">
          <div className="inner-login">
            <h5 className="login-title">登录</h5>
            <div className="login-forms">
              <Input
                placeholder="请输入用户名"
                value={this.state.userName}
                defaultValue=""
                onChange={this.getUserName.bind(this)}
                onFocus={this.inputFocus.bind(this)}
                onKeyUp={this.onKeyup.bind(this)}
              />
            </div>
            <div className="login-forms">
              <Input.Password
                visibilityToggle={false}
                placeholder="请输入密码"
                value={this.state.userPwd}
                defaultValue=""
                onChange={this.getUserPwd.bind(this)}
                onKeyUp={this.onKeyup.bind(this)}
                onFocus={this.inputFocus.bind(this)}
              />
            </div>
            <div style={{ color: this.state.tipColor, marginTop: '15px' }}>
              {this.state.tips}
            </div>
            <div
              className="login-enter flex-center pointer no-copy"
              onClick={this.login.bind(this)}
            >
              <span className="btn_icon">
                <LoginOutlined />
              </span>
              {this.state.btnText}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withNavigation(Login)
