import Vue from 'vue'

import Authentication from '../services/authentication'
Vue.prototype.$authentication = new Authentication()
