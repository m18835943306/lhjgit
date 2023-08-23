/**
 * 污染物类型阈值-hour(新)
 * 134004: PM2.5,
 * 134002: PM10,
 * 121026: SO2,
 * 121005: CO,  // 四舍五入取一个小数  其他都是整数
 * 121004: NO2,
 * 105024: O₃,
 * 209002: AQI,
 * 199054: TVOC,
 * 134001:TSP;
 * 134011: 降尘浓度
 * 134012: 降尘浓度最大值
 * 134013: 降尘浓度最小值
 */
const pollutionMapByHourNew = {
  121007: [470, 500, 550, 600],
  134004: [35, 75, 115, 150, 250],
  134002: [50, 150, 250, 350, 420],
  121026: [150, 500, 650, 800],
  121005: [5, 10, 35, 60, 90],
  121004: [100, 200, 700, 1200, 2340],
  105024: [160, 200, 300, 400, 800],
  209002: [50, 100, 150, 200, 300],
  199054: [20, 50, 85, 120, 150],
  134001: [80, 120, 200, 300, 500],
  209003: [],
  209033: [],
  209034: [],
  209035: [],
  209036: [],
  134011: [],
  134012: [],
  134013: [],
  209100: [], //裸地面积
  209102: [], //裸地管控率
  209103: [], //降尘
  209008: [] //重污染天数
}

const new2Old = {
  134004: '1',
  134002: '2',
  121026: '3',
  121005: '4',
  121004: '5',
  105024: '6',
  209002: '7',
  199054: '8',
  134001: '10'
}

const L0_COLOR = [153, 153, 153, 0.8]
const L1_COLOR = [0, 230, 0, 0.8]
const L2_COLOR = [253, 253, 0, 0.8]
const L3_COLOR = [248, 124, 0, 0.8]
const L4_COLOR = [250, 0, 0, 0.8]
const L5_COLOR = [151, 0, 73, 0.8]
const L6_COLOR = [126, 0, 32, 0.8]

const colors = [
  L0_COLOR,
  L1_COLOR,
  L2_COLOR,
  L3_COLOR,
  L4_COLOR,
  L5_COLOR,
  L6_COLOR
]

const PM25_LEVELS = [35, 75, 115, 150, 250]
const PM10_LEVELS = [50, 150, 250, 350, 420]
const SO2_LEVELS = [50, 150, 500, 650, 800]
const CO_LEVELS = [2, 4, 14, 24, 36, 48]
const NO2_LEVELS = [40, 80, 180, 280, 565]
const O3_LEVELS = [100, 160, 215, 265, 800]
const AQI_LEVELS = [50, 100, 150, 200, 300]
const TVOC_LEVELS = [20, 50, 85, 120, 150]
const TSP_LEVELS = [80, 120, 200, 300, 500]

