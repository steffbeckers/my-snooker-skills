// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vuetify/dist/vuetify.css'
import 'font-awesome/css/font-awesome.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import VueCookie from 'vue-cookie'
import VueAnalytics from 'vue-analytics'

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'

// i18n
import en from './i18n/en'
import nl from './i18n/nl'

// Services
import Logger from './services/logger'
import Authentication from './services/authentication'
import Authorization from './services/authorization'

// Components
import MatchesCardList from './components/matches/CardList.vue'
Vue.component('MatchesCardList', MatchesCardList)

Vue.use(VueCordova)
Vue.use(VueHead)
Vue.use(VueCookie)
if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-101766005-4',
    router
  })
}
Vue.prototype.$axios = axios

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
      Vue.prototype.$logger.log(response.request.responseURL)
      Vue.prototype.$logger.log(response.status, response.data)
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
    if (error.request) Vue.prototype.$logger.log(error.request.responseURL)
    if (error.response) {
      Vue.prototype.$logger.log(error.response.status, error.response.data)
    }

    // Log out on unauthorized
    if (error.response && error.response.status === 401) {
      store.commit('signOut')
    }

    return Promise.reject(error.response.data.error)
  }
)

// Route guards
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!store.state.isAdmin) {
      next({
        name: 'Login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.authenticated) {
      next({
        name: 'Login',
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

// Services
Vue.prototype.$logger = new Logger()
Vue.prototype.$authentication = new Authentication()
Vue.prototype.$authorization = new Authorization()

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

// Vuetify
Vue.use(Vuetify, {
  theme: {
    red: '#ED1C24'
  },
  lang: {
    locales: { en, nl },
    current: 'en'
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
