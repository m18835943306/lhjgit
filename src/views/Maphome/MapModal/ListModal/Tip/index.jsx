import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { downloadExcel } from '&/commonjs/util'
import { DownloadOutlined } from '@ant-design/icons'
import './index.scss'

const Tip = ({ data, tableData, columns }) => {
  return (
    <div className="Tip">
      <div className="EquStatus-content">
        <div>
          <span>在线：</span>
          <span style={{ color: 'green' }}>{data?.online_number}</span>
        </div>
        <div>
          <span>离线：</span>
          <span style={{ color: 'red' }}>{data?.offline_number}</span>
        </div>
        <div>
          <Button
            style={{
              float: 'right'
            }}
            disabled={!tableData.length}
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => {
              downloadExcel(tableData, columns, '设备状态列表')
            }}
          >
            导出
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Tip
