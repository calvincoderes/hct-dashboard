import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Leaves: {
    FETCH: `${endpoint}/assistant/provider_leaves/`,
    RETRIEVE: `${endpoint}/assistant/provider_leaves/%s/`,
    CREATE: `${endpoint}/assistant/provider_leaves/`,
    UPDATE: `${endpoint}/assistant/provider_leaves/%s/`,
    DELETE: `${endpoint}/assistant/provider_leaves/%s/`
  }
}

// ACTIONS
export default {
  fetchLeaves ({ commit }, params = []) {
    commit('setFetchedLeaves', { status: 'PENDING' })
    return this.$axios.get(API.Leaves.FETCH, { params })
      .then((res) => {
        commit('setFetchedLeaves', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedLeaves', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveLeave ({ commit }, { id, params = {} }) {
    commit('setRetrievedLeave', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Leaves.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedLeave', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedLeave', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createLeave ({ commit }, data = {}) {
    commit('setCreatedLeave', { status: 'PENDING' })
    return this.$axios.post(API.Leaves.CREATE, data)
      .then((res) => {
        commit('setCreatedLeave', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedLeave', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateLeave ({ commit }, { id, data = {} }) {
    commit('setUpdatedLeave', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Leaves.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedLeave', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedLeave', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteLeave ({ commit }, { id, params = {} }) {
    commit('setDeletedLeave', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Leaves.DELETE, id), params)
      .then((res) => {
        commit('setDeletedLeave', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedLeave', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
