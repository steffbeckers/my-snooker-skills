<template>
  <v-container grid-list-lg fluid>
    <v-layout row>
      <v-flex>
        <div class="title">Scoreboard</div>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md8 lg6>
        <SimpleScoreboard v-if="type === 'simple'" :players="players"></SimpleScoreboard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SimpleScoreboard from '../../components/scoreboards/Simple.vue'

export default {
  data() {
    return {
      type: 'simple',
      players: [this.$store.state.user]
    }
  },
  components: {
    SimpleScoreboard
  },
  name: 'TrainingScoreboard'
}
</script>
