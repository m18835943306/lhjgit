/*
  这是一个水平展示的筛选条件
*/
import React, {
  useEffect,
  useState,
  useReducer,
  useImperativeHandle,
  forwardRef
} from 'react'
import {
  Button,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Checkbox,
  DatePicker
} from 'antd'
import {
  SyncOutlined,
  DownloadOutlined,
  SearchOutlined
} from '@ant-design/icons'
import _ from 'lodash'
import { downloadExcel } from '&/commonjs/util'
import './index.scss'

const Filter = (
  {
    search,
    options,
    buttons,
    loading,
    hasBorder = true,
    isPage = false,
    hasMarginBottom = true,
    params = {},
    chirdren,
    filterItem,
    isHasSearch = true,
    showSearchButton = true,
    showReloadButton = false,
    showDownloadButton = true,
    downloadConfig = null,
    isNotQuery = false
  },
  ref
) => {
  const [isBusy, setIsBusy] = useState(true)
  const [list, setList] = useState([])
  const [id, setId] = useState(-1)
  const [isReady, setReady] = useState(false)
  const _parmas = {}
  options.map((o) => (_parmas[o.key] = o.value))
  const [filterParams, setFilterParams] = useReducer(
    (state, action) => {
      const p = {
        ...state,
        ...action.state
      }
      if (action.type === 'final') {
        setReady(true)
      }
      return p
    },
    {
      ..._parmas,
      ...params
    }
  )

  const toSearch = (params) => {
    search(getParams(params))
  }
  const setParams = (params) => {
    if (params) {
      setFilterParams({ state: params })
    }
  }
  const getParams = (params) => {
    if (params) {
      setFilterParams({ state: params })
    }
    return { ...filterParams, ...params }
  }

  useImperativeHandle(ref, () => ({
    toSearch,
    getParams,
    setParams,
    filterParams
  }))

  useEffect(() => {
    const p = {}
    options.map(({ value, key }) => {
      if (value && key) {
        p[key] = value
      }
    })
    if (id !== -1 && options.query) {
      setFilterParams({ type: 'final', state: p })
    } else if (id === -1 && !options.query) {
      setFilterParams({ type: 'final', state: p })
    }
    setList([...options])
  }, [id])

  useEffect(() => {
    if (options.query) {
      options.query((p) => {
        setId(_.random(0, 9999999))
      })
    }
  }, [])

  useEffect(() => {
    if (isNotQuery && isReady) {
      setIsBusy(false)
      return
    }
    if (!isNotQuery && isReady && filterParams) {
      toSearch()
      setReady(false)
      setIsBusy(false)
    }
  }, [isReady, filterParams, isNotQuery])
  return (
    <div
      className="Filter-wrap"
      data-id={id}
      style={{
        border: hasBorder ? '1px solid #dee0e3' : 'none',
        marginBottom: hasMarginBottom ? '10px' : '0px',
        padding: hasBorder ? '10px 10px 0 10px' : '0'
      }}
    >
      {isHasSearch && (
        <Row justify="space-between" align="center">
          <Col className="Filter-list">
            {filterItem}
            {list.map((item, index) =>
              makeComponents(item, filterParams, setFilterParams, index)
            )}
          </Col>
          <Col className="Filter-buttons">
            {showReloadButton && (
              <Button
                icon={<SyncOutlined />}
                loading={isBusy || loading}
                onClick={toSearch}
              ></Button>
            )}

            {showSearchButton && (
              <Button
                type="primary"
                icon={<SearchOutlined />}
                loading={isBusy || loading}
                onClick={() => {
                  toSearch(
                    isPage
                      ? {
                          page: 1
                        }
                      : {}
                  )
                }}
              >
                查询
              </Button>
            )}
            {buttons}
            {showDownloadButton && downloadConfig && (
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                loading={isBusy || loading}
                disabled={downloadConfig.disabled}
                onClick={() => {
                  downloadExcel(
                    downloadConfig.data,
                    downloadConfig.columns,
                    downloadConfig.name
                  )
                }}
              >
                导出
              </Button>
            )}
          </Col>
        </Row>
      )}
      {chirdren}
    </div>
  )
}

function makeComponents(
  {
    key,
    name,
    label,
    value,
    unit,
    placeholder,
    options,
    settings,
    show = true,
    mode,
    outSettings,
    isHasAllSelect = false
  },
  filterParams,
  setFilterParams,
  index
) {
  const propKey = (key || 0) + index
  if (name === 'input' && show) {
    return (
      <div className="Filter-item" key={propKey} {...outSettings}>
        {label && <span>{label}</span>}
        <Input
          placeholder={placeholder}
          value={filterParams[key]}
          {...settings}
          onChange={(el) => {
            setFilterParams({
              state: {
                [key]: el.target.value
              }
            })
          }}
        />
        {unit && (
          <span
            style={{
              marginLeft: '2px'
            }}
          >
            {unit}
          </span>
        )}
      </div>
    )
  } else if (name === 'select' && show) {
    return (
      <div className="Filter-item" key={propKey} {...outSettings}>
        {label && <span>{label}</span>}
        <Select
          value={filterParams[key]}
          mode={mode === 'multiple' ? mode : null}
          allowClear={mode === 'multiple' ? true : false}
          placeholder={placeholder}
          maxTagCount={1}
          {...settings}
          onChange={(v) => {
            setFilterParams({
              state: {
                [key]:
                  mode === 'multiple' && isHasAllSelect && v.includes('全选')
                    ? options.map((v) => {
                        return v.value
                      })
                    : v
              }
            })
          }}
        >
          {mode === 'multiple' && isHasAllSelect && (
            <Select.Option value="全选">全选</Select.Option>
          )}
          {options.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    )
  } else if (name === 'checkbox' && show) {
    return (
      <div className="Filter-item" key={propKey} {...outSettings}>
        {label && <span>{label}</span>}
        <Checkbox.Group
          {...settings}
          options={options}
          value={filterParams[key]}
          onChange={(v) => {
            setFilterParams({
              state: {
                [key]: v
              }
            })
          }}
        />
      </div>
    )
  } else if (name === 'dateTimeRange' && show) {
    return (
      <div className="Filter-RangePicker-item" key={propKey} {...outSettings}>
        {label && <span>{label}</span>}
        <DatePicker.RangePicker
          showTime
          {...settings}
          value={filterParams[key]}
          onChange={(v) => {
            setFilterParams({
              state: {
                [key]: v
              }
            })
          }}
        />
      </div>
    )
  } else if (name === 'date' && show) {
    return (
      <div className="Filter-dete-item" key={propKey} {...outSettings}>
        {label && <span>{label}</span>}
        <DatePicker
          {...settings}
          value={filterParams[key]}
          onChange={(v) => {
            setFilterParams({
              state: {
                [key]: v
              }
            })
          }}
        />
      </div>
    )
  } else if (name === 'radio' && show) {
    return (
      <div
        className="Filter-item"
        style={{
          whiteSpace: 'nowrap'
        }}
        key={propKey}
        {...outSettings}
      >
        {label && <span>{label}</span>}
        <Radio.Group
          options={options}
          onChange={({ target: { value } }) => {
            setFilterParams({
              state: {
                [key]: value
              }
            })
          }}
          value={filterParams[key]}
          {...settings}
        />
      </div>
    )
  } else {
    return (
      <div
        key={propKey}
        style={{
          width: '100%',
          marginRight: 'auto'
        }}
        {...outSettings}
      ></div>
    )
  }
}
export default forwardRef(Filter)
