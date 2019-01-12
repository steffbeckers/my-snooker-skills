<template>
  <div>
    <v-toolbar color="transparent" class="elevation-0">
      <v-toolbar-title color="grey">
        <v-icon class="mr-2">assignment</v-icon> Training
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="pt-1" grid-list-lg fluid>
      <v-layout row wrap>
        <v-flex
          xl3
          md4
          sm6
          xs12
          @click="$router.push({name: 'TrainingScoreboard'})"
        >
          <v-card>
            <v-card-title class="pt-3" primary-title>
              <div class="headline">Scoreboard</div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TrainingOverview'
}
</script>
