<template>
  <v-layout row wrap>
    <v-flex
      xl3
      lg4
      sm6
      xs12
      v-for="tournament in tournaments" :key="tournament.id"
    >
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline">{{ tournament.startDateTime | formatDateTime }}<span v-if="tournament.endDateTime"> - {{ tournament.endDateTime | formatDateTime }}</span></h3>
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
    'tournaments'
  ],
  name: 'TournamentsCardList'
}
</script>
