const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedAppointments: defaultState,
    retrievedAppointment: defaultState,
    createdAppointment: defaultState,
    createdWalkInAppointment: defaultState,
    createdWalkInWithUserAppointment: defaultState,
    updatedAppointment: defaultState,
    cancelledAppointment: defaultState,
    closedAppointment: defaultState,
    deletedAppointment: defaultState,
    calendarAppointments: defaultState,
    providerAppointments: {}
  }
}