//自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
const pollutionEchats = {
  134004: [
    { min: 250, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 151, max: 250, label: '重度污染', color: '#9a004a' },
    { min: 116, max: 150, label: '中度污染', color: '#ff0000' },
    { min: 76, max: 115, label: '轻度污染', color: '#ff7f00' },
    { min: 36, max: 75, label: '良', color: '#ffff00' },
    { min: 0, max: 35, label: '优', color: '#00e600' }
  ],
  134002: [
    { min: 421, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 351, max: 420, label: '重度污染', color: '#9a004a' },
    { min: 251, max: 350, label: '中度污染', color: '#ff0000' },
    { min: 151, max: 250, label: '轻度污染', color: '#ff7f00' },
    { min: 51, max: 150, label: '良', color: '#ffff00' },
    { min: 0, max: 50, label: '优', color: '#00e600' }
  ],
  121026: [
    { min: 801, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 651, max: 800, label: '重度污染', color: '#9a004a' },
    { min: 501, max: 650, label: '中度污染', color: '#ff0000' },
    { min: 151, max: 500, label: '轻度污染', color: '#ff7f00' },
    { min: 51, max: 150, label: '良', color: '#ffff00' },
    { min: 0, max: 50, label: '优', color: '#00e600' }
  ],
  121005: [
    { min: 37, max: 48, label: '严重污染', color: '#800021' },
    { min: 25, max: 36, label: '重度污染', color: '#9a004a' },
    { min: 15, max: 24, label: '中度污染', color: '#ff0000' },
    { min: 5, max: 14, label: '轻度污染', color: '#ff7f00' },
    { min: 3, max: 4, label: '良', color: '#ffff00' },
    { min: 0, max: 2, label: '优', color: '#00e600' }
  ],
  121004: [
    { min: 566, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 281, max: 565, label: '重度污染', color: '#9a004a' },
    { min: 181, max: 280, label: '中度污染', color: '#ff0000' },
    { min: 81, max: 180, label: '轻度污染', color: '#ff7f00' },
    { min: 41, max: 80, label: '良', color: '#ffff00' },
    { min: 0, max: 40, label: '优', color: '#00e600' }
  ],
  105024: [
    { min: 801, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 266, max: 800, label: '重度污染', color: '#9a004a' },
    { min: 216, max: 265, label: '中度污染', color: '#ff0000' },
    { min: 161, max: 215, label: '轻度污染', color: '#ff7f00' },
    { min: 101, max: 160, label: '良', color: '#ffff00' },
    { min: 0, max: 100, label: '优', color: '#00e600' }
  ],
  209002: [
    { min: 301, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 201, max: 300, label: '重度污染', color: '#9a004a' },
    { min: 151, max: 200, label: '中度污染', color: '#ff0000' },
    { min: 101, max: 150, label: '轻度污染', color: '#ff7f00' },
    { min: 51, max: 100, label: '良', color: '#ffff00' },
    { min: 0, max: 50, label: '优', color: '#00e600' }
  ],
  199054: [
    { min: 151, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 121, max: 150, label: '重度污染', color: '#9a004a' },
    { min: 86, max: 120, label: '中度污染', color: '#ff0000' },
    { min: 51, max: 85, label: '轻度污染', color: '#ff7f00' },
    { min: 21, max: 50, label: '良', color: '#ffff00' },
    { min: 0, max: 20, label: '优', color: '#00e600' }
  ],
  134001: [
    { min: 501, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 301, max: 500, label: '重度污染', color: '#9a004a' },
    { min: 201, max: 300, label: '中度污染', color: '#ff0000' },
    { min: 121, max: 200, label: '轻度污染', color: '#ff7f00' },
    { min: 81, max: 120, label: '良', color: '#ffff00' },
    { min: 0, max: 80, label: '优', color: '#00e600' }
  ],
  //以下都是项目需要临时复制的请勿使用（134011，209100,209102）
  134011: [
    { min: 501, max: 9999999, label: '严重污染', color: '#800021' },
    { min: 301, max: 500, label: '重度污染', color: '#9a004a' },
    { min: 201, max: 300, label: '中度污染', color: '#ff0000' },
    { min: 121, max: 200, label: '轻度污染', color: '#ff7f00' },
    { min: 81, max: 120, label: '良', color: '#ffff00' },
    { min: 0, max: 80, label: '优', color: '#00e600' }
  ],
  209100: [
    { min: 501, max: 9999999, label: '', color: '#800021' },
    { min: 301, max: 500, label: '', color: '#9a004a' },
    { min: 201, max: 300, label: '', color: '#ff0000' },
    { min: 121, max: 200, label: '', color: '#ff7f00' },
    { min: 81, max: 120, label: '', color: '#ffff00' },
    { min: 0, max: 80, label: '', color: '#00e600' }
  ],
  209102: [
    { min: 501, max: 9999999, label: '', color: '#800021' },
    { min: 301, max: 500, label: '', color: '#9a004a' },
    { min: 201, max: 300, label: '', color: '#ff0000' },
    { min: 121, max: 200, label: '', color: '#ff7f00' },
    { min: 81, max: 120, label: '', color: '#ffff00' },
    { min: 0, max: 80, label: '', color: '#00e600' }
  ],
  209103: [
    { min: 501, max: 9999999, label: '', color: '#800021' },
    { min: 301, max: 500, label: '', color: '#9a004a' },
    { min: 201, max: 300, label: '', color: '#ff0000' },
    { min: 121, max: 200, label: '', color: '#ff7f00' },
    { min: 81, max: 120, label: '', color: '#ffff00' },
    { min: 0, max: 80, label: '', color: '#00e600' }
  ],
  209104: [
    { min: 501, max: 9999999, label: '', color: '#800021' },
    { min: 301, max: 500, label: '', color: '#9a004a' },
    { min: 201, max: 300, label: '', color: '#ff0000' },
    { min: 121, max: 200, label: '', color: '#ff7f00' },
    { min: 81, max: 120, label: '', color: '#ffff00' },
    { min: 0, max: 80, label: '', color: '#00e600' }
  ],
  209008: [
    { min: 33, max: 365, label: '', color: '#800021' },
    { min: 25, max: 32, label: '', color: '#9a004a' },
    { min: 19, max: 24, label: '', color: '#ff0000' },
    { min: 13, max: 18, label: '', color: '#ff7f00' },
    { min: 7, max: 12, label: '', color: '#ffff00' },
    { min: 0, max: 6, label: '', color: '#00e600' }
  ]
}

