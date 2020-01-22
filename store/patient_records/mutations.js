export default {
  setFetchedPatientRecords (state, data) {
    state.fetchedPatientRecords = data
  },
  setRetrievedPatientRecord (state, data) {
    state.retrievedPatientRecord = data
  },
  setCreatedPatientRecord (state, data) {
    state.createdPatientRecord = data
  },
  setUpdatedPatientRecord (state, data) {
    state.updatedPatientRecord = data
  },
  setDeletedPatientRecord (state, data) {
    state.deletedPatientRecord = data
  },
}
