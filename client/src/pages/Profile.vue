<template>
  <div>
    <v-container v-if="user" grid-list-lg fluid>
      <v-layout class="pt-2" align-center justify-space-around wrap>
        <v-avatar size="90px" :color="!user.profilePicture ? 'red' : 'transparent'">
          <img v-if="user.profilePicture" :src="profilePicture(user.profilePicture, 90)">
          <v-icon style="font-size: 42px;" dark v-else>person</v-icon>
        </v-avatar>
        <div v-if="$store.state.authenticated && $store.state.user.id === user.id" id="banner-buttons">
          <v-btn :to="{ name: 'ProfileSettings' }" outline color="grey">
            Edit profile
          </v-btn>
        </div>
      </v-layout>
      <v-layout class="headline mt-3" align-center justify-space-around wrap>
        {{ user.firstName }} {{ user.lastName }}
      </v-layout>
      <v-layout class="mt-2" align-center justify-space-around wrap>
        @{{ user.username }} &nbsp;&centerdot;&nbsp; Member since {{ user.createdOn | formatDateLongerEN }}
      </v-layout>
      <v-layout v-if="user.bio" class="mt-2" align-center justify-space-around wrap>
        {{ user.bio }}
      </v-layout>
    </v-container>
    <v-tabs
      centered
      color="transparent"
      icons-and-text
      show-arrows
      v-model="selectedTab"
    >
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab href="#matches">
        Matches
        <v-icon>list</v-icon>
      </v-tab>
      <v-tab href="#tournaments">
        Tournaments
        <v-icon>line_style</v-icon>
      </v-tab>
      <v-tab href="#statistics">
        Statistics
        <v-icon>bar_chart</v-icon>
      </v-tab>
      <v-tab href="#friends">
        Friends
        <v-icon>people</v-icon>
      </v-tab>
      <v-tab href="#favorites">
        Favorites
        <v-icon>favorite</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="selectedTab">
      <v-tab-item id="matches">
        <v-card flat>
          <v-card-text>Recent matches</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="tournaments">
        <v-card flat>
          <v-card-text>Recent tournaments</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="statistics">
        <v-card flat>
          <v-card-text>All statistics of this player</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="friends">
        <v-card flat>
          <v-layout v-if="user.friends.length > 0" wrap>
            <v-flex v-for="friend in user.friends" :key="friend.id" xs12 sm6 md4 lg3 class="ma-3 friend">
              <v-avatar size="60px" :color="!user.profilePicture ? 'red' : 'transparent'">
                <img v-if="user.profilePicture" :src="profilePicture(user.profilePicture, 60)">
                <v-icon style="font-size: 30px;" dark v-else>person</v-icon>
              </v-avatar>
              <div>
                {{ friend.firstName }} {{ friend.lastName }}<br />
                @{{ friend.username }}
              </div>
            </v-flex>
          </v-layout>
          <v-card-text v-else>This player has not added friends yet.</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="favorites">
        <v-card flat>
          <v-card-text>Favorites of this player</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.params.username,
      user:
        JSON.parse(
          localStorage.getItem('profile:' + this.$route.params.username)
        ) || {},
      selectedTab: localStorage.getItem('profile:selectedTab') || 'statistics'
    }
  },
  mounted() {
    this.getProfileByUsername()
  },
  methods: {
    getProfileByUsername() {
      this.$axios
        .get(process.env.API + '/Users/' + this.$route.params.username + '/profile')
        .then(response => {
          this.user = response.data
          // Save to local storage
          localStorage.setItem(
            'profile:' + this.$route.params.username,
            JSON.stringify(this.user)
          )
        })
        .catch(error => {
          this.$logger.error(error)
        })
    },
    profilePicture(url, size) {
      // Google standard
      if (url.includes('google') && url.includes('?sz=50')) {
        url = url.replace('sz=50', 'sz=' + size)
      }
      return url
    }
  },
  watch: {
    $route(value) {
      switch (value.name) {
        case 'ProfileMatches':
          this.selectedTab = 'matches'
          break
        case 'ProfileTournaments':
          this.selectedTab = 'tournaments'
          break
        case 'ProfileStatistics':
          this.selectedTab = 'statistics'
          break
        case 'ProfileFriends':
          this.selectedTab = 'friends'
          break
        case 'ProfileFavorites':
          this.selectedTab = 'favorites'
          break
      }

      // Reload profile when username changes in URL
      if (this.username && this.username !== value.params.username) {
        this.username = value.params.username
        this.getProfileByUsername()
      }
    },
    selectedTab(id) {
      // Save to local storage
      localStorage.setItem('profile:selectedTab', id)

      // Goto route
      let routeName
      switch (id) {
        case 'matches':
          routeName = 'ProfileMatches'
          break
        case 'tournaments':
          routeName = 'ProfileTournaments'
          break
        case 'statistics':
          routeName = 'ProfileStatistics'
          break
        case 'friends':
          routeName = 'ProfileFriends'
          break
        case 'favorites':
          routeName = 'ProfileFavorites'
          break
        default:
          routeName = 'Profile'
          break
      }
      this.$router.push({name: routeName, params: {username: this.$route.params.username}})
    }
  },
  name: 'Profile'
}
</script>