/**
 * 污染物类型阈值-day(新)
 * 134004: PM2.5,
 * 134002: PM10,
 * 121026: SO2,
 * 121005: CO,
 * 121004: NO2,
 * 105024: O3,
 * 209002: AQI,
 * 199054: TVOC,
 * 134001:TSP;
 */
const pollutionMapByDateNew = {
  134004: PM25_LEVELS,
  134002: PM10_LEVELS,
  121026: SO2_LEVELS,
  121005: CO_LEVELS,
  121004: NO2_LEVELS,
  105024: O3_LEVELS,
  209002: AQI_LEVELS,
  199054: TVOC_LEVELS,
  134001: TSP_LEVELS,
  209003: PM25_LEVELS
}

let pollutionTypeMapNew = {
  134004: 'PM2.5',
  134002: 'PM10',
  121026: 'SO2',
  121005: 'CO',
  121004: 'NO2',
  105024: 'O₃',
  209002: 'AQI',
  199054: 'TVOC',
  134001: 'TSP',
  121007: 'CO2',
  209017: '污染等级',
  209001: '首要污染物',
  209003: '综合指数',
  209033: '温度',
  209034: '湿度',
  209035: '风速',
  209036: '风向',
  209037: '气压',
  200020: '风力',
  209074: '油烟浓度',
  209075: '非甲烷总烃',
  209073: '颗粒物',
  1: '流速',
  2: '水位',
  3: '水温',
  4: 'pH值',
  5: '电导率',
  84: '浊度',
  7: '溶解氧',
  8: '化学需氧量',
  9: '氨氮',
  10: '总氮',
  11: '总磷',
  12: '高锰酸盐指数',
  13: '流量',
  152: '温度',
  154: '湿度',
  0: '综合',
  111: '硝酸盐氮',
  145: '亚硝酸盐氮',
  74: '总有机碳',
  17: '五日生化需氧量',
  19: '氟化物',
  20: '六价铬',
  37: '镉',
  38: '挥发酚',
  41: '砷',
  42: '石油类',
  43: '透明度',
  49: '叶绿素a',
  52: '铜',
  53: '锌',
  54: '硒',
  55: '汞',
  56: '铅',
  57: '氰化物',
  58: '阴离子表面活性剂',
  59: '硫化物',
  60: '粪大肠菌群'
}

let pollutionTypeMap1New = {
  'PM2.5': 134004,
  PM25: 134004,
  PM10: 134002,
  SO2: 121026,
  CO: 121005,
  NO2: 121004,
  'O₃': 105024,
  O3: 105024,
  AQI: 209002,
  TVOC: 199054,
  TSP: 134001,
  污染等级: 209017,
  首要污染物: 209001,
  综合指数: 209003,
  优良天数: 209083,
  CO2: 121007,
  流速: 1,
  水位: 2,
  水温: 3,
  pH值: 4,
  电导率: 5,
  浊度: 84,
  溶解氧: 7,
  化学需氧量: 8,
  氨氮: 9,
  总氮: 10,
  总磷: 11,
  高锰酸盐指数: 12,
  流量: 13,
  硝酸盐氮: 111
}

