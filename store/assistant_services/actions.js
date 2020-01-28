import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  AssistantServices: {
    FETCH: `${endpoint}/user/services/`,
    RETRIEVE: `${endpoint}/user/services/%s/`,
    CREATE: `${endpoint}/assistant/services/`,
    UPDATE: `${endpoint}/assistant/services/%s/`,
    DELETE: `${endpoint}/assistant/services/%s/`
  }
}

// ACTIONS
export default {
  fetchAssistantServices ({ commit }, params = []) {
    commit('setFetchedAssistantServices', { status: 'PENDING' })
    return this.$axios.get(API.AssistantServices.FETCH, { params })
      .then((res) => {
        commit('setFetchedAssistantServices', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedAssistantServices', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveAssistantService ({ commit }, { id, params = {} }) {
    commit('setRetrievedAssistantService', { status: 'PENDING' })
    return this.$axios.get(util.format(API.AssistantServices.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedAssistantService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedAssistantService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createAssistantService ({ commit }, data = {}) {
    commit('setCreatedAssistantService', { status: 'PENDING' })
    return this.$axios.post(API.AssistantServices.CREATE, data)
      .then((res) => {
        commit('setCreatedAssistantService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedAssistantService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateAssistantService ({ commit }, { id, data = {} }) {
    commit('setUpdatedAssistantService', { status: 'PENDING' })
    return this.$axios.put(util.format(API.AssistantServices.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedAssistantService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedAssistantService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteAssistantService ({ commit }, { id, params = {} }) {
    commit('setDeletedAssistantService', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.AssistantServices.DELETE, id), params)
      .then((res) => {
        commit('setDeletedAssistantService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedAssistantService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
