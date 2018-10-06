<template>
  <v-container grid-list-lg fluid>
    <v-layout row>
      <v-flex>
        <div class="title">Players</div>
      </v-flex>
    </v-layout>
    <PlayersCardList v-if="listType === 'cards'" :players="players"></PlayersCardList>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      players: [],
      listType: 'cards'
    }
  },
  created() {
    this.listPlayers()
  },
  methods: {
    listPlayers() {
      this.$axios
        .get(process.env.VUE_APP_API + '/Users/list')
        .then(response => {
          this.players = response.data
        })
    }
  },
  name: 'Players'
}
</script>
