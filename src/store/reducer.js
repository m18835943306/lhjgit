const getEntDefaultData = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGEDATA':
      return action.data
    default:
      return state
  }
}

// 列表页面,获取panes
const getPanesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'panesData':
      return action.value
  }
  return state
}

// 列表页面,获取各个跳转页面的record
const getRecordReducer = (state = [], action) => {
  switch (action.type) {
    case 'recordData':
      return action.value
  }
  return state
}

// 获取五级视图信息
const getFiveViewReducer = (
  state = {
    provinceId: '',
    cityId: '',
    regionId: '',
    townId: '',
    projectId: ''
  },
  action
) => {
  switch (action.type) {
    case 'fiveView':
      return { ...state, ...action.data }
  }
  return state
}

// 图片点击放大功能弹窗
const isBigImgDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showBigImgDialog':
      return true
    case 'hideBigImgDialog':
      return false
  }
  return state
}

const siteDataReducer = (
  state = {
    pointListData: {}, //点位列表弹出框信息
    chooseSite: [],
    chooseSiteId: [],
    imgArr: [],
    chooseImg: 0
  },
  action
) => {
  switch (action.type) {
    case 'pointListData':
      state.pointListData = action.data
      return state
    case 'imgArr':
      state.imgArr = action.data
      return state
    case 'chooseImg':
      state.chooseImg = action.data
      return state
    case 'changeSiteIsActive':
      state.siteData = state.siteData.map((item, index) => {
        if (index == action.index) {
          item.isActive = action.activeType == 1 ? true : false
        }
        return item
      })
      return state
    case 'changeSiteData':
      state.siteData = state.siteData.map((item, index) => {
        if (index == action.index) {
          item.isVisible = !item.isVisible
          if (item.isVisible) {
            state.chooseSite.push(item.measureName)
            state.chooseSiteId.push(item.id)
          } else {
            state.chooseSite.remove(item.measureName)
            state.chooseSiteId.remove(item.id)
          }
        }
        return item
      })
      return state
  }
  return state
}

// 网格报警任务列表任务详情弹窗
const isGridAlarmTaskListDetailsDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showGridAlarmTaskListDetailsDialog':
      return true
    case 'hideGridAlarmTaskListDetailsDialog':
      return false
  }
  return state
}

// 实时报警任务列表任务详情弹窗
const isRealTimeAlarmTaskListDetailsDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showRealTimeAlarmTaskListDetailsDialog':
      return true
    case 'hideRealTimeAlarmTaskListDetailsDialog':
      return false
  }
  return state
}

// 点位实时报警任务列表任务详情弹窗
const isPointRealTimeAlarmTaskListDetailsDialogReducer = (
  state = false,
  action
) => {
  switch (action.type) {
    case 'showPointRealTimeAlarmTaskListDetailsDialog':
      return true
    case 'hidePointRealTimeAlarmTaskListDetailsDialog':
      return false
  }
  return state
}

// 点位瞬时报警任务列表详情弹窗
const isSequenceAlarmListDetailsDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showSequenceAlarmListDetailsDialog':
      return true
    case 'hideSequenceAlarmListDetailsDialog':
      return false
  }
  return state
}

// 报警列表任务日志弹窗
const isTaskLogDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showTaskLogDialog':
      return true
    case 'hideTaskLogDialog':
      return false
  }
  return state
}

// 报警操作关闭,审核确认弹窗
const isAlarmOperationCloseDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showAlarmOperationCloseDialog':
      return true
    case 'hideAlarmOperationCloseDialog':
      return false
  }
  return state
}

// 报警操作转办弹窗
const isAlarmOperationTransferDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showAlarmOperationTransferDialog':
      return true
    case 'hideAlarmOperationTransferDialog':
      return false
  }
  return state
}

// 报警信息
const alarmInfoReduser = (
  state = {
    alarmInfo: {},
    alarmSiteInfo: {}
  },
  action
) => {
  switch (action.type) {
    case 'alarmInfo':
      state.alarmInfo = action.data
      return state
    case 'alarmSiteInfo':
      state.alarmSiteInfo = action.data
      return state
  }
  return state
}

