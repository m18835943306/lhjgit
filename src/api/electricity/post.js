import Request from '@/service'
import config from './config'
const api = new Request({ baseURL: config.baseURL })
export default function post(url, params, axiosConfig = {}) {
  return api.post(url, params, { baseURL: config.baseURL, ...axiosConfig })
}
