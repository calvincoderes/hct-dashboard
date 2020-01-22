export default ({ store, redirect }) => {
  if (!store.state.authenticate.auth) {
    redirect('/login')
  }
}
