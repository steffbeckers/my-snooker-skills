import '@babel/polyfill'

import Vue from 'vue'
import store from './store'
import router from './router'
import './plugins/vuetify'
import './plugins/logger'
import './plugins/cookies'
import './plugins/axios'
import './plugins/authentication'
import './plugins/filters'
import './plugins/google'

// Components
import App from './App.vue'
import MatchesCardList from './components/matches/CardList.vue'
Vue.component('MatchesCardList', MatchesCardList)

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
