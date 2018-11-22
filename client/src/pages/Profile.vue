<template>
  <div>
    <Loader v-if="!user"></Loader>
    <div v-if="user">
      <v-container grid-list-lg fluid>
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
        <v-layout class="display-1 font-weight-light mt-3" align-center justify-space-around wrap>
          {{ user.firstName }} {{ user.lastName }}
        </v-layout>
        <v-layout class="mt-2" align-center justify-space-around wrap>
          @{{ user.username }} &nbsp;&centerdot;&nbsp; Member since {{ user.createdOn | formatDateLongerEN }}
        </v-layout>
        <v-layout class="mt-2" align-center justify-space-around wrap>
          <span style="cursor: pointer" v-if="user.club && user.club.name"><v-icon small>place</v-icon> {{ user.club.name }}</span>
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
          <v-icon>people_outline</v-icon>
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
          <!-- <v-badge color="red">
            <span slot="badge">420</span>
            <v-icon>people</v-icon>
          </v-badge> -->
        </v-tab>
        <v-tab href="#favorites">
          Favorites
          <v-icon>favorite</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="selectedTab">
        <v-tab-item value="matches">
          <v-card class="elevation-0">
            <v-toolbar color="white" class="elevation-0">
              <v-toolbar-title color="rgba(0,0,0,.54)">
                <v-icon color="rgba(0,0,0,.54)" class="mr-2">people_outline</v-icon> Recent matches
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn :to="{ name: 'MatchesPlayAgainst', params: { username: user.username } }" v-if="$store.state.authenticated && $store.state.user.id !== user.id && user && playerIsAFriend()" flat>
                Play match
              </v-btn>
              <v-btn icon>
                <v-icon color="rgba(0,0,0,.54)">search</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tournaments">
          <v-card class="elevation-0">
            <v-card-text>Recent tournaments</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="statistics">
          <v-card class="elevation-0">
            <v-card-text>All statistics of this player</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="friends">
          <v-card class="elevation-0">
            <v-toolbar color="white" class="elevation-0">
              <v-toolbar-title color="rgba(0,0,0,.54)">
                <v-icon color="rgba(0,0,0,.54)" class="mr-2">people</v-icon>
                <span v-if="$store.state.authenticated && $store.state.user.id === user.id && user.friends.length === 0">Add friends</span>
                <span v-else-if="user.friends.length === 0">Friends</span>
                <span v-if="user.friends.length === 1">1 friend</span>
                <span v-if="user.friends.length > 1">{{ user.friends.length }} friends</span>
              </v-toolbar-title>
              <v-btn v-if="$store.state.authenticated && $store.state.user.id === user.id" :to="{name: 'Players'}" icon>
                <v-icon color="rgba(0,0,0,.54)">add</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="$store.state.authenticated && $store.state.user.id !== user.id && user && !playerIsAFriend()" @click="addPlayerAsFriend(user)" flat>
                <v-icon color="rgba(0,0,0,.54)" class="mr-2">add</v-icon> Add as friend
              </v-btn>
              <v-btn icon>
                <v-icon color="rgba(0,0,0,.54)">search</v-icon>
              </v-btn>
              <v-menu v-if="playerIsAFriend()" bottom left>
                <v-btn
                  slot="activator"
                  icon
                >
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-if="$store.state.authenticated && $store.state.user.id !== user.id && playerIsAFriend()" @click="removePlayerAsFriend(user)">
                    <v-list-tile-title>Remove as friend</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar>
            <v-container grid-list-lg fluid class="pt-0">
              <v-layout v-if="user.friends && user.friends.length > 0" wrap>
                <v-flex v-for="friend in user.friends" :key="friend.id" xs12 sm6 md4 class="ma-3 friend">
                  <v-avatar @click="$router.push({name: 'Profile', params: {username: friend.username}})" class="friend__avatar" size="60px" :color="!friend.profilePicture ? 'red' : 'transparent'">
                    <img v-if="friend.profilePicture" :src="profilePicture(friend.profilePicture, 60)">
                    <v-icon style="font-size: 30px;" dark v-else>person</v-icon>
                  </v-avatar>
                  <div @click="$router.push({name: 'Profile', params: {username: friend.username}})" class="friend__details ml-3 mr-3 pa-2">
                    <div class="friend__name subheading">
                      {{ friend.firstName }} {{ friend.lastName }}
                    </div>
                    <div class="friend__username">
                      @{{ friend.username }}
                    </div>
                  </div>
                  <div v-if="$store.state.authenticated && $store.state.user.id === user.id" class="friend__actions pa-2">
                    <v-menu bottom left>
                      <v-btn
                        slot="activator"
                        icon
                      >
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-title>Add to favorites</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="removePlayerAsFriend(friend)">
                          <v-list-tile-title>Remove as friend</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </div>
                </v-flex>
              </v-layout>
              <v-card-text class="pa-0" v-else-if="$store.state.authenticated && $store.state.user.id === user.id">You haven't added friends yet.</v-card-text>
              <v-card-text class="pa-0" v-else>This player has not added friends yet.</v-card-text>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item value="favorites">
          <v-card class="elevation-0">
            <v-card-text>Favorites of this player</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<style scoped>
.friend .friend__details {
  float: left;
}

.friend .friend__avatar {
  float: left;
}

.friend .friend__actions {
  float: right;
}
</style>

<script>
import Loader from '../components/Loader.vue'

export default {
  data() {
    return {
      username: this.$route.params.username,
      user: null,
      selectedTab: localStorage.getItem('profile:selectedTab') || 'statistics'
    }
  },
  created() {
    switch (this.$route.name) {
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
      default:
        this.selectedTab = localStorage.getItem('profile:selectedTab') || 'statistics'
        break
    }
  },
  mounted() {
    this.getProfileByUsername()
  },
  methods: {
    getProfileByUsername() {
      this.$axios
        .get(process.env.VUE_APP_API + '/Users/' + this.$route.params.username + '/profile')
        .then(response => {
          this.user = response.data
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
    },
    playerIsAFriend() {
      // User needs to be loaded
      if (!this.user) return

      // We need to be authenticated and have friends
      if (!this.$store.state.authenticated || !this.$store.state.user.friends) return

      // Check for friends
      return this.$store.state.user.friends.some((friend) => {
        return friend.id === this.user.id
      })
    },
    addPlayerAsFriend(friend) {
      this.$store.dispatch('addPlayerAsFriend', friend).then(
        () => {
          this.getProfileByUsername()
        },
        this.$logger.error
      )
    },
    removePlayerAsFriend(friend) {
      this.$store.dispatch('removePlayerAsFriend', friend).then(
        () => {
          this.getProfileByUsername()
        },
        this.$logger.error
      )
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
      if (this.username !== value.params.username) {
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
  components: {
    Loader
  },
  name: 'Profile'
}
</script>
