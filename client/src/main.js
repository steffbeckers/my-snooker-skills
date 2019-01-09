import '@babel/polyfill'

import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import VueSSE from 'vue-sse'
import Authentication from './services/authentication'
import store from './store'
import router from './router'
import './plugins/vuetify'
import './plugins/logger'
import './plugins/cookies'
import './plugins/axios'
import './plugins/filters'
import './plugins/upload'
import './plugins/database'

// Components
import App from './App.vue'
import MatchesCardList from './components/matches/CardList.vue'
import TournamentsCardList from './components/tournaments/CardList.vue'
import PlayersCardList from './components/players/CardList.vue'
import ClubsCardList from './components/clubs/CardList.vue'
Vue.component('MatchesCardList', MatchesCardList)
Vue.component('TournamentsCardList', TournamentsCardList)
Vue.component('PlayersCardList', PlayersCardList)
Vue.component('ClubsCardList', ClubsCardList)

// Server Sent Events
Vue.use(VueSSE);

// Google
if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-101766005-4',
    router
  })
}
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyB4NmsqPnw-5iMpnhVZWu2g9CBfTRke9Ks'
})

// Authentication
Vue.prototype.$authentication = new Authentication()
// Guards
router.beforeEach((to, from, next) => {
  // Last page
  localStorage.setItem('previous-page', from.path)

  // Check front-end and API versions
  store.dispatch('checkVersion')
  // Reset global messages on navigate
  store.commit('resetMessages')
  // Reset global snackbars on navigate
  store.commit('resetSnackbars')

  // Reset status code 0 counter
  window.statusCode0Count = 0

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!store.state.isAdmin) {
      next({
        name: 'Login',
        query: {redirect: to.fullPath}
      })
    } else {
      localStorage.setItem('page-requiresAdmin', true)
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.authenticated) {
      next({
        name: 'Login',
        query: {redirect: to.fullPath}
      })
    } else {
      localStorage.setItem('page-requiresAuth', true)
      next()
    }
  } else {
    localStorage.setItem('page-requiresAdmin', false)
    localStorage.setItem('page-requiresAuth', false)
    next()
  }
})

// Set Authorization header, if token exists
var token = Vue.prototype.$cookie.get('token')
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
}

// Error tracking
let url = process.env.VUE_APP_API + '/Bugs/trackAppError';
if (token) {
  url += '?access_token=' + token
}
window.FancyTrack.init({
  url: url,
  method: 'POST'
})

// Vue's production tip
Vue.config.productionTip = false

// Lauch the Vue rocket
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
