<template>
  <v-container grid-list-lg fluid>
    <v-layout row>
      <v-flex>
        <div class="title">Tournaments</div>
      </v-flex>
    </v-layout>
    <TournamentsCardList v-if="listType === 'cards'" :tournaments="tournaments"></TournamentsCardList>
  </v-container>
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
      let filter = {
        order: 'startDateTime DESC',
        limit: 200,
        include: [
          {
            relation: 'players',
            scope: {
              fields: {
                id: true,
                firstName: true,
                lastName: true,
                profilePicture: true
              }
            }
          },
          {
            relation: 'frames',
            scope: {
              order: 'startDateTime DESC'
            }
          }
        ]
      }

      this.$axios
        .get(process.env.VUE_APP_API + '/Tournaments?filter=' + encodeURI(JSON.stringify(filter)))
        .then(response => {
          this.tournaments = response.data
        })
    }
  },
  name: 'Tournaments'
}
</script>
