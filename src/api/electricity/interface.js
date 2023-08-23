import Request from '@/service'
import config from './config'
import axios from 'axios'

const api = new Request({ baseURL: config.baseURL, verbose: false })

export async function login(options) {
  const res = await api.post(config.login, options)
  return res
}

export async function getRegion(options) {
  const res = await api.get(config.admRegion, options)
  return res
}

/**
 * 获取企业基础信息详情。
 * @param {ent_id} 企业ID
 */

export async function getEnterpriseDetail(options) {
  const res = api.get(
    config.enterprise_detail,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 修改实时用电数据
 * @param {ent_id} 企业ID
 */

export async function setEnterprise(options) {
  const res = api.post(
    config.enterprise_update,
    options,
    {
      baseURL: config.baseURL
    },

    false
  )
  return res
}

/**
 * 应急措施管理
 * @param {ent_id} 企业ID
 */

export async function getEnterpriseEmergency(options) {
  const res = api.get(
    config.enterprise_mergency,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 应急措施管理-修改停限指标
 * @param {ent_id} 企业ID
 */

export async function postControlIndex(options) {
  const res = api.post(
    config.enterprise_emergency_modify,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 历史报警查询
 */
export async function getEnterpriseAlarmList(options) {
  const res = api.get(
    config.enterprise_alarm_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 *  历史报警查询-详情
 */
export async function getEnterpriseAlarmDetail(options) {
  const res = api.get(
    config.enterprise_alarm_detail,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 实时用电数据-查询条件
 * @param {ent_id} 企业ID
 */

export async function getMonitorItems(options) {
  const res = api.get(
    config.realtime_monitor_items,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 实时用电数据
 * @param {ent_id} 企业ID
 */

export async function getMonitorData(options) {
  const res = api.get(
    config.realtime_monitor,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 企业列表
 * @param {project_id} 项目ID
 */

export async function getEnterpriseData(options) {
  const res = api.get(
    config.enterprise_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 生产工艺流程
 * @param {ent_id} 企业ID
 */

export async function getProcessData(options) {
  const res = api.get(
    config.enterprise_process,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 企业设备状态接口
 */

export async function getEnterpriseDevice(options) {
  const res = api.get(
    config.enterprise_device,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 企业设备数据详情接口
 */

export async function getEnterpriseMonitor(options) {
  const res = api.get(
    config.enterprise_monitor,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 设备查询折线图数据
 */

export async function getRealtimeMonitor(options) {
  const res = api.get(
    config.realtime_monitor,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 设备查询监测项
 */

export async function getRealtimeItems(options) {
  const res = api.get(
    config.realtime_items,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 报警列表查询项
 */

export async function getDeviceWarnItems(options) {
  const res = api.get(
    config.device_warn_items,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 设备汇总
 */
export const getDeviceList = (options) => {
  const res = api.get(
    config.device_data_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 预案启动-列表
 */
export const getPlanList = (options) => {
  const res = api.get(
    config.plan_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 预案启动-添加
 */
export const addPlan = (options) => {
  const res = api.post(
    config.plan_add,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 预案启动-修改
 */
export const modifyPlan = (options) => {
  const res = api.post(
    config.plan_modify,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 预案启动-删除
 */
export const deletePlan = (options) => {
  const res = api.post(
    config.plan_delete,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 预案-启动过程监控
 */
export const getPlanMonitor = (options) => {
  const res = api.get(
    config.plan_monitor,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //企业设备数据详情接口-新
 */
export const getLatestData = (options) => {
  const res = api.get(
    config.latest_data,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //企业设备列表展示接口-新
 */
export const getDeviceListNew = (options) => {
  const res = api.get(
    config.device_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //企业报警列表
 */
export const getDeviceWarnList = (options) => {
  const res = api.get(
    config.device_warn_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //宏观用电自动线索时间区间
 */
export const getClueFilterDate = (options) => {
  const res = api.get(
    config.clue_filter_date,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //统计分析日变化对比接口-选项信息
 */
export const getStatisticalAnalysis = (options) => {
  const res = api.get(
    config.statistical_analysis_items,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //统计分析日变化对比接口
 */
export const getAnalysisDailyChange = (options) => {
  const res = api.get(
    config.analysis_daily_change_comparison,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //统计分析-用电量对比折线图
 */
export const getAnalysisElec = (options) => {
  const res = api.get(
    config.analysis_elec_consume_comparison,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //统计分析-企业用电量统计
 */
export const getAnalysisElecConsume = (options) => {
  const res = api.get(
    config.analysis_elec_consume_statistics,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //统计分析-设备安装-行业分布
 */
export const getDeviceIndustryDistribution = (options) => {
  const res = api.get(
    config.device_industry_distribution,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //统计分析-设备安装-区域分布
 */
export const getDeviceRegionalDistribution = (options) => {
  const res = api.get(
    config.device_regional_distribution,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 企业宏观用电监测线索下发
 */

export async function postClueReport(options) {
  const res = api.post(
    config.clue_report,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 首页-点位落点
 */
export const getHomeEnterpriseList = (options) => {
  const res = api.get(
    config.home_page_enterprise_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 首页-点位弹窗
 */
export const getHomeEnterpriseDetail = (options) => {
  const res = api.get(
    config.home_page_enterprise_detail,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 首页-点位弹窗
 */
export const getHomeStatistics = (options) => {
  const res = api.get(
    config.home_page_statistics,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //报警与反馈查询
 */
export const getEnterpriseWarnDetail = (options) => {
  const res = api.get(
    config.enterprise_warn_detail,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 报警反馈提交
 */

export async function getWarnFeedbackSubmit(options) {
  const res = axios({
    method: 'post',
    url: config.baseURL + config.warn_feedback_submit,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
  return res
}

/**
 * //预案评估空气质量
 */
export const getCertainTimeData = (options) => {
  const res = api.get(
    config.certainTimeData,
    options,
    {
      baseURL: 'https://api-adm-data-service-pre.airqualitychina.cn:9998'
    },
    false
  )
  return res
}
/**
 * //宏观用电-选项卡接口
 */
export const getMacroElecItems = (options) => {
  const res = api.get(
    config.macro_elec_items,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //宏观用电-企业日用电和小时用电接口
 */
export const getMacroElecEnterprise = (options) => {
  const res = api.get(
    config.macro_elec_enterprise,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //宏观用电-数据汇总-企业详情-企业列表接口
 */
export const getMacroElecEnterpriseList = (options) => {
  const res = api.get(
    config.macro_elec_enterprise_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //宏观用电-数据汇总-企业详情与线索数量统计接口
 */
export const getMacroElecEnterpriseDetail = (options) => {
  const res = api.get(
    config.macro_elec_enterprise_detail,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 线索弹窗
 */
export const getMacroElecDetail = (options) => {
  const res = api.get(
    config.macro_elec_detail,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 线索弹窗-提交
 */
export const postMacroElecDetail = (options) => {
  const res = axios({
    method: 'post',
    url: config.baseURL + config.macro_elec_submit,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
  return res
}

/**
 * 宏观用电-数据汇总-企业详情-日用电-echarts图接口
 */
export const getMacroElecEnterpriseDetailDay = (options) => {
  const res = api.get(
    config.macro_elec_enterprise_detail_day,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //宏观用电-数据汇总-企业详情-小时用电-echarts图接口
 */
export const getMacroElecEnterpriseDetailHour = (options) => {
  const res = api.get(
    config.macro_elec_enterprise_detail_hour,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 宏观用电-线索数量各区分布
 */
export const getMacroElecRegionCumlative = (options) => {
  const res = api.get(
    config.macro_region_cumulative,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 宏观用电-线索数量变化趋势
 */
export const getMacroElecRegionTrends = (options) => {
  const res = api.get(
    config.macro_region_trends,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 宏观用电-线索数量变化趋势
 */
export const getMacroElecList = (options) => {
  const res = api.get(
    config.macro_clue_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
export async function getFilterClueAutoMacro(options) {
  const res = api.post(
    config.clue_filter_auto_macro,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 宏观用电手工线索
 * "start_time1": "2022-01-01", //条件1线索日期开始时间
  "end_time1": "2022-02-01", //条件1线索日期结束时间
  "floor1": 0.1, //条件1线索范围用电指数下限
  "upper1": 100, //条件1线索范围用电指数上限
  "t1_start": "2022-03-01", //条件1比对日期开始时间
  "t1_end": "2022-04-01", //条件1比对日期结束时间
  "ratio1": 1, //条件1增幅比例
  "start_time2": "2022-02-01", //条件2线索日期开始时间
  "end_time2": "2022-03-01", //条件2线索日期结束时间
  "floor2": 0.1, //条件2线索范围用电指数下限
  "upper2": 1, //条件2线索范围用电指数上限
  "t2_start": "2022-04-01", //条件2比对日期开始时间
  "t2_end": "2022-05-01", //条件2比对日期结束时间
  "ratio2": 2 //条件2增幅比例
 */

export async function getFilterClueMacro(options) {
  const res = api.post(
    config.clue_filter_macro,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 宏观用电线索中间库数据查询
 */
export const getClueMacroMidList = (options) => {
  const res = api.get(
    config.clue_macro_mid_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 中心宏观用电线索最终提交
 */
export const postClueMacroSubmitFin = (options) => {
  const res = api.post(
    config.clue_macro_submit_fin,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 中心宏观用电线索删除
 */

// export async function postClueMacroDelete(options) {
//   const res = api.post(
//     config.clue_macro_delete,
//     options,
//     {
//       baseURL: config.baseURL,
//     },
//     false
//   );
//   return res;
// }
export const postClueMacroDelete = (options) => {
  const res = axios({
    method: 'post',
    url: config.baseURL + config.clue_macro_delete,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
  return res
}

/**
 * 企业设备关联关系列表
 */
export const getDeviceRelList = (options) => {
  const res = api.get(
    config.device_rel_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 设备台账接口
 */
export const getDeviceAccount = (options) => {
  const res = api.get(
    config.enterprise_device_account,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 安装统计弹窗接口
 */
export const getDeviceRelInstallInfo = (options) => {
  const res = api.get(
    config.device_regional_installation,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 设备在线率统计
 */
export const getDeviceOnlineRatio = (options) => {
  const res = api.get(
    config.device_online_ratio,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 线索追踪
 */
export const getClueMacro = (options) => {
  const res = api.get(
    config.clue_macro_trace,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 设备报警生成线索接口
 */

export const postClueSubmit = (options) => {
  const res = axios({
    method: 'post',
    url: config.baseURL + config.clue_submit,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
  return res
}
/**
 * 设备报警生成线索列表接口
 */
export const getClueList = (options) => {
  const res = api.get(
    config.clue_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 报警线索下发
 */

export const postWarnClueAssign = (options) => {
  const res = axios({
    method: 'post',
    url: config.baseURL + config.warn_clue_assign,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
  return res
}
/**
 * 报警线索关闭
 */

export const postWarnClueClose = (options) => {
  const res = axios({
    method: 'post',
    url: config.baseURL + config.warn_clue_close,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
  return res
}
/**
 * 报警线索反馈
 */

export const postWarnClueFeedbackSubmit = (options) => {
  const res = axios({
    method: 'post',
    url: config.baseURL + config.warn_clue_feedback_submit,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
  return res
}
/**
 * //报警详情（新）
 */
export const getNewEnterpriseWarnDetail = (options) => {
  const res = api.get(
    config.warn_enterprise_warn_detail,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //历史报警列表接口(新)
 */
export const getWarnDeviceAlarmOuter = (options) => {
  const res = api.get(
    config.warn_device_alarm_outer,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //历史报警列表接口(新)
 */
export const getWarnDeviceAlarmList = (options) => {
  const res = api.get(
    config.warn_device_alarm_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //线索详情-报警流水数据
 */
export const getWarnEnterpriseDetail = (options) => {
  const res = api.get(
    config.warn_enterprise_warn_detail,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * //企业总数-概况
 */
export const getHomeOverviewEnt = (options) => {
  const res = api.get(
    config.home_overview_ent,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //设备总数-概况
 */
export const getHomeOverviewDevice = (options) => {
  const res = api.get(
    config.home_overview_device,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //各区信息
 */
export const getAdmList = (options) => {
  const res = api.get(
    config.adm_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //各行业信息
 */
export const getIndustryList = (options) => {
  const res = api.get(
    config.industry_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //30天用电趋势-折线图
 */
export const getHomeConsumeTrend = (options) => {
  const res = api.get(
    config.home_consume_trend,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //企业用电设备总数及分布
 */
export const getHomeRealtimeEn = (options) => {
  const res = api.get(
    config.home_realtime_en,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //设备总数-实时
 */
export const getHomeRealtimeDevice = (options) => {
  const res = api.get(
    config.home_realtime_device,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //近一周企业报警情况
 */
export const getHomeWarnWeek = (options) => {
  const res = api.get(
    config.home_overview_alarm,
    {
      type: options
    },
    false
  )
  return res
}
/**
 * //首页-排名情况
 */
export const getClueRank = (options) => {
  const res = api.get(
    config.home_clue_rank,
    options,
    {
      baseURL: config.baseURL
    },
    true
  )
  return res
}
/**
 * //线索汇总
 */
export const getHomeOverviewClue = (options) => {
  const res = api.get(
    config.home_overview_clue,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //报警滚动信息
 */
export const getHomeRandom = (options) => {
  const res = api.get(
    config.home_random_latest_alarm_info,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //中心应急报警相关接口企业应急报警列表接口-选项卡
 */
export const getEmergencyItems = (options) => {
  const res = api.get(
    config.emergency_alarm_items,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //企业应急报警列表接口
 */
export const getEmergencyList = (options) => {
  const res = api.get(
    config.emergency_alarm_list,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //获取报警线索反馈
 */
export const getFeedbackRecords = (options) => {
  const res = api.get(
    config.clue_feedback_records,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * //设备安装-行业分布与区域分布-导出excel
 */
export const getDeviceDownload = (options) => {
  const res = api.get(
    config.device_distribution_download,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

// 应急措施列表
export const getEmergencyControlList = (options) => {
  return api.get(config.warn_emergency_control_list, options)
}
/**
 * 预案启动列表(中心)
 * @param {*} options
 * @returns
 */
export async function getWarnPlanList(options) {
  return await api.get(config.warn_plan_list, options)
}
/**
 *应急预案新增、编辑、结束接口(中心)
 * @param {*} options
 * @returns
 */
export async function saveWarnPlan(options) {
  return await api.post(config.warn_plan_save, options)
}
/**
 *应急预案删除接口(中心)
 * @param {*} options
 * @returns
 */
export async function deleteWarnPlanById(options) {
  return await api.post(config.warn_plan_delete, options)
}
/**
 * //历史列表的接口
 */
export const getDeviceAlarmOuter = (options) => {
  const res = api.get(
    config.device_alarm_outer,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 应急措施示例excel表格文件上传接口
 * @param {*} options
 * @returns
 */
export const uploadExcelWithEmergency = async (options) => {
  return await axios({
    method: 'post',
    url: config.baseURL + config.warn_emergency_upload,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
}

/**
 * 企业数据分析-企业总电、行业均值
 * @param {start_time} 开始时间
 * @param {end_time} 结束时间
 * @param {time_type} 时间粒度
 */
export const getEleData = (options) => {
  const res = api.get(
    config.use_eletricity,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 企业数据分析-排名
 * @param {ent_id} 企业id
 * @param {start_time} 开始时间
 * @param {end_time} 结束时间
 * @param {time_type} 时间粒度
 * @param {dev_type}设备类型
 */
export const getRank = (options) => {
  const res = api.get(
    config.same_change_rank,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}

/**
 * 企业数据分析-聚合企业数据
 * @param {ent_id} 企业ID
 */
export const getEntData = (options) => {
  const res = api.get(
    config.ent_data,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 企业数据分析-聚合企业同环比数据
 * @param {ent_id} 企业ID
 */
export const getEntRingData = (options) => {
  const res = api.get(
    config.ent_same_ring,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 手动设置阈值
 * @param {ent_id} 企业ID
 */

export async function setEnterpriseAccount(options) {
  const res = api.post(
    config.enterprise_device_account,
    options,
    {
      baseURL: config.baseURL
    },

    false
  )
  return res
}
/**
 * 设备报警生成线索列表接口
 */
export const getOnlinetrend = (options) => {
  const res = api.get(
    config.online_trend_area,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 联网统计-设备实时在线状态
 */
export const getOnlineDevice = (options) => {
  const res = api.get(
    config.online_status_device,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 报警分析-全市日趋势
 */
export const getDayTrends = (options) => {
  const res = api.get(
    config.warn_city_day_trends,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 报警分析-各区报警数量及环比
 */
export const getCountyRatio = (options) => {
  const res = api.get(
    config.warn_county_ratio,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 报警分析-报警企业排名
 */
export const getRankRatio = (options) => {
  const res = api.get(
    config.warn_ent_rank_ratio,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 报警分析-行业报警比例
 */
export const getIndustryCount = (options) => {
  const res = api.get(
    config.warn_industry_count,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 数据采集状态
 */
export const getCollection = (options) => {
  const res = api.get(
    config.data_collection_status,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 日夜对比接口
 */
export const getCompare = (options) => {
  const res = api.get(
    config.day_night_compare,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 日夜对比接口
 */
export const getClueGeneral = (options) => {
  const res = api.get(
    config.clue_general,
    options,
    {
      baseURL: config.baseURL
    },
    false
  )
  return res
}
/**
 * 线索删除
 */
export const getClueDelete = (options) => {
  const res = axios({
    method: 'post',
    url: config.baseURL + config.clue_delete,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: options
  })
  return res
}
