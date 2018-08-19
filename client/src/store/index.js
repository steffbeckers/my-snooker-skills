import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'

Vue.use(Vuex)
Vue.use(VueCookie)

export default new Vuex.Store({
  state: {
    env: process.env.NODE_ENV,
    loading: false,
    loadingCounter: 0,
    drawer: false,
    rightDrawer: false,
    authenticated: Vue.cookie.get('$MySnookerSkills$token') !== null,
    token: Vue.cookie.get('$MySnookerSkills$token'),
    user: JSON.parse(Vue.cookie.get('$MySnookerSkills$user')),
    isAdmin:
      JSON.parse(Vue.cookie.get('$MySnookerSkills$user')) &&
      JSON.parse(Vue.cookie.get('$MySnookerSkills$user')).roles
        ? JSON.parse(Vue.cookie.get('$MySnookerSkills$user')).roles.includes(
          'Administrator'
        ) : false
  },
  mutations: {
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

      // Save cookies
      Vue.cookie.set('$MySnookerSkills$token', credentials.id, {
        expires: credentials.ttl + 's'
      })
      Vue.cookie.set(
        '$MySnookerSkills$user',
        JSON.stringify(credentials.user),
        {
          expires: credentials.ttl + 's'
        }
      )

      // Set Authorization token on request
      Vue.prototype.$axios.defaults.headers.common['Authorization'] =
        state.token

      // Open right drawer
      state.rightDrawer = true
    },
    signOut(state) {
      // Set state
      state.authenticated = false
      state.token = null
      state.user = null

      // Set roles
      state.isAdmin = false

      // Remove cookies
      Vue.cookie.delete('$MySnookerSkills$token')
      Vue.cookie.delete('$MySnookerSkills$user')

      // Remove local storage
      localStorage.clear()

      // Remove Authorization token on header
      delete Vue.prototype.$axios.defaults.headers.common['Authorization']
    }
  }
})
