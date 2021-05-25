/**
 * @name 图标压缩
 */

/**
 * @name 压缩图片
 * @description width和height必传其中之一
 * @param {Object} file 文件
 * @param {Number} width 宽度
 * @param {Number} height 高度
 * @return {String} base64
 */
async function compressImage(file, { width, height }, quality) {
  let fileReader = new FileReader()
  await new Promise(resolve => {
    fileReader.onload = resolve
    fileReader.readAsDataURL(file)
  })
  let base64 = fileReader.result

  let image = new Image()
  image.setAttribute('crossOrigin', 'Anonymous')
  await new Promise(resolve => {
    image.onload = resolve
    image.src = base64
  })

  let imageWidth = image.width
  let imageHeight = image.height

  let targetWidth = imageWidth
  let targetHeight = imageHeight
  if (width && width < imageWidth) {
    targetWidth = width
    targetHeight = targetWidth * (imageHeight / imageWidth)
  }
  if (height && height < imageHeight) {
    targetHeight = height
    targetWidth = targetHeight * (imageWidth / imageHeight)
  }

  image.width = targetWidth
  image.Height = targetHeight

  let canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  let context = canvas.getContext('2d')
  context.drawImage(image, 0, 0, targetWidth, targetHeight)
  let outputBase64 = canvas.toDataURL('image/png', quality)
  return outputBase64
}

export default compressImage
