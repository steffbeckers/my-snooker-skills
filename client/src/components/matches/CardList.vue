<template>
  <v-layout row wrap>
    <v-flex
      xl3
      lg4
      sm6
      xs12
      v-for="match in matches" :key="match.id"
    >
      <v-card v-if="match.players.length === 2">
        <v-container grid-list-sm fluid class="pb-0">
          <v-layout col>
            <v-flex>
              <div class="text-xs-center">
                <v-avatar class="mb-2" size="60px" :color="!match.players[0].profilePicture ? 'red' : 'transparent'">
                  <img v-if="match.players[0].profilePicture" :src="match.players[0].profilePicture">
                  <v-icon v-else style="font-size: 30px;" dark>person</v-icon>
                </v-avatar>
                <div class="headline">
                  {{ match.players[0].firstName }} {{ match.players[0].lastName }}
                </div>
              </div>
            </v-flex>
            <v-flex fill-height>
              <div class="text-xs-center display-3 mt-4" style="white-space: nowrap">
                {{ match.scores[match.players[0].id] || 0 }} - {{ match.scores[match.players[1].id] || 0 }}
              </div>
            </v-flex>
            <v-flex>
              <div class="text-xs-center">
                <v-avatar class="mb-2" size="60px" :color="!match.players[1].profilePicture ? 'red' : 'transparent'">
                  <img v-if="match.players[1].profilePicture" :src="match.players[1].profilePicture">
                  <v-icon v-else style="font-size: 30px;" color="white">person</v-icon>
                </v-avatar>
                <div class="headline">
                  {{ match.players[1].firstName }} {{ match.players[1].lastName }}
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-content>
            <div slot="header"><strong>Started on:</strong> {{ match.startDateTime | formatDateTime }}</div>
            <v-card>
              <v-card-text class="pt-0 pl-4">
                <div v-if="match.referee">
                  <strong>Referee:</strong> {{ match.referee.firstName }} {{ match.referee.lastName }}
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
    'matches'
  ],
  name: 'MatchesCardList'
}
</script>