let alarmColor = {
  待反馈: '#f30808',
  已反馈: '#04c85c',
  已关闭: '#3fa1fc'
}

//事件状态
let feedbackStatus = {
  1: '待反馈',
  2: '已反馈',
  3: '已关闭'
}

let feedbackName = {
  待反馈: 1,
  已反馈: 2,
  已关闭: 3
}

let siteName = {
  1: '道路交通',
  2: '评价点位',
  3: '子站周边',
  4: '机场周边',
  5: '传输点位',
  6: '企业点位',
  7: '质控点位',
  8: '重点污染源',
  20: '移动点位',
  21: '工地扬尘点位',
  22: '考核断面点位',
  23: '属地自建',
  24: '空气质量评价点位',
  25: '社区点位',
  26: '污染监测点',
  27: '热点&社区',
  28: '热点&传输',
  40: '园区试点',
  41: '七参点位',
  42: '重点汽修',
  43: '重点餐饮',
  44: '热点网格监测',
  45: '重点景区',
  46: '重点工业',
  47: '网格点位',
  48: '怀柔科学城点位'
}

//日期类型  在写时间组件的时候可以使用
let dateType = {
  hourly: '1',
  daily: '2',
  weekly: '3',
  monthly: '4',
  yearly: '5'
}

let dateNameToId = {
  小时: '1',
  日: '2',
  周: '3',
  月: '4',
  年: '5'
}

let dateIdToType = {
  1: 'hourly',
  2: 'daily',
  3: 'weekly',
  4: 'monthly',
  5: 'yearly'
}

let datePointType = {
  hourly: '1h',
  daily: '1d',
  weekly: '1w',
  monthly: '1t',
  yearly: '1y'
}

let dateStationType = {
  hourly: 'hour',
  daily: 'day',
  monthly: 'month',
  yearly: 'year'
}

let StandDateType = {
  hourly: 'hour',
  daily: 'day',
  weekly: 'week',
  monthly: 'month',
  yearly: 'year'
}

let waterType = {
  hourly: 'h',
  daily: 'd',
  monthly: 'm'
}

let polluTypeOrder = {
  209002: 1, // 'AQI',
  209017: 2, // '污染等级',
  209001: 3, // '首要污染物',
  134004: 4, // 'PM2.5',
  134002: 5, // 'PM10',
  121004: 6, // 'NO2',
  121026: 7, // 'SO2',
  121005: 8, // 'CO',
  105024: 9, // 'O₃',
  199054: 10, // 'TVOC',
  134001: 11 // 'TSP'
}

let taskTypeList = {
  1: '实时报警',
  2: '网格报警',
  3: '点位报警',
  4: '专项任务',
  5: '日常巡查',
  6: '预警网格',
  7: '推荐网格',
  8: '污染源报警',
  9: '规律性报警',
  10: '重复性报警',
  11: '周期性报警',
  12: '季度抽查',
  13: '吹哨报到',
  14: '群众举报',
  15: '重复性报警(市级)',
  16: '重复性报警(区级)',
  17: '月度抽查',
  18: '精细化网格',
  22: '排查任务'
}

const rankMenuList = [
  'RegionConcentration',
  'CityConcentration',
  'VillageConcentration',
  'CountryConcentration',
  'ProvinceConcentration',
  'RegionInCity',
  'RegionInProvince'
]

const menuToRank = {
  RegionConcentration: 'RegionRankId',
  CityConcentration: 'CityRankId',
  VillageConcentration: 'VillageRankId',
  CountryConcentration: 'CountryRankId',
  ProvinceConcentration: 'ProvinceRankId',
  RegionInCity: 'RegionInCityRankId',
  RegionInProvince: 'RegionInCityRankId'
}

/**
 * 区对应rankid(街乡镇(市级))
 */
