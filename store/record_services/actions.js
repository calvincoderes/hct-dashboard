import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  RecordServices: {
    FETCH: `${endpoint}/assistant/services/`,
    RETRIEVE: `${endpoint}/assistant/services/%s/`,
    CREATE: `${endpoint}/assistant/services/`,
    UPDATE: `${endpoint}/assistant/services/%s/`,
    DELETE: `${endpoint}/assistant/services/%s/`
  }
}

// ACTIONS
export default {
  fetchRecordServices ({ commit }, params = []) {
    commit('setFetchedRecordServices', { status: 'PENDING' })
    return this.$axios.get(API.RecordServices.FETCH, { params })
      .then((res) => {
        commit('setFetchedRecordServices', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedRecordServices', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveRecordService ({ commit }, { id, params = {} }) {
    commit('setRetrievedRecordService', { status: 'PENDING' })
    return this.$axios.get(util.format(API.RecordServices.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedRecordService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedRecordService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createRecordService ({ commit }, data = {}) {
    commit('setCreatedRecordService', { status: 'PENDING' })
    return this.$axios.post(API.RecordServices.CREATE, data)
      .then((res) => {
        commit('setCreatedRecordService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedRecordService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateRecordService ({ commit }, { id, data = {} }) {
    commit('setUpdatedRecordService', { status: 'PENDING' })
    return this.$axios.put(util.format(API.RecordServices.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedRecordService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedRecordService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteRecordService ({ commit }, { id, params = {} }) {
    commit('setDeletedRecordService', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.RecordServices.DELETE, id), params)
      .then((res) => {
        commit('setDeletedRecordService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedRecordService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
