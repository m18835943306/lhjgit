import { useMemo } from 'react'
import { Card as AntCard } from 'antd'
import './index.scss'

const Card = ({ children, title, ...rest }) => {
  const RenderTitle = (title) => {
    const RenderDom = useMemo(() => {
      if (title === false) return null
      if (typeof title === 'string') {
        return <div className="card_custom_title">{title}</div>
      }
      return title
    }, [title])
    return RenderDom
  }
  return (
    <AntCard title={RenderTitle(title)} {...rest}>
      {children}
    </AntCard>
  )
}

export default Card
