const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedLocations: defaultState,
    retrievedLocation: defaultState,
    createdLocation: defaultState,
    updatedLocation: defaultState,
    deletedLocation: defaultState,
  }
}