const admidToRankid_level3 = {
  2: 74, // 海淀区
  3: 44, // 朝阳区
  4: 68, // 大兴区
  5: 69, // 房山区
  6: 42, // 石景山区
  7: 65, // 东城区
  8: 47, // 西城区
  9: 75, // 平谷区
  10: 67, // 密云区
  11: 66, // 怀柔区
  12: 30, // 顺义区
  13: 76, // 门头沟区
  14: 77, // 通州区
  15: 78, // 昌平区
  16: 79, // 延庆区
  17: 43, // 丰台区
  18: 80, // 开发区
  90224: 100 // 首都机场
}

//区域等级
const level = {
  0: '国家级',
  1: '省级',
  2: '市级',
  3: '区县级',
  4: '其他'
}

//顺义标准站气象站点
const Meteorological_key2value = {
  wind_direction: 209036,
  wind_speed: 209035,
  precipitation: 209046,
  pressure: 101006,
  temperature: 209033,
  humidity: 209034
}

//可以将 风俗、风向、降雨量、气压、温度、湿度 ID 转化文字 或 单位
const Meteorological_value2key = {
  209036: { key: 'wind_direction', name: '风向', unit: '' },
  209035: { key: 'wind_speed', name: '风速', unit: 'm/s' },
  209046: { key: 'precipitation', name: '降雨量', unit: 'mm' },
  101006: { key: 'pressure', name: '气压', unit: 'HPa' },
  209033: { key: 'temperature', name: '温度', unit: '℃' },
  209034: { key: 'humidity', name: '湿度', unit: '%' }
}

//
let colorIndexNew = (value, type, pRange = pollutionMapByHourNew) => {
  // if (type == 199054) {
  // 	if (value == '--') {
  // 		return 0;
  // 	} else {
  // 		return 1;
  // 	}
  // }
  if (type == 209001) {
    return
  }
  // if(type == 134011) {return;}
  var range = pRange[type]
  if (!range) return
  if (value > 0) {
    if (value > Math.max.apply(null, range)) {
      return range.length + 1
    }

    for (var i = 0; i < range.length; i++) {
      if (range[i] >= value) {
        return i + 1
      }
    }
  }
  return 0
}

let getBgColorForHourNew = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByHourNew)
  var colorStr = colors[idx]
  return 'rgba(' + colorStr + ')'
}

let getBgColorForNewTableStyle = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByHourNew)
  var colorStr = colors[idx]
  var color = '#FFF'
  if (idx < 4) {
    color = '#333'
  }
  return {
    backgroundColor: 'rgba(' + colorStr + ')',
    color: color
  }
}

let getBgColorForHour1New = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByHourNew)
  var colorStr = colors[idx]
  var color = '#FFF'
  if (idx < 4) {
    color = '#333'
  }
  var style = {
    backgroundColor: 'rgba(' + colorStr + ')',
    color: color,
    fontSize: '13px',
    textAlign: 'center'
  }
  return style
}
let getBgColorForHour1New2 = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByHourNew)
  var colorStr = colors[idx]
  var color = '#FFF'
  if (idx < 4) {
    color = '#333'
  }
  var style = {
    backgroundColor: 'rgba(' + colorStr + ')',
    color: color,
    fontSize: '18px',
    textAlign: 'center'
  }
  return style
}
//冬奥刷色图取消字体大小
let getBgColorForHour1New3 = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByHourNew)
  var colorStr = colors[idx]
  var color = '#FFF'
  if (idx < 4) {
    color = '#333'
  }
  var style = {
    backgroundColor: 'rgba(' + colorStr + ')',
    // color: color,
    fontSize: '18px',
    textAlign: 'center',
    color: 'transparent'
  }
  return style
}
//冬奥字体倾斜专用
let getBgColorForHour1New4 = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByHourNew)
  var colorStr = colors[idx]
  var color = '#FFF'
  if (idx < 4) {
    color = '#333'
  }
  var style = {
    backgroundColor: 'rgba(' + colorStr + ')',
    // color: color,
    fontSize: '18px',
    textAlign: 'center',
    fontStyle: 'italic'
  }
  return style
}

