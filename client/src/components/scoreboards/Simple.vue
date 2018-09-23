<template>
  <div class="simple-scoreboard">
    <v-layout column>
      <v-flex xs12 v-for="player in $store.state.ssb.players" :key="player.id" class="text-xs-center">
        <v-avatar size="70px" :color="!player.profilePicture ? 'red' : 'transparent'">
          <img v-if="player.profilePicture" :src="player.profilePicture">
          <v-icon style="font-size: 26px;" dark v-else>person</v-icon>
        </v-avatar>
        <div class="headline mt-2">
          {{ player.firstName }} {{ player.lastName }}
        </div>
        <div class="display-4">
          {{ scoreOfPlayer(player.id) || 0 }}
        </div>
      </v-flex>
    </v-layout>
    <div class="display-2 text-xs-center mb-2">
      {{ $store.state.ssb.currentScore || 0 }}
    </div>
    <v-btn @click="$store.commit('ssb/inputScore', '1')" color="secondary" class="elevation-0" large>1</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '2')" color="secondary" class="elevation-0" large>2</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '3')" color="secondary" class="elevation-0" large>3</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '4')" color="secondary" class="elevation-0" large>4</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '5')" color="secondary" class="elevation-0" large>5</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '6')" color="secondary" class="elevation-0" large>6</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '7')" color="secondary" class="elevation-0" large>7</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '8')" color="secondary" class="elevation-0" large>8</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '9')" color="secondary" class="elevation-0" large>9</v-btn>
    <v-btn @click="$store.commit('ssb/inputScore', '0')" color="secondary" class="elevation-0" :disabled="$store.state.ssb.currentScore === ''" large>0</v-btn>
    <v-btn @click="$store.commit('ssb/resetScore')" color="secondary" class="elevation-0" :disabled="$store.state.ssb.currentScore === ''" large>C</v-btn>
    <v-btn @click="$store.commit('ssb/addScore')" class="elevation-0" :disabled="$store.state.ssb.currentScore === ''" color="primary" block large>Add score</v-btn>
    <v-btn @click="$store.commit('ssb/undo')" class="elevation-0" color="primary" block large>Undo</v-btn>
  </div>
</template>

<script>
export default {
  props: [
    'players'
  ],
  created() {
    this.$store.commit('ssb/setPlayers', this.players)
  },
  methods: {
    scoreOfPlayer: function(playerId) {
      if (!this.$store.state.ssb.scores || !this.$store.state.ssb.scores['5b846ea93fc3df3dac82eb0b'] || this.$store.state.ssb.scores['5b846ea93fc3df3dac82eb0b'].length === 0) { return 0 }
      return this.$store.state.ssb.scores['5b846ea93fc3df3dac82eb0b'].reduce((total, score) => {
        return total + score.value
      }, 0)
    }
  },
  name: 'SimpleScoreboard'
}
</script>
