var merge = require('webpack-merge')
var devEnv = require('./dev.env')

// Steff
const moment = require('moment')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  API: '"http://test.mysnookerskills.com/api"',
  BUILD_DATETIME: '"' + moment().format('DD/MM/YYYY HH:mm:ss') + '"'
})
