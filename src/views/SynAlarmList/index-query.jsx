import query from '&/api/electricity/query'
import { getWarnDeviceAlarmList, getDeviceAlarmOuter } from '&/api/electricity'
import { message } from 'antd'
import _ from 'lodash'

export const getList1 = (
  setData,
  setLoading,
  setPageInfo,
  setNumData,
  page_info,
  setDownData,
  setParamJson,
  setkey
) => {
  return (params) => {
    const {
      ent_name,
      county_id,
      town_id,
      dev_type,
      industry_type_id,
      warn_type,
      warn_level,
      process_status,
      release_status,
      timeRange,
      page,
      page_size
    } = params
    const value = JSON.parse(localStorage.getItem('user'))
    const p = {
      ent_name,
      // project_id: project_code,
      role_level: value?.role_level,
      adm_id: value?.adm_id
    }
    if (county_id) {
      p.county_id = county_id
    }
    if (town_id) {
      p.town_id = town_id
    }
    if (dev_type) {
      p.dev_type = dev_type
    }
    if (industry_type_id) {
      p.industry_type_id = `${industry_type_id}`
    }
    if (warn_type) {
      p.warn_type = warn_type
    }
    if (warn_level) {
      p.warn_level = warn_level
    }
    if (process_status) {
      p.process_status = process_status
    }
    p.release_status = 1
    if (timeRange && timeRange[0]) {
      p.start_time = timeRange[0].format('YYYY-MM-DD 00:00:00')
    }
    if (timeRange && timeRange[1]) {
      p.end_time = timeRange[1].format('YYYY-MM-DD 23:59:59')
    }
    // 分页参数
    if (page_info) {
      p.page = page || 1
      p.page_size = page_size || 20
    }
    p.warn_type = '4'
    setParamJson(p)
    setLoading(true)
    const promise1 =  new Promise((resolve, reject) => {
      getWarnDeviceAlarmList(p).then((res) => {
        resolve(res)
      })
        .catch((e) => {
          message.error('暂无数据')
          reject(e)
          setDownData([])
        })
        .finally(() => {
          setLoading(false)
        })
    })
    // 掉列表的接口
    const promise2 = new Promise((resolve, reject) => {
      getDeviceAlarmOuter(p).then((res) => {
        resolve(res)
      })
        .catch((e) => {
          message.error('暂无数据')
          reject(e)
          setData([])
        })
    })
    Promise.all([promise1, promise2])
      .then(([res1, res2]) => {
        setDownData(res1.data.map((item) => item.warn_data).flat(Infinity))
        setNumData(res2.counts)
        setPageInfo(res1.page_info)
        // groupBy(res2.data)
        setData(res2.data)
        setkey([])
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false)
      })
  }
}
function groupBy(arr) {
  for (let i = 0; i < arr.length; i++) {
    const data = arr[i]
    for (let k = 0; k < data.warn_data.length; k++) {
      const c = data.warn_data[k]
      c.rowSpan = 0
      if (!data[c.dev_id]) {
        data[c.dev_id] = [c]
      } else {
        data[c.dev_id].push(c)
      }
      data[c.dev_id][0].rowSpan = data[c.dev_id].length
    }
    const {
      county_name,
      ent_name,
      industry_type_name,
      town_name,
      warn_count,
      warn_data,
      ...rest
    } = data
    const aa = Object.keys(rest).map((item) => {
      return {
        dev_id: Number(item),
        action: '操作',
        children: []
      }
    })

    aa.forEach((item, index) => {
      item.children = Object.values(rest)[index]
    })
    const datalist = []
    datalist.push(aa)
    data.warn_datanew = [...Object.values(rest).flat(Infinity)]
    data.datanew = datalist.flat(Infinity)
  }
}
