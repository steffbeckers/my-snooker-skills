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
        <v-layout @click="$router.push({name: 'Profile', params: {username: player.username}})">
          <v-flex class="pt-0" sm3 xs12>
            <v-avatar class="ml-4 mt-4" size="60px" :color="!player.profilePicture ? 'red' : 'transparent'">
              <img v-if="player.profilePicture" :src="profilePicture(player.profilePicture, 60)">
              <v-icon style="font-size: 42px;" dark v-else>person</v-icon>
            </v-avatar>
          </v-flex>
          <v-flex class="pt-0" sm9 xs12>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ player.firstName }} {{ player.lastName }}</div>
                <div>@{{ player.username }}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-card-actions v-if="$store.state.authenticated">
          <v-btn v-if="!playerIsAFriend(player)" @click="$store.dispatch('addPlayerAsFriend', player)" flat>
            <v-icon color="rgba(0,0,0,.54)" class="mr-1">add</v-icon> as friend
          </v-btn>
          <v-btn v-else @click="$store.dispatch('removePlayerAsFriend', player)" flat>
            <v-icon color="rgba(0,0,0,.54)" class="mr-1">remove</v-icon> as friend
          </v-btn>
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
      return this.$store.state.user.friends.hasOwnProperty(player.id);
    }
  },
  name: 'PlayersCardList'
}
</script>
