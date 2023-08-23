import React, { useState, useEffect } from 'react'
import Card from './Card'
import './index.scss'

const Container = ({ children }) => {
  return <div className="LayoutContainer">{children}</div>
}

const ContainerQuery = ({ title, extra, children }) => {
  return (
    <div className="LayoutContainer_query">
      <Card title={title} body={children} extra={extra} />
    </div>
  )
}

const ContainerContent = ({ title, extra, children }) => {
  return (
    <div className="LayoutContainer_content">
      <Card title={title} body={children} extra={extra} />
    </div>
  )
}
Container.ContainerQuery = ContainerQuery
Container.ContainerContent = ContainerContent

export default Container
