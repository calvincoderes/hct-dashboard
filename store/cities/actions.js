import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Cities: {
    FETCH: `${endpoint}/cities/`,
    RETRIEVE: `${endpoint}/cities/%s/`,
    CREATE: `${endpoint}/cities/`,
    UPDATE: `${endpoint}/cities/%s/`,
    DELETE: `${endpoint}/cities/%s/`
  }
}

// ACTIONS
export default {
  fetchCities ({ commit }, params = []) {
    commit('setFetchedCities', { status: 'PENDING' })
    return this.$axios.get(API.Cities.FETCH, { params })
      .then((res) => {
        commit('setFetchedCities', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedCities', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveCity ({ commit }, { id, params = {} }) {
    commit('setRetrievedCity', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Cities.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedCity', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedCity', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createCity ({ commit }, data = {}) {
    commit('setCreatedCity', { status: 'PENDING' })
    return this.$axios.post(API.Cities.CREATE, data)
      .then((res) => {
        commit('setCreatedCity', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedCity', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateCity ({ commit }, { id, data = {} }) {
    commit('setUpdatedCity', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Cities.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedCity', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedCity', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteCity ({ commit }, { id, params = {} }) {
    commit('setDeletedCity', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Cities.DELETE, id), params)
      .then((res) => {
        commit('setDeletedCity', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedCity', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
