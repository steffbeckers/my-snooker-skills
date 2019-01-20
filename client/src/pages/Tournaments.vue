<template>
  <div>
    <v-toolbar color="transparent" class="elevation-0">
      <v-toolbar-title color="grey">
        <v-icon class="mr-2">line_style</v-icon> Tournaments
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="pt-2" grid-list-lg fluid>
      <TournamentsCardList v-if="listType === 'cards'" :tournaments="tournaments"></TournamentsCardList>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tournaments: [],
      listType: 'cards'
    }
  },
  created() {
    this.listTournaments()
  },
  methods: {
    listTournaments() {
      this.$axios
        .get(process.env.VUE_APP_API + '/Tournaments/list')
        .then(response => {
          this.tournaments = response.data
        })
    }
  },
  name: 'Tournaments'
}
</script>
