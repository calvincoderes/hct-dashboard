export default {
  setFetchedAppointments (state, data) {
    state.fetchedAppointments = data
  },
  setRetrievedAppointment (state, data) {
    state.retrievedAppointment = data
  },
  setCreatedAppointment (state, data) {
    state.createdAppointment = data
  },
  setCreatedWalkInAppointment (state, data) {
    state.createdWalkInAppointment = data
  },
  setCreatedWalkInWithUserAppointment (state, data) {
    state.createdWalkInWithUserAppointment = data
  },
  setUpdatedAppointment (state, data) {
    state.updatedAppointment = data
  },
  setCancelledAppointment (state, data) {
    state.cancelledAppointment = data
  },
  setClosedAppointment (state, data) {
    state.closedAppointment = data
  },
  setDeletedAppointment (state, data) {
    state.deletedAppointment = data
  },
  // Set Calendar Appointments
  setCalendarAppointments (state, data) {
    state.calendarAppointments = data
  },
  // Set Provider Appointments
  setProviderAppointments (state, data) {
    if (typeof data.others.provider_id !== 'undefined') {
      Object.assign(state.providerAppointments, {
        [data.others.provider_id]: data
      })
    }
  },
}
