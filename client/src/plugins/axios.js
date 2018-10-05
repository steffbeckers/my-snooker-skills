import Vue from 'vue'
import axios from 'axios'
import store from '../store'

Vue.prototype.$axios = axios

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
window.statusCode0Count = 0
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
    if (error.request.status === 0 && window.statusCode0Count === 0) {
      window.statusCode0Count++
      // Custom response
      error.response = {data: {error: {message: 'You are offline. Please try to reconnect to the internet.'}}}

      // Global message
      store.commit('message', {type: 'warning', value: error.response.data.error.message})

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
