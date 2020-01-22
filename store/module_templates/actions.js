import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  ModuleTemplates: {
    FETCH: `${endpoint}/tickets/`,
    RETRIEVE: `${endpoint}/tickets/%s/`,
    CREATE: `${endpoint}/tickets/`,
    UPDATE: `${endpoint}/tickets/%s/`,
    DELETE: `${endpoint}/tickets/%s/`
  }
}

// ACTIONS
export default {
  fetchModuleTemplates ({ commit }, params = []) {
    commit('setFetchedModuleTemplates', { status: 'PENDING' })
    return this.$axios.get(API.ModuleTemplates.FETCH, { params })
      .then((res) => {
        commit('setFetchedModuleTemplates', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedModuleTemplates', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveModuleTemplate ({ commit }, { id, params = {} }) {
    commit('setRetrievedModuleTemplate', { status: 'PENDING' })
    return this.$axios.get(util.format(API.ModuleTemplates.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedModuleTemplate', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedModuleTemplate', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createModuleTemplate ({ commit }, data = {}) {
    commit('setCreatedModuleTemplate', { status: 'PENDING' })
    return this.$axios.post(API.ModuleTemplates.CREATE, data)
      .then((res) => {
        commit('setCreatedModuleTemplate', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedModuleTemplate', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateModuleTemplate ({ commit }, { id, data = {} }) {
    commit('setUpdatedModuleTemplate', { status: 'PENDING' })
    return this.$axios.put(util.format(API.ModuleTemplates.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedModuleTemplate', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedModuleTemplate', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteModuleTemplate ({ commit }, { id, params = {} }) {
    commit('setDeletedModuleTemplate', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.ModuleTemplates.DELETE, id), params)
      .then((res) => {
        commit('setDeletedModuleTemplate', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedModuleTemplate', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
