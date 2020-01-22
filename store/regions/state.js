const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedRegions: defaultState,
    retrievedRegion: defaultState,
    createdRegion: defaultState,
    updatedRegion: defaultState,
    deletedRegion: defaultState,
  }
}
