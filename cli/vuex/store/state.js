const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedModuleTemplates: defaultState,
    retrievedModuleTemplate: defaultState,
    createdModuleTemplate: defaultState,
    updatedModuleTemplate: defaultState,
    deletedModuleTemplate: defaultState,
  }
}
