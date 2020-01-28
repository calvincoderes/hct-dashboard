import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Locations: {
    FETCH: `${endpoint}/locations/`,
    RETRIEVE: `${endpoint}/locations/%s/`,
    CREATE: `${endpoint}/locations/`,
    UPDATE: `${endpoint}/locations/%s/`,
    DELETE: `${endpoint}/locations/%s/`
  }
}

// ACTIONS
export default {
  fetchLocations ({ commit }, params = []) {
    commit('setFetchedLocations', { status: 'PENDING' })
    return this.$axios.get(API.Locations.FETCH, { params })
      .then((res) => {
        commit('setFetchedLocations', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedLocations', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveLocation ({ commit }, { id, params = {} }) {
    commit('setRetrievedLocation', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Locations.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedLocation', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedLocation', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createLocation ({ commit }, data = {}) {
    commit('setCreatedLocation', { status: 'PENDING' })
    return this.$axios.post(API.Locations.CREATE, data)
      .then((res) => {
        commit('setCreatedLocation', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedLocation', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateLocation ({ commit }, { id, data = {} }) {
    commit('setUpdatedLocation', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Locations.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedLocation', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedLocation', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteLocation ({ commit }, { id, params = {} }) {
    commit('setDeletedLocation', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Locations.DELETE, id), params)
      .then((res) => {
        commit('setDeletedLocation', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedLocation', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
