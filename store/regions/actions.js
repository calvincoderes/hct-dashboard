import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Regions: {
    FETCH: `${endpoint}/zones/`,
    RETRIEVE: `${endpoint}/zones/%s/`,
    CREATE: `${endpoint}/zones/`,
    UPDATE: `${endpoint}/zones/%s/`,
    DELETE: `${endpoint}/zones/%s/`
  }
}

// ACTIONS
export default {
  fetchRegions ({ commit }, params = []) {
    commit('setFetchedRegions', { status: 'PENDING' })
    return this.$axios.get(API.Regions.FETCH, { params })
      .then((res) => {
        commit('setFetchedRegions', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedRegions', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveRegion ({ commit }, { id, params = {} }) {
    commit('setRetrievedRegion', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Regions.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedRegion', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedRegion', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createRegion ({ commit }, data = {}) {
    commit('setCreatedRegion', { status: 'PENDING' })
    return this.$axios.post(API.Regions.CREATE, data)
      .then((res) => {
        commit('setCreatedRegion', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedRegion', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateRegion ({ commit }, { id, data = {} }) {
    commit('setUpdatedRegion', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Regions.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedRegion', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedRegion', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteRegion ({ commit }, { id, params = {} }) {
    commit('setDeletedRegion', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Regions.DELETE, id), params)
      .then((res) => {
        commit('setDeletedRegion', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedRegion', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
