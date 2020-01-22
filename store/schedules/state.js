const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    fetchedSchedules: defaultState,
    retrievedSchedule: defaultState,
    createdSchedule: defaultState,
    updatedSchedule: defaultState,
    deletedSchedule: defaultState,
  }
}
