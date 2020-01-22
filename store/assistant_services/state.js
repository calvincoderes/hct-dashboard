const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedAssistantServices: defaultState,
    retrievedAssistantService: defaultState,
    createdAssistantService: defaultState,
    updatedAssistantService: defaultState,
    deletedAssistantService: defaultState,
  }
}
