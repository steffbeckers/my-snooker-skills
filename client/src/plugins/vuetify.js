import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// i18n
import en from '../i18n/en'
import nl from '../i18n/nl'

Vue.use(Vuetify, {
  theme: {
    red: '#ED1C24'
  },
  lang: {
    locales: { en, nl },
    current: 'en'
  },
  iconfont: 'md'
})
