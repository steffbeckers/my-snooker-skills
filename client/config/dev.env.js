var merge = require('webpack-merge')
var testEnv = require('./test.env')

module.exports = merge(testEnv, {
  NODE_ENV: '"development"',
  API: '"http://192.168.0.190:3000/api"'
})
