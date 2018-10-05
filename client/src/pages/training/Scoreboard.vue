<template>
  <v-container grid-list-lg fluid>
    <v-breadcrumbs v-if="$vuetify.breakpoint.smAndUp">
      <v-icon slot="divider">fiber_manual_record</v-icon>
      <v-breadcrumbs-item>
        Training
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>
        Scoreboard
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout :class="$vuetify.breakpoint.smAndUp ? 'pt-3 bb-1px-s-eee pb-3' : 'bb-1px-s-eee pb-3'" row wrap>
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
