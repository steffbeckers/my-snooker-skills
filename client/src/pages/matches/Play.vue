<template>
  <div>
    <v-toolbar color='transparent' class='elevation-0'>
      <v-toolbar-title color='grey'>
        <v-icon class='mr-2'>add</v-icon> Start a new match
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="reset()" icon><v-icon color="rgba(0,0,0,.54)">refresh</v-icon></v-btn>
      <v-btn :to="{ name: 'Matches' }" exact icon>
        <v-icon color="rgba(0,0,0,.54)">close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class='pt-2' grid-list-lg fluid>
      <v-layout>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      match: {
        state: 'new',
        bestOf: 3, // TODO: Application setting
        reds: 15, // TODO: Application setting (15, 10, 6)
        players: [{
          id: this.$store.state.user.id,
          firstName: this.$store.state.user.firstName,
          lastName: this.$store.state.user.lastName,
          username: this.$store.state.user.username,
          profilePicture: this.$store.state.user.profilePicture,
        }],
        scores: [],
        handicap: false,
        handicaps: [],
        scoreboardType: 'simple', // // TODO: Application setting (simple, advanced, full)
        referee: {},
        // First frame
        wonToss: {},
        breakOff: {}
      },
      newMatch: {}
    }
  },
  created() {
    // New match copy
    this.newMatch = Object.assign({}, this.match)

    // Play match against friend
    if (this.$route.params.username) {
      this.$axios
        .get(process.env.VUE_APP_API + '/Users/' + this.$route.params.username + '/profile')
        .then(response => {
          this.match.players.push(response.data)
          delete this.$route.params.username
        })
        .catch(error => {
          this.$logger.error(error)
        })
    }
  },
  // async mounted() {
  //   // // Dexie test
  //   // // Insert
  //   // let id = await this.$db.matches.add({
  //   //   startDateTime: new Date(),
  //   //   endDateTime: new Date(),
  //   //   reds: 15,
  //   //   bestOf: 5,
  //   //   scoreboardType: 'simple',
  //   //   createdOn: new Date(),
  //   //   updatedOn: new Date()
  //   // })
  //   // this.$logger.log(`Match with ID: ${id} saved in indexeddb!`)
  //   // // Query
  //   // var matches = await this.$db.matches.toArray()
  //   // this.$logger.log(matches)
  // },
  methods: {
    start() {

    },
    reset() {
      this.match = Object.assign({}, this.newMatch)
    }
  },
  name: 'MatchesPlay'
}
</script>
