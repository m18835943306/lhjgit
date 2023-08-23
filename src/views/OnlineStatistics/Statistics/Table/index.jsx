import React, { useState, useEffect } from 'react'
import { Table as TableAntd, Button } from 'antd'
import { downloadExcel } from '&/commonjs/util'
import { DownloadOutlined } from '@ant-design/icons'

const Table = ({ tableChart }) => {
  const [downloading, setDownloading] = useState(false)
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const download = async () => {
    setDownloading(true)
    downloadExcel(data, columns, '各区及行业联网统计列表')
    setDownloading(false)
  }
  useEffect(() => {
    if (tableChart) {
      const newcoloums = tableChart.header.map((item) => {
        return {
          title: item === '行业' ? item : `${item}（%）`,
          dataIndex: item,
          key: item,
          align: 'center',
          width: 100,
          sorter: item !== '行业' ? (a, b) => a[item] - b[item] : null
        }
      })
      setData(tableChart.data)
      setColumns(newcoloums)
    }
  }, [tableChart])
  return (
    <div>
      <Button
        type="primary"
        style={{ position: 'absolute', right: '10px', top: '10px' }}
        icon={<DownloadOutlined />}
        loading={downloading}
        disabled={!data.length}
        onClick={download}
      >
        导出
      </Button>
      <TableAntd
        size="small"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: 300 }}
        bordered
        pagination={false}
      />
    </div>
  )
}

export default Table
