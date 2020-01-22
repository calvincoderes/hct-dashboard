const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedServiceProviders: defaultState,
    fetchedLightServiceProviders: defaultState,
    retrievedServiceProvider: defaultState,
    createdServiceProvider: defaultState,
    updatedServiceProvider: defaultState,
    deletedServiceProvider: defaultState,
  }
}
