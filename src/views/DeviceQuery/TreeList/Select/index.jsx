import React, { useState, useEffect, useCallback } from 'react'
import { Select as AntdSelect, Input, Divider, Button, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { getStatisticalAnalysis } from '&/api/electricity'
const Select = ({ project_id }) => {
  const [selectOptions, setSeletionOptions] = useState([])
  const [selectValues, setSeletionValues] = useState([])
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState({
    area: '',
    industry: [],
    entName: ''
  })

  const getSelectItems = useCallback(async () => {
    const { area, industry } = await getStatisticalAnalysis({
      project_id
    })
    const generateOptions = (list, labelKey, args) => {
      const options = list.map((item) => ({
        label: `${item[labelKey]}(${item.ent_count})`,
        value: `${item[labelKey]}`,
        disabled: !item.ent_count,
        ...args
      }))
      return options
    }
    const options = [
      {
        label: '区域',
        options: generateOptions(area, 'county_name', {
          type: '区域'
        })
      },
      {
        label: '行业',
        options: generateOptions(industry, 'industry_type', { type: '行业' })
      }
    ]
    setSeletionOptions(options)
  }, [project_id])

  useEffect(() => {
    if (project_id) {
      getSelectItems()
    }
  }, [project_id, getSelectItems])

  const onChange = (e, options) => {
    setSeletionValues(options.map((item) => item.value).filter((item) => item))
    //
    setParams((state) => ({
      ...state,
      area: (options.find((item) => item.type === '区域') || {}).value,
      industry: options
        .filter((item) => item.type !== '区域')
        .map((o) => o.value)
    }))
    if (options.some((o) => o.type === '区域')) {
      // update disabled
      selectOptions.forEach((item) => {
        if (item.label === '区域') {
          item.options = item.options.map((o) => ({
            ...o,
            disabled: true
          }))
        }
      })
    } else {
      selectOptions.forEach((item) => {
        if (item.label === '区域') {
          item.options = item.options.map((o) => ({
            ...o,
            disabled: false
          }))
        }
      })
    }
    // setSelectedItems(options)
  }

  const onInputChange = (e) => {
    setParams((state) => ({
      ...state,
      entName: e.target.value
    }))
  }

  const handleSearch = () => {
    setOpen(false)
  }

  return (
    <AntdSelect
      // mode="multiple"
      placeholder="请选择"
      mode="tags"
      // showArrow
      value={selectValues}
      onChange={onChange}
      // tagRender={tagRender}
      style={{ width: '100%' }}
      options={selectOptions}
      optionLabelProp="value"
      open={open}
      onFocus={() => setOpen(true)}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0'
            }}
          />
          <div style={{ display: 'flex' }}>
            <Input
              placeholder="请输入公司名称"
              onChange={onInputChange}
              allowClear
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              style={{ marginLeft: '10px' }}
              onClick={handleSearch}
            >
              搜索
            </Button>
          </div>
        </>
      )}
    />
  )
}

export default Select
