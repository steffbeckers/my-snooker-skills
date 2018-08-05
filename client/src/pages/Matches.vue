<template>
  <v-container grid-list-lg fluid>
    <v-layout v-if="errors.length > 0" row>
      <v-flex>
        <v-alert :value="true" v-for="(error, index) in errors" :key="index" type="error">
          {{ error.message }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <div class="title">Recent matches</div>
      </v-flex>
    </v-layout>
    <MatchesCardList v-if="listType === 'cards'" :matches="matches"></MatchesCardList>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
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
        .get(process.env.API + '/Matches?filter=' + JSON.stringify(filter))
        .then(response => {
          this.matches = response.data
        })
        .catch(error => {
          this.errors.unshift(error)
        })
    }
  },
  name: 'Matches'
}
</script>
