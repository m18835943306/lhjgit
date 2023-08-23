import React, { useEffect, useState, useRef } from 'react'
import { Pagination } from 'antd'
const App = ({
  pageInfo,
  pageChange = () => {},
  pageSizeChange = () => {}
}) => {
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  useEffect(() => {
    /*
    page: null
    page_size:10
    total_number:16
    total_page:2
    */
    if (pageInfo) {
      const { page, page_size, total_number, total_page } = pageInfo
      setPage(page || 1)
      setPageSize(page_size || 10)
      setTotal(total_number || 0)
    }
  }, [pageInfo])

  return (
    <div
      style={{
        marginTop: '20px',
        textAlign: 'center'
      }}
    >
      <Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        onShowSizeChange={(current, pageSize) => {
          pageSizeChange(pageSize)
        }}
        onChange={(page, pageSize) => {
          pageChange(page, pageSize)
        }}
      />
    </div>
  )
}

export default App
