<template>
  <v-layout row wrap>
    <v-flex
      xl4
      :lg6="!$store.state.drawer && !$store.state.drawer.right"
      :sm12="!$store.state.drawer && !$store.state.drawer.right"
      xs12
      v-for="match in matches" :key="match.id"
    >
      <v-card v-if="match.players.length === 2">
        <v-container style="cursor: pointer" @click="$router.push({ name: 'Match', params: { id: match.id }})" grid-list-sm fluid class="pb-0">
          <v-layout justify-center col>
            <v-flex xs5>
              <div class="text-xs-center">
                <v-avatar
                  class="mb-2"
                  size="60px"
                  :color="!match.players[0].profilePicture ? 'red' : 'transparent'"
                >
                  <img
                    v-if="match.players[0].profilePicture && typeof match.players[0].profilePicture === 'object' && match.players[0].profilePicture.thumb"
                    :src="match.players[0].profilePicture.thumb"
                  >
                  <img
                    v-if="match.players[0].profilePicture && typeof match.players[0].profilePicture === 'string'"
                    :src="match.players[0].profilePicture"
                  >
                  <v-icon v-if="!match.players[0].profilePicture" style="font-size: 30px;" dark>person</v-icon>
                </v-avatar>
                <div class="headline">
                  {{ match.players[0].firstName }} {{ match.players[0].lastName }}
                </div>
              </div>
            </v-flex>
            <v-flex xs2>
              <div class="text-xs-center display-2 mt-4" style="white-space: nowrap">
                {{ match.scores[match.players[0].id] || 0 }} - {{ match.scores[match.players[1].id] || 0 }}
              </div>
            </v-flex>
            <v-flex xs5>
              <div class="text-xs-center">
                <v-avatar
                  class="mb-2"
                  size="60px"
                  :color="!match.players[1].profilePicture ? 'red' : 'transparent'"
                >
                  <img
                    v-if="match.players[1].profilePicture && typeof match.players[1].profilePicture === 'object' && match.players[1].profilePicture.thumb"
                    :src="match.players[1].profilePicture.thumb"
                  >
                  <img
                    v-if="match.players[1].profilePicture && typeof match.players[1].profilePicture === 'string'"
                    :src="match.players[1].profilePicture"
                  >
                  <v-icon v-if="!match.players[1].profilePicture" style="font-size: 30px;" dark>person</v-icon>
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
                <div v-if="match.state">
                  <strong>Status:</strong> {{ match.state === 'started' ? 'Playing' : '' }}
                </div>
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
