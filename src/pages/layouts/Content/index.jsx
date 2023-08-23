import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
const { Content } = Layout
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useRoutePremission } from '@/premission'

const LayoutContent = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  useRoutePremission()

  return (
    <TransitionGroup
      style={{
        overflow: 'hidden',
        display: 'flex',
        flex: 1,
        background: '#edf2f9'
      }}
    >
      <CSSTransition timeout={500} classNames={'fade'} key={location.pathname}>
        <Content
          style={{
            minHeight: 480,
            background: '#ebf0f7',
            padding: '10px 10px 10px 10px',
            borderRadius: '10px',
            width: '100%'
          }}
        >
          <Outlet />
        </Content>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default LayoutContent
