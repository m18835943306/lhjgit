import query from '&/api/electricity/query'
import dayjs from 'dayjs'

export let filterOptions1 = [
  {
    label: '行业选择',
    placeholder: '行业选择',
    options: [],
    name: 'select',
    key: 'industry_type_id',
    value: '',
    settings: {
      allowClear: ''
    }
  },
  {
    label: '企业名称',
    placeholder: '请输入企业名称',
    options: [],
    name: 'input',
    key: 'ent_name',
    value: '',
    settings: {}
  },
  // {
  //   label: '点位类型',
  //   placeholder: '点位类型',
  //   options: [],
  //   name: 'select',
  //   key: 'dev_type',
  //   value: '',
  //   settings: {
  //     allowClear: ''
  //   }
  // },
  {
    label: '报警类型',
    placeholder: '报警类型',
    options: [],
    name: 'select',
    key: 'warn_type',
    value: '',
    settings: {
      allowClear: ''
    }
  },
  {
    label: '报警级别',
    placeholder: '报警级别',
    options: [],
    name: 'select',
    key: 'warn_level',
    value: '',
    settings: {
      allowClear: ''
    }
  }
  // {
  //   label: '报警状态',
  //   placeholder: '报警状态',
  //   options: [],
  //   name: 'select',
  //   key: 'release_status',
  //   value: '',
  //   settings: {
  //     allowClear: ''
  //   }
  // },
  // {
  //   label: '处理状态',
  //   placeholder: '处理状态',
  //   options: [],
  //   name: 'select',
  //   key: 'process_status',
  //   value: '',
  //   settings: {
  //     allowClear: ''
  //   }
  // },
  // {
  //   label: '时间',
  //   placeholder: '时间',
  //   options: [],
  //   name: 'dateTimeRange',
  //   key: 'timeRange',
  //   value: [dayjs().subtract(7, 'days'), dayjs()],
  //   settings: {
  //     showTime: false
  //   }
  // }
]

// 在其他组件公用字典，需提前声明
filterOptions1.__dict = {
  area: []
}

filterOptions1.query = (cb) => {
  const value = JSON.parse(localStorage.getItem('user'))

  query('/v1/warn/device-alarm-items', {
    // project_id: project_code,
    role_level: value?.role_level,
    warn_type: 4,
    adm_id: value?.adm_id
  }).then((res) => {
    filterOptions1.__dict.area = res.area.reduce(
      (pre, o) => {
        if (o.county_id) {
          o.value = o.county_id
        }
        if (o.county_name) {
          o.title = o.county_name
        }

        if (o.towns) {
          o.children = o.towns.map((o1) => {
            if (o1.town_id) {
              o1.value = o1.town_id
            }
            if (o1.town_name) {
              o1.title = o1.town_name
            }
            return o1
          })
        }
        pre.push(o)
        return pre
      },
      [{ value: '', label: '全部' }]
    )
    filterOptions1.filter((o) => {
      if (o.key === 'industry_type_id') {
        o.options = res.industry.map((o) => {
          return {
            label: o.industry_type_name,
            value: o.industry_type_id
          }
        })
        o.options.unshift({
          label: '全部',
          value: ''
        })
      }
      if (o.key === 'dev_type') {
        o.options = res.dev_type.map((o) => {
          return {
            label: o.dev_type_name,
            value: o.dev_type
          }
        })
        o.options.unshift({
          label: '全部',
          value: ''
        })
      }
      if (o.key === 'warn_type') {
        o.options = res.warn_type.map((o) => {
          return {
            label: o.warn_type_name,
            value: o.warn_type
          }
        })
        o.options.unshift({
          label: '全部',
          value: ''
        })
      }

      if (o.key === 'warn_level') {
        o.options = res.warn_level.map((o) => {
          return {
            label: o.warn_level_value,
            value: o.warn_level
          }
        })
        o.options.unshift({
          label: '全部',
          value: ''
        })
      }
      if (o.key === 'release_status') {
        o.options = res.release_status.map((o) => {
          return {
            label: o.release_status_value,
            value: o.release_status
          }
        })
        o.options.unshift({
          label: '全部',
          value: ''
        })
      }
      if (o.key === 'process_status') {
        o.options = res.process_status.map((o) => {
          return {
            label: o.process_status_value,
            value: o.process_status
          }
        })
        o.options.unshift({
          label: '全部',
          value: ''
        })
      }
    })

    cb ? cb() : ''
  })
}
