const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedCities: defaultState,
    retrievedCity: defaultState,
    createdCity: defaultState,
    updatedCity: defaultState,
    deletedCity: defaultState,
  }
}
