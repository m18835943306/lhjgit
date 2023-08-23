//每个文件夹中只包含一个baseURL
const { VITE_MICRO_SERVICE_API_USER } = import.meta.env

export default {
  baseURL: VITE_MICRO_SERVICE_API_USER, //`https://user-api.airqualitychina.cn:9998`,
  getConfigList: '/auth/getConfigList', // 查询用户配置信息
  getCountyList: '/common/getCountyList', //
  getTownList: '/common/getTownList', //
  userLoginInfo: '/auth/getLoginRecordList', // 查询用户登录信息
  userLoginStatistics: '/auth/getLoginStatistics', // 用户登录统计
  getAdmInfo: '/common/getAdmInfo', // 获取属地基本信息（包含上下级）
  getUserRegionInfo: '/common/getUserRegionInfo', // 获取当前用户属地信息
  getUserPageInfoForWeb: '/user/getUserPageInfoForWeb', // 查询项目下用户信息
  getUserInfo: '/auth/login', // 查询用户登陆信息
  getCityGroup: '/common/getCityGroup', // 查询城市组信息
  getCityListByGroup: '/common/getCityListByGroup', // 查询城市组信息
  getCityList: '/common/getCityList', // 查询城市列表
  getTowns: '/common/getTownInfoByAdm', // 查询属地下所有街乡镇， 市 区
  getVillageList: '/common/getVillageList',
  getProvinceList: '/common/getProvinceList',
  getSendmessage: '/auth/sendmessage', //动态短信验证功能
  getTownGroup: '/common/getTownGroup', //获取街乡镇组基础信息
  getTownListByGroup: '/common/getTownListByGroup', // 根据街乡镇组id，获取对应的街乡镇信息
  smsManagementList: '/message/GetSendMessageV3',
  messageList: '/message/getUserAllMessagesV3', //获取消息通知列表
  configData: '/auth/getConfigList' // 获取配置判断是否为模式二
}