// 考核站列表AssessmentStationList页面,详情弹窗之点位信息
const isAreaPointListDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showAreaPointListDialog':
      return true
    case 'hideAreaPointListDialog':
      return false
  }
  return state
}

// 部省市区
const getRegionClassificationDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'regionClassificationData':
      return action.value
  }
  return state
}

// 列表页面右侧栏,获取是否展开状态
const isRightSideBarReducer = (state = true, action) => {
  switch (action.type) {
    case 'showSide':
      return true
    case 'hideSide':
      return false
  }
  return state
}

// 传输分析TransmissionAnalysis页面右侧栏,获取是否展开状态
const isRightDivReducer = (state = true, action) => {
  switch (action.type) {
    case 'showRightDiv':
      return true
    case 'hideRightDiv':
      return false
  }
  return state
}

// 传输分析TransmissionAnalysis页面右侧栏,获取所选的时间
const getselectedTimeReducer = (
  state = {
    time: ''
  },
  action
) => {
  switch (action.type) {
    case 'selectedTime':
      return { ...state, time: action.value }
  }
  return state
}

// 传输分析TransmissionAnalysis页面右侧栏,获取所选的时间类型:时 日 月 年
const dateTypeReducer = (state = '', action) => {
  switch (action.type) {
    case 'dtype':
      state = action.value
      return state
  }
  return state
}

// 传输分析TransmissionAnalysis页面,获取传输概况页所选的所有参数信息
const getTransmissionConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case 'searchConfig':
      return action.value
  }
  return state
}

// 获取所选的污染物
const pTypeReducer = (state = 134004, action) => {
  switch (action.type) {
    case 'ptype':
      state = action.value
      return state
  }
  return state
}

// 列表页面,二级菜单折叠状态
const collapsedReducer = (state = false, action) => {
  switch (action.type) {
    case 'collapse':
      return action.value
  }
  return state
}

// 地图页面,获取所选的底图类型
const baseMapReducer = (state = 0, action) => {
  switch (action.type) {
    case 'baseMaptype':
      return action.data
  }
  return state
}

// 排查结果InvestigationResult页面排查,获取查询的信息
const getInvestiResultReducer = (state = {}, action) => {
  switch (action.type) {
    case 'InvestiResultData':
      return action.value
  }
  return state
}

const isAreaMobileDialogReducer = (state = false, action) => {
  switch (action.type) {
    case 'showMobileDialog':
      return true
    case 'hideMobileDialog':
      return false
  }
  return state
}

// 地图页面,获取所选时间粒度
const getLidu = (state = 1, action) => {
  switch (action.type) {
    case 'lidu':
      return action.data
  }
  return state
}

// 地图页面,获取所选的污染物
const mapPollutionReducer = (
  state = [
    { a: 'PM', b: '2.5', isActive: true, type: 134004 },
    { a: 'PM', b: '10', isActive: false, type: 134002 },
    { a: 'NO', b: '2', isActive: false, type: 121004 },
    { a: 'CO', b: '', isActive: false, type: 121005 },
    { a: 'TVOC', b: '', isActive: false, type: 199054 },
    { a: 'TSP', b: '', isActive: false, type: 134001 }
  ],
  action
) => {
  switch (action.type) {
    case 'mapPollutions':
      return action.data
  }
  return state
}

// 地图页面,获取所选时间
const timeReducer = (state = '', action) => {
  switch (action.type) {
    case 'mapTime':
      return action.data
  }
  return state
}

// 地图页面,获取所点击的图层
const mapLayersReducer = (state = null, action) => {
  switch (action.type) {
    case 'maplayer':
      return { single: action.data.single, layers: action.data.layers }
  }
  return state
}

// 地图页面的五级视图控件,获取临时存储的信息
const getFiveViewInfosReducer = (state = {}, action) => {
  switch (action.type) {
    case 'fiveViewInfos':
      return { ...state, ...action.data }
  }
  return state
}

export {
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
  getFiveViewInfosReducer // 地图页面五级视图控件相关
}
