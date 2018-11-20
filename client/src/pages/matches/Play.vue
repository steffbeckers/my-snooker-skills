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
      <v-form
        ref="newMatchForm"
        v-model="newMatchFormValid"
        @submit="start"
      >
        <v-layout class="pb-3" row wrap>
          <v-flex xs12 sm4>
            <p class="title">Players</p>
            <p :class="$vuetify.breakpoint.xs ? 'mb-0' : ''">Add your friends or search for players by name or username. At least 2 players need to be added.</p>
            <v-btn v-if="!currentUserAddedToMatch" @click="match.players.push(meAsPlayer)" color="primary" block flat>Add yourself</v-btn>
            <v-autocomplete
              :items="friendsThatCanBeAddedToMatch"
              v-model="friendSelector"
              label="Add friend"
              :filter="userFilter"
              @change="() => { match.players.unshift(friendSelector); friendSelector = {} }"
            >
              <template slot="selection" slot-scope="data">
                {{ data.item.firstName }} {{ data.item.lastName }}
              </template>
              <template
                slot="item"
                slot-scope="data"
              >
                <template>
                  <v-list-tile-avatar :color="!data.item.profilePicture ? 'red' : 'transparent'">
                    <img v-if="data.item.profilePicture" :src="data.item.profilePicture">
                    <v-icon dark v-else>person</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ data.item.firstName }} {{ data.item.lastName }}</v-list-tile-title>
                    <v-list-tile-sub-title>@{{ data.item.username }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
            <!-- Player selector -->
          </v-flex>
          <v-flex xs12 sm8>
            <v-layout row wrap>
              <v-flex
                v-for="player in match.players"
                :key="player.id"
                xs12
              >
                <v-card>
                  <v-card-title primary-title>
                    <v-avatar @click="$router.push({name: 'Profile', params: {username: player.username}})" class="ml-1 mr-4" size="60px" :color="!player.profilePicture ? 'red' : 'transparent'">
                      <img v-if="player.profilePicture" :src="player.profilePicture">
                      <v-icon style="font-size: 42px;" dark v-else>person</v-icon>
                    </v-avatar>
                    <div @click="$router.push({name: 'Profile', params: {username: player.username}})">
                      <div class="headline">{{ player.firstName }} {{ player.lastName }}</div>
                      <div>@{{ player.username }}</div>
                    </div>
                    <v-spacer v-if="match.handicap"></v-spacer>
                    <div class="handicap-selector" v-if="match.handicap">
                      <v-text-field
                        v-model.number="match.handicaps[player.id]"
                        label="Handicap"
                        type="number"
                        clearable
                      ></v-text-field>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn @click="removePlayer(player)" flat>
                      Remove&nbsp;<span v-if="player.id === $store.state.user.id">yourself</span><span v-else>player</span>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <!-- <v-flex
                v-for="player in match.players"
                :key="player.id"
                xs12
              >
                <v-card class="text-xs-center">
                  <v-icon>add</v-icon>
                </v-card>
              </v-flex> -->
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout class="pt-3 pb-3" row wrap>
          <v-flex xs12 sm4>
            <p class="title">Settings</p>
            <p :class="$vuetify.breakpoint.xs ? 'mb-0' : ''">Configure some match settings.</p>
            <v-switch
              label="Handicap?"
              v-model="match.handicap"
              color="primary"
            ></v-switch>
          </v-flex>
          <v-flex xs12 sm8>
            <v-layout row wrap>
              <v-flex xs6 sm4>
                <v-select
                  :items="bestOf"
                  v-model="match.bestOf"
                  label="Best Of (frames)"
                ></v-select>
              </v-flex>
              <v-flex xs6 sm4>
                <v-select
                  :items="[6, 10, 15]"
                  v-model="match.reds"
                  label="Reds"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select
                  :items="[{name: 'Simple', value: 'simple'}, {name: 'Advanced', value: 'advanced'}, {name: 'Full', value: 'full'}]"
                  item-text="name"
                  item-value="value"
                  v-model="match.scoreboardType"
                  label="Scoreboard Type"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-select
                  :items="match.players"
                  v-model="match.wonToss"
                  label="Won Toss"
                  clearable
                >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.firstName }} {{ data.item.lastName }}
                  </template>
                  <template
                    slot="item"
                    slot-scope="data"
                  >
                    <template>
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
                </v-select>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select
                  :items="match.players"
                  v-model="match.breakOff"
                  label="Break Off"
                  clearable
                >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.firstName }} {{ data.item.lastName }}
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
                </v-select>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select
                  :items="friendsThatCanBeAddedToMatchAsReferee"
                  v-model="match.referee"
                  label="Referee"
                  clearable
                >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.firstName }} {{ data.item.lastName }}
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
                </v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-btn
          color="primary"
          type="submit"
          block
          :disabled="match.players.length < 2 || $store.state.loading"
        >
          Start match
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<style scoped>
.handicap-selector {
  max-width: 125px;
}
</style>

