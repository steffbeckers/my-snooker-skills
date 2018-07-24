// Steff
const moment = require('moment')

module.exports = {
  NODE_ENV: '"production"',
  API: '"http://app.mysnookerskills.com/api"',
  BUILD_DATETIME: '"' + moment().format('DD/MM/YYYY HH:mm:ss') + '"'
}
