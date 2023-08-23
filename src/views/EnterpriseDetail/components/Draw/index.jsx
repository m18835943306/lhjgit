import React, { useState, useEffect } from 'react'

import './index.scss'

const Draw = (props) => {
  const user =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('user')) ||
    {}
  const {
    setLoading,
    contextValue: { ent_id }
  } = props
  const [id, setId] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (ent_id || ent_id === 0) {
      setId(ent_id)
    } else {
      setId(false)
    }
  }, [ent_id])
  return (
    <div className="EnterpriseDetail-Draw">
      {/* <iframe
        title="用电"
        src={"http://react-olympic-pre.airqualitychina.cn:9025/jtopo_topology/network_topology.html?ent_id="+
          ent_id}
        frameBorder="0"
      ></iframe> */}
      {/* {id && (
        <iframe
          title="用电"
          src={
            'http://localhost:3000/jtopo_topology/network_topology?ent_id=' + id
          }
          frameBorder="0"
        ></iframe>
      )} */}
      {/* {(id || id === 0) && (
        <iframe
          title="用电"
          src={
            'http://localhost:8802/jtopo_topology/network_topology.html?ent_id=' +
            id +
            '&project_id=' +
            user?.project_id +
            '&time=' +
            new Date().getTime()
          }
          frameBorder="0"
        ></iframe>
      )} */}
      {(id || id === 0) && (
        <iframe
          title="用电"
          src={
            'https://react-olympic-pre.airqualitychina.cn/jtopo_topology/network_topology.html?ent_id=' +
            id +
            '&project_id=' +
            user?.project_id +
            '&time=' +
            new Date().getTime()
          }
          frameBorder="0"
        ></iframe>
      )}
    </div>
  )
}

export default Draw