let getBgColorForYearNew = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByHourNew)
  var colorStr = colors[idx]
  var color = '#000'
  if (idx < 4) {
    color = '#333'
  }
  var style = {
    backgroundColor: 'rgba(' + colorStr + ')',
    color: color,
    fontSize: '13px',
    textAlign: 'center'
  }
  return style
}

let getBJHighLight = (value) => {
  var color = '#000'
  if (value == '北京市') {
    color = '#FF0000'
  }
  var style = {
    color: color,
    fontSize: '13px',
    textAlign: 'center'
  }
  return style
}

let getBgColorForDayNew = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByDateNew)
  var colorStr = colors[idx]
  var color = '#FFF'
  if (idx < 4) {
    color = '#333'
  }
  var style = {
    'background-color': 'rgba(' + colorStr + ')',
    color: color,
    'font-size': '13px',
    'text-align': 'center'
  }
  return style
}

let getForeColorForDayNew = (value, type) => {
  var idx = colorIndexNew(value, type, pollutionMapByDateNew)
  var colorStr = colors[idx]
  var style = {
    color: 'rgba(' + colorStr + ')'
  }
  return style
}

let getUnitNew = (type) => {
  type = Number(type)
  var unit = ''
  switch (type) {
    case 121005:
      unit = 'mg/m³'
      break
    case 209002:
      unit = ''
      break
    case 199054:
      unit = 'ppb'
      break
    default:
      unit = 'μg/m³'
      break
  }
  return unit
}

// 获取蓝天数
let getNewDays = (data) => {
  var rtn = []
  for (var i = 0; i < data.length; i++) {
    var d = 0
    if (data[i] < 0) {
      d = 0
    } else if (data[i] > 1) {
      d = 1
    } else {
      d = data[i]
    }

    rtn.push(i == 0 ? d : d + rtn[i - 1])
  }
  return rtn
}

let formatDate = (time) => {
  var arr = time.split(' ')
  var ymd = arr[0].split('-')
  var hms = arr[1].split(':')

  var datetime = ymd[1] + '-' + ymd[2]
  datetime += ' ' + hms[0] + ':' + hms[1]
  return datetime
}

let getMondayTime = (year, month, weekday) => {
  let d = new Date()
  // 该月第一天
  d.setFullYear(year, month - 1, 1)
  let w1 = d.getDay()
  if (w1 == 0) w1 = 7
  // 第一个周一
  let d1
  if (w1 != 1) d1 = 7 - w1 + 2
  else d1 = 1
  let monday = d1 + (weekday - 1) * 7
  // 标准日期
  let datetime = d.setFullYear(year, month - 1, monday)
  datetime = new Date(datetime).format('yyyy-MM-dd 00:00:00')
  return datetime
}

let getFridayTime = (year, month, weekday) => {
  let d = new Date()
  d.setFullYear(year, month - 1, 1)
  let w1 = d.getDay()
  let d1
  if (w1 <= 5) d1 = 6 - w1
  else d1 = 7 - w1 + 6
  let friday = d1 + (weekday - 1) * 7
  let datetime = d.setFullYear(year, month - 1, friday)
  datetime = new Date(datetime).format('yyyy-MM-dd 00:00:00')
  return datetime
}

/**
 * 获取某一月份有几个周一
 * @param {*} year
 * @param {*} month
 */
let getMondays = (year, month) => {
  let d = new Date()
  d.setFullYear(year, month - 1, 1)
  let m = d.getMonth()
  let mondays = []
  d.setDate(1)
  // Get the first Monday in the month
  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1)
  }
  // Get all the other Mondays in the month
  while (d.getMonth() === m) {
    mondays.push(new Date(d.getTime()).format('yyyy-MM-dd 00:00:00'))
    d.setDate(d.getDate() + 7)
  }
  return mondays
}

/**
 * 获取某一月份有几个周五
 * @param {*} years
 * @param {*} months
 */
