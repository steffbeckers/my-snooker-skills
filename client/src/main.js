import '@babel/polyfill';

import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueSSE from 'vue-sse';
import Authentication from './services/authentication';
import store from './store';
import router from './router';
import './plugins/vuetify';
import './plugins/logger';
import './plugins/cookies';
import './plugins/axios';
import './plugins/filters';
import './plugins/upload';
import './plugins/database';
import './plugins/service-worker';

// Components
import App from './App.vue';
import MatchesCardList from './components/matches/CardList.vue';
import TournamentsCardList from './components/tournaments/CardList.vue';
import PlayersCardList from './components/players/CardList.vue';
import ClubsCardList from './components/clubs/CardList.vue';

Vue.component('MatchesCardList', MatchesCardList);
Vue.component('TournamentsCardList', TournamentsCardList);
Vue.component('PlayersCardList', PlayersCardList);
Vue.component('ClubsCardList', ClubsCardList);

// Server Sent Events
Vue.use(VueSSE);

// Google
if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-101766005-4',
    router,
  });
}

// Disabled the Google Autocomplete search
// Vue.use(VuetifyGoogleAutocomplete, {
//   apiKey: 'SECRET'
// })

Vue.use(VueGoogleMaps, {
  load: {
    key: 'SECRET',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

// Authentication
Vue.prototype.$authentication = new Authentication();
// Guards
router.beforeEach((to, from, next) => {
  // Last page
  localStorage.setItem('previous-page', from.path);

  // Check front-end and API versions
  //store.dispatch('checkVersion')

  // Check code updates with build timestamp and notify users
  // Only in production
  if (process.env.NODE_ENV === 'production') {
    store.dispatch('checkCodeUpdate');
  }

  // Reset global messages on navigate
  store.commit('resetMessages');

  // Reset global snackbars on navigate
  store.commit('resetSnackbars');

  // Reset status code 0 counter
  window.statusCode0Count = 0;

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!store.state.isAdmin) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      });
    } else {
      localStorage.setItem('page-requiresAdmin', true);
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.authenticated) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      });
    } else {
      localStorage.setItem('page-requiresAuth', true);
      next();
    }
  } else {
    localStorage.setItem('page-requiresAdmin', false);
    localStorage.setItem('page-requiresAuth', false);
    next();
  }
});

// Set Authorization header, if token exists
var token = Vue.prototype.$cookie.get('token');
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = token;
}

// Error tracking
let url = process.env.VUE_APP_API + '/Bugs/trackAppError';
window.FancyTrack.init({
  url: url,
});
Vue.config.errorHandler = (error, vm, info) => {
  /* eslint no-console: ["error", { allow: ["error"] }] */
  console.error('Oops, an error occured:');
  console.error(error);
  console.error(vm);
  console.error(info);

  // Don't log to database in local dev
  if (process.env.NODE_ENV === 'local') {
    return;
  }

  // Global state
  let state = vm.$store.state;
  // If authenticated, don't log the access token of user for security
  if (state.token) {
    delete state.token;
  }

  let bug = {
    errorName: error + '',
    errorText: info,
    errorStack: error.stack,
    url: vm.$route.fullPath,
    route: {
      path: vm.$route.path,
      query: vm.$route.query,
      params: vm.$route.params,
      fullPath: vm.$route.fullPath,
      name: vm.$route.name,
      meta: vm.$route.meta,
    },
    state: state,
    browser: window.FancyTrack.browser,
    mobile: window.FancyTrack.mobile,
    os: window.FancyTrack.os,
    userAgent: window.FancyTrack.userAgent,
  };
  Vue.prototype.$axios.post(window.FancyTrack.url, bug);
};

// Vue's production tip
Vue.config.productionTip = false;

// Lauch the Vue rocket
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
