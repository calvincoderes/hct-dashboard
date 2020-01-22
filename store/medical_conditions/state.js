const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedMedicalConditions: defaultState,
    retrievedMedicalCondition: defaultState,
    createdMedicalCondition: defaultState,
    updatedMedicalCondition: defaultState,
    deletedMedicalCondition: defaultState,
  }
}
