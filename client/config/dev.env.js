var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// Steff
const moment = require('moment')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://192.168.0.190:3000/api"',
  BUILD_DATETIME: '"' + moment().format('DD/MM/YYYY HH:mm:ss') + '"'
})
