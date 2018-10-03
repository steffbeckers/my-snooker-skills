import Vue from 'vue'

export default class Authentication {
  isAuthenticated() {
    return Vue.prototype.store.state.authenticated
  }

  me() {
    return Vue.prototype.$axios.get(process.env.VUE_APP_API + '/Users/me')
      .then(user => {
        return user.data
      })
      .catch(() => {
        return null
      })
  }
}
