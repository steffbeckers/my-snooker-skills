<template>
  <v-layout row wrap>
    <v-flex
      xl3
      lg4
      sm6
      xs12
      v-for="match in matches" :key="match.id"
    >
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline">{{ match.players[0].firstName }} {{ match.players[0].lastName }} - {{ match.players[1].firstName }} {{ match.players[1].lastName }}</h3>
        </v-card-title>
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
