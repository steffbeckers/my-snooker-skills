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
            :src="baseUrl + 'img/icons/SnookerBall-48px.png'"
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
    <v-toolbar v-if="$store.state.showTopNav" fixed app :clipped-left="clipped" color="primary" class="white--text">
      <v-toolbar-side-icon class="white--text" @click.stop="$store.commit('drawer', !$store.state.drawer)"></v-toolbar-side-icon>
      <v-progress-circular
        class="ml-2"
        :size="24"
        :width="8"
        indeterminate
        color="red"
        v-if="!$store.state.drawer"
        @click="$router.push({ name: 'Root' })"
        style="cursor: pointer"
      >
        <img
          v-if="!$store.state.loading"
          style="position: relative; top: 3px;"
          :src="baseUrl + 'img/icons/SnookerBall-48px.png'"
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
        <v-btn class="white--text" :to="{ name: 'Tournaments' }" exact flat>Tournaments</v-btn>
        <v-btn class="white--text" :to="{ name: 'Players' }" exact flat>Players</v-btn>
        <!-- <v-btn class="white--text" exact flat>Clubs</v-btn> -->
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
      <v-btn class="white--text mr-2" v-if="!$store.state.authenticated" icon>
        <v-icon>g_translate</v-icon>
      </v-btn>
      <v-toolbar-items
        v-if="!$store.state.authenticated && $vuetify.breakpoint.smAndUp"
      >
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="white--text" :to="{ name: 'Register' }" exact flat><v-icon class="mr-2">person_add</v-icon>Register</v-btn>
        <v-btn class="white--text" :to="{ name: 'Login' }" exact flat><v-icon class="mr-2">exit_to_app</v-icon>Login</v-btn>
      </v-toolbar-items>
      <!-- <v-btn
        v-if="!$store.state.authenticated && $vuetify.breakpoint.xs"
        class="white--text"
        :to="{ name: 'Register' }"
        exact
        icon
      >
        <v-icon>person_add</v-icon>
      </v-btn> -->
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
              <img
                v-if="$store.state.user.profilePicture && typeof $store.state.user.profilePicture === 'object' && $store.state.user.profilePicture.thumb"
                :src="$store.state.user.profilePicture.thumb"
              >
              <img
                v-if="$store.state.user.profilePicture && typeof $store.state.user.profilePicture === 'string'"
                :src="$store.state.user.profilePicture"
              >
              <v-icon v-if="!$store.state.user.profilePicture" class="primary--text">person</v-icon>
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
        <v-list-tile v-if="$store.state.user.club" :to="{ name: 'Club', params: { slug: $store.state.user.club.slug }}" exact>
          <v-list-tile-action>
            <v-icon light>place</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $store.state.user.club.name }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{ name: 'ProfileMatches', params: { username: $store.state.user.username }}" exact>
          <v-list-tile-action>
            <v-icon light>people_outline</v-icon>
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
          <v-list-tile :to="{ name: 'TrainingOverview' }" exact>
            <v-list-tile-action>
              <v-icon light>apps</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Overview</v-list-tile-title>
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
          <v-list-tile :to="{ name: 'ProfileSettings' }" exact>
            <v-list-tile-action>
              <v-icon light>account_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{ name: 'AccountSettings' }" exact>
            <v-list-tile-action>
              <v-icon light>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Account</v-list-tile-title>
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
      v-if="$store.state.showFooter"
      :fixed="fixed"
      app
    >
      <div v-if="$vuetify.breakpoint.smAndUp" id="build-info">
        <v-icon class="mr-1">code</v-icon><span>Last updated on {{ buildDateTime | formatDateTime }} to v{{ version }}</span>
      </div>
      <div v-else id="build-info">
        <v-icon class="mr-1">code</v-icon><span>{{ buildDateTime | formatDate }} - v{{ version }}</span>
      </div>
      <div id="report-bug" style="cursor: pointer">
        <v-icon class="mr-1">bug_report</v-icon><span v-if="$vuetify.breakpoint.smAndUp">Report a bug</span>
      </div>
      <div id="copyright">
        <v-icon class="mr-1">copyright</v-icon><a href="https://steffbeckers.eu/" target="_blank">Steff</a>
      </div>
    </v-footer>
    <template v-for="(snackbar, index) in $store.state.snackbars">
      <v-snackbar
        :key="index"
        :absolute="snackbar.absolute || false"
        :auto-height="snackbar['auto-height'] || false"
        :bottom="snackbar.bottom || false"
        :color="snackbar.color"
        :dark="snackbar.dark || true"
        :left="snackbar.left || false"
        :multi-line="snackbar.mode === 'multi-line'"
        :right="snackbar.right || false"
        :timeout="snackbar.timeout"
        :top="snackbar.top || false"
        :vertical="snackbar.mode === 'vertical'"
        value="true"
      >
        {{ snackbar.text }}
        <v-btn
          v-if="snackbar.reload"
          :dark="snackbar.dark || true"
          :color="snackbar.color"
          flat
          @click="typeof snackbar.buttonCallback === 'function' ? snackbar.buttonCallback() : () => {}; reload()"
        >
          {{ snackbar.buttonText || 'Reload' }}
        </v-btn>
        <v-btn
          v-else
          :dark="snackbar.dark || true"
          :color="snackbar.color"
          flat
          @click="typeof snackbar.buttonCallback === 'function' ? snackbar.buttonCallback() : () => {}; $store.commit('closeSnackbarByIndex', index)"
        >
          {{ snackbar.buttonText || 'Close' }}
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<style>
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

