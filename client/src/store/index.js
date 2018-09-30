import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'

Vue.use(Vuex)
Vue.use(VueCookie)

// Scoreboards
const simpleScoreboard = {
  namespaced: true,
  state: {
    players: [],
    scores: {},
    currentPlayer: {},
    currentScore: ''
  },
  mutations: {
    setPlayers(state, players) {
      state.players = players

      // Initialize scores for player
      state.players.forEach(player => {
        state.scores[player.id] = []
      })

      // Set first player as current
      state.currentPlayer = state.players[0]
    },
    addPlayer(state, player) {
      state.players.push(player)

      // Initialize scores for player
      state.scores[player.id] = []

      // Set player as current
      state.currentPlayer = player
    },
    removePlayer(state, playerId) {
      state.players = state.players.filter(p => p.id !== playerId)

      // Delete score of player
      if (state.scores.playerId) delete state.scores.playerId
    },
    inputScore(state, textValue) {
      if (state.currentScore.length >= 3) { return }
      state.currentScore += textValue
    },
    addScore(state) {
      state.scores[state.currentPlayer.id].unshift({datetime: new Date().toISOString(), value: parseInt(state.currentScore)})
      state.currentScore = ''
    },
    resetScore(state) {
      state.currentScore = ''
    },
    resetScoreboard(state) {
      state.scores = {}
      state.currentScore = ''
    }
  }
}

// Default
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
    message(state, message) {
      switch (message.type) {
        case 'info':
          state.infos.push({message: message.value})
          break
        case 'success':
          state.successes.push({message: message.value})
          break
        case 'warning':
          state.warnings.push({message: message.value})
          break
        case 'error':
          state.errors.push({message: message.value})
          break
      }
    },
    resetMessages(state) {
      state.infos = []
      state.successes = []
      state.warnings = []
      state.errors = []
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
    }
  },
  modules: {
    ssb: simpleScoreboard
  }
})
