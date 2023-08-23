import post from '&/api/electricity/post'
import { getClueMacroMidList } from '&/api/electricity'
import { message } from 'antd'
import dayjs from 'dayjs'
import _ from 'lodash'

export const getList1 = (setData, setLoading) => {
  return (params) => {
    setLoading(true)
    const { county_name, industry_type, town_id, control_type, clue_date } =
      params
    const value = JSON.parse(localStorage.getItem('user')) || {}
    const p = {}
    if (county_name) {
      p.county_name = county_name
    }
    if (industry_type) {
      p.industry = industry_type
    }
    if (town_id) {
      p.town_id = town_id
    }
    if (control_type) {
      p.level = control_type
    }
    if (clue_date) {
      p.clue_date = dayjs(clue_date).format('YYYY-MM-DD')
    }
    p.project_id = value?.project_id
    getClueMacroMidList(p)
      .then((res) => {
        setData(res)
      })
      .catch((e) => {
        message.error('暂无数据')
        setData([])
      })
      .finally(() => {
        setLoading(false)
      })
  }
}
