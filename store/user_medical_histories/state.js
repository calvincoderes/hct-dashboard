const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedUserMedicalHistories: defaultState,
    retrievedUserMedicalHistory: defaultState,
    createdUserMedicalHistory: defaultState,
    updatedUserMedicalHistory: defaultState,
    deletedUserMedicalHistory: defaultState,
  }
}
