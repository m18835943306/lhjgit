import { message } from 'antd'
import axios from 'axios'
import ExportJsonExcel from 'js-export-excel'
import { mapUrl, themeColors } from '&/constantces/theme'

const viewData = () => {
  // 视窗宽高相关
  var e = 0,
    l = 0,
    i = 0,
    g = 0,
    f = 0,
    m = 0
  var j = window,
    h = document,
    k = h.documentElement
  e = k.clientWidth || h.body.clientWidth || 0
  l = j.innerHeight || k.clientHeight || h.body.clientHeight || 0
  g = h.body.scrollTop || k.scrollTop || j.pageYOffset || 0
  i = h.body.scrollLeft || k.scrollLeft || j.pageXOffset || 0
  f = Math.max(h.body.scrollWidth, k.scrollWidth || 0)
  m = Math.max(h.body.scrollHeight, k.scrollHeight || 0, l)
  return {
    scrollTop: g,
    scrollLeft: i,
    documentWidth: f,
    documentHeight: m,
    viewWidth: e,
    viewHeight: l
  }
}

const getcolswidth = (arr = []) => {
  return arr.reduce((prev, cur, ind) => {
    return prev + (cur.width ? cur.width : 0)
  }, 0)
}

let getParamter = (param) => {
  var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

let getParamterByUrl = (url, param) => {
  const search = url.split('?')[1]
  var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  var r = search.match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * 判断是否为图片格式--img标签可打开的
 * @param {String} str 传入图片
 * @returns 返回 true || false
 */
let isImageFun = (str) => {
  var reg = /\.(png|jpg|gif|jpeg|webp)$/
  return reg.test(str)
}

let getRootPath = () => {
  var pathName = window.document.location.pathname
  var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1)
  return projectName
}

// 用于提示的message消息弹窗
let bubbleAutoClose = (msg, fn, seconds = 2) => {
  message.info(msg, seconds, fn)
  message.config({
    top: 10,
    duration: 0.1,
    maxCount: 1
  })
}

/**
 * 非负非空判断
 * @param {*} value 传入任意值
 * @returns {Boolean} 返回布尔值
 */
let judgeValue = (value) => {
  if (value === '' || value <= 0) {
    return false
  }
  return true
}

let finds = (key, arr) => {
  return arr.filter((item) => {
    return item.tifTime == key + ' 00:00:00'
  })
}

/**
 * 筛选数字的
 * @param {String} text 输入任意的文本字符串
 * @returns {String}  输出数字字符串
 */
let getNum = (text) => {
  var value = text.replace(/[^\d.]/gi, '')
  return value
}

/**
 * 排除数字的
 * @param {String} text 输入任意的文本字符串
 * @returns {String}  返回排除数字后的字符串
 */
let getStr = (text) => {
  var value = text.replace(/[0-9]*(\.[0-9]*)?/g, '')
  return value
}

//用于水项目的不同水质情况展示颜色20201202
let getColor = (param) => {
  let tmpColor
  let tmpArr = [
    { level: 'Ⅰ', color: '#ccffff' },
    { level: 'Ⅱ', color: '#00ccff' },
    { level: 'Ⅲ', color: '#00ff00' },
    { level: 'Ⅳ', color: '#FFFF00' },
    { level: 'Ⅴ', color: '#FF9900' },
    { level: '劣Ⅴ', color: '#ff0000' },
    { level: '劣Ⅴ1', color: '#ca7af5' },
    { level: '劣Ⅴ2', color: '#ff00c5' },
    { level: '劣Ⅴ3', color: '#ff0000' },
    { level: '劣Ⅴ4', color: '#7d0000' },
    { level: '无水', color: '#ababab' },
    { level: '无法采样', color: '#ababab' },
    { level: '结冰', color: '#c8c8c8' },
    //账号 bjke_water 十五流域中使用
    { level: 'Ⅰ类', color: '#ccffff' },
    { level: 'Ⅱ类', color: '#00ccff' },
    { level: 'Ⅲ类', color: '#00ff00' },
    { level: 'Ⅳ类', color: '#FFFF00' },
    { level: 'Ⅴ类', color: '#FF9900' },
    { level: '劣Ⅴ类', color: '#ff0000' },
    { level: '劣Ⅴ1类', color: '#ca7af5' },
    { level: '劣Ⅴ2类', color: '#ff00c5' },
    { level: '劣Ⅴ3类', color: '#ff0000' },
    { level: '劣Ⅴ4类', color: '#7d0000' }
  ]
  tmpArr.map((data) => {
    if (param === data['level']) {
      tmpColor = data['color']
    }
  })
  return tmpColor
}

//
function judgeTime(start, end, isCheck = true) {
  if (!isCheck) {
    return {
      border: 'none'
    }
  }
  let startTime = new Date(start)
  let endTime = new Date(end)
  if (startTime > endTime) {
    bubbleAutoClose('开始时间必须大于结束时间')
    return {
      border: '1px solid red',
      borderRadius: '4px'
    }
  } else {
    return {
      border: 'none'
    }
  }
}

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i
  }
  return -1
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

