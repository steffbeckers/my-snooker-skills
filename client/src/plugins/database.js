import Vue from 'vue'

import Database from '../services/database'
Vue.prototype.$db = new Database()
