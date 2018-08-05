const moment = require('moment')

module.exports = {
  NODE_ENV: '"production"',
  API: '"https://app.mysnookerskills.com/api"',
  BUILD_DATETIME: '"' + moment().format('DD/MM/YYYY HH:mm:ss') + '"',
  VERSION: '"2.0 ALPHA"'
}
