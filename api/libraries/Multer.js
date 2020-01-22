const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const { generateTimedFileName } = require('./File')

// Configure AWS
AWS.config.update({
  endpoint: process.env.S3_ENDPOINT,
  s3BucketEndpoint: process.env.S3_BUCKET_ENDPOINT_ENABLE,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION
})

// S3 Initialilization
const s3 = new AWS.S3()

/**
 * Multer Fields from form
 * @param {*} fields (array/object)
 */
exports.multerFields = (fields) => {
  fields = fields || []
  return multer().fields(fields)
}

/**
 *  For Multer Upload (File System Upload)
 * @param {*} options (array/object)
 */
exports.multerUploads = (options) => {
  options = {
    fileDestination: path.join(__dirname, '../tmp'),
    filePrefix: Date.now()
  }

  return multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, options.fileDestination)
      },
      filename(req, file, cb) {
        if (options.filePrefix) {
          cb(null, options.filePrefix + '-' + file.originalname)
        } else {
          cb(null, file.originalname)
        }
      }
    })
  })
}

/**
 * For Multer Upload (S3 Upload)
 * @param {*} options (array/object)
 */
exports.multerS3Uploads = (override) => {
  const options = Object.assign(
    {
      bucket: null,
      metadata: null,
      key: null,
      contentType: null,
      acl: null
    },
    override
  )

  return multer({
    storage: multerS3({
      s3: s3,
      bucket: options.bucket || process.env.S3_BUCKET,
      acl: options.acl || 'public-read',
      contentType: options.contentType || multerS3.AUTO_CONTENT_TYPE,
      metadata:
        options.metadata ||
        function (req, file, cb) {
          cb(null, { fieldName: file.fieldname })
        },
      key:
        options.key ||
        function (req, file, cb) {
          cb(null, generateTimedFileName(file.originalname, file.mimetype))
        }
    })
  })
}
