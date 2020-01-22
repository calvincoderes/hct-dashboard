import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Schedules: {
    FETCH: `${endpoint}/assistant/provider_schedules/`,
    RETRIEVE: `${endpoint}/assistant/provider_schedules/%s/`,
    CREATE: `${endpoint}/assistant/provider_schedules/`,
    UPDATE: `${endpoint}/assistant/provider_schedules/%s/`,
    DELETE: `${endpoint}/assistant/provider_schedules/%s/`
  }
}

// ACTIONS
export default {
  fetchSchedules ({ commit }, params = []) {
    commit('setFetchedSchedules', { status: 'PENDING' })
    return this.$axios.get(API.Schedules.FETCH, { params })
      .then((res) => {
        commit('setFetchedSchedules', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedSchedules', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveSchedule ({ commit }, { id, params = {} }) {
    commit('setRetrievedSchedule', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Schedules.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedSchedule', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedSchedule', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createSchedule ({ commit }, data = {}) {
    commit('setCreatedSchedule', { status: 'PENDING' })
    return this.$axios.post(API.Schedules.CREATE, data)
      .then((res) => {
        commit('setCreatedSchedule', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedSchedule', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateSchedule ({ commit }, { id, data = {} }) {
    commit('setUpdatedSchedule', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Schedules.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedSchedule', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedSchedule', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteSchedule ({ commit }, { id, params = {} }) {
    commit('setDeletedSchedule', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Schedules.DELETE, id), params)
      .then((res) => {
        commit('setDeletedSchedule', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedSchedule', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
