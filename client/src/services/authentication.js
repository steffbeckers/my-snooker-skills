import Vue from 'vue'

export default class Authentication {
  isAuthenticated() {
    // TODO
  }

  login(usernameOrEmail, password) {
    this.$axios
      .post(process.env.API + '/Users/login', { email: this.email })
      .then(response => {
        // Show message
        if (response.data.code === 'AUTH_EMAIL_SENT') {
          this.emailSent = true
        }

        // Login automatically in development
        if (process.env.NODE_ENV === 'development') {
          this.$router.push({
            path: '/',
            query: {
              credentials: response.data.credentials,
              redirect: this.$route.fullPath
            }
          })
        }
      })
  }

  logout() {
    // TODO
  }

  me() {
    return Vue.prototype.$axios.get(process.env.API + '/Users/me')
      .then(user => {
        return user.data
      })
  }
}
