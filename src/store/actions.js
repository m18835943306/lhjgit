// 列表页面,改变panes
let setDefaultData = (data) => {
  return {
    type: 'CHANGEDATA',
    data
  }
}
// 列表页面,改变panes
let changePanesAction = (value) => {
  return {
    type: 'panesData',
    value: value
  }
}

// 列表页面,改变各个跳转页面的record
let changeRecordAction = (value) => {
  return {
    type: 'recordData',
    value: value
  }
}

// 改变五级视图信息
let changeFiveViewAction = (data) => {
  return {
    type: 'fiveView',
    data: data
  }
}

let changeBigImgDialogAction = (value) => {
  return {
    type: value
  }
}

let changeChooseImgAction = (data) => {
  return {
    type: 'chooseImg',
    data: data
  }
}

let getImgArrAction = (data) => {
  return {
    type: 'imgArr',
    data: data
  }
}

let changeGridAlarmTaskListDetailsDialogAction = (value) => {
  return {
    type: value
  }
}

let changeRealTimeAlarmTaskListDetailsDialogAction = (value) => {
  return {
    type: value
  }
}

let changePointRealTimeAlarmTaskListDetailsDialogAction = (value) => {
  return {
    type: value
  }
}

let changeSequenceAlarmListDetailsDialogAction = (value) => {
  return {
    type: value
  }
}

let changeTaskLogDialogAction = (value) => {
  return {
    type: value
  }
}

let changeisAlarmOperationCloseDialogAction = (value) => {
  return {
    type: value
  }
}

let changeisAlarmOperationTransferDialogAction = (value) => {
  return {
    type: value
  }
}

let changeAlarmInfoAction = (data) => {
  return {
    type: 'alarmInfo',
    data: data
  }
}

let changeAlarmSiteInfoAction = (data) => {
  return {
    type: 'alarmSiteInfo',
    data: data
  }
}

let changeAreaPointListDialogAction = (value) => {
  return {
    type: value
  }
}

let changeAreaPointListDialogInfoAction = (data) => {
  return {
    type: 'pointListData',
    data: data
  }
}

let changeRegionClassificationAction = (value) => {
  return {
    type: 'regionClassificationData',
    value: value
  }
}

// 列表页面右侧栏,改变是否展开状态
let changeIsRightSideBarAction = (value) => {
  return {
    type: value
  }
}

// 传输分析TransmissionAnalysis页面右侧栏,改变是否展开状态
let changeIsRightDivAction = (value) => {
  return {
    type: value
  }
}

// 传输分析TransmissionAnalysis页面右侧栏,改变所选的时间
let changeSelectedTimeAction = (value) => {
  return {
    type: 'selectedTime',
    value: value
  }
}

// 传输分析TransmissionAnalysis页面右侧栏,改变所选的时间类型:时 日 月 年
let changeDateTypeAction = (value) => {
  return {
    type: 'dtype',
    value: value
  }
}

// 传输分析TransmissionAnalysis页面,改变传输概况页所选的参数信息
let changeSearchConfigAction = (value) => {
  return {
    type: 'searchConfig',
    value: value
  }
}

// 改变所选的污染物
let changePTypeAction = (value) => {
  return {
    type: 'ptype',
    value: value
  }
}

// 列表页面,改变二级菜单折叠状态
let collapseAction = (value) => {
  return {
    type: 'collapse',
    value: value
  }
}

// 地图页面,改变所选的底图类型
let changeMaptypeAction = (data) => {
  return {
    type: 'baseMaptype',
    data: data
  }
}

let changeHeadDataAction = (value) => {
  return {
    type: 'headData',
    value: value
  }
}

let changeIsAreaListAction = (value) => {
  return {
    type: value
  }
}

let changeIsNewCasesDialogAction = (value) => {
  return {
    type: value
  }
}

let changeIsPollutionDialogAction = (value) => {
  return {
    type: value
  }
}

let changePollutionDialogInfoAction = (value) => {
  return {
    type: 'pDialogInfo',
    value: value
  }
}

// 排查结果页面排查,改变查询的信息
let changeInvestiResultAction = (value) => {
  return {
    type: 'InvestiResultData',
    value: value
  }
}

let changeVideoBj = (value) => {
  return {
    type: value
  }
}

// 地图页面,改变所选时间粒度
let changeLiduAction = (data) => {
  return {
    type: 'lidu',
    data: data
  }
}

// 地图页面,改变所选的污染物
let changeMapPollutionsAction = (data) => {
  return {
    type: 'mapPollutions',
    data: data
  }
}

// 地图页面,改变所选的图层
let mapLayerAction = (data) => {
  return {
    type: 'maplayer',
    data: data
  }
}

// 地图页面,改变所选时间
let changeTimeAction = (data) => {
  return {
    type: 'mapTime',
    data: data
  }
}

// 地图页面的五级视图控件,改变临时存储的信息
let changeFiveViewInfosAction = (data) => {
  return {
    type: 'fiveViewInfos',
    data: data
  }
}
export {
  setDefaultData,
  changePanesAction,
  changeRecordAction,
  changeRegionClassificationAction,
  changeBigImgDialogAction,
  changeChooseImgAction,
  getImgArrAction,
  changeGridAlarmTaskListDetailsDialogAction,
  changeRealTimeAlarmTaskListDetailsDialogAction,
  changePointRealTimeAlarmTaskListDetailsDialogAction,
  changeSequenceAlarmListDetailsDialogAction,
  changeTaskLogDialogAction,
  changeisAlarmOperationCloseDialogAction,
  changeisAlarmOperationTransferDialogAction,
  changeAlarmInfoAction,
  changeAlarmSiteInfoAction,
  changeAreaPointListDialogAction,
  changeAreaPointListDialogInfoAction,
  changeIsRightSideBarAction,
  changeIsRightDivAction,
  changeSelectedTimeAction,
  changeDateTypeAction,
  changeSearchConfigAction,
  changePTypeAction,
  collapseAction,
  changeMaptypeAction,
  changeHeadDataAction,
  changeIsAreaListAction,
  changeIsNewCasesDialogAction,
  changeIsPollutionDialogAction,
  changePollutionDialogInfoAction,
  changeInvestiResultAction,
  changeVideoBj,
  changeFiveViewAction,
  changeLiduAction,
  mapLayerAction,
  changeTimeAction,
  changeMapPollutionsAction,
  changeFiveViewInfosAction
}
