import '@babel/polyfill'

import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import Authentication from './services/authentication'
import store from './store'
import router from './router'
import './plugins/vuetify'
import './plugins/logger'
import './plugins/cookies'
import './plugins/axios'
import './plugins/filters'

// Components
import App from './App.vue'
import MatchesCardList from './components/matches/CardList.vue'
import TournamentsCardList from './components/tournaments/CardList.vue'
import PlayersCardList from './components/players/CardList.vue'
Vue.component('MatchesCardList', MatchesCardList)
Vue.component('TournamentsCardList', TournamentsCardList)
Vue.component('PlayersCardList', PlayersCardList)

// Google
if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-101766005-4',
    router
  })
  Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: ''//, // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
    // version: '...', // Optional
  })
} else {
  Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: ''
  })
}

// Authentication
Vue.prototype.$authentication = new Authentication()
// Guards
router.beforeEach((to, from, next) => {
  // Last page
  localStorage.setItem('previous-page', from.path)
  // Reset global messages on navigate
  store.commit('resetMessages')
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

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