<script>
export default {
  data() {
    return {
      match: {
        state: 'new',
        bestOf: 3, // TODO: Application setting
        reds: 15, // TODO: Application setting (15, 10, 6)
        players: [],
        scores: {},
        handicap: false,
        handicaps: {},
        scoreboardType: 'simple', // // TODO: Application setting (simple, advanced, full)
        referee: {},
        // First frame
        wonToss: {},
        breakOff: {}
      },
      meAsPlayer: {
        id: this.$store.state.user.id,
        firstName: this.$store.state.user.firstName,
        lastName: this.$store.state.user.lastName,
        username: this.$store.state.user.username,
        profilePicture: this.$store.state.user.profilePicture
      },
      newMatch: {},
      newMatchFormValid: false,
      friendSelector: {}
    };
  },
  created() {
    // Add me to match
    this.match.players.push(this.meAsPlayer)

    // New match copy
    this.newMatch = { ...this.match }

    // Retrieve match from local storage
    this.match = JSON.parse(localStorage.getItem('match:play')) || this.newMatch

    // Play match against friend
    if (this.$route.params.username) {
      let usernamesOfPlayersAddedToMatch = this.match.players.map(p => p.username)
      if (!usernamesOfPlayersAddedToMatch.includes(this.$route.params.username)) {
        this.$axios
          .get(
            process.env.VUE_APP_API +
              '/Users/' +
              this.$route.params.username +
              '/profile'
          )
          .then(response => {
            this.match.players.unshift(response.data)
            this.$router.push({ name: 'MatchesPlay' })
          })
          .catch(error => {
            this.$logger.error(error)
          });
      }
    }

    // Retrieve match with state 'new' from local db
    // this.$db.matches
    //   .where('state')
    //   .equals('new')
    //   .first(function(match) {
    //     if (match) this.match = match
    //   });
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
  computed: {
    bestOf() {
      let max = 35 // TODO: Application setting
      let arrayOfNumbers = []
      for (let i = 0; i <= max / 2; i++) {
        arrayOfNumbers[i] = 2 * i + 1;
      }
      return arrayOfNumbers
    },
    friendsThatCanBeAddedToMatch() {
      let idsOfPlayersAddedToMatch = this.match.players.map(p => p.id)
      return this.$store.state.user.friends.filter(f => !idsOfPlayersAddedToMatch.includes(f.id))
    },
    friendsThatCanBeAddedToMatchAsReferee() {
      if (!this.currentUserAddedToMatch) {
        return [this.meAsPlayer, ...this.friendsThatCanBeAddedToMatch]
      }
      return this.friendsThatCanBeAddedToMatch
    },
    currentUserAddedToMatch() {
      return this.match.players.find((p) => {
        return p.id === this.$store.state.user.id
      })
    }
  },
  methods: {
    start(e) {
      // TODO: Local creation of match

      e.preventDefault() // Submit

      // Body to create match
      this.$logger.log(this.match)
      let matchToCreate = { ...this.match }
      // Scores
      matchToCreate.scores = {}
      this.match.players.forEach(p => {
        matchToCreate.scores[p.id] = 0
      });

      // Referee
      if (this.match.referee) {
        matchToCreate.refereeId = this.match.referee.id
        delete matchToCreate.referee
      }

      // First frame
      matchToCreate.firstFrame = {}
      if (this.match.wonToss) {
        matchToCreate.firstFrame.tossWonById = this.match.wonToss.id
        delete matchToCreate.wonToss
      }
      if (this.match.breakOff) {
        matchToCreate.firstFrame.breakOffById = this.match.breakOff.id
        delete matchToCreate.breakOff
      }
      if (matchToCreate.firstFrame == {}) {
        delete matchToCreate.firstFrame
      }
      this.$logger.log(matchToCreate)

      // API
      this.$axios
        .post(process.env.VUE_APP_API + '/Matches', matchToCreate)
        .then((response) => {
          // TODO: Add new match to local storage

          // Clear draft match from local storage
          localStorage.removeItem('match:play')

          // Navigate to new match
          this.$router.push({ name: 'Match', params: { id: response.data.id } })
        })
    },
    userFilter (item, queryText) {
      const firstName = item.firstName.toLowerCase()
      const lastName = item.lastName.toLowerCase()
      const username = item.username.toLowerCase()
      const searchText = queryText.replace('@', '').toLowerCase()

      return username.indexOf(searchText) > -1 ||
        firstName.indexOf(searchText) > -1 ||
        lastName.indexOf(searchText) > -1
    },
    removePlayer(player) {
      const index = this.match.players.map(p => p.id).indexOf(player.id)
      if (index >= 0) this.match.players.splice(index, 1)
    },
    reset() {
      this.match = { ...this.newMatch }
    }
  },
  watch: {
    match: {
      handler: function(value) {
        // Update to local storage
        localStorage.setItem('match:play', JSON.stringify(value))
      },
      deep: true
    }
  },
  name: 'MatchesPlay'
};
</script>
