import Request from '@/service'
import config from './config'
const baseApi = new Request({ baseURL: config.baseURL, verbose: false })

/**
 * 查询用户配置信息
 * @param {config_code} 配置代码
 * @param {token}
 *
 */
export async function getConfigList(options) {
  const res = baseApi.post(config.getConfigList, {
    ...options,
    system_code: 'COMBINE'
  })
  return res
}

/**
 * 获取当前用户属地信息
 * @param {token}
 */
export async function getUserRegionInfo(options) {
  const res = baseApi.post(config.getUserRegionInfo, options)
  return res
}

/**
 * 查询用户登陆信息
 * @param {token}
 */
export async function getUserInfo(options) {
  const res = baseApi.post(config.getUserInfo, {
    token: options.token,
    system_code: 'COMBINE'
  })
  return res
}

/**
 * 获取当前用户城市组信息
 * @param {token}
 */
export async function getCityGroup(options) {
  const res = baseApi.post(config.getCityGroup, options)
  return res
}
