import query from '&/api/electricity/query'
import { message } from 'antd'
import { setDefaultData } from '&/store/actions'

export const getList1 = (
  setData,
  setLoading,
  t,
  setPageInfo,
  page_info,
  user,
  dispatch
) => {
  return (params) => {
    setLoading(true)
    const { county_id, industry_type_id, ent_name, page, town_id, page_size,who_construct } =
      params
    const p = {
      county_id: county_id,
      town_id,
      industry_type_id: industry_type_id + '',
      ent_name,
      project_id: user.project_id,
      who_construct:who_construct
    }
    if (page_info) {
      p.page = page || 1
      p.page_size = page_size || 20
    }
    if (county_id === '') {
      delete p.county_id
    }
    if (town_id === '') {
      delete p.town_id
    }
    return new Promise((resolve, reject) => {
      query('/v1/enterprise-list', p)
        .then((res) => {
          setPageInfo(res.page_info)
          setData(res.data)
          t.changeSource(res.data)
          // cache session tablist[0]
          dispatch(setDefaultData(res.data[0]))
          resolve(res.data)
        })
        .catch((e) => {
          message.error('暂无数据')
          setData([])
          reject([])
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }
}
