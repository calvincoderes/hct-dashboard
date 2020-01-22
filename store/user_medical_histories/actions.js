import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  UserMedicalHistories: {
    FETCH: `${endpoint}/assistant/user_medical_history/`,
    RETRIEVE: `${endpoint}/assistant/user_medical_history/%s/`,
    CREATE: `${endpoint}/assistant/user_medical_history/`,
    UPDATE: `${endpoint}/assistant/user_medical_history/%s/`,
    DELETE: `${endpoint}/assistant/user_medical_history/%s/`
  }
}

// ACTIONS
export default {
  fetchUserMedicalHistories ({ commit }, params = []) {
    commit('setFetchedUserMedicalHistories', { status: 'PENDING' })
    return this.$axios.get(API.UserMedicalHistories.FETCH, { params })
      .then((res) => {
        commit('setFetchedUserMedicalHistories', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedUserMedicalHistories', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveUserMedicalHistory ({ commit }, { id, params = {} }) {
    commit('setRetrievedUserMedicalHistory', { status: 'PENDING' })
    return this.$axios.get(util.format(API.UserMedicalHistories.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedUserMedicalHistory', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedUserMedicalHistory', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createUserMedicalHistory ({ commit }, data = {}) {
    commit('setCreatedUserMedicalHistory', { status: 'PENDING' })
    return this.$axios.post(API.UserMedicalHistories.CREATE, data)
      .then((res) => {
        commit('setCreatedUserMedicalHistory', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedUserMedicalHistory', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateUserMedicalHistory ({ commit }, { id, data = {} }) {
    commit('setUpdatedUserMedicalHistory', { status: 'PENDING' })
    return this.$axios.put(util.format(API.UserMedicalHistories.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedUserMedicalHistory', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedUserMedicalHistory', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteUserMedicalHistory ({ commit }, { id, params = {} }) {
    commit('setDeletedUserMedicalHistory', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.UserMedicalHistories.DELETE, id), params)
      .then((res) => {
        commit('setDeletedUserMedicalHistory', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedUserMedicalHistory', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
