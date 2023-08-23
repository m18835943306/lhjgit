/**
 * 返回文件后缀名
 * @param {*} src
 * @returns
 */
const getExtension = (src) => {
  return src && src.substring(src.lastIndexOf('.') + 1).toLowerCase()
}

/**
 * 获取图片的 base64 编码
 * @param image 图像对象
 * @return {string} 返回已编码的 base64数据
 */
const getImageBase64 = (image) => {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, image.width, image.height)
  // 获取图片后缀名
  const extension = getExtension(image.src)
  // 某些图片 url 可能没有后缀名，默认是 png
  return canvas.toDataURL('image/' + extension, 1)
}

export const useDownload = () => {
  /**
   * 单张图片下载
   * @param url 图像链接
   * @param downloadName 图片名称
   */
  const downloadIMG = (url, downloadName) => {
    if (!url) {
      console.warn('url is required')
      return
    }
    const link = document.createElement('a')
    link.setAttribute('download', downloadName)
    const image = new Image()
    // 添加时间戳，防止浏览器缓存图片
    image.src = url + '?timestamp=' + new Date().getTime()
    // 设置 crossOrigin 属性，解决图片跨域报错
    image.setAttribute('crossOrigin', 'Anonymous')
    image.onload = () => {
      link.href = getImageBase64(image)
      link.click()
    }
  }

  function downloadGIF(src, fileName) {
    if (!src) return
    // 设置response-content-type=application/octet-stream 告诉浏览器无法解析，进行下载
    const url = src + '?response-content-type=application/octet-stream'
    const $a = document.createElement('a')
    $a.setAttribute('href', url)
    // 同源才会生效
    $a.setAttribute('download', `${fileName}.${getExtension(src)}`)
    $a.click()
  }
  return {
    downloadIMG,
    downloadGIF
  }
}
