import './index.scss'

const Card = ({ title, body, extra }) => {
  return (
    <div className="ContainerCard">
      {title && (
        <h6 className="ContainerCard_title">
          <span className="ContainerCard_title__text">{title}</span>
          <span className="ContainerCard_title__extra">{extra}</span>
        </h6>
      )}
      <div className="ContainerCard_body">{body}</div>
    </div>
  )
}

export default Card
