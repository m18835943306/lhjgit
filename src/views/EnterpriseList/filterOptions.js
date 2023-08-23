import query from '&/api/electricity/query'

export let filterOptions1 = [
  {
    label: '数据来源',
    placeholder: '数据来源',
    options: [],
    name: 'select',
    key: 'who_construct',
    value: '',
    settings: {
      allowClear: ''
    }
  },
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
    label: '企业',
    placeholder: '请输入企业名称',
    options: [],
    name: 'input',
    key: 'ent_name',
    value: '',
    settings: {}
  }
]

// 在其他组件公用字典，需提前声明
filterOptions1.__dict = {
  task_name: []
}
const values = JSON.parse(localStorage.getItem('user'))
filterOptions1.query = (cb) => {
  query(`/v1/industry-list?json={"project_id":${values?.project_id}}`).then(
    (res) => {
      // console.log(res, 'res----')
      filterOptions1.filter((o) => {
        if (o.key === 'industry_type_id') {
          o.options = res.map((o) => {
            return {
              label: o.industry_type,
              value: o.industry_type_id
            }
          })
          o.options.unshift({
            label: '全部',
            value: ''
          })
        }
        if (o.key === 'who_construct') {
          const arr = [
            {
              label: '全部',
              value: ''
            },
            {
              label: '接入',
              value: '接入'
            },
            {
              label: '自建',
              value: '自建'
            }
          ]
          o.options = arr
        }
      })
      cb ? cb() : ''
    }
  )
}
