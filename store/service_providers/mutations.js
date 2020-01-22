export default {
  setFetchedServiceProviders (state, data) {
    state.fetchedServiceProviders = data
  },
  setFetchedLightServiceProviders (state, data) {
    state.fetchedLightServiceProviders = data
  },
  setRetrievedServiceProvider (state, data) {
    state.retrievedServiceProvider = data
  },
  setCreatedServiceProvider (state, data) {
    state.createdServiceProvider = data
  },
  setUpdatedServiceProvider (state, data) {
    state.updatedServiceProvider = data
  },
  setDeletedServiceProvider (state, data) {
    state.deletedServiceProvider = data
  },
}
