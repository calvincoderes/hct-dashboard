// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  MyProfiles: {
    RETRIEVE: `${endpoint}/me/`,
    UPDATE: `${endpoint}/me/`
  }
}

// ACTIONS
export default {
  retrieveMyProfile ({ commit }, params = []) {
    commit('setRetrievedMyProfile', { status: 'PENDING' })
    return this.$axios.get(API.MyProfiles.RETRIEVE, { params })
      .then((res) => {
        commit('setRetrievedMyProfile', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedMyProfile', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateMyProfile ({ commit }, data = {}) {
    commit('setUpdatedMyProfile', { status: 'PENDING' })
    return this.$axios.put(API.MyProfiles.UPDATE, data)
      .then((res) => {
        commit('setUpdatedMyProfile', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedMyProfile', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  }
}
