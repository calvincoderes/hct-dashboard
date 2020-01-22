const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedImages: defaultState,
    retrievedImage: defaultState,
    createdImage: defaultState,
    updatedImage: defaultState,
    deletedImage: defaultState,
  }
}
