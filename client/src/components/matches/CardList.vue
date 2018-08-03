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
          <h3 class="headline">{{ match.startDateTime | formatDateTime }}<span v-if="match.endDateTime"> - {{ match.endDateTime | formatDateTime }}</span></h3>
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
  data() {
    return {
      errors: [],
      matches: []
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
        .get(process.env.API + '/Matches?filter=' + JSON.stringify(filter))
        .then(response => {
          this.matches = response.data
        })
        .catch(error => {
          this.errors.unshift(error)
        })
    }
  },
  name: 'MatchesCardList'
}
</script>
