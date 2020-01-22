const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedPatientRecords: defaultState,
    retrievedPatientRecord: defaultState,
    createdPatientRecord: defaultState,
    updatedPatientRecord: defaultState,
    deletedPatientRecord: defaultState,
  }
}
