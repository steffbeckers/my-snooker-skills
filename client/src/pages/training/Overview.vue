<template>
  <v-container grid-list-lg fluid>
    <v-layout row>
      <v-flex>
        <div class="title">Training</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xl3
        md4
        sm6
        xs12
        @click="$router.push({name: 'TrainingScoreboard'})"
      >
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Scoreboard</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'TrainingOverview'
}
</script>
