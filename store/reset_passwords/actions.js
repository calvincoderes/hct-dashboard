// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  ResetPasswords: {
    REQUEST_OTP: `${endpoint}/request_otp/`,
    VERIFY_OTP: `${endpoint}/verify_otp/`,
    FORGOT_PASSWORD: `${endpoint}/verify_otp/`,
  }
}

// ACTIONS
export default {
  createRequestOTP ({ commit }, data = {}) {
    commit('setCreatedRequestOTP', { status: 'PENDING' })
    return this.$axios.post(API.ResetPasswords.REQUEST_OTP, data)
      .then((res) => {
        commit('setCreatedRequestOTP', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedRequestOTP', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createVerifyOTP ({ commit }, data = {}) {
    commit('setCreatedVerifyOTP', { status: 'PENDING' })
    return this.$axios.post(API.ResetPasswords.VERIFY_OTP, data)
      .then((res) => {
        commit('setCreatedVerifyOTP', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedVerifyOTP', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createForgotPassword ({ commit }, data = {}) {
    commit('setCreatedForgotPassword', { status: 'PENDING' })
    return this.$axios.post(API.ResetPasswords.FORGOT_PASSWORD, data)
      .then((res) => {
        commit('setCreatedForgotPassword', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedForgotPassword', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  }
}
