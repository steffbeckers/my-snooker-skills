// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'

import App from './App'
import router from './router'

// Steff
import Logger from './services/logger'
import en from './i18n/en'
import nl from './i18n/nl'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import store from './store'
import moment from 'moment'
import VueCookie from 'vue-cookie'

// Components
import MatchesCardList from './components/matches/CardList.vue'
Vue.component('MatchesCardList', MatchesCardList)

const logger = new Logger()
Vue.use(Vuetify, {
  lang: {
    locales: { en, nl },
    current: 'en'
  }
})
Vue.use(VueCordova)
Vue.use(VueHead)
Vue.use(VueCookie)
Vue.prototype.$axios = axios

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

// Steff
// Set Authorization header, if token exists
var token = Vue.cookie.get('$MySnookerSkills$token')
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
}

// Global request interceptor
Vue.prototype.$axios.interceptors.request.use(
  function(config) {
    // Loader
    store.commit('loader', true)

    return config
  },
  function(error) {
    // Loader
    store.commit('loader', false)

    return Promise.reject(error)
  }
)

// Global response interceptor
var statusCode0Count = 0
Vue.prototype.$axios.interceptors.response.use(
  function(response) {
    // Loader
    store.commit('loader', false)

    // Logging
    if (process.env.NODE_ENV === 'development') {
      logger.log(response.request.responseURL)
      logger.log(response.status, response.data)
    }

    return response
  },
  function(error) {
    // Loader
    store.commit('loader', false)

    // If request status is 0 (no connection to API)
    if (error.request.status === 0 && statusCode0Count === 0) {
      statusCode0Count++
      // Custom response
      error.response = {data: {error: {message: "Can't connect to API."}}}
      return Promise.reject(error.response.data.error)
    } else if (error.request.status === 0) {
      return Promise.resolve(error)
    }

    // Logging
    if (error.request) logger.log(error.request.responseURL)
    if (error.response) {
      logger.log(error.response.status, error.response.data)
    }

    // Log out on unauthorized
    if (error.response && error.response.status === 401) {
      store.commit('signOut')
      store.commit('drawer', true)
    }

    return Promise.reject(error.response.data.error)
  }
)

// Route guards
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!store.state.isAdmin) {
      next({
        name: 'Root',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.authenticated) {
      next({
        name: 'Root',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Global filters
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})
Vue.filter('formatTime', function(value) {
  if (value) {
    return moment(String(value)).format('HH:mm')
  }
})
Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
})
Vue.filter('formatWebsite', function(value) {
  if (value) {
    var websiteUrl = String(value)
      .toLocaleLowerCase()
      .replace('https', '')
      .replace('http', '')
      .replace('://', '')
    if (websiteUrl.endsWith('/')) {
      websiteUrl = websiteUrl.slice(0, -1)
    }
    return websiteUrl
  }
})
Vue.filter('formatMoney', function(value) {
  if (value && typeof value === 'number') {
    if (value === 0) {
      return ''
    }
    return '€ ' + value.toFixed(2)
  }
  return ''
})

// Vuetify
Vue.use(Vuetify, {
  theme: {
    primary: '#007bff',
    secondary: '#0D47A1',
    accent: '#D50000'
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  head: {
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]
  }
})
