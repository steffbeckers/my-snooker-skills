import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('formatDateLongerEN', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM Do, YYYY')
  }
})

Vue.filter('formatTime', function(value) {
  if (value) {
    return moment(String(value)).format('HH:mm')
  }
})

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
})

Vue.filter('formatWebsite', function(value) {
  if (value) {
    var websiteUrl = String(value)
      .toLocaleLowerCase()
      .replace('https', '')
      .replace('http', '')
      .replace('://', '')
    if (websiteUrl.endsWith('/')) {
      websiteUrl = websiteUrl.slice(0, -1)
    }
    return websiteUrl
  }
})

Vue.filter('formatMoney', function(value) {
  if (value && typeof value === 'number') {
    if (value === 0) {
      return ''
    }
    return '€ ' + value.toFixed(2)
  }
  return ''
})
