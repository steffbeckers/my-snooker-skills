<template>
  <v-container grid-list-lg fluid>
    <v-layout row>
      <v-flex>
        <div class="title">Matches</div>
      </v-flex>
    </v-layout>
    <MatchesCardList v-if="listType === 'cards'" :matches="matches"></MatchesCardList>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      matches: [],
      listType: 'cards'
    }
  },
  created() {
    this.listMatches()
  },
  methods: {
    listMatches() {
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
                lastName: true
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
        .get(process.env.API + '/Matches?filter=' + encodeURI(JSON.stringify(filter)))
        .then(response => {
          this.matches = response.data
        })
    }
  },
  name: 'Matches'
}
</script>
