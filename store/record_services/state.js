const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedRecordServices: defaultState,
    retrievedRecordService: defaultState,
    createdRecordService: defaultState,
    updatedRecordService: defaultState,
    deletedRecordService: defaultState,
  }
}
