// STATE
const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    auth: null,
    logout: false,
    userVerified: defaultState,
    changePassword: defaultState,
  }
}
