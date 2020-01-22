import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  ServiceProviders: {
    FETCH: `${endpoint}/assistant/providers/`,
    RETRIEVE: `${endpoint}/assistant/providers/%s/`,
    CREATE: `${endpoint}/assistant/providers/`,
    UPDATE: `${endpoint}/assistant/providers/%s/`,
    DELETE: `${endpoint}/assistant/providers/%s/`
  }
}

// ACTIONS
export default {
  fetchServiceProviders ({ commit }, params = []) {
    let mutation = 'setFetchedServiceProviders'
    if (typeof params.mutation !== 'undefined' && params.mutation) {
      mutation = params.mutation
      delete params.mutation
    }

    commit(mutation, { status: 'PENDING' })
    return this.$axios.get(API.ServiceProviders.FETCH, { params })
      .then((res) => {
        commit(mutation, {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit(mutation, {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveServiceProvider ({ commit }, { id, params = {} }) {
    commit('setRetrievedServiceProvider', { status: 'PENDING' })
    return this.$axios.get(util.format(API.ServiceProviders.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedServiceProvider', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedServiceProvider', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createServiceProvider ({ commit }, data = {}) {
    commit('setCreatedServiceProvider', { status: 'PENDING' })
    return this.$axios.post(API.ServiceProviders.CREATE, data)
      .then((res) => {
        commit('setCreatedServiceProvider', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedServiceProvider', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateServiceProvider ({ commit }, { id, data = {} }) {
    commit('setUpdatedServiceProvider', { status: 'PENDING' })
    return this.$axios.put(util.format(API.ServiceProviders.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedServiceProvider', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedServiceProvider', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteServiceProvider ({ commit }, { id, params = {} }) {
    commit('setDeletedServiceProvider', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.ServiceProviders.DELETE, id), params)
      .then((res) => {
        commit('setDeletedServiceProvider', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedServiceProvider', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