let $Axios = (method, url, param, fn, err) => {
  let methods = method.trim()
  let obj = {
    method: methods,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    url: 'http://47.104.195.164:8210/api/v1' + url,
    timeout: 30000
  }
  param.token = getToken()

  if (methods === 'post') {
    let data = new FormData()
    Object.entries(obj).map((item) => {
      data.append(item[0], item[1])
    })
    obj.data = data
  } else {
    obj.params = param
  }

  axios(obj)
    .then((response) => {
      fn(response)
    })
    .catch((e) => {
      if (err) err()
    })
}

let getLastDay = (year, month) => {
  var y = month > 12 ? year + 1 : year
  var m = month > 12 ? month - 11 : month + 1
  return new Date(new Date(y, m, 1).getTime() - 1000 * 60 * 60 * 24).getDate()
}

let getToken = () => {
  let token = ''
  if (getParamter('v2')) {
    token = sessionStorage.getItem('token') || localStorage.getItem('token')
  } else {
    token = getParamter('token')
    localStorage.setItem('token', token)
    sessionStorage.setItem('token', token)
  }

  return token
}

let deepClone = (obj) => {
  let _obj = JSON.stringify(obj)
  let objClone = JSON.parse(_obj)
  return objClone
}

//简单Excel导出
let downloadExcel = (
  dataSource,
  columns,
  fileName,
  startTime,
  endTime,
  isFilter
) => {
  let columnsTitle = []
  let columnsFilter = []
  let option = {}
  if (columns.length) {
    columns.map((o) => {
      if (o.hasOwnProperty('children')) {
        // 合并单元格
        o.children.map((item, key) => {
          columnsFilter.push(`${item.dataIndex}`)
          columnsTitle.push(`${o.title}${item.title}`)
        })
      } else {
        let a = typeof o.title
        let title = a == 'string' ? o.title : o.name
        columnsFilter.push(o.dataIndex)
        columnsTitle.push(title)
      }
    })
  }
  if (dataSource.length) {
    option.fileName = fileName ? fileName : '列表'
    if (fileName && startTime && endTime) {
      option.fileName = fileName + '(' + startTime + '--' + endTime + ')'
    } else if (fileName && startTime) {
      option.fileName = fileName + '(' + startTime + ')'
    }

    dataSource = dataSource.map((item, i) => {
      for (var key in item) {
        if (isFilter !== true) {
          item[key] = item[key] < 0 ? '--' : item[key]
        }
      }
      return item
    })
    // bubbleAutoClose('下载中');
    option.datas = [
      {
        sheetData: dataSource,
        sheetName: 'sheet',
        sheetFilter: columnsFilter,
        sheetHeader: columnsTitle
      }
    ]
    let toExcel = new ExportJsonExcel(option)
    toExcel.saveExcel()
  } else {
    bubbleAutoClose('暂无数据')
  }
}
//复杂Excel导出
let downloadComplexExcel = (sheetData, columnsTitle, fileName) => {
  let option = {}
  if (sheetData.length) {
    option.fileName = fileName ? fileName : '列表'
    option.datas = [
      {
        sheetData: sheetData,
        sheetName: 'sheet',
        sheetHeader: columnsTitle
      }
    ]
    let toExcel = new ExportJsonExcel(option)
    toExcel.saveExcel()
  } else {
    bubbleAutoClose('暂无数据')
  }
}

