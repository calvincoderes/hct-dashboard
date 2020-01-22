const path = require('path')

// FILE EXTENSIONS
exports.FILE_MIME_TYPE_GIF = 'image/gif'
exports.FILE_MIME_TYPE_PNG = 'image/png'
exports.FILE_MIME_TYPE_JPG = 'image/jpeg'
exports.FILE_MIME_TYPE_BMP = 'image/bmp'
exports.FILE_MIME_TYPE_WEBP = 'image/webp'

exports.IMAGE_MIME_TYPES = [
  'image/gif',
  'image/png',
  'image/jpeg',
  'image/bmp',
  'image/webp'
]

const mimeExtensions = {}
mimeExtensions[module.exports.FILE_MIME_TYPE_GIF] = 'gif'
mimeExtensions[module.exports.FILE_MIME_TYPE_PNG] = 'png'
mimeExtensions[module.exports.FILE_MIME_TYPE_JPG] = 'jpg'
mimeExtensions[module.exports.FILE_MIME_TYPE_BMP] = 'bmp'
mimeExtensions[module.exports.FILE_MIME_TYPE_WEBP] = 'webp'
exports.MIME_EXTENSIONS = mimeExtensions

exports.sanitizeFilename = (filename) => {
  return filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase()
}

exports.getFileExtension = (mimetype) => {
  const extension = module.exports.MIME_EXTENSIONS[mimetype]

  if (typeof extension !== 'undefined') {
    return extension
  }

  return false
}

exports.generateTimedFileName = (filename, mimetype) => {
  const time = new Date().getTime()
  let file = module.exports.sanitizeFilename(filename)

  if (path.extname(filename) === '') {
    const extension = module.exports.getFileExtension(mimetype)
    file = file + '.' + extension
  }

  return time + '-' + file
}
