<template>
  <v-app light>
    <v-navigation-drawer
      fixed
      :clipped="clipped"
      v-model="$store.state.drawer"
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in sideMenuItems"
          :key="i"
          :to="item.page"
          exact
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" color="primary" class="white--text">
      <v-toolbar-side-icon class="white--text" @click.stop="$store.commit('drawer', !$store.state.drawer)"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text mr-4" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer> -->
      <v-toolbar-items
        v-if="!$store.state.authenticated"
      >
        <v-btn class="white--text" :to="{ name: 'Register' }" flat>Register</v-btn>
        <v-btn class="white--text" :to="{ name: 'Login' }" flat>Login</v-btn>
      </v-toolbar-items>
      <v-btn class="white--text" v-if="$store.state.authenticated" icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn class="white--text" v-if="$store.state.authenticated" icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn
        v-if="$store.state.authenticated"
        class="white--text"
        icon
        light
        @click.stop="$store.commit('rightDrawer', !$store.state.rightDrawer)"
      >
        <v-icon>person</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-navigation-drawer
      v-if="$store.state.authenticated"
      :right="true"
      v-model="$store.state.rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon light>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Friends</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <div id="buildInfo" class="ml-2">Last update: {{ buildDateTime }} - Version: {{ version }}</div>
      <div id="copyright" class="mr-2">&copy; <a href="https://steffbeckers.eu/">Steff</a></div>
    </v-footer>
  </v-app>
</template>

<style scoped>
main.content {
  margin-bottom: 60px;
}

#buildInfo {
  color: #ffffff;
  font-size: 11px;
  line-height: 11px;
}

#copyright {
  color: #868e96;
  margin-left: auto;
}

#copyright a {
  text-decoration: none;
}

#copyright a:hover {
  text-decoration: underline;
}
</style>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      cordova: Vue.cordova,
      debug: '',
      clipped: false,
      fixed: true,
      sideMenuItems: [
        {
          icon: 'dashboard',
          title: 'Dashboard',
          page: {
            name: 'Root'
          }
        },
        {
          icon: 'list',
          title: 'Matches',
          page: {
            name: 'Matches'
          }
        }
      ],
      buildDateTime: process.env.BUILD_DATETIME,
      version: process.env.VERSION,
      nodeEnv: process.env.NODE_ENV,
      title: 'My Snooker Skills'
    }
  },
  created() {
    var self = this
    this.cordova.on('deviceready', () => {
      self.onDeviceReady()
    })
  },
  methods: {
    onDeviceReady() {
      // Handle the device ready event.
      this.cordova.on('pause', this.onPause, false)
      this.cordova.on('resume', this.onResume, false)
      if (this.cordova.device.platform === 'Android') {
        document.addEventListener('backbutton', this.onBackKeyDown, false)
      }
    },
    reload() {
      console.log('reload')
      this.debug += 'reload; '

      location.reload(false)
    },
    onPause() {
      // Handle the pause lifecycle event.
      console.log('pause')
      this.debug += 'pause; '
    },
    onResume() {
      // Handle the resume lifecycle event.
      // SetTimeout required for iOS.
      setTimeout(function() {
        console.log('resume')
        this.debug += 'resume; '
      }, 0)
    },
    onBackKeyDown() {
      // Handle the back-button event on Android. By default it will exit the app.
      navigator.app.exitApp()
    }
  }
}
</script>

<style>
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
.footer {
  /* Apply this to v-bottom-nav if necessary. */
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
</style>
