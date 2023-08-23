import { LazyLoad } from '@/routes/utils'
/**
 * 获取本地扁平化路由
 * @returns {path: () => component}
 */
function getFlatRoutePath() {
  const m = {}
  const r = import.meta.glob('@/views/*/index.jsx', {})
  for (const [key, value] of Object.entries(r)) {
    const k =
      key
        .split('/')
        .filter((item) => !item.includes('.jsx'))
        .pop() || ''
    m[k] = value
  }
  return m
}
const role2_menuList = [
  'SynAlarmList',
  'SynAlarmReal',
  'MatterList',
  'PlanLaunch',
  'EmergencyAlarmList',
  'PlanMonitoing',
  'PlanAssessment',
  'MatterFeedback',
  'EnterpriseEmergency',
  'EmergentMeausere',
  'MatterListOther'
]
function gererateRoute() {
  const routes = []
  const mod = getFlatRoutePath()
  for (const [key, path] of Object.entries(mod)) {
    routes.push({
      path: `/${key}`,
      element: LazyLoad(path),
      premissionRoles: role2_menuList.includes(key) ? [2] : [1, 2]
    })
  }
  return routes
}

export default gererateRoute
