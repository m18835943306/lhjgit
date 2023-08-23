import { createStore, combineReducers } from 'redux'
import {
  getEntDefaultData,
  getPanesReducer,
  getRecordReducer,
  getRegionClassificationDataReducer,
  getFiveViewReducer,
  isBigImgDialogReducer,
  isGridAlarmTaskListDetailsDialogReducer,
  isRealTimeAlarmTaskListDetailsDialogReducer,
  isPointRealTimeAlarmTaskListDetailsDialogReducer,
  isSequenceAlarmListDetailsDialogReducer,
  isTaskLogDialogReducer,
  isAlarmOperationCloseDialogReducer,
  isAlarmOperationTransferDialogReducer,
  alarmInfoReduser,
  isAreaPointListDialogReducer,
  siteDataReducer,
  isRightSideBarReducer,
  isRightDivReducer,
  getselectedTimeReducer,
  dateTypeReducer,
  getTransmissionConfigReducer,
  pTypeReducer,
  collapsedReducer,
  baseMapReducer,
  getInvestiResultReducer,
  isAreaMobileDialogReducer,
  getLidu,
  mapLayersReducer,
  timeReducer,
  mapPollutionReducer,
  getFiveViewInfosReducer
} from './reducer'
import { globalStore } from './globas.store'

const rootReducer = {
  getEntDefaultData,
  getPanesReducer, // 列表页面
  getRecordReducer, // 列表页面
  getRegionClassificationDataReducer,
  getFiveViewReducer, // 五级视图相关
  isBigImgDialogReducer, // 弹窗
  isGridAlarmTaskListDetailsDialogReducer, // 弹窗
  isRealTimeAlarmTaskListDetailsDialogReducer, // 弹窗
  isPointRealTimeAlarmTaskListDetailsDialogReducer, // 弹窗
  isSequenceAlarmListDetailsDialogReducer, // 弹窗
  isTaskLogDialogReducer, // 弹窗
  isAlarmOperationCloseDialogReducer, // 弹窗
  isAlarmOperationTransferDialogReducer, // 弹窗
  alarmInfoReduser,
  isAreaPointListDialogReducer, // 考核站列表页面
  siteDataReducer,
  isRightSideBarReducer, // 列表部分页面
  isRightDivReducer, // 传输分析页面
  getselectedTimeReducer, // 传输分析页面
  dateTypeReducer, // 传输分析页面
  getTransmissionConfigReducer, // 传输分析页面
  pTypeReducer, // 污染物相关
  collapsedReducer, // 列表页面
  baseMapReducer, // 地图页面
  getInvestiResultReducer, // 排查结果页面
  isAreaMobileDialogReducer, //
  getLidu, // 地图页面
  mapLayersReducer, // 地图页面
  timeReducer, // 地图页面
  mapPollutionReducer, // 地图页面污染物相关
  getFiveViewInfosReducer, // 地图页面五级视图控件相关
  globalStore
}

const root = combineReducers(rootReducer)
const store = createStore(root)

export default store
