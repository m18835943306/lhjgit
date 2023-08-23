import { useEffect, useState, useCallback, useRef } from 'react'
import _ from 'lodash'

const waitProcessing = () => {
  let resolve
  const promise = new Promise((_resolve) => {
    resolve = _resolve
  })
  return { promise, resolve }
}

/**
 * 获取table表格数据
 * @param {api} requestTask
 * @param {*} conditions
 * @default conditions.params = {}
 * @default conditions.disabledPage = false
 * @default conditions.pageConfig = ant-pagination api
 * @default conditions.isWaitExec = Whether to wait for execution
 * @default conditions.formatcb = format data callback
 * @default deps = [] react hooks deps
 * @returns [tableData,pagination,loading,onQuery, onReload, originData, loadDataAll]
 */
export const useTableData = (
  requestTask,
  conditions = {
    param: {},
    disabledPage: false,
    formatcb: false,
    isWaitExec: false
  },
  deps = []
) => {
  const ref = useRef({
    params: conditions.params || {},
    disabledPage: conditions.disabledPage,
    pageConfig: conditions.pageConfig,
    isRefresh: false,
    initPageOptions: {
      ...{
        current: 1,
        pageSize: 20,
        ...(conditions.pageConfig || {})
      }
    },
    pageOptions: {
      page: conditions.pageConfig?.current || 1,
      page_size: conditions.pageConfig?.pageSize || 20
    },
    formatcb: conditions.formatcb
  })
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [tableData, setTableData] = useState([])
  const [originData, setOriginData] = useState({})
  const [formatData, setFormatData] = useState([])
  const [pagination, setPagination] = useState({
    current: ref.current.pageOptions.page,
    pageSize: ref.current.pageOptions.page_size,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 30, 50, 100],
    total: 0,
    position: ['bottomCenter'],
    showTotal: (total, range) => `共 ${total} 条数据`,
    onChange(page, pageSize) {
      ref.current.pageOptions.page = page
      ref.current.pageOptions.page_size = pageSize
      setPagination((state) => {
        return {
          ...state,
          ...{
            current: page,
            pageSize: pageSize
          }
        }
      })
    }
  })

  const processing = waitProcessing()
  const loadData = useCallback(async () => {
    if (requestTask && _.isFunction(requestTask)) {
      setLoading(true)
      let params = ref.current.params
      if (!ref.current.disabledPage) {
        params = {
          ...params,
          ...ref.current.pageOptions
        }
      }

      try {
        const result = await requestTask(params)
        // 分页
        if (!ref.current.disabledPage) {
          const { data = [], page_info = {} } = result
          setPagination((state) => {
            return {
              ...state,
              ...{
                current: page_info.page,
                pageSize: page_info.page_size,
                total: page_info.total_number
              }
            }
          })
          setTableData(data)
        } else {
          setTableData(Array.isArray(result) ? result : [])
        }
        setOriginData(result)
        setIsMounted(true)
      } catch (error) {
        console.error(error, 'error')
      }
      setLoading(false)
    }
  }, [requestTask, ref.current.params])

  const preProcessFetch = useCallback(async () => {
    await processing.promise
    await loadData()
  }, [processing])

  const onQuery = (params) => {
    if (isMounted) {
      ref.current.params = params
      ref.current.pageOptions.page = ref.current.initPageOptions.current
      loadData()
    }
  }

  // 监听分页参数变化
  useEffect(() => {
    if (!ref.current.disabledPage) {
      if (conditions.isWaitExec) {
        preProcessFetch()
      } else {
        loadData()
      }
    }
  }, [
    pagination.current,
    pagination.pageSize,
    ref.current.disabledPage,
    conditions.isWaitExec
  ])
  // 默认请求
  useEffect(() => {
    if (ref.current.disabledPage) {
      preProcessFetch()
    }
  }, [deps])

  useEffect(() => {
    if (!conditions.isWaitExec) {
      processing.resolve()
    }
  }, [conditions.isWaitExec])

  // 外部传入的依赖
  useEffect(() => {
    if (isMounted) {
      loadData()
    }
  }, deps)

  // 刷新
  const onReload = useCallback(async () => {
    if (ref.current.isRefresh) {
      return
    }
    ref.current.isRefresh = true
    ref.current.pageOptions.page = ref.current.initPageOptions.current
    await loadData()
    ref.current.isRefresh = false
    return
  }, [loadData])

  // 合并pagination 参数
  useEffect(() => {
    if (
      ref.current.pageConfig !== false &&
      _.isPlainObject(ref.current.pageConfig)
    ) {
      setPagination({
        ...pagination,
        ...ref.current.pageConfig
      })
    }
  }, [ref.current.pageConfig])

  // 合并conditions参数
  useEffect(() => {
    Object.keys(conditions).forEach((c) => {
      ref.current[c] = conditions[c]
    })
  }, [conditions])

  // formatcb
  useEffect(() => {
    const data = _.isFunction(ref.current.formatcb)
      ? ref.current.formatcb(tableData)
      : tableData
    setFormatData(data)
  }, [tableData])

  const loadDataAll = useCallback(async () => {
    if (requestTask && _.isFunction(requestTask)) {
      let params = ref.current.params
      const newParams = {}
      for (const key in params) {
        if (key === 'page' || key === 'page_size') continue
        newParams[key] = params[key]
      }

      try {
        const result = await requestTask(newParams)
        return result
      } catch (error) {
        console.error(error, 'error')
        return null
      }
    }
  }, [requestTask, ref.current.params])

  return [
    formatData,
    pagination,
    loading,
    onQuery,
    onReload,
    originData,
    loadDataAll
  ]
}
