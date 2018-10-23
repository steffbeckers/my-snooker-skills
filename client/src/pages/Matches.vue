<template>
  <div>
    <v-toolbar color="transparent" class="elevation-0">
      <v-toolbar-title color="grey">
        <v-icon class="mr-2">list</v-icon> Matches
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'MatchesPlay' }" exact color="primary">
        Play
      </v-btn>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="pt-2" grid-list-lg fluid>
      <MatchesCardList v-if="listType === 'cards'" :matches="matches"></MatchesCardList>
    </v-container>
  </div>

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
        .get(process.env.VUE_APP_API + '/Matches?filter=' + encodeURI(JSON.stringify(filter)))
        .then(response => {
          this.matches = response.data
        })
    }
  },
  name: 'Matches'
}
</script>
