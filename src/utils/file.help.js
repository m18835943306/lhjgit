// base64(URL)转File对象
export const dataURLtoFile = (dataurl, filename = 'file') => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const ext = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${ext}`, {
    type: mime
  })
}

// base64(URL)转Blob对象
export const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const ext = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}

// base64(URL)转可读的URL
export const dataURLtoURL = (dataurl) => {
  const blob = dataURLtoBlob(dataurl)
  return window.URL.createObjectURL(blob)
}

// File转base64(URL)
export const FiletoDataURL = (file) => {
  return new Promise((resolve) => {
    if (file instanceof File) {
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onloadend = () => {
        resolve(fr.result)
      }
    }
  })
}

/**
 *
 * @param {url or dataurl} url
 * @param {string} downloadName
 * @param {image or base64} type
 * @returns
 */
export const downloadIMG = (url, downloadName = 'download', type = 'image') => {
  if (!url) {
    console.warn('url is required')
    return
  }
  if (type === 'base64') {
    url = dataURLtoURL(url)
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', name)
    a.setAttribute('target', '_blank')
    let clickEvent = document.createEvent('MouseEvents')
    clickEvent.initEvent('click', true, true)
    a.dispatchEvent(clickEvent)
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
