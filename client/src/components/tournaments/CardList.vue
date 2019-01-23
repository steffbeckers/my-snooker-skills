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
        <v-card-title primary-title style="cursor: pointer" @click="$router.push({ name: 'Tournament', params: { id: tournament.id }})">
          <div>
            <h3 class="headline">{{ tournament.league.name }} {{ tournament.startDateTime | formatDateDDMM }}</h3>
            <div>
              <v-icon small>place</v-icon> {{ tournament.league.club.name }}
              <span> - {{ tournament.players.length || 0 }} players</span>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <div>{{ tournament.startDateTime | formatDateTime }}<span v-if="tournament.endDateTime && tournament.endDateTime !== tournament.startDateTime"> - {{ tournament.endDateTime | formatTime }}</span></div>
        </v-card-text>
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