function getFridays(years, months) {
  let fridays = []
  let d = new Date()
  d.setFullYear(years, months - 1, 1)
  let today = new Date(d)
  let year = today.getFullYear()
  let month = today.getMonth()
  let i = 0
  let start = new Date(year, month, 1) // 得到当月第一天
  let end = new Date(year, month + 1, 0) // 得到当月最后一天
  let start_day = start.getDay() // 当月第一天是周几
  switch (start_day) {
    case 0:
      i = 0 - 1
      break
    case 1:
      i = 0 - 2
      break
    case 2:
      i = 0 - 3
      break
    case 3:
      i = 0 - 4
      break
    case 4:
      i = 0 - 5
      break
    case 5:
      i = 1
      break
    case 6:
      i = 0
      break
  }
  while (new Date(year, month, i + 6) <= end) {
    fridays.push(new Date(year, month, i).format('yyyy-MM-dd'))
    i += 7
  }
  return fridays
}

let formatEchartTime = (data, type) => {
  let arr = data.map((o) => {
    if (type == '1') {
      return new Date(o).format('yyyy-MM-dd hh:00')
    } else if (type == '2' || type == '3') {
      return new Date(o).format('yyyy-MM-dd')
    } else if (type == '4') {
      return new Date(o).format('yyyy-MM')
    } else if (type == '5') {
      return new Date(o).format('yyyy')
    }
  })
  return arr
}

