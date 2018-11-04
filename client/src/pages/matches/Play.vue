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
        <v-form
          ref="newMatchForm"
          v-model="newMatchFormValid"
          @submit="start"
        >
          <v-flex>
            <v-autocomplete
              v-model="match.players"
              :items="[{
                id: $store.state.user.id,
                firstName: $store.state.user.firstName,
                lastName: $store.state.user.lastName,
                username: $store.state.user.username,
                profilePicture: $store.state.user.profilePicture
              },...$store.state.user.friends]"
              chips
              label="Players"
              :item-text="['firstName', 'lastName', 'username']"
              item-value="item"
              multiple
            >
              <template
                slot="selection"
                slot-scope="data"
              >
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="removePlayer(data.item)"
                >
                  <v-avatar :color="!data.item.profilePicture ? 'red' : 'transparent'">
                    <img v-if="data.item.profilePicture" :src="data.item.profilePicture">
                    <v-icon color="white" v-else>person</v-icon>
                  </v-avatar>
                  {{ data.item.firstName }} {{ data.item.lastName }}
                </v-chip>
              </template>
              <template
                slot="item"
                slot-scope="data"
              >
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar :color="!data.item.profilePicture ? 'red' : 'transparent'">
                    <img v-if="data.item.profilePicture" :src="data.item.profilePicture">
                    <v-icon dark v-else>person</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ data.item.firstName }} {{ data.item.lastName }}</v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.username"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
        </v-form>
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
      newMatch: {},
      newMatchFormValid: false
    }
  },
  created() {
    // New match copy
    this.newMatch = {...this.match}

    // Retrieve match with state 'new' from local db
    this.$db.matches.where('state').equals('new').first(function(match) {
      if (match) this.match = match
    })

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
    start(e) {
      e.preventDefault() // Submit
    },
    removePlayer(player) {
      const index = this.match.players.map(p => p.id).indexOf(player.id)
      if (index >= 0) this.match.players.splice(index, 1)
    },
    reset() {
      this.match = {...this.newMatch}
    }
  },
  watch: {
    match: {
      handler: function(value) {
        // Update to local db
        this.$db.matches.put(value)
      },
      deep: true
    }
  },
  name: 'MatchesPlay'
}
</script>
