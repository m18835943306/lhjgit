import Request from '@/service'
import config from './config'
const api = new Request({ baseURL: config.baseURL })

export default function query(url, params, axiosConfig = {}) {
  return api.get(
    url,
    params,
    { baseURL: config.baseURL, ...axiosConfig },
    false
  )
}
