//####copyright @ysrd ###

import { message } from 'antd'

function randomString(len) {
  if (!len) {
    len = 32
  }
  var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'
  var size = $chars.length
  var str = ''
  for (var i = 0; i < size; i++) {
    str += $chars.charAt(Math.floor(Math.random() * size))
  }
  return str
}

/**
 * localstorage set
 * @param key
 * @param data
 */
function setDataToLocalStorage(key, data) {
  if (window.localStorage) {
    window.localStorage.setItem(key, data)
  } else {
    console.log('not support')
  }
}

/**
 * localstorage get
 * @param key
 * @returns
 */
function getDataFromLocalStorage(key) {
  if (window.localStorage) {
    return window.localStorage.getItem(key)
  } else {
    console.log('not support')
    return null
  }
}

function getParameter(param) {
  var re = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  var result = window.location.search.substr(1).match(re)
  return result == null ? null : unescape(result[2])
}

function bubbleAutoClose(msg, fn, seconds = 2) {
  message.info(msg, seconds, fn)
}

/**
 * '_'或'-'连接的字符串转大驼峰
 * 字符串首字母大写
 */
function toPascalCase(string) {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), '')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(new RegExp(/\w/), (s) => s.toUpperCase())
}
/* @description:计算生成k线图
 ** @param {Array} a: 原始数据 {Array} b: 环比同比正负数据
 */
function calculateArray(a, b) {
  if (!a) return
  const n = a?.length
  const c = []

  for (let i = 0; i < n; i++) {
    const newArray = []
    if (b[i] === 0) {
      newArray.push(a[i], a[i], a[i], a[i])
    } else if (b[i] > 0) {
      newArray.push(a[i] + b[i], a[i], a[i], a[i])
    } else {
      newArray.push(a[i], a[i] + b[i], a[i], a[i])
    }
    c.push(newArray)
  }

  return c
}

export {
  randomString,
  setDataToLocalStorage,
  getDataFromLocalStorage,
  getParameter,
  bubbleAutoClose,
  toPascalCase,
  calculateArray
}
