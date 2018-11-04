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
            <p :class="$vuetify.breakpoint.xs ? 'mb-0' : ''">Add your friends or search for players by name or username.</p>
            <!-- Friends selector -->
            <!-- Player selector -->
          </v-flex>
          <v-flex xs12 sm8>
            <!-- Display players in cards -->
            <!-- Add player with plus-sign card -->
          </v-flex>
        </v-layout>
        <v-layout class="pt-3 pb-3" row wrap>
          <v-flex xs12 sm4>
            <p class="title">Settings</p>
            <p :class="$vuetify.breakpoint.xs ? 'mb-0' : ''">Configure some match settings.</p>
          </v-flex>
          <v-flex xs12 sm8>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-select
                  :items="bestOf"
                  :value="match.bestOf"
                  label="Best Of (frames)"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select
                  :items="[6, 10, 15]"
                  :value="match.reds"
                  label="Reds"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select
                  :items="[{name: 'Simple', value: 'simple'}, {name: 'Advanced', value: 'advanced'}, {name: 'Full', value: 'full'}]"
                  item-text="name"
                  item-value="value"
                  :value="match.scoreboardType"
                  label="Scoreboard Type"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-select
                  :items="match.players"
                  :value="match.wonToss"
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
                  :items="match.players"
                  :value="match.wonToss"
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
                  :items="match.players"
                  :value="match.referee"
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
        >
          Start match
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      match: {
        state: "new",
        bestOf: 3, // TODO: Application setting
        reds: 15, // TODO: Application setting (15, 10, 6)
        players: [
          {
            id: this.$store.state.user.id,
            firstName: this.$store.state.user.firstName,
            lastName: this.$store.state.user.lastName,
            username: this.$store.state.user.username,
            profilePicture: this.$store.state.user.profilePicture
          }
        ],
        scores: [],
        handicap: false,
        handicaps: [],
        scoreboardType: "simple", // // TODO: Application setting (simple, advanced, full)
        referee: {},
        // First frame
        wonToss: {},
        breakOff: {}
      },
      newMatch: {},
      newMatchFormValid: false
    };
  },
  created() {
    // New match copy
    this.newMatch = { ...this.match };

    // Retrieve match with state 'new' from local db
    this.$db.matches
      .where("state")
      .equals("new")
      .first(function(match) {
        if (match) this.match = match;
      });

    // Play match against friend
    if (this.$route.params.username) {
      this.$axios
        .get(
          process.env.VUE_APP_API +
            "/Users/" +
            this.$route.params.username +
            "/profile"
        )
        .then(response => {
          this.match.players.push(response.data);
          delete this.$route.params.username;
        })
        .catch(error => {
          this.$logger.error(error);
        });
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
  computed: {
    bestOf() {
      let max = 35; // TODO: Application setting
      let arrayOfNumbers = [];
      for (let i = 0; i <= max / 2; i++) {
        arrayOfNumbers[i] = 2 * i + 1;
      }
      return arrayOfNumbers;
    }
  },
  methods: {
    start(e) {
      e.preventDefault(); // Submit

      this.$logger.log(this.match)
    },
    removePlayer(player) {
      const index = this.match.players.map(p => p.id).indexOf(player.id);
      if (index >= 0) this.match.players.splice(index, 1);
    },
    reset() {
      this.match = { ...this.newMatch };
    }
  },
  watch: {
    match: {
      handler: function(value) {
        // Update to local db
        this.$db.matches.put(value);
      },
      deep: true
    }
  },
  name: "MatchesPlay"
};
</script>
