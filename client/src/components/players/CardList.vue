<template>
  <v-layout row wrap>
    <v-flex
      xl3
      md4
      sm6
      xs12
      v-for="player in players" :key="player.id"
    >
      <v-card>
        <v-card-title :class="!$store.state.authenticated ? 'pb-4' : ''" style="cursor: pointer" @click="$router.push({ name: 'Profile', params: { username: player.username }})" primary-title>
          <v-avatar
            class="ml-1 mr-4"
            size="60px"
            :color="!player.profilePicture ? 'red' : 'transparent'"
          >
            <img
              v-if="player.profilePicture && typeof player.profilePicture === 'object' && player.profilePicture.thumb"
              :src="player.profilePicture.thumb"
            >
            <img
              v-if="player.profilePicture && typeof player.profilePicture === 'string'"
              :src="player.profilePicture"
            >
            <v-icon v-if="!player.profilePicture" style="font-size: 30px;" dark>person</v-icon>
          </v-avatar>
          <div>
            <div class="headline">{{ player.firstName }} {{ player.lastName }}</div>
            <div>@{{ player.username }}<span v-if="player.club"> - <v-icon>place</v-icon> {{ player.club.name }}</span></div>
          </div>
        </v-card-title>
        <v-card-actions v-if="$store.state.authenticated">
          <v-btn v-if="!playerIsAFriend(player)" @click="$store.dispatch('addPlayerAsFriend', player)" flat>
            Add as friend
          </v-btn>
          <v-btn :to="{ name: 'MatchesPlayAgainst', params: { username: player.username } }" v-if="playerIsAFriend(player)" flat>
            Play match
          </v-btn>
          <v-spacer></v-spacer>
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
              <v-list-tile v-if="playerIsAFriend(player)" @click="$store.dispatch('removePlayerAsFriend', player)">
                <v-list-tile-title>Remove as friend</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.card__media,
.card__title {
  cursor: pointer;
}
</style>

<script>
export default {
  props: [
    'players'
  ],
  methods: {
    playerIsAFriend(player) {
      if (!this.$store.state.authenticated || !this.$store.state.user.friends) return
      let isFriend = this.$store.state.user.friends.some((friend) => {
        return friend.id === player.id
      })
      return isFriend;
    },
    // TODO Refactor method in profile component
    profilePicture(url, size) {
      // Google standard
      if (url.includes('google') && url.includes('?sz=50')) {
        url = url.replace('sz=50', 'sz=' + size)
      }
      return url
    },
  },
  name: 'PlayersCardList'
}
</script>
