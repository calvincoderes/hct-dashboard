const rp = require('request-promise')
const { flat } = require('./Flat')

// Create Success Format Handler
exports.successHandler = (response) => {
  return {
    statusCode: 200,
    statusMessage: 'OK',
    data: response
  }
}

// Re-format the error responses (based on request-promise package)
exports.errorHandler = (error, url) => {
  if (typeof error.response !== 'undefined') {
    console.log('HTTP_' + error.response.statusCode, { url })
    let statusMessage = error.response.statusMessage
    if (error.response.statusCode === 0) {
      if ('StatusCode' in error.response.body) {
        Object.assign(error.response, {
          statusCode: error.response.body.StatusCode
        })
        if ('StatusMessage' in error.response.body) {
          statusMessage = error.response.body.StatusMessage
        }
      }
    }
    return {
      statusCode: error.response.statusCode,
      statusMessage,
      data: error.response.body
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('HTTP ' + error.message, { url })
    return {
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: error.message
    }
  }
}

// API Call Helper
exports.callApi = (config, noRequestId = false) => {
  // If Has Request FormData
  if (typeof config.formData !== 'undefined') {
    config.formData = flat(config.formData)
  }

  Object.assign(config, {
    forever: true,
    pool: { maxSockets: 3 }
  })

  // API Call
  return rp(config)
    .then((response) => {
      console.log(config.url, 'SUCCESSFUL API CONNECTION')
      return module.exports.successHandler(response)
    })
    .catch((error) => {
      // Added To Log All API Calls
      const errorResponse = module.exports.errorHandler(error, config.url)
      console.log(config.url, 'FAILED API CONNECTION', errorResponse)
      return errorResponse
    })
}

// External API Call Helper
exports.callExternalApi = (config) => {
  const method = config.method || 'POST'

  config.method = method

  // API Call
  return rp(config)
    .then((response) => {
      return module.exports.successHandler(response)
    })
    .catch(error => module.exports.errorHandler(error, config.url || config.uri))
}
