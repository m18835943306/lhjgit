import React from 'react'
import dayjs from 'dayjs'
import { DownloadOutlined } from '@ant-design/icons'

export let filterJson = [
  {
    label: '时间',
    placeholder: '时间选择',
    options: [],
    type: 'dateTimeRange',
    key: 'timeRange',
    value: [dayjs().add(-7, 'd'), dayjs()],
    settings: {
      showTime: false
    }
  },
  {
    label: '监测项',
    placeholder: '监测项',
    options: [],
    type: 'select',
    key: 'type_of_industry',
    api: (params) => {
      return new Promise((resove) => {
        const a = [
          { label: '全部', value: 'all' },
          { label: '否', value: '0' },
          { label: '是', value: '1' }
        ]
        resove(a)
      })
    },
    value: [],
    settings: {}
  },
  {
    label: '总表',
    placeholder: '总表',
    options: [],
    type: 'select',
    key: 'countyName1',
    api: (params) => {
      return new Promise((resove) => {
        const a = [
          { label: '全部1', value: '' },
          { label: '否1', value: '0' },
          { label: '是1', value: '1' }
        ]
        resove(a)
      })
    },
    value: [],
    settings: {}
  },
  {
    label: '产物设施',
    placeholder: '产物设施',
    options: [],
    type: 'select',
    key: 'countyName2',
    value: [],
    settings: {}
  },
  {
    label: '治污设施',
    placeholder: '治污设施',
    options: [],
    type: 'select',
    key: 'countyName3',
    value: [],
    settings: {}
  },
  {
    label: '查询',
    type: 'button',
    api: () => {
      console.log('chaxunzhong')
    },
    settings: {
      type: 'primary',
      loading: false,
      icon: null
    }
  }
]
