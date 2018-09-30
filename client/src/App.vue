<template>
  <v-app light>
    <v-navigation-drawer
      fixed
      :clipped="clipped"
      v-model="$store.state.drawer"
      app
    >
      <v-toolbar color="primary">
        <v-progress-circular
        class="ml-2"
        :size="24"
        :width="8"
        indeterminate
        color="red"
        >
          <img
            v-if="!$store.state.loading"
            style="position: relative; top: 3px;"
            :src="($store.state.env === 'development' ? 'static/' : '') + 'img/icons/SnookerBall-48px.png'"
            alt="Logo"
            width="25"
            height="25"
          />
        </v-progress-circular>
        <v-toolbar-title>
          <router-link style="text-decoration: none;" class="white--text" :to="{ name: 'Root' }">{{ title }}</router-link>
        </v-toolbar-title>
      </v-toolbar>
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
      <v-progress-circular
        class="ml-2"
        :size="24"
        :width="8"
        indeterminate
        color="red"
        v-if="!$store.state.drawer"
      >
        <img
          v-if="!$store.state.loading"
          style="position: relative; top: 3px;"
          :src="($store.state.env === 'development' ? 'static/' : '') + 'img/icons/SnookerBall-48px.png'"
          alt="Logo"
          width="25"
          height="25"
        />
      </v-progress-circular>
      <v-toolbar-title
        v-if="!$store.state.drawer"
        class="ml-3 mr-4"
      >
        <router-link style="text-decoration: none;" class="white--text" :to="{ name: 'Root' }">{{ title }}</router-link>
      </v-toolbar-title>
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn class="white--text" :to="{ name: 'Matches' }" exact flat>Matches</v-btn>
        <v-btn class="white--text" exact flat>Tournaments</v-btn>
        <v-btn class="white--text" exact flat>Players</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <!-- <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer> -->
      <v-btn class="white--text" v-if="!$store.state.authenticated" icon>
        <v-icon>g_translate</v-icon>
      </v-btn>
      <v-toolbar-items
        v-if="!$store.state.authenticated && $vuetify.breakpoint.smAndUp"
      >
        <v-btn class="white--text" :to="{ name: 'Register' }" exact flat><v-icon class="mr-2">person_add</v-icon>Register</v-btn>
        <v-btn class="white--text" :to="{ name: 'Login' }" exact flat><v-icon class="mr-2">exit_to_app</v-icon>Login</v-btn>
      </v-toolbar-items>
      <v-btn
        v-if="!$store.state.authenticated && $vuetify.breakpoint.xs"
        class="white--text"
        :to="{ name: 'Register' }"
        exact
        icon
      >
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn
        v-if="!$store.state.authenticated && $vuetify.breakpoint.xs"
        class="white--text"
        :to="{ name: 'Login' }"
        exact
        icon
      >
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <v-btn class="white--text" v-if="$store.state.authenticated" icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn class="white--text" v-if="$store.state.authenticated" icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn class="white--text" v-if="$store.state.isAdmin" icon>
        <v-icon>supervised_user_circle</v-icon>
      </v-btn>
      <v-toolbar-side-icon
        v-if="$store.state.authenticated"
        class="white--text"
        @click.stop="$store.commit('rightDrawer', !$store.state.rightDrawer)"
      ></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <!-- Global messages -->
      <v-alert
        :value="true"
        v-for="(error, index) in $store.state.errors"
        :key="index"
        type="error"
        dismissible
        class="ml-4 mt-4 mr-4"
      >
        {{ error.message }}
      </v-alert>
      <v-alert
        :value="true"
        v-for="(warning, index) in $store.state.warnings"
        :key="index"
        type="warning"
        dismissible
        class="ml-4 mt-4 mr-4"
      >
        {{ warning.message }}
      </v-alert>
      <v-alert
        :value="true"
        v-for="(success, index) in $store.state.successes"
        :key="index"
        type="success"
        dismissible
        class="ml-4 mt-4 mr-4"
      >
        {{ success.message }}
      </v-alert>
      <v-alert
        :value="true"
        v-for="(info, index) in $store.state.infos"
        :key="index"
        type="info"
        dismissible
        class="ml-4 mt-4 mr-4"
      >
        {{ info.message }}
      </v-alert>
      <!-- Router outlet -->
      <router-view></router-view>
    </v-content>
    <v-navigation-drawer
      v-if="$store.state.authenticated"
      :right="true"
      v-model="$store.state.rightDrawer"
      fixed
      app
    >
      <v-toolbar color="primary">
        <v-list class="pa-0">
          <v-list-tile @click="$router.push({name: 'Profile', params: {username: $store.state.user.username}})" class="white--text" avatar>
            <v-list-tile-avatar color="white">
              <img v-if="$store.state.user && $store.state.user.profilePicture" :src="$store.state.user.profilePicture">
              <v-icon class="primary--text" v-else>person</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">{{ $store.state.user.firstName }} {{ $store.state.user.lastName }}</v-list-tile-title>
              <v-list-tile-sub-title class="white--text" v-if="$store.state.user.username">@{{ $store.state.user.username }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action @click.stop="logout()">
              <v-icon class="white--text" style="cursor: pointer">power_settings_new</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0">
        <v-divider></v-divider>
        <v-list-tile :to="{ name: 'ProfileMatches', params: { username: $store.state.user.username }}" exact>
          <v-list-tile-action>
            <v-icon light>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Matches</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{ name: 'ProfileTournaments', params: { username: $store.state.user.username }}" exact>
          <v-list-tile-action>
            <v-icon light>line_style</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Tournaments</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{ name: 'ProfileStatistics', params: { username: $store.state.user.username }}" exact>
          <v-list-tile-action>
            <v-icon light>bar_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Statistics</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{ name: 'ProfileFriends', params: { username: $store.state.user.username }}" exact>
          <v-list-tile-action>
            <v-icon light>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Friends</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{ name: 'ProfileFavorites', params: { username: $store.state.user.username }}" exact>
          <v-list-tile-action>
            <v-icon light>favorite</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Favorites</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          prepend-icon="assignment"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Training</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{ name: 'TrainingScoreboard' }" exact>
            <v-list-tile-action>
              <v-icon light>drag_indicator</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Scoreboard</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon light>more_horiz</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Line Up</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon light>grain</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Random</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="black">fiber_manual_record</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Blacky</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon class="pink--text accent-2">fiber_manual_record</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Pink</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-group
          prepend-icon="settings"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{ name: 'AccountSettings' }" exact>
            <v-list-tile-action>
              <v-icon light>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Account</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{ name: 'ProfileSettings' }" exact>
            <v-list-tile-action>
              <v-icon light>account_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon light>settings_applications</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Application</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
      style="padding-right: 0px;"
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
      clipped: false,
      fixed: true,
      settingsDropdown: localStorage.getItem('app:settingsDropdown') || true,
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
        },
        {
          icon: 'line_style',
          title: 'Tournaments'
        },
        {
          icon: 'people',
          title: 'Players'
        },
        {
          icon: 'place',
          title: 'Clubs',
          page: {
            name: 'Clubs'
          }
        }
      ],
      buildDateTime: process.env.BUILD_DATETIME,
      version: process.env.VERSION,
      nodeEnv: process.env.NODE_ENV,
      title: 'My Snooker Skills'
    }
  },
  async created() {
    var self = this
    this.cordova.on('deviceready', () => {
      self.onDeviceReady()
    })

    // Authentication - Reload the user
    if (this.$store.state.authenticated) {
      let user = await this.$authentication.me()
      if (user) this.$store.commit('updateMe', user)
    }
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
      location.reload(false)
    },
    onPause() {
      // Handle the pause lifecycle event.
      console.log('pause')
    },
    onResume() {
      // Handle the resume lifecycle event.
      // SetTimeout required for iOS.
      setTimeout(function() {
        console.log('resume')
      }, 0)
    },
    onBackKeyDown() {
      // Handle the back-button event on Android. By default it will exit the app.
      navigator.app.exitApp()
    },
    logout() {
      this.$axios
        .post(process.env.API + '/Users/logout')
        .then(response => {
          this.$store.commit('signOut')

          // Redirect to Root when you need to be logged in to visit the current page
          if (JSON.parse(localStorage.getItem('page-requiresAuth')) ||
              JSON.parse(localStorage.getItem('page-requiresAdmin'))) {
            this.$router.push({ name: 'Root' })
          }
        })
    }
  },
  watch: {
    settingsDropdown(bool) {
      localStorage.setItem('login:settingsDropdown', bool)
    }
  },
  name: 'App'
}
</script>

<style>
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
.footer {
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
</style>
