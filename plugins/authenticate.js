export default ({ store, redirect, app: { $axios } }) => {
  $axios.onError((error) => {
    console.log(error)
  })
  $axios.onRequestError((error) => {
    console.log(error)
  })
  $axios.onResponseError((error) => {
    console.log(error)
  })
  $axios.interceptors.response.use(response => response, (error) => {
    return Promise.reject(error)
  })
  if (store.state.authenticate.auth) {
    $axios.setToken(store.state.authenticate.auth.access_token, 'Bearer')
  }
}
