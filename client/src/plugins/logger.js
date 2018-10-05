import Vue from 'vue'

import Logger from '../services/logger'
Vue.prototype.$logger = new Logger()
