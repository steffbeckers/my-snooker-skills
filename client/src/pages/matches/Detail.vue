<template>
  <div>
    <Loader v-if="!match"></Loader>
    <div v-if="match">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title color="grey">
          <v-icon class="mr-2">people_outline</v-icon> Match
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="concede()" v-if="canEdit && match.state === 'started' && !$vuetify.breakpoint.xs" class="mr-3" flat>
          <v-icon class="mr-2">close</v-icon>End match
        </v-btn>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-3">
          <v-icon class="mr-1">access_time</v-icon>
          <div class="d-inline-block div-next-to-icon"><strong v-if="!match.endDateTime">Started on:</strong> {{ match.startDateTime | formatDateTime }}<span v-if="match.endDateTime"> - {{ match.endDateTime | formatTime }}</span></div>
        </div>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-2">
          <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
          <div class="d-inline-block div-next-to-icon"><strong>Reds:</strong> {{ match.reds }}</div>
        </div>
        <v-btn v-if="$store.state.authenticated" icon>
          <v-icon color="rgba(0,0,0,.54)">favorite</v-icon>
        </v-btn>
        <v-menu v-if="$store.state.authenticated" bottom left>
          <v-btn
            slot="activator"
            icon
          >
            <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-if="canEdit && match.state === 'started' && $vuetify.breakpoint.xs" @click="concede()">
              <v-list-tile-title>End match</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="canEdit && match.state === 'finished'">
              <v-list-tile-title>Edit</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="canEdit" @click="deleteMatch()">
              <v-list-tile-title>Delete</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-container v-if="$vuetify.breakpoint.xs" grid-list-sm fluid class="pt-0">
        <v-layout row>
          <v-flex>
            <v-icon class="mr-1">access_time</v-icon>
            <div class="d-inline-block div-next-to-icon"><strong>Started on:</strong> {{ match.startDateTime | formatDateTime }}</div>
          </v-flex>
          <v-flex>
            <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
            <div class="d-inline-block div-next-to-icon"><strong>Reds:</strong> {{ match.reds }}</div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container class="pt-2 pb-2" grid-list-lg fluid>
        <v-layout v-if="$vuetify.breakpoint.smAndUp" col>
          <v-flex xs4 style="cursor: pointer" @click="$router.push({name: 'Profile', params: {username: match.players[0].username}})">
            <div class="text-xs-center">
              <v-avatar
                class="mb-2"
                size="90px"
                :color="!match.players[0].profilePicture ? 'red' : 'transparent'"
              >
                <img
                  v-if="match.players[0].profilePicture && typeof match.players[0].profilePicture === 'object' && match.players[0].profilePicture.small"
                  :src="match.players[0].profilePicture.small"
                >
                <img
                  v-if="match.players[0].profilePicture && typeof match.players[0].profilePicture === 'string'"
                  :src="match.players[0].profilePicture"
                >
                <v-icon v-if="!match.players[0].profilePicture" style="font-size: 45px;" dark>person</v-icon>
              </v-avatar>
              <div class="headline">
                {{ match.players[0].firstName }} {{ match.players[0].lastName }}
              </div>
            </div>
          </v-flex>
          <v-flex>
            <div class="text-xs-center display-2 mt-4">
              {{ match.scores[match.players[0].id] || 0 }}
            </div>
          </v-flex>
          <v-flex class="text-xs-center mt-4">
            <div>Frames</div>
            <div style="white-space: nowrap">(Best of {{ match.bestOf }})</div>
          </v-flex>
          <v-flex>
            <div class="text-xs-center display-2 mt-4">
              {{ match.scores[match.players[1].id] || 0 }}
            </div>
          </v-flex>
          <v-flex xs4 style="cursor: pointer" @click="$router.push({name: 'Profile', params: {username: match.players[1].username}})">
            <div class="text-xs-center">
              <v-avatar
                class="mb-2"
                size="90px"
                :color="!match.players[1].profilePicture ? 'red' : 'transparent'"
              >
                <img
                  v-if="match.players[1].profilePicture && typeof match.players[1].profilePicture === 'object' && match.players[1].profilePicture.small"
                  :src="match.players[1].profilePicture.small"
                >
                <img
                  v-if="match.players[1].profilePicture && typeof match.players[1].profilePicture === 'string'"
                  :src="match.players[1].profilePicture"
                >
                <v-icon v-if="!match.players[1].profilePicture" style="font-size: 45px;" dark>person</v-icon>
              </v-avatar>
              <div class="headline">
                {{ match.players[1].firstName }} {{ match.players[1].lastName }}
              </div>
            </div>
          </v-flex>
        </v-layout>
        <template v-else>
          <v-layout row>
            <v-flex style="cursor: pointer" @click="$router.push({name: 'Profile', params: {username: match.players[0].username}})" xs6>
              <div class="text-xs-center">
                <v-avatar
                  class="mb-2"
                  size="90px"
                  :color="!match.players[0].profilePicture ? 'red' : 'transparent'"
                >
                  <img
                    v-if="match.players[0].profilePicture && typeof match.players[0].profilePicture === 'object' && match.players[0].profilePicture.small"
                    :src="match.players[0].profilePicture.small"
                  >
                  <img
                    v-if="match.players[0].profilePicture && typeof match.players[0].profilePicture === 'string'"
                    :src="match.players[0].profilePicture"
                  >
                  <v-icon v-if="!match.players[0].profilePicture" style="font-size: 45px;" dark>person</v-icon>
                </v-avatar>
                <div class="headline">
                  {{ match.players[0].firstName }} {{ match.players[0].lastName }}
                </div>
              </div>
            </v-flex>
            <v-flex style="cursor: pointer" @click="$router.push({name: 'Profile', params: {username: match.players[1].username}})" xs6>
              <div class="text-xs-center">
                <v-avatar
                  class="mb-2"
                  size="90px"
                  :color="!match.players[1].profilePicture ? 'red' : 'transparent'"
                >
                  <img
                    v-if="match.players[1].profilePicture && typeof match.players[1].profilePicture === 'object' && match.players[1].profilePicture.small"
                    :src="match.players[1].profilePicture.small"
                  >
                  <img
                    v-if="match.players[1].profilePicture && typeof match.players[1].profilePicture === 'string'"
                    :src="match.players[1].profilePicture"
                  >
                  <v-icon v-if="!match.players[1].profilePicture" style="font-size: 45px;" dark>person</v-icon>
                </v-avatar>
                <div class="headline">
                  {{ match.players[1].firstName }} {{ match.players[1].lastName }}
                </div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4>
              <div class="text-xs-right display-2">
                {{ match.scores[match.players[0].id] || 0 }}
              </div>
            </v-flex>
            <v-flex xs4 class="text-xs-center">
              <div>Frames</div>
              <div style="white-space: nowrap">(Best of {{ match.bestOf }})</div>
            </v-flex>
            <v-flex xs4>
              <div class="display-2">
                {{ match.scores[match.players[1].id] || 0 }}
              </div>
            </v-flex>
          </v-layout>
        </template>
        <v-layout v-if="canEdit && match.frames[0].state === 'finished' && match.state !== 'finished'" row>
          <v-flex xs12>
            <v-btn @click="startNextFrame()" block color="primary">
              <v-icon class="mr-2">play_arrow</v-icon>Next frame
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-tabs
        centered
        color="transparent"
        icons-and-text
        show-arrows
        v-model="selectedTab"
      >
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab href="#frames">
          Frames
          <v-icon>bubble_chart</v-icon>
        </v-tab>
        <v-tab href="#statistics">
          Statistics
          <v-icon>bar_chart</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="selectedTab">
        <v-tab-item value="frames">
          <v-card class="elevation-0">
            <v-container v-if="match.frames && match.frames.length > 0" grid-list-md class="pt-2 pb-2" fluid>
              <v-layout col>
                <v-flex class="text-xs-right" xs4>
                  Score
                </v-flex>
                <v-flex xs4></v-flex>
                <v-flex xs4>
                  Score
                </v-flex>
              </v-layout>
              <v-layout v-for="frame in match.frames" :key="frame.id" @click="$router.push({name: 'Frame', params: {id: frame.id}})" style="cursor: pointer" row wrap>
                <v-flex class="text-xs-right display-1" xs4>
                  {{ frame.scores[frame.players[0].id] }}
                </v-flex>
                <v-flex class="text-xs-center" xs4>
                  <div><strong># {{ frame.number }}</strong></div>
                  <div class="caption">{{ frame.startDateTime | formatTime }}<span v-if="frame.endDateTime"> - {{ frame.endDateTime | formatTime }}</span></div>
                </v-flex>
                <v-flex class="display-1" xs4>
                  {{ frame.scores[frame.players[1].id] }}
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item value="statistics">
          <v-card class="elevation-0">
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<style scoped>
.div-next-to-icon {
  position: relative;
  bottom: 3px;
}
</style>

