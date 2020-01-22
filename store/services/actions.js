import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Services: {
    FETCH: `${endpoint}/assistant/provider_services/`,
    RETRIEVE: `${endpoint}/assistant/provider_services/%s/`,
    CREATE: `${endpoint}/assistant/provider_services/`,
    UPDATE: `${endpoint}/assistant/provider_services/%s/`,
    DELETE: `${endpoint}/assistant/provider_services/%s/`
  }
}

// ACTIONS
export default {
  fetchServices ({ commit }, params = []) {
    commit('setFetchedServices', { status: 'PENDING' })
    return this.$axios.get(API.Services.FETCH, { params })
      .then((res) => {
        commit('setFetchedServices', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedServices', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveService ({ commit }, { id, params = {} }) {
    commit('setRetrievedService', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Services.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createService ({ commit }, data = {}) {
    commit('setCreatedService', { status: 'PENDING' })
    return this.$axios.post(API.Services.CREATE, data)
      .then((res) => {
        commit('setCreatedService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateService ({ commit }, { id, data = {} }) {
    commit('setUpdatedService', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Services.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteService ({ commit }, { id, params = {} }) {
    commit('setDeletedService', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Services.DELETE, id), params)
      .then((res) => {
        commit('setDeletedService', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedService', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
