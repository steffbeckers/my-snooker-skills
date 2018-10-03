import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

let router = Vue.prototype.router

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-101766005-4',
    router
  })
  Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: ''//, // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
    // version: '...', // Optional
  })
} else {
  Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: ''
  })
}