/* Top navigation toolbar height fix */
div.application--wrap > nav.v-toolbar div.v-toolbar__content {
  height: 64px !important;
}
div.application--wrap > aside.v-navigation-drawer div.v-toolbar__content {
  height: 64px !important;
}
div.application--wrap > main.v-content {
  padding-top: 64px !important;
  margin-bottom: 10px;
}

.v-footer {
  color: #868e96;
  font-size: 12px;
  line-height: 32px;

  display: flex;
  justify-content: space-between;

  padding-left: 10px!important;
  padding-right: 10px!important;
}

.v-footer a {
  text-decoration: none;
}

.v-footer a:hover {
  text-decoration: underline;
}

.v-footer .v-icon {
  position: relative;
  top: 5px;
}
</style>

<script>
export default {
  data() {
    return {
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
          icon: 'people_outline',
          title: 'Matches',
          page: {
            name: 'Matches'
          }
        },
        {
          icon: 'line_style',
          title: 'Tournaments',
          page: {
            name: 'Tournaments'
          }
        },
        {
          icon: 'people',
          title: 'Players',
          page: {
            name: 'Players'
          }
        },
        {
          icon: 'place',
          title: 'Clubs',
          page: {
            name: 'Clubs'
          }
        }
      ],
      buildDateTime: process.env.VUE_APP_BUILD_DATETIME,
      version: process.env.VUE_APP_VERSION,
      nodeEnv: process.env.NODE_ENV,
      baseUrl: process.env.BASE_URL,
      title: 'My Snooker Skills'
    }
  },
  async created() {
    // Authentication - Reload the user
    if (this.$store.state.authenticated) {
      let user = await this.$authentication.me()
      if (user) this.$store.commit('updateMe', user)
    }
  },
  methods: {
    reload(force = true) {
      window.location.reload(force)
    },
    logout() {
      this.$axios
        .post(process.env.VUE_APP_API + '/Users/logout')
        .then(() => {
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
    $route: function () {
      // Check if given route is true, if it is then hide top nav and footer.
      // if (this.$route.name === 'TrainingScoreboard' || this.$route.name === 'ShootOutTimer) {
      if (this.$route.name === 'ShootOutTimer') {
        this.$store.commit('showTopNav', false)
        this.$store.commit('showFooter', false)
      } else {
        this.$store.commit('showTopNav', true)
        this.$store.commit('showFooter', true)
      }
    },
    settingsDropdown(bool) {
      localStorage.setItem('login:settingsDropdown', bool)
    },
  },
  name: 'App'
}
</script>
