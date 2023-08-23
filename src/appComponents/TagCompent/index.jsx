import { Tag } from 'antd'
import React from 'react'
import './index.scss'
const TagCompent = ({ record }) => {

  return (
    <div className='TagCompent'>
      {
        record?.content.map(item => {
          const color =
            item.highest_level == '一级' ? '#d02d22' : item.highest_level == '二级' ? '#e28336' : '#f6ca49'
          const colors =
            item.highest_level == '一级' ? '#d02d22' : item.highest_level == '二级' ? '#e28336' : '#f6ca49'
          return item.highest_level ?
            <div style={{height:"50px",display:"flex",justifyContent:"center",alignItems:"center"}} className='TagCompent-child'><Tag style={{ borderColor: color, backgroundColor: "#fff1f0" }}>
              <div style={{ color: color }}>{item.highest_level}</div></Tag> </div>

            :
            <div style={{ height:"50px",display:"flex",justifyContent:"center",alignItems:"center"}} className='TagCompent-child'> <Tag style={{ borderColor: colors, backgroundColor: "#fff1f0" }} >
              <div style={{ color: colors }}>{item.highest_level}</div></Tag></div>

        })
      }
    </div>

  )
}
export default TagCompent