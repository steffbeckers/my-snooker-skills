<template>
  <v-layout row wrap>
    <v-flex
      xl3
      sm4
      xs12
      v-for="player in players" :key="player.id"
    >
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline">{{ player.firstName }} {{ player.lastName }}</h3>
        </v-card-title>
        <v-card-text>
          <div>@{{ player.username }}</div>
          <v-btn v-if="$store.state.authenticated && !playerIsAFriend(player)" @click="addPlayerAsFriend(player)" icon>
            <v-icon color="rgba(0,0,0,.54)">add</v-icon>
          </v-btn>
          <v-btn v-else @click="removePlayerAsFriend(player)" icon>
            <v-icon color="rgba(0,0,0,.54)">remove</v-icon>
          </v-btn>
        </v-card-text>
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
    },
    addPlayerAsFriend(player) {
      this.$axios
        .put(process.env.VUE_APP_API + '/Users/' + this.$store.state.user.id + '/friends/rel/' + player.id)
        .then(response => {
          // Add player to friends in state
          this.$store.commit('addFriend', player)
          playerIsAFriend(player)
        })
        .catch(error => {
          this.$logger.error(error)
        })
    },
    removePlayerAsFriend(player) {
      this.$axios
        .delete(process.env.VUE_APP_API + '/Users/' + this.$store.state.user.id + '/friends/rel/' + player.id)
        .then(response => {
          // Remove player from friends in state
          this.$store.commit('removeFriend', player)
          playerIsAFriend(player)
        })
        .catch(error => {
          this.$logger.error(error)
        })
    }
  },
  name: 'PlayersCardList'
}
</script>
