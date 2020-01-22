import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  MedicalConditions: {
    FETCH: `${endpoint}/medical_conditions/`,
    RETRIEVE: `${endpoint}/medical_conditions/%s/`,
    CREATE: `${endpoint}/medical_conditions/`,
    UPDATE: `${endpoint}/medical_conditions/%s/`,
    DELETE: `${endpoint}/medical_conditions/%s/`
  }
}

// ACTIONS
export default {
  fetchMedicalConditions ({ commit }, params = []) {
    commit('setFetchedMedicalConditions', { status: 'PENDING' })
    return this.$axios.get(API.MedicalConditions.FETCH, { params })
      .then((res) => {
        commit('setFetchedMedicalConditions', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedMedicalConditions', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrieveMedicalCondition ({ commit }, { id, params = {} }) {
    commit('setRetrievedMedicalCondition', { status: 'PENDING' })
    return this.$axios.get(util.format(API.MedicalConditions.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedMedicalCondition', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedMedicalCondition', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createMedicalCondition ({ commit }, data = {}) {
    commit('setCreatedMedicalCondition', { status: 'PENDING' })
    return this.$axios.post(API.MedicalConditions.CREATE, data)
      .then((res) => {
        commit('setCreatedMedicalCondition', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedMedicalCondition', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateMedicalCondition ({ commit }, { id, data = {} }) {
    commit('setUpdatedMedicalCondition', { status: 'PENDING' })
    return this.$axios.put(util.format(API.MedicalConditions.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedMedicalCondition', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedMedicalCondition', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteMedicalCondition ({ commit }, { id, params = {} }) {
    commit('setDeletedMedicalCondition', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.MedicalConditions.DELETE, id), params)
      .then((res) => {
        commit('setDeletedMedicalCondition', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedMedicalCondition', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
