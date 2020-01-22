const defaultState = { status: 'NO_ACTIONS' }

export default () => {
  return {
    createdRequestOTP: defaultState,
    createdVerifyOTP: defaultState,
    createdForgotPassword: defaultState
  }
}
