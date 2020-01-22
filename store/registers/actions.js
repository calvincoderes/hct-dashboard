// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Registers: {
    CREATE: `${endpoint}/register/assistant/`,
    ACTIVATE_ACCOUNT: `${endpoint}/activate/`
  }
}

// ACTIONS
export default {
  createRegister ({ commit }, data = {}) {
    commit('setCreatedRegister', { status: 'PENDING' })
    return this.$axios.post(API.Registers.CREATE, data)
      .then((res) => {
        commit('setCreatedRegister', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedRegister', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createActivate ({ commit }, data = {}) {
    commit('setCreatedActivate', { status: 'PENDING' })
    return this.$axios.post(API.Registers.ACTIVATE_ACCOUNT, data)
      .then((res) => {
        commit('setCreatedActivate', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedActivate', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  }
}
