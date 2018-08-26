import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'

Vue.use(Vuex)
Vue.use(VueCookie)

export default new Vuex.Store({
  state: {
    // Env
    env: process.env.NODE_ENV,
    // Messages
    infos: [],
    successes: [],
    warnings: [],
    errors: [],
    // Loading
    loading: false,
    loadingCounter: 0,
    // Drawers
    drawer: false,
    rightDrawer: false,
    // Auth
    authenticated: Vue.cookie.get('token') !== null,
    token: Vue.cookie.get('token'),
    user: JSON.parse(localStorage.getItem('user')),
    isAdmin:
      JSON.parse(localStorage.getItem('user')) &&
      JSON.parse(localStorage.getItem('user')).roles
        ? JSON.parse(localStorage.getItem('user')).roles.includes(
          'Administrator'
        ) : false
  },
  mutations: {
    message(state, type, message) {
      switch (type) {
        case 'info':
          state.infos.push({message: message})
          break
        case 'success':
          state.successes.push({message: message})
          break
        case 'warning':
          state.warnings.push({message: message})
          break
        case 'errors':
          state.errors.push({message: message})
          break
      }
    },
    loader(state, bool) {
      if (bool) {
        state.loadingCounter++
      } else {
        state.loadingCounter--
      }

      state.loadingCounter > 0
        ? (state.loading = true)
        : (state.loading = false)
    },
    drawer(state, bool) {
      state.drawer = bool
    },
    rightDrawer(state, bool) {
      state.rightDrawer = bool
    },
    authenticate(state, credentials) {
      // Set state
      state.authenticated = true
      state.token = credentials.id
      state.user = credentials.user
      state.isAdmin = credentials.user.roles.includes('Administrator')

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))

      // Save token
      Vue.cookie.set('token', credentials.id, {
        expires: credentials.ttl + 's'
      })

      // Set Authorization token on request
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = state.token

      // Open right drawer on sm and up
      if (Vue.prototype.$vuetify.breakpoint.smAndUp) {
        state.rightDrawer = true
      }
    },
    signOut(state) {
      // Set state
      state.authenticated = false
      state.token = null
      state.user = null

      // Set roles
      state.isAdmin = false

      // Remove token cookie
      Vue.cookie.delete('token')

      // Remove user
      localStorage.removeItem('user')

      // Remove Authorization token on header
      delete Vue.prototype.$axios.defaults.headers.common['Authorization']
    },
    changeUsername(state, username) {
      state.user.username = username

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))

      // Update login username
      localStorage.setItem('login:usernameOrEmail', state.user.username)
    },
    changeProfile(state, user) {
      state.user.firstName = user.firstName
      state.user.lastName = user.lastName
      state.user.email = user.email

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  }
})
