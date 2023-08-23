const { VITE_MICRO_SERVICE_API_ELECTRICITY } = import.meta.env
export default {
  baseURL: VITE_MICRO_SERVICE_API_ELECTRICITY, // https://electricity-api-service-pre.airqualitychina.cn,
  login: '/v1/login/login', // 查询用户登陆信息
  admRegion: '/v1/adm-center-list', // 查询用户区域信息
  enterprise_detail: '/v1/enterprise-detail', // 企业详情接口
  enterprise_update: '/v1/enterprise-update',
  enterprise_mergency: '/v1/enterprise-emergency', // 应急措施管理
  enterprise_emergency_modify: 'v1/enterprise-emergency-modify', // 应急措施管理-修改停限指标
  enterprise_alarm_list: 'v1/history-alarm-list', //  历史报警查询
  enterprise_alarm_detail: 'v1/history-alarm-detail', //历史报警查询-详情
  realtime_monitor_items: '/v1/realtime-monitor-items', // 实时用电数据-查询条件
  realtime_monitor: '/v1/realtime-monitor', // 实时用电数据
  enterprise_list: '/v1/enterprise-list', //企业列表
  enterprise_process: '/v1/enterprise-process', //生产工艺流程
  enterprise_device: '/v1/enterprise-device-status', //企业设备状态接口
  enterprise_monitor: '/v1/enterprise-device-monitor-data', //企业设备数据详情接口
  latest_data: '/v1/enterprise-device-latest-data', //企业设备数据详情接口-新
  realtime_items: '/v1/realtime-monitor-items', //设备查询监测项
  device_warn_items: '/v1/device-warn-items', //报警列表查询项
  device_data_list: '/v1/device-data-list', //数据查询-设备汇总
  plan_list: '/v1/enterprise-plan-list', // 预案管理-预案启动列表
  plan_add: '/v1/enterprise-plan-add', // 预案管理-预案启动添加
  plan_modify: '/v1/enterprise-plan-modify', // 预案管理-预案启动修改
  plan_delete: '/v1/enterprise-plan-delete', // 预案管理-预案启动删除
  plan_monitor: '/v1/enterprise-plan-monitor', // 预案管理-启动过程监控
  device_list: '/v1/enterprise-device-list', //企业设备列表展示接口
  device_warn_list: '/v1/device-warn-list', // 企业报警列表
  clue_filter_date: 'v1/clue-filter-date', // 宏观用电自动线索时间区间
  statistical_analysis_items: 'v1/statistical-analysis-items', // 统计分析日变化对比接口-选项信息
  analysis_daily_change_comparison: '/v1/analysis-daily-change-comparison', //统计分析日变化对比接口
  analysis_elec_consume_comparison: '/v1/analysis-elec-consume-comparison', // 统计分析-用电量对比折线图
  analysis_elec_consume_statistics: '/v1/analysis-elec-consume-statistics', //统计分析-企业用电量统计
  device_industry_distribution: '/v1/device-industry-distribution', //统计分析-设备安装-行业分布
  device_regional_distribution: '/v1/device-regional-distribution', //统计分析-设备安装-区域分布
  home_page_enterprise_detail: 'v1/home-page-enterprise-detail', // 首页企业弹窗接口
  home_page_enterprise_list: 'v1/home-page-enterprise-list', // 首页企业落点
  home_page_statistics: 'v1/home-page-statistics', // 首页总数统计接口
  clue_report: '/v1/clue-report', //企业宏观用电监测线索下发
  enterprise_warn_detail: '/v1/enterprise-warn-detail', //报警与反馈查询
  warn_feedback_submit: '/v1/warn-feedback-submit', //报警反馈提交
  certainTimeData: '/adm/certain-time-data', //预案评估空气质量
  macro_elec_items: '/v1/macro-elec-items', //宏观用电-选项卡接口
  macro_elec_enterprise: '/v1/macro-elec-enterprise-day-hour', //宏观用电-企业日用电和小时用电接口
  macro_elec_enterprise_list: '/v1/macro-elec-enterprise-list', //宏观用电-数据汇总-企业详情-企业列表接口
  macro_elec_enterprise_detail: '/v1/macro-elec-enterprise-detail', //宏观用电-数据汇总-企业详情与线索数量统计接口
  macro_elec_detail: '/v1/clue-macro-detail', //宏观用电 - 监测线索弹窗
  macro_elec_submit: '/v1/clue-macro-submit', //宏观用电 - 线索提交
  macro_elec_enterprise_detail_day: '/v1/macro-elec-enterprise-detail-day', //宏观用电-数据汇总-企业详情-日用电-echarts图接口
  macro_elec_enterprise_detail_hour: '/v1/macro-elec-enterprise-detail-hour', //宏观用电-数据汇总-企业详情-小时用电-echarts图接口
  macro_region_cumulative: '/v1/clue-macro-region-cumulative', //宏观用电-线索数量各区分布
  macro_region_trends: '/v1/clue-macro-trends', //宏观用电-线索数量变化趋势
  macro_clue_list: '/v1/clue-macro-list', //宏观用电-自动线索统计列表
  clue_filter_auto_macro: '/v1/clue-filter-auto-macro', // //宏观用电-自动线索
  clue_filter_macro: '/v1/clue-filter-macro', //宏观用电-手动线索
  clue_macro_mid_list: '/v1/clue-macro-mid-list', //宏观用电线索中间库数据查询
  clue_macro_submit_fin: '/v1/clue-macro-submit-fin', //中心宏观用电线索最终提交
  clue_macro_delete: '/v1/clue-macro-delete', //中心宏观用电线索删除
  device_rel_list: '/v1/device-rel-list', //企业设备关联关系列表
  enterprise_device_account: '/v1/enterprise-device-account', //设备台账接口
  device_regional_installation: '/v1/device-regional-installation', // 安装统计弹窗接口
  device_online_ratio: '/v1/device-online-ratio', //设备在线率统计
  clue_macro_trace: '/v1/clue-macro-trace', //线索追踪
  clue_submit: '/v1/warn/clue-submit', //设备报警生成线索接口
  clue_list: '/v1/warn/clue-list', //设备报警生成线索列表接口
  warn_clue_assign: '/v1/warn/clue-assign', //报警线索下发
  warn_clue_close: '/v1/warn/clue-close', //报警线索关闭
  warn_clue_feedback_submit: '/v1/warn/clue-feedback-submit', //报警线索反馈
  warn_device_alarm_outer: '/v1/warn/device-alarm-list', //历史报警列表接口(新)
  warn_device_alarm_list: '/v1/warn/device-alarm-list', //线索详情-报警基本数据
  warn_enterprise_warn_detail: '/v1/warn/enterprise-warn-detail', //线索详情-报警流水数据
  industry_list: '/v1/industry-list', // 获取所有行业类型
  home_overview_ent: '/v1/home/overview-ent', //企业总数-概况
  home_overview_device: '/v1/home/overview-device', //设备总数-概况
  adm_list: '/v1/adm-list', //各区信息
  home_consume_trend: '/v1/home/consume-trend', //30天用电趋势-折线图
  home_realtime_en: '/v1/home/realtime-ent', //企业用电设备总数及分布"
  home_realtime_device: '/v1/home/realtime-device', //设备总数-实时
  home_overview_alarm: '/v1/home/overview-alarm', //近一周企业报警情况
  home_clue_rank: 'v1/home/clue-rank',
  home_overview_clue: '/v1/home/overview-clue', //线索汇总
  home_random_latest_alarm_info: '/v1/home/random-latest-alarm-info', //报警滚动信息
  emergency_alarm_items: '/v1/warn/emergency-alarm-items', // 中心应急报警相关接口企业应急报警列表接口-选项卡
  emergency_alarm_list: '/v1/warn/emergency-alarm-list', //企业应急报警列表接口
  clue_feedback_records: '/v1/warn/clue-feedback-records', //获取报警线索反馈
  device_distribution_download: '/v1/device-distribution-download', //设备安装-行业分布与区域分布-导出excel
  warn_emergency_control_list: '/v1/warn/emergency-control-list', // 应急措施列表
  warn_plan_list: '/v1/warn/plan-list', // 预案管理-预案启动列表(中心)
  warn_plan_save: '/v1/warn/plan-save', // 应急预案新增、编辑、结束接口(中心)
  warn_plan_delete: '/v1/warn/plan-delete', // 应急预案删除接口(中心)
  device_alarm_outer: '/v1/warn/device-alarm-outer', //历史列表的接口
  warn_emergency_upload: '/v1/warn/emergency-control-import', //应急措施示例excel表格文件上传接口
  use_eletricity: 'v1/analysis/mean-value', //企业数据分析-企业总电、均值
  ent_data: 'v1/analysis/ent-data', //企业数据分析-聚合企业数据
  ent_same_ring: 'v1/analysis/ent-same-ring', //企业数据分析-同比环比
  same_change_rank: 'v1/analysis/same-change-rank', //企业数据分析-排名
  enterprise_device_account: '/v1/enterprise-device-account', //手动设置阈值
  online_trend_area: '/v1/collection/online-trend-of-area', //联网统计-区市24小时联网率
  online_status_device: '/v1/collection/online-status-of-device', //联网统计-设备实时在线状态
  warn_city_day_trends: '/v1/analysis/warn-city-day-trends', //报警分析-全市日趋势
  warn_county_ratio: '/v1/analysis/warn-county-ratio', //报警分析-各区报警数量及环比
  warn_ent_rank_ratio: '/v1/analysis/warn-ent-rank-ratio', //报警分析-报警企业排名
  warn_industry_count: '/v1/analysis/warn-industry-count', //报警分析-行业报警比例
  data_collection_status: '/v1/collection/data-collection-status', //数据采集状态
  day_night_compare: '/v1/analysis/day-night-compare', //日夜对比接口
  clue_general: '/v1/warn/clue-general', //中心线索总览页面
  clue_delete: '/v1/warn/clue-delete' //线索删除
}
