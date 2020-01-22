// Endpoint
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Auth: {
    POST_LOGIN: '/auth/login',
    POST_LOGOUT: '/auth/logout',
  },
  UserVerification: {
    POST_VERIFY: `${endpoint}/user_verification/`
  },
  UserPasswordCreate: {
    POST: `${endpoint}/user_password/`
  }
}

// ACTIONS
export default {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.auth) {
      commit('setAuth', req.session.auth)
    }
  },
  postLogin ({ commit }, data = {}) {
    return this.$axios.post(API.Auth.POST_LOGIN, data)
      .then((res) => {
        commit('setAuth', res.data)
      })
      .catch((e) => {
        commit('setAuth', null)
      })
  },
  postLogout ({ commit }, data = {}) {
    commit('setLogout', false)
    return this.$axios.post(API.Auth.POST_LOGOUT, data)
      .then((res) => {
        commit('setAuth', null)
        commit('setLogout', true)
      })
      .catch((e) => {
        commit('setAuth', null)
        commit('setLogout', true)
      })
  },
  userVerify ({ commit }, token) {
    return this.$axios.post(API.UserVerification.POST_VERIFY, token)
      .then((res) => {
        commit('setUserVerify', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUserVerify', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  changePassword ({ commit }, data) {
    return this.$axios.post(API.UserPasswordCreate.POST, data)
      .then((res) => {
        commit('setChangePassword', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setChangePassword', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  }
}
