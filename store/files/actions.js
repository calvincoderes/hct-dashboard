import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Files: {
    FETCH: `${endpoint}/files/`,
    RETRIEVE: `${endpoint}/files/%s/`,
    CREATE: `${endpoint}/files/`,
    UPDATE: `${endpoint}/files/%s/`,
    DELETE: `${endpoint}/files/%s/`
  }
}

// ACTIONS
export default {
  fetchFiles ({ commit }, params = []) {
    commit('setFetchedFiles', { status: 'PENDING' })
    return this.$axios.get(API.Files.FETCH, { params })
      .then((res) => {
        commit('setFetchedFiles', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedFiles', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveFile ({ commit }, { id, params = {} }) {
    commit('setRetrievedFile', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Files.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedFile', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedFile', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createFile ({ commit }, data = {}) {
    commit('setCreatedFile', { status: 'PENDING' })
    return this.$axios.post(API.Files.CREATE, data)
      .then((res) => {
        commit('setCreatedFile', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedFile', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateFile ({ commit }, { id, data = {} }) {
    commit('setUpdatedFile', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Files.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedFile', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedFile', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteFile ({ commit }, { id, params = {} }) {
    commit('setDeletedFile', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Files.DELETE, id), params)
      .then((res) => {
        commit('setDeletedFile', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedFile', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
