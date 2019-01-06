import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(VueCookie)

// Default
export default new Vuex.Store({
  state: {
    // Env
    env: process.env.NODE_ENV,
    debug: localStorage.getItem('debug') || process.env.NODE_ENV === 'development',
    forceOffline: false,
    // Messages
    infos: [],
    successes: [],
    warnings: [],
    errors: [],
    // Snackbars
    snackbars: [],
    // Loading
    loading: false,
    loadingCounter: 0,
    // Layout
    showTopNav: true,
    showFooter: true,
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
    forceOffline(state, bool) {
      state.forceOffline = bool
    },
    message(state, message) {
      switch (message.type) {
        case 'info':
          state.infos.push({message: message.value, keepOnNav: message.keepOnNav || 0})
          break
        case 'success':
          state.successes.push({message: message.value, keepOnNav: message.keepOnNav || 0})
          break
        case 'warning':
          state.warnings.push({message: message.value, keepOnNav: message.keepOnNav || 0})
          break
        case 'error':
          state.errors.push({message: message.value, keepOnNav: message.keepOnNav || 0})
          break
      }
    },
    resetMessages(state) {
      state.infos = state.infos.filter(i => i.keepOnNav && i.keepOnNav > 0 || i.keepOnNav === -1)
      state.infos.forEach(i => { if (i.keepOnNav > 0) i.keepOnNav-- })
      state.successes = state.successes.filter(i => i.keepOnNav && i.keepOnNav > 0 || i.keepOnNav === -1)
      state.successes.forEach(i => { if (i.keepOnNav > 0) i.keepOnNav-- })
      state.warnings = state.warnings.filter(i => i.keepOnNav && i.keepOnNav > 0 || i.keepOnNav === -1)
      state.warnings.forEach(i => { if (i.keepOnNav > 0) i.keepOnNav-- })
      state.errors = state.errors.filter(i => i.keepOnNav && i.keepOnNav > 0 || i.keepOnNav === -1)
      state.errors.forEach(i => { if (i.keepOnNav > 0) i.keepOnNav-- })
    },
    snackbar(state, bar) {
      state.snackbars.push(bar)
    },
    closeSnackbarByIndex(state, index) {
      state.snackbars.splice(index, 1)
    },
    resetSnackbars(state) {
      state.snackbars = state.snackbars.filter(i => i.keepOnNav && i.keepOnNav > 0 || i.keepOnNav === -1)
      state.snackbars.forEach(i => { if (i.keepOnNav > 0) i.keepOnNav-- })
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
    showTopNav(state, bool) {
      state.showTopNav = bool
    },
    showFooter(state, bool) {
      state.showFooter = bool
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

      // Remove from local storage
      localStorage.removeItem('user')
      localStorage.removeItem('match:play')

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
    changeAvatar(state, imagePathOrSet) {
      state.user.profilePicture = imagePathOrSet

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    removeAvatar(state) {
      delete state.user.profilePicture

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    changeProfile(state, user) {
      if (user.firstName) state.user.firstName = user.firstName
      if (user.lastName) state.user.lastName = user.lastName
      if (user.email) state.user.email = user.email
      if (user.emailVerified) state.user.emailVerified = user.emailVerified
      if (user.bio) state.user.bio = user.bio

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    changeToken(state, token, ttl = 1209600) {
      state.token = token

      // Save token
      Vue.cookie.set('token', token, {
        expires: ttl + 's'
      })

      // Set Authorization token on request
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
    },
    updateMe(state, user) {
      state.user = user
      state.isAdmin = user.roles.includes('Administrator')

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    addFriend(state, user) {
      // User should be authenticated
      if (!state.authenticated) return

      // When friends could be undefined
      if (state.user.friends === undefined) {
        state.user.friends = []
      }

      // Check if the friend isn't added already
      let found = state.user.friends.some((friend) => {
        return friend.id === user.id
      })
      if (!found) {
        // Add the user to friends
        state.user.friends.push({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          profilePicture: user.profilePicture
        })
        // Trigger update
        state.user.friends = [...state.user.friends]
      }

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    removeFriend(state, user) {
      // User should be authenticated
      if (!state.authenticated) return

      // Check if the friend is added
      let found = state.user.friends.some((friend) => {
        return friend.id === user.id
      })
      if (found) {
        // Remove the user from friends
        let index = state.user.friends.map(f => f.id).indexOf(user.id);
        if (index >= 0) state.user.friends.splice(index, 1)
        // Trigger update
        state.user.friends = [...state.user.friends]
      }

      // Save user
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
    checkVersion({ commit }) {
      // Last checked
      let versionLastChecked = localStorage.getItem('version-last-checked')
      if (versionLastChecked) {
        versionLastChecked = moment(versionLastChecked)
        let diffInMinutes = moment().diff(versionLastChecked, 'minutes')
        if (diffInMinutes < 5) {
          return
        }
      }

      let version = process.env.VUE_APP_VERSION

      Vue.prototype.$axios
        .get(process.env.VUE_APP_API)
        .then(response => {
          // Last checked
          localStorage.setItem('version-last-checked', new Date().toISOString())

          if (version !== response.data.version) {
            // Show snackbar on update available
            commit('snackbar', {
              bottom: true,
              timeout: 0,
              text: `App is updated to v${response.data.version}!`,
              buttonText: 'Reload',
              reload: true
            })
          }
        })
    },
    addPlayerAsFriend({ commit, state }, player) {
      Vue.prototype.$axios
        .put(process.env.VUE_APP_API + '/Users/' + state.user.id + '/friends/rel/' + player.id)
        .then(() => {
          // Add player to friends in state
          commit('addFriend', player)
        })
        .catch(error => {
          Vue.prototype.$logger.error(error)
        })
    },
    removePlayerAsFriend({ commit, state }, player) {
      Vue.prototype.$axios
        .delete(process.env.VUE_APP_API + '/Users/' + state.user.id + '/friends/rel/' + player.id)
        .then(() => {
          // Remove player from friends in state
          commit('removeFriend', player)
        })
        .catch(error => {
          Vue.prototype.$logger.error(error)
        })
    }
  // },
  // modules: {
  //   ssb: simpleScoreboard
  }
})
