<template>
  <v-container class="pt-2 pb-3" grid-list-lg fluid>
    <v-layout class="score-overview" row>
      <v-flex xs4>
        <div class="text-xs-center">
          <div>{{ frame.players[0].firstName }} {{ frame.players[0].lastName }}</div>
        </div>
      </v-flex>
      <v-flex>
        <div class="text-xs-center">{{ frame.scores[frame.players[0].id] || 0 }}</div>
      </v-flex>
      <v-flex class="text-xs-center">
        <div
          style="white-space: nowrap"
        >{{ frame.match.scores[frame.players[0].id] }} ({{ frame.match.bestOf }}) {{ frame.match.scores[frame.players[1].id] }}</div>
      </v-flex>
      <v-flex>
        <div class="text-xs-center">{{ frame.scores[frame.players[1].id] || 0 }}</div>
      </v-flex>
      <v-flex xs4>
        <div class="text-xs-center">
          <div>{{ frame.players[1].firstName }} {{ frame.players[1].lastName }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout class="score-overview" row>
      <v-btn block flat @click="switchPlayer()">Switch player</v-btn>
    </v-layout>
  </v-container>
</template>

<style scoped>
div.layout.score-overview div.flex {
  padding-top: 4px;
}
</style>

<script>
export default {
  props: ["frame"],
  methods: {
    switchPlayer() {
      this.frame.turnOfId = this.frame.players[0].id === this.frame.turnOfId ? this.frame.players[1].id : this.frame.players[0].id
    }
  },
  name: "SimpleScoreboard"
};
</script>
