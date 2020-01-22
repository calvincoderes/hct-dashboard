const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedLeaves: defaultState,
    retrievedLeave: defaultState,
    createdLeave: defaultState,
    updatedLeave: defaultState,
    deletedLeave: defaultState,
  }
}
