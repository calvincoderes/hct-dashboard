import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Images: {
    FETCH: `${endpoint}/images/`,
    RETRIEVE: `${endpoint}/images/%s/`,
    CREATE: `${endpoint}/images/`,
    UPDATE: `${endpoint}/images/%s/`,
    DELETE: `${endpoint}/images/%s/`
  }
}

// ACTIONS
export default {
  fetchImages ({ commit }, params = []) {
    commit('setFetchedImages', { status: 'PENDING' })
    return this.$axios.get(API.Images.FETCH, { params })
      .then((res) => {
        commit('setFetchedImages', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedImages', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveImage ({ commit }, { id, params = {} }) {
    commit('setRetrievedImage', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Images.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedImage', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedImage', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createImage ({ commit }, data = {}) {
    commit('setCreatedImage', { status: 'PENDING' })
    return this.$axios.post(API.Images.CREATE, data)
      .then((res) => {
        commit('setCreatedImage', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedImage', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateImage ({ commit }, { id, data = {} }) {
    commit('setUpdatedImage', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Images.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedImage', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedImage', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteImage ({ commit }, { id, params = {} }) {
    commit('setDeletedImage', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Images.DELETE, id), params)
      .then((res) => {
        commit('setDeletedImage', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedImage', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