//数字转汉字
const SectionToChinese = (section) => {
  let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
  let chnUnitChar = ['', '十', '百', '千']
  let strIns = '',
    chnStr = ''
  let unitPos = 0
  let zero = true
  while (section > 0) {
    let v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}

const formatPolluNameSub = (pollutantId) => {
  let a, b
  switch (Number(pollutantId)) {
    case 134004:
      a = 'PM'
      b = '2.5'
      break
    case 134002:
      a = 'PM'
      b = '10'
      break
    case 121026:
      a = 'SO'
      b = '2'
      break
    case 121005:
      a = 'CO'
      b = ''
      break
    case 121004:
      a = 'NO'
      b = '2'
      break
    case 105024:
      a = 'O'
      b = '3'
      break
    case 209002:
      a = 'AQI'
      b = ''
      break
    case 199054:
      a = 'TVOC'
      b = ''
      break
    case 134001:
      a = 'TSP'
      b = ''
      break
  }
  return {
    a,
    b
  }
}

/**
 * 直接返回污染物名称
 * @param {Number || String} pollutantId
 * @returns {String}
 */
const formatPolluNameStr = (pollutantId) => {
  let a
  switch (Number(pollutantId)) {
    case 134004:
      a = 'PM2.5'
      break
    case 134002:
      a = 'PM10'
      break
    case 121026:
      a = 'SO2'
      break
    case 121005:
      a = 'CO'
      break
    case 121004:
      a = 'NO2'
      break
    case 105024:
      a = 'O₃'
      break
    case 209002:
      a = 'AQI'
      break
    case 199054:
      a = 'TVOC'
      break
    case 134001:
      a = 'TSP'
      break
  }
  return a
}

const returnBackGround = (value) => {
  var defaultColor = 'rgba(128,128,128,0.8)'
  if (value <= 0) return null
  var range = [
    3.5, 7, 10.5, 14, 17.5, 21, 24.5, 28, 31.5, 35, 39, 43, 47, 51, 55, 59, 63,
    67, 71, 75, 79, 83, 87, 91, 95, 99, 103, 107, 111, 115, 122, 129, 136, 143,
    150, 170, 190, 210, 230, 250, 350, 500, 600, 700, 800, 900, 1000
  ]
  var color = [
    'rgba(0, 125, 0, 0.8)',
    'rgba(0, 138, 0, 0.8)',
    'rgba(0, 153, 0, 0.8)',
    'rgba(0, 166, 0, 0.8)',
    'rgba(0, 179, 0, 0.8)',
    'rgba(0, 192, 0, 0.8)',
    'rgba(0, 205, 0, 0.8)',
    'rgba(0, 218, 0, 0.8)',
    'rgba(0, 233, 0, 0.8)',
    'rgba(0, 255, 0, 0.8)',
    'rgba(80, 252, 0, 0.8)',
    'rgba(109, 252, 0, 0.8)',
    'rgba(126, 252, 0, 0.8)',
    'rgba(150, 250, 0, 0.8)',
    'rgba(161, 250, 0, 0.8)',
    'rgba(173, 247, 0, 0.8)',
    'rgba(204, 250, 0, 0.8)',
    'rgba(223, 250, 0, 0.8)',
    'rgba(238, 252, 0, 0.8)',
    'rgba(255, 255, 0, 0.8)',
    'rgba(255, 232, 0, 0.8)',
    'rgba(255, 220, 0, 0.8)',
    'rgba(255, 207, 0, 0.8)',
    'rgba(255, 194, 0, 0.8)',
    'rgba(255, 185, 0, 0.8)',
    'rgba(255, 178, 0, 0.8)',
    'rgba(255, 165, 0, 0.8)',
    'rgba(255, 152, 0, 0.8)',
    'rgba(255, 140, 0, 0.8)',
    'rgba(255, 126, 0, 0.8)',
    'rgba(255, 115, 0, 0.8)',
    'rgba(255, 98, 0, 0.8)',
    'rgba(255, 85, 0, 0.8)',
    'rgba(255, 68, 0, 0.8)',
    'rgba(255, 0, 0, 0.8)',
    'rgba(235, 0, 27, 0.8)',
    'rgba(224, 0, 34, 0.8)',
    'rgba(214, 0, 39, 0.8)',
    'rgba(153, 0, 76, 0.8)',
    'rgba(142, 0, 63, 0.8)',
    'rgba(135, 0, 50, 0.8)',
    'rgba(126, 0, 35, 0.8)',
    'rgba(100, 0, 28, 0.8)',
    'rgba(75, 0, 21, 0.8)',
    'rgba(50, 0, 14, 0.8)',
    'rgba(25, 0, 7, 0.8)',
    'rgba(0, 0, 0, 0.8)'
  ]
  var idx = 0,
    i = 0,
    j = range.length
  if (value > 0) {
    if (value < Math.min.apply(null, range)) {
      idx = 0
    }
    if (value > Math.max.apply(null, range)) {
      idx = j
    }
    for (; i < j; i++) {
      if (range[i] >= value) {
        idx = i
        break
      }
    }
  }
  return color[idx]
}

//tvoc 199054 保留*1000后保留一位小数   co121005 保留一位小数；综合指数209003 保留两位小数； 其他取整数
const handleValue2Standard = (value, type) => {
  let v = Number(value)
  if (isNaN(v) || v <= 0) {
    return '--'
  }
  switch (Number(type)) {
    case 199054:
      v = (v * 1000).toFixed(0)
      break
    case 209003:
      v = v.toFixed(2)
      break
    case 121005:
      v = v.toFixed(1)
      break
    default:
      v = v.toFixed(0)
      break
  }
  return v
}

export {
  pollutionTypeMapNew,
  pollutionTypeMap1New,
  alarmColor,
  feedbackStatus,
  feedbackName,
  siteName,
  dateType,
  dateNameToId,
  dateIdToType,
  datePointType,
  dateStationType,
  StandDateType,
  waterType,
  polluTypeOrder,
  taskTypeList,
  pollutionMapByHourNew,
  pollutionMapByDateNew,
  pollutionEchats,
  new2Old,
  colors,
  rankMenuList,
  menuToRank,
  admidToRankid_level3,
  level,
  Meteorological_key2value,
  Meteorological_value2key,
  colorIndexNew,
  getBgColorForHourNew,
  getBgColorForNewTableStyle,
  getBJHighLight,
  getBgColorForHour1New,
  getBgColorForHour1New2,
  getBgColorForHour1New3,
  getBgColorForHour1New4,
  getBgColorForYearNew,
  getBgColorForDayNew,
  getForeColorForDayNew,
  getUnitNew,
  getNewDays,
  formatDate,
  getMondayTime,
  getFridayTime,
  getMondays,
  getFridays,
  formatEchartTime,
  SectionToChinese,
  formatPolluNameSub,
  formatPolluNameStr,
  returnBackGround,
  handleValue2Standard
}
