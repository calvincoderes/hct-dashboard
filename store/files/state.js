const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedFiles: defaultState,
    retrievedFile: defaultState,
    createdFile: defaultState,
    updatedFile: defaultState,
    deletedFile: defaultState,
  }
}