//风场 级别
let getWindspeed = (speed) => {
  var speeds = ''
  if (speed >= 0 && speed < 0.2) {
    speeds = '0'
  } else if (speed >= 0.3 && speed < 1.5) {
    speeds = '1'
  } else if (speed >= 1.6 && speed < 3.3) {
    speeds = '2'
  } else if (speed >= 3.4 && speed < 5.4) {
    speeds = '3'
  } else if (speed >= 5.5 && speed < 7.9) {
    speeds = '4'
  } else if (speed >= 8.0 && speed < 10.7) {
    speeds = '5'
  } else if (speed >= 10.8 && speed < 13.8) {
    speeds = '6'
  } else if (speed >= 13.9 && speed < 17.1) {
    speeds = '7'
  } else if (speed >= 17.2 && speed < 20.7) {
    speeds = '8'
  } else if (speed >= 20.8 && speed < 24.4) {
    speeds = '9'
  } else if (speed >= 24.5 && speed < 28.4) {
    speeds = '10'
  } else if (speed >= 28.5 && speed < 23.6) {
    speeds = '11'
  } else if (speed >= 32.7 && speed < 36.9) {
    speeds = '12'
  } else if (speed >= 37 && speed < 41) {
    speeds = '13'
  } else if (speed >= 42 && speed < 45) {
    speeds = '14'
  } else if (speed >= 46 && speed < 51) {
    speeds = '15'
  } else if (speed >= 52 && speed < 59) {
    speeds = '16'
  } else if (speed >= 60 && speed < 69) {
    speeds = '17'
  } else if (speed >= 70) {
    speeds = '18'
  } else if (speed == -99) {
    speeds = '暂无'
  }
  return speeds
}
//风场 风向
let getWindDirection = (windDirection) => {
  var direction = ''
  if (windDirection >= 0 && windDirection < 45) {
    direction = '南风'
  } else if (windDirection >= 45 && windDirection < 90) {
    direction = '东南风'
  } else if (windDirection >= 90 && windDirection < 135) {
    direction = '东风'
  } else if (windDirection >= 135 && windDirection < 180) {
    direction = '东北风'
  } else if (windDirection >= 180 && windDirection < 225) {
    direction = '北风'
  } else if (windDirection >= 225 && windDirection < 270) {
    direction = '西北风'
  } else if (windDirection >= 270 && windDirection < 315) {
    direction = '西风'
  } else if (windDirection >= 315 && windDirection < 360) {
    direction = '西南风'
  } else if (windDirection == -99) {
    direction = '暂无'
  }
  return direction
}

let compare = (keys, obj1, obj2) => {
  let [key, ...nextKeys] = keys
  let hasNextKey = nextKeys && nextKeys.length
  return obj1[key] === obj2[key] && hasNextKey
    ? compare(nextKeys, obj1, obj2)
    : obj1[key] === obj2[key]
}

/**
 * 将data中keys相同的数据的prop合并
 * @param {Array} keys
 * @param {String} prop
 * @param {Array} data
 */
let translate = (keys, prop, data) => {
  return data.reduce((accumulator, currentValue) => {
    let exist = accumulator.find((item) => {
      return compare(keys, item, currentValue)
    })
    if (exist) {
      exist[prop] = `${exist[prop]},${currentValue[prop]}`
    } else {
      accumulator.push(currentValue)
    }
    return accumulator
  }, [])
}

let getMergeStartAndEnd = ({ startc = 2, step = 2 }) => {
  return {
    s: {
      r: 0,
      c: startc
    },
    e: {
      r: 0,
      c: startc + step - 1
    }
  }
}

