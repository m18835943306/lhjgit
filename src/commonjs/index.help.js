/**
 * 入口页帮助函数
 */
import { getUserRegionInfo, getUserInfo, getCityGroup } from '&/api'

const token = localStorage.getItem('token')

/**
 * 获取user并放入sessionStorage
 */
export const getUserInfoData = async () => {
  const data = await getUserInfo({ token })
  const user = data.result
  const projectId = user.project_id
  const role_region_level = user.role_region_level
  sessionStorage.setItem('tokenv2', token)
  sessionStorage.setItem('userv2', JSON.stringify(user))
  if (role_region_level === 0 && projectId !== 190) {
    return getUserCityGroup(user)
  }
  return getUserRegionInfoData(user)
}

const getUserCityGroup = async (user) => {
  const result = await getCityGroup({ token })
  return {
    provinceId: result[0].id,
    cityId: '',
    regionId: '',
    townId: '',
    projectId: user.project_id,
    lng: result[result.length - 1].lng,
    lat: result[result.length - 1].lat,
    zoom: 6,
    isGroup: true
  }
}

const getUserRegionInfoData = async (user) => {
  const result = await getUserRegionInfo({ token })
  let { role_region_level, project_id } = user
  let provinceId = result['province'][0].id
  let cityId = result['city'].length > 0 ? result['city'][0].id : ''
  let regionId = result['county'].length > 0 ? result['county'][0].id : ''
  let townId = result['town'].length > 0 ? result['town'][0].id : ''
  let villageId = result['village'].length > 0 ? result['village'][0].id : ''

  let zoom = [6, 6, 9, 11, 14, 14]
  let levels = ['province', 'province', 'city', 'county', 'town', 'village']

  let { lng, lat, extent } = result[levels[role_region_level]][0]
  let z = zoom[role_region_level]

  switch (role_region_level) {
    case 4:
      villageId = ''
      break
    case 3:
      townId = ''
      break
    case 2:
      regionId = ''
      break
    case 1:
      cityId = ''
      break
  }

  const provinceList = result['province'].map((item) => item.id).join(',')
  const cityList = result['city'].map((item) => item.id).join(',')
  const countyList = result['county'].map((item) => item.id).join(',')
  const townList = result['town'].map((item) => item.id).join(',')

  const info = {
    provinceId,
    cityId,
    regionId,
    townId,
    projectId: project_id,
    lng,
    lat,
    zoom: z,
    extent
  }
  sessionStorage.setItem(
    'regionInfo',
    JSON.stringify({
      provinceList,
      cityList,
      countyList,
      townList,
      info: result
    })
  )
  return info
}
