import query from '&/api/electricity/query'
import dayjs from 'dayjs'

export let filterOptions1 = [
  {
    label: '区域选择',
    placeholder: '区域选择',
    options: [],
    name: 'select',
    key: 'county_name',
    value: '',
    settings: {
      allowClear: ''
    },
    outSettings: {
      style: {
        width: '200px'
      }
    }
  },
  {
    label: '行业选择',
    placeholder: '行业选择',
    options: [],
    name: 'select',
    key: 'industry_type',
    value: '',
    settings: {
      allowClear: ''
    },
    outSettings: {
      style: {
        width: '200px'
      }
    }
  },
  {
    label: '管控类型',
    placeholder: '管控类型',
    options: [],
    name: 'select',
    key: 'control_type',
    value: '',
    settings: {},
    outSettings: {
      style: {
        width: '200px'
      }
    }
  },
  {
    label: '线索日期',
    placeholder: '线索日期',
    options: [],
    name: 'date',
    key: 'clue_date',
    value: dayjs().subtract(1, 'days'),
    settings: {},
    outSettings: {
      style: {
        width: '200px'
      }
    }
  }
]

// 在其他组件公用字典，需提前声明
filterOptions1.__dict = {
  area: []
}

filterOptions1.query = (cb) => {
  const { project_id } = JSON.parse(localStorage.getItem('user'))

  query('/v1/macro-elec-items', {
    project_id
  }).then((res) => {
    const { area, control, industry } = res
    filterOptions1.filter((o) => {
      const dataArr =
        o.key === 'county_name'
          ? area
          : o.key === 'industry_type'
          ? industry
          : o.key === 'control_type'
          ? control
          : []
      o.options = dataArr.map((item) => {
        return {
          label: item,
          value: item
        }
      })
      o.options.unshift({
        label: '全部',
        value: ''
      })
    })
    cb ? cb() : ''
  })
}
