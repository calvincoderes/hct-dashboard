import util from 'util'

// ENDPOINT
const endpoint = process.env.REST_API_ENDPOINT

// CONSTANTS
const API = {
  Appointments: {
    FETCH: `${endpoint}/assistant/appointments/`,
    RETRIEVE: `${endpoint}/assistant/appointments/%s/`,
    CREATE: `${endpoint}/assistant/appointments/`,
    CREATE_WALKIN: `${endpoint}/assistant/appointments/walkin/`,
    CREATE_WALKIN_WITH_USER: `${endpoint}/assistant/appointments/walkin_with_user/`,
    UPDATE: `${endpoint}/assistant/appointments/%s/`,
    CANCEL_APPOINTMENT: `${endpoint}/assistant/appointments/%s/cancel/`,
    CLOSE_APPOINTMENT: `${endpoint}/assistant/appointments/%s/close_appointment/`,
    DELETE: `${endpoint}/assistant/appointments/%s/`
  }
}

// ACTIONS
export default {
  fetchAppointments ({ commit }, params = {}) {
    let mutation = 'setFetchedAppointments'
    if (typeof params.mutation !== 'undefined' && params.mutation) {
      mutation = params.mutation
      delete params.mutation
    }

    const others = {}
    if (typeof params.others !== 'undefined' && params.others) {
      Object.assign(others, { ...params.others })
      delete params.others
    }

    commit(mutation, { status: 'PENDING', others })
    return this.$axios.get(API.Appointments.FETCH, { params })
      .then((res) => {
        commit(mutation, {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status,
          others
        })
      })
      .catch((e) => {
        commit(mutation, {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status,
          others
        })
      })
  },
  retrieveAppointment ({ commit }, { id, params = {} }) {
    commit('setRetrievedAppointment', { status: 'PENDING' })
    return this.$axios.get(util.format(API.Appointments.RETRIEVE, id), { params })
      .then((res) => {
        commit('setRetrievedAppointment', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setRetrievedAppointment', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createAppointment ({ commit }, data = {}) {
    commit('setCreatedAppointment', { status: 'PENDING' })
    return this.$axios.post(API.Appointments.CREATE, data)
      .then((res) => {
        commit('setCreatedAppointment', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedAppointment', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createWalkInAppointment ({ commit }, data = {}) {
    commit('setCreatedWalkInAppointment', { status: 'PENDING' })
    return this.$axios.post(API.Appointments.CREATE_WALKIN, data)
      .then((res) => {
        commit('setCreatedWalkInAppointment', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedWalkInAppointment', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  createWalkInWithUserAppointment ({ commit }, data = {}) {
    commit('setCreatedWalkInWithUserAppointment', { status: 'PENDING' })
    return this.$axios.post(API.Appointments.CREATE_WALKIN_WITH_USER, data)
      .then((res) => {
        commit('setCreatedWalkInWithUserAppointment', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCreatedWalkInWithUserAppointment', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  updateAppointment ({ commit }, { id, data = {} }) {
    commit('setUpdatedAppointment', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Appointments.UPDATE, id), data)
      .then((res) => {
        commit('setUpdatedAppointment', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setUpdatedAppointment', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  cancelAppointment ({ commit }, { id, data = {} }) {
    commit('setCancelledAppointment', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Appointments.CANCEL_APPOINTMENT, id), data)
      .then((res) => {
        commit('setCancelledAppointment', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setCancelledAppointment', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  closeAppointment ({ commit }, { id, data = {} }) {
    commit('setClosedAppointment', { status: 'PENDING' })
    return this.$axios.put(util.format(API.Appointments.CLOSE_APPOINTMENT, id), data)
      .then((res) => {
        commit('setClosedAppointment', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setClosedAppointment', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
  deleteAppointment ({ commit }, { id, params = {} }) {
    commit('setDeletedAppointment', { status: 'PENDING' })
    return this.$axios.delete(util.format(API.Appointments.DELETE, id), params)
      .then((res) => {
        commit('setDeletedAppointment', {
          status: 'FULFILLED',
          res: res.data,
          statusCode: res.status
        })
      })
      .catch((e) => {
        commit('setDeletedAppointment', {
          status: 'REJECTED',
          res: e.response.data,
          statusCode: e.response.status
        })
      })
  },
}
