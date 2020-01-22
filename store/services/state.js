const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedServices: defaultState,
    retrievedService: defaultState,
    createdService: defaultState,
    updatedService: defaultState,
    deletedService: defaultState,
  }
}
