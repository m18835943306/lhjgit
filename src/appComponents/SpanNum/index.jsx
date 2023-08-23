import React from 'react'
import './index.scss'
const SpanNum = ({ record }) => {
  return (
    <div className='SpanNum'>
      {
            record?.content.map(item => {
              // console.log(item, "item---");
              return (
                <div className='SpanNum-child' style={{ height: "50px", borderBottom: "1px solid #f0f0f0",display:"flex",justifyContent:"center",alignItems:"center",padding:"5px",}}>
                  <div style={{
                    margin: "auto",
                    backgroundColor: '#ccf6e4',
                    // display: 'inline-block',
                    borderRadius: '50%',
                    color: '#00864e',
                    width: "20px",
                    height: "20px",
                    fontWeight: 'bold',
                    textAlign: "center",
                    marginBottom: "10px"
                  }}>{item.warn_count}</div>
                </div>
              )
        
            })
      }
    </div>

  )
}
export default SpanNum