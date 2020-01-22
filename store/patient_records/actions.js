import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  PatientRecords: {
    FETCH: `${endpoint}/assistant/patients/`,
    RETRIEVE: `${endpoint}/assistant/patients/%s/`,
    CREATE: `${endpoint}/assistant/patients/`,
    UPDATE: `${endpoint}/assistant/patients/%s/`,
    DELETE: `${endpoint}/assistant/patients/%s/`
  }
}

// ACTIONS
export default {
  fetchPatientRecords ({ commit }, params = []) {
    commit('setFetchedPatientRecords', { status: 'PENDING' })
    return this.$axios.get(API.PatientRecords.FETCH, { params })
      .then((res) => {
        commit('setFetchedPatientRecords', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setFetchedPatientRecords', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  retrievePatientRecord ({ commit }, { id, params = {} }) {
    commit('setRetrievedPatientRecord', { status: 'PENDING' })
    return this.$axios.get(util.format(API.PatientRecords.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedPatientRecord', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedPatientRecord', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createPatientRecord ({ commit }, data = {}) {
    commit('setCreatedPatientRecord', { status: 'PENDING' })
    return this.$axios.post(API.PatientRecords.CREATE, data)
      .then((res) => {
        commit('setCreatedPatientRecord', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedPatientRecord', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updatePatientRecord ({ commit }, { id, data = {} }) {
    commit('setUpdatedPatientRecord', { status: 'PENDING' })
    return this.$axios.put(util.format(API.PatientRecords.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedPatientRecord', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedPatientRecord', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deletePatientRecord ({ commit }, { id, params = {} }) {
    commit('setDeletedPatientRecord', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.PatientRecords.DELETE, id), params)
      .then((res) => {
        commit('setDeletedPatientRecord', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedPatientRecord', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