const changeThemeListener = (args) => {
  const array = Array.isArray(args) ? args : [args]
  const fn = function (e) {
    const theme = e.data.theme
    if (theme) {
      array.forEach((item) => {
        const { type, instance, fn } = item
        if (type === 'map') {
          const url = mapUrl[theme]
          instance.getSource().setUrl(url)
        } else if (type === 'echarts') {
          const color = themeColors[theme]
          changeEchartsColor(instance, color, item.chartsType)
        } else if (type === 'custom') {
          //自定义 回调
          fn()
        }
      })
    }
  }
  window.addEventListener('message', fn, false)
  return () => {
    window.removeEventListener('message', fn)
  }
}

const changeEchartsColor = (echartsInstance, fontColor, chartsType) => {
  let option = {
    ...echartsInstance.getOption()
  }
  window.echartsInstance = echartsInstance
  let { xAxis, yAxis, title, legend, calendar, angleAxis, radiusAxis } = option

  if (xAxis || yAxis) {
    xAxis = xAxis.map((item) => {
      item.axisLine.lineStyle.color = fontColor
      item.axisLabel.color = fontColor
      return item
    })

    yAxis = yAxis.map((item) => {
      item.axisLine.lineStyle.color = fontColor
      item.axisLabel.color = fontColor
      if (chartsType == 'yAxis-splitLine') {
        item.splitLine.lineStyle.color = fontColor
      }
      return item
    })

    option = {
      ...option,
      xAxis,
      yAxis
    }
  }

  if (angleAxis || radiusAxis) {
    angleAxis = angleAxis.map((item) => {
      item.data.map((d) => {
        if (!d.textStyle) return
        d.textStyle.color = fontColor
      })
      return item
    })

    radiusAxis = radiusAxis.map((item) => {
      item.axisLine.lineStyle.color = fontColor
      return item
    })

    option = {
      ...option,
      angleAxis,
      radiusAxis
    }
  }

  if (legend) {
    legend = legend.map((item) => {
      item.textStyle.color = fontColor
      if (item.pageTextStyle) {
        item.pageTextStyle.color = fontColor
      }
      return item
    })

    option = {
      ...option,
      legend
    }
  }

  if (title && title.length) {
    title = title.map((item) => {
      item.textStyle.color = fontColor
      item.subtextStyle.color = fontColor
      return item
    })
    option = {
      ...option,
      title
    }
  }

  if (calendar && calendar.length) {
    calendar = calendar.map((item) => {
      item.dayLabel.color = fontColor
      return item
    })
    option = {
      ...option,
      calendar
    }
  }

  echartsInstance.setOption(option, true)
}
//判断风向 风速========================开始
const windSpeedRange = [
  0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7, 37, 42, 46,
  52, 60, 70
]

const windDirectionRange = [45, 90, 135, 180, 225, 270, 315]

const windDirectionDescription = [
  '南风',
  '东南风',
  '东风',
  '东北风',
  '北风',
  '西北风',
  '西风',
  '西南风'
]

const findRangeIndexByValue = (value, range) => {
  if (value < 0) return -1
  if (value > Math.max.apply(null, range)) {
    return range.length
  }
  for (var i = 0; i < range.length; i++) {
    if (range[i] > value) {
      return i
    }
  }
  return 0
}

const getWindspeedNew = (speed) => {
  const index = findRangeIndexByValue(speed, windSpeedRange)
  return index === -1 ? '暂无' : `${index}`
}

const getWindDirectionNew = (driection) => {
  const index = findRangeIndexByValue(driection, windDirectionRange)
  return index === -1 ? '暂无' : windDirectionDescription[index]
}
//标准站的风向
const getWindDirection_station = (driection) => {
  let windDirectionRange_station = [45, 135, 225, 315]
  let windDirectionDescription_station = [
    '北风',
    '东风',
    '南风',
    '西风',
    '北风'
  ]

  const index = findRangeIndexByValue(driection, windDirectionRange_station)
  return index === -1 ? '暂无' : windDirectionDescription_station[index]
}
//求风力
const findWindGrade = (value) => {
  let speed = getWindspeedNew(value)
  let windGradeRange = [1, 2, 3, 4, 5, 6, 7, 8]

  if (speed > Math.max.apply(null, windGradeRange)) {
    return 8
  }

  for (var i = 0; i < windGradeRange.length; i++) {
    if (windGradeRange[i] >= speed) {
      return windGradeRange[i]
    }
  }

  return 1
}

