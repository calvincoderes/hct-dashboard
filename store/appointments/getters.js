// GETTERS
export default {
  fetchedAppointments: state => state.fetchedAppointments,
  retrievedAppointment: state => state.retrievedAppointment,
  createdAppointment: state => state.createdAppointment,
  createdWalkInAppointment: state => state.createdWalkInAppointment,
  createdWalkInWithUserAppointment: state => state.createdWalkInWithUserAppointment,
  updatedAppointment: state => state.updatedAppointment,
  cancelledAppointment: state => state.cancelledAppointment,
  closedAppointment: state => state.closedAppointment,
  deletedAppointment: state => state.deletedAppointment,
  calendarAppointments: state => state.calendarAppointments,
  providerAppointments: state => state.providerAppointments,
}