<script>
import Loader from '../../components/Loader.vue'

export default {
  data() {
    return {
      match: null,
      selectedTab: localStorage.getItem('match:selectedTab') || 'frames'
    };
  },
  computed: {
    canEdit() {
      // Match
      if (!this.match) {
        return false
      }
      // Authenticated
      if (!this.$store.state.authenticated) {
        return false
      }
      // Owner
      if (this.match.ownerId === this.$store.state.user.id) {
        return true
      }
      // Referee
      if (this.match.refereeId === this.$store.state.user.id) {
        return true
      }
      // Players
      let playerIds = this.match.players.map(p => p.id)
      if (playerIds.includes(this.$store.state.user.id)) {
        return true
      }
    }
  },
  mounted() {
    this.getMatch();
  },
  methods: {
    getMatch() {
      this.$axios
        .get(process.env.VUE_APP_API + '/Matches/' + this.$route.params.id + '/detail')
        .then(response => {
          this.match = response.data
        })
        .catch(error => {
          this.$logger.error(error)

          // Custom info message when the match isn't found by ID or is deleted
          if (error.message === 'Match not found') {
            this.$store.commit('message', {
              type: 'info',
              value: `Match with ID: ${this.$route.params.id} could not be found or might be deleted.`,
              keepOnNav: 1 // time(s) or -1 for until manually hidden by user
            })
          }

          // Always return to the matches overview page
          this.$router.push({ name: 'Matches' })
        });
    },
    startNextFrame() {
      let nextFrame = {
        players: this.match.players,
        refereeId: this.match.refereeId,
        scoreboard: {
          type: this.match.scoreboardType || 'simple'
        },
        reds: this.match.reds,
        handicaps: this.match.handicaps,
        number: this.match.frames.length + 1, // TODO: Fix numbering of frames in backend
        turnOfId: this.match.frames[0].breakOffById === this.match.players[0].id ? this.match.players[1].id : this.match.players[0].id // TODO: Fix if matches can be played with multiple players
      }

      // TODO: Move this to backend
      nextFrame.scores = {};
      this.match.players.forEach(function(player) {
        nextFrame.scores[player.id] = 0;
      });

      this.$axios
        .post(process.env.VUE_APP_API + '/Matches/' + this.match.id + '/Frames', nextFrame)
        .then(response => {
          this.$router.push({ name: 'Frame', params: { id: response.data.id }})
        })
    },
    concede() {
      if (confirm('End the match?')) {
        this.$axios
          .post(process.env.VUE_APP_API + '/Matches/' + this.match.id + '/concede')
          .then(response => {
            this.match = Object.assign(this.match, response.data)
          })
      }
    },
    deleteMatch() {
      if (confirm('Delete this match?')) {
        this.$axios
          .delete(process.env.VUE_APP_API + '/Matches/' + this.match.id)
          .then(() => {
            this.$router.push({ name: 'Matches' })
          })
      }
    }
  },
  watch: {
    $route(value) {
      // Reload match when id changes in URL
      if (this.match.id !== value.params.id) {
        this.getMatch()
      }
    },
    selectedTab(id) {
      // Save to local storage
      localStorage.setItem('match:selectedTab', id)
    }
  },
  components: {
    Loader
  },
  name: "MatchDetail"
};
</script>