// 墨迹天气气象要素数据等级
const weatherTypeToRange = {
  air_temperature: [0, 8, 16, 24, 32],
  precipitation: [4, 12, 20, 29, 37, 45],
  relative_humidity: [20, 40, 60, 80, 100]
}

const findWeatherGrade = (value, type) => {
  const range = weatherTypeToRange[type]

  if (type == 'air_temperature') {
    if (value != '-') {
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
  } else {
    if (value >= 0) {
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
}
//判断风向 风速========================结束

/**  water layer helper starts just for no warning   */
/**
 * 根据污染值返回对应的颜色
 * @param {String} type 字符串类型的
 * @param {*} value
 * @returns {String} 颜色
 */
let getColorAndNumberLevel = (type, value) => {
  // let colors = ['#00FFFF','#00FFFF','#00EE00','#FFFF00','#FF9900','#FF0000'];
  var colors = [
    '#ccffff',
    '#00ccff',
    '#00ff00',
    '#FFFF00',
    '#FF9900',
    '#FF0000'
  ]
  let pollutionTypes = {
    level: [1, 2, 3, 4, 5, 6],
    3: [126, 175, 185, 195, 250],
    585: [126, 175, 185, 195, 250],
    4: [100, 100, 100, 100, 100],
    587: [100, 100, 100, 100, 100],
    // '5': [1000, 1500, 2650, 3800, 4600],
    5: [4600, 4600, 4600, 4600, 4600],
    706: [4600, 4600, 4600, 4600, 4600],
    6: [500, 1000, 2000, 3000, 4000],
    593: [500, 1000, 2000, 3000, 4000],
    84: [500, 1000, 2000, 3000, 4000],
    7: [7.5, 6, 5, 3, 2],
    100: [7.5, 6, 5, 3, 2],
    8: [15, 15, 20, 30, 40],
    9: [0.15, 0.5, 1, 1.5, 2],
    625: [0.15, 0.5, 1, 1.5, 2],
    10: [0.2, 0.5, 1, 1, 5, 2],
    1000: [0.2, 0.5, 1, 1, 5, 2],
    11: [0.02, 0.1, 0.2, 0.3, 0.4],
    12: [2, 4, 6, 10, 15],
    101: [2, 4, 6, 10, 15],
    17: [3, 3.5, 4, 6, 10]
  }
  let colorNum
  let level = 0
  if (pollutionTypes[type]) {
    let types = pollutionTypes[type]
    for (let k = 0; k < types.length; k++) {
      let tValues = value == '-99.00' || value == '--' || !value ? 0 : value
      if (tValues == 0) {
        level = 0
        break
      }
      if (type != '7' && type != '100') {
        if (tValues <= types[k]) {
          level = k + 1
          break
        } else {
          level = 6
        }
      } else {
        if (tValues >= types[k]) {
          level = k + 1
          break
        } else {
          level = 6
        }
      }
    }
    colorNum = level == 0 ? 0 : level - 1
  } else {
    colorNum = 0
    level = 1
  }
  return {
    level: level,
    color: colors[colorNum]
  }
}

/**
 *
 * @param {Number || String} param
 * @returns 罗马等级类型
 */
let getLevel = (param) => {
  let tmpLevel
  let tmpParam = Number(param)
  switch (tmpParam) {
    case 0:
      tmpLevel = '--'
      break
    case -99:
      tmpLevel = '--'
      break
    case 1:
      tmpLevel = 'Ⅰ'
      break
    case 2:
      tmpLevel = 'Ⅱ'
      break
    case 3:
      tmpLevel = 'Ⅲ'
      break
    case 4:
      tmpLevel = 'Ⅳ'
      break
    case 5:
      tmpLevel = 'V'
      break
    default:
      tmpLevel = '劣V'
      break
  }
  return tmpLevel
}

/**
 * 水项目的接口封装
 * @param {Object} param
 * @returns 传进来参数，返回封装好的接口请求
 */
let getWaterParams = (param) => {
  let obj = {
    header: {
      agent: '',
      device: '',
      ext: '0',
      locale: 'CN',
      platform: '',
      version: '1.0'
    },
    parameter: {}
  }
  for (var key in param) {
    obj['parameter'][key] = param[key]
  }
  return obj
}

/**  water layer helper end just for no warning   */

const checkType = (obj) => {
  const type = Object.prototype.toString.call(obj)
  return type.slice(8, -1)
}

/**
 * 输入数字转罗马数字
 * @param {Number || String} num
 * @returns {String} roman  返回字符串格式的罗马数字
 */
const getIntToRoman = (num) => {
  const value = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ]
  const roman = []
  let nums = Number(num)
  for (const [val, symbol] of value) {
    while (nums >= val) {
      // 找到不超过 nums 的最大符号值
      nums -= val // 找到 nums 的最大符号值减去
      roman.push(symbol) // 最大符号放在 roman 中
    }
    if (nums === 0) {
      // 直到 nums 被减到 0
      break
    }
  }
  return roman.join('')
}

/**
 * 求最大值、最小值、平均值
 * @param {Array} array 传入一个数组，包含一堆的数字
 * @returns {Array} 返回 [平均值，最大值，最小值]
 */
const getAverageMaxMinNum = (array) => {
  if (!!array && array.length !== 0) {
    const average = array.reduce((tmp, item, index) => {
      if (index !== array.length - 1) return tmp + item
      return (tmp + item) / array.length
    })
    const max = Math.max(...array)
    const min = Math.min(...array)
    return [average, max, min]
  }
}

/**
 * 分列表格
 * @param {Array} columns 基础表头
 * @param {Array} dataSource 基础 dataSource
 * @param {Number} rowNum 分列的数据
 * @returns {Array[][]} [newColumns, newDataSource]
 */
const getAnyRowTable = (columns, dataSource, rowNum) => {
  const itemArr = new Array(columns.length)
  // 处理表头
  const retColumns = new Array(rowNum)
    .fill('')
    .map((_, i) => {
      return columns.map((item, index) => {
        itemArr[index] = item.dataIndex // 保存表头的每一项
        return {
          ...item,
          dataIndex: `${item.dataIndex}${i}`,
          key: `${item.key}${i}`
        }
      })
    })
    .flat(1)
  // 处理数据
  if (!dataSource.length) return [retColumns, []]
  let obj = null
  const result = new Array()
  dataSource.map((item, i) => {
    if (i % rowNum === 0) {
      obj = new Object()
      obj.key = `${i}`
    }
    itemArr.map((it) => (obj[`${it}${i % rowNum}`] = item[it]))
    if (i % rowNum === rowNum - 1 || i === dataSource.length - 1)
      result.push(obj)
  })
  return [retColumns, result]
}

export {
  getParamter,
  getParamterByUrl,
  isImageFun,
  getRootPath,
  bubbleAutoClose,
  judgeValue,
  finds,
  getNum,
  getStr,
  getColor,
  judgeTime,
  $Axios,
  getLastDay,
  getToken,
  downloadExcel,
  downloadComplexExcel,
  getWindspeed,
  getWindDirection,
  translate,
  getMergeStartAndEnd,
  changeThemeListener,
  deepClone,
  getWindspeedNew,
  getWindDirectionNew,
  findWindGrade,
  findWeatherGrade,
  getWindDirection_station,
  getColorAndNumberLevel,
  getLevel,
  getWaterParams,
  checkType,
  getIntToRoman,
  getAverageMaxMinNum,
  getAnyRowTable,
  getcolswidth,
  viewData
}
