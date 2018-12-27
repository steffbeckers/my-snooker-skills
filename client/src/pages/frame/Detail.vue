<template>
  <div>
    <Loader v-if="!frame"></Loader>
    <div v-if="frame">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title class="mr-1" color="grey">
          <v-icon class="mr-2">people_outline</v-icon>Frame
        </v-toolbar-title>
        <v-btn
          v-if="frame.match"
          :to="{ name: 'Match', params: { id: frame.match.id} }"
          exact
          flat
        >To match</v-btn>
        <v-btn
          v-if="frame.tournament"
          :to="{ name: 'Tournament', params: { id: frame.tournament.id} }"
          exact
          flat
        >To tournament</v-btn>
        <v-btn v-if="canEdit && !$vuetify.breakpoint.xs" @click="location.hash = 'scoreboard'" flat>
          <v-icon class="mr-2">drag_indicator</v-icon>Scoreboard
        </v-btn>
        <v-spacer></v-spacer>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-3">
          <v-icon class="mr-1">access_time</v-icon>
          <div class="d-inline-block div-next-to-icon">
            <strong>Started on:</strong>
            {{ frame.startDateTime | formatDateTime }}
          </div>
        </div>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-2">
          <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
          <div class="d-inline-block div-next-to-icon">
            <strong>Reds:</strong>
            {{ frame.reds }}
          </div>
        </div>
        <v-btn v-if="canEdit && $vuetify.breakpoint.xs" @click="location.hash = 'scoreboard'" icon>
          <v-icon color="rgba(0,0,0,.54)">drag_indicator</v-icon>
        </v-btn>
        <v-btn v-if="$store.state.authenticated" icon>
          <v-icon color="rgba(0,0,0,.54)">favorite</v-icon>
        </v-btn>
        <v-btn v-if="$store.state.authenticated" icon>
          <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container v-if="$vuetify.breakpoint.xs" grid-list-sm fluid class="pt-0">
        <v-layout row>
          <v-flex>
            <v-icon class="mr-1">access_time</v-icon>
            <div class="d-inline-block div-next-to-icon">
              <strong>Started on:</strong>
              {{ frame.startDateTime | formatDateTime }}
            </div>
          </v-flex>
          <v-flex>
            <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
            <div class="d-inline-block div-next-to-icon">
              <strong>Reds:</strong>
              {{ frame.reds }}
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container class="pt-2 pb-2" grid-list-lg fluid>
        <v-layout v-if="$vuetify.breakpoint.smAndUp" col>
          <v-flex
            xs4
            style="cursor: pointer"
            @click="$router.push({name: 'Profile', params: {username: frame.players[0].username}})"
          >
            <div class="text-xs-center">
              <v-avatar
                class="mb-2"
                size="90px"
                :color="!frame.players[0].profilePicture ? 'red' : 'transparent'"
              >
                <img
                  v-if="frame.players[0].profilePicture && typeof frame.players[0].profilePicture === 'object' && frame.players[0].profilePicture.small"
                  :src="frame.players[0].profilePicture.small"
                >
                <img
                  v-if="frame.players[0].profilePicture && typeof frame.players[0].profilePicture === 'string'"
                  :src="frame.players[0].profilePicture"
                >
                <v-icon v-if="!frame.players[0].profilePicture" style="font-size: 45px;" dark>person</v-icon>
              </v-avatar>
              <div class="headline">{{ frame.players[0].firstName }} {{ frame.players[0].lastName }}</div>
            </div>
          </v-flex>
          <v-flex>
            <div class="text-xs-center display-2 mt-4">{{ frame.scores[frame.players[0].id] || 0 }}</div>
          </v-flex>
          <v-flex class="text-xs-center mt-4">
            <div>Match</div>
            <div
              style="white-space: nowrap"
            >{{ frame.match.scores[frame.players[0].id] }} ({{ frame.match.bestOf }}) {{ frame.match.scores[frame.players[1].id] }}</div>
          </v-flex>
          <v-flex>
            <div class="text-xs-center display-2 mt-4">{{ frame.scores[frame.players[1].id] || 0 }}</div>
          </v-flex>
          <v-flex
            xs4
            style="cursor: pointer"
            @click="$router.push({name: 'Profile', params: {username: frame.players[1].username}})"
          >
            <div class="text-xs-center">
              <v-avatar
                class="mb-2"
                size="90px"
                :color="!frame.players[1].profilePicture ? 'red' : 'transparent'"
              >
                <img
                  v-if="frame.players[1].profilePicture && typeof frame.players[1].profilePicture === 'object' && frame.players[1].profilePicture.small"
                  :src="frame.players[1].profilePicture.small"
                >
                <img
                  v-if="frame.players[1].profilePicture && typeof frame.players[1].profilePicture === 'string'"
                  :src="frame.players[1].profilePicture"
                >
                <v-icon v-if="!frame.players[1].profilePicture" style="font-size: 45px;" dark>person</v-icon>
              </v-avatar>
              <div class="headline">{{ frame.players[1].firstName }} {{ frame.players[1].lastName }}</div>
            </div>
          </v-flex>
        </v-layout>
        <template v-else>
          <v-layout row>
            <v-flex
              style="cursor: pointer"
              @click="$router.push({name: 'Profile', params: {username: frame.players[0].username}})"
              xs6
            >
              <div class="text-xs-center">
                <v-avatar
                  class="mb-2"
                  size="90px"
                  :color="!frame.players[0].profilePicture ? 'red' : 'transparent'"
                >
                  <img
                    v-if="frame.players[0].profilePicture && typeof frame.players[0].profilePicture === 'object' && frame.players[0].profilePicture.small"
                    :src="frame.players[0].profilePicture.small"
                  >
                  <img
                    v-if="frame.players[0].profilePicture && typeof frame.players[0].profilePicture === 'string'"
                    :src="frame.players[0].profilePicture"
                  >
                  <v-icon
                    v-if="!frame.players[0].profilePicture"
                    style="font-size: 45px;"
                    dark
                  >person</v-icon>
                </v-avatar>
                <div
                  class="headline"
                >{{ frame.players[0].firstName }} {{ frame.players[0].lastName }}</div>
              </div>
            </v-flex>
            <v-flex
              style="cursor: pointer"
              @click="$router.push({name: 'Profile', params: {username: frame.players[1].username}})"
              xs6
            >
              <div class="text-xs-center">
                <v-avatar
                  class="mb-2"
                  size="90px"
                  :color="!frame.players[1].profilePicture ? 'red' : 'transparent'"
                >
                  <img
                    v-if="frame.players[1].profilePicture && typeof frame.players[1].profilePicture === 'object' && frame.players[1].profilePicture.small"
                    :src="frame.players[1].profilePicture.small"
                  >
                  <img
                    v-if="frame.players[1].profilePicture && typeof frame.players[1].profilePicture === 'string'"
                    :src="frame.players[1].profilePicture"
                  >
                  <v-icon
                    v-if="!frame.players[1].profilePicture"
                    style="font-size: 45px;"
                    dark
                  >person</v-icon>
                </v-avatar>
                <div
                  class="headline"
                >{{ frame.players[1].firstName }} {{ frame.players[1].lastName }}</div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4>
              <div class="text-xs-right display-2">{{ frame.scores[frame.players[0].id] || 0 }}</div>
            </v-flex>
            <v-flex v-if="frame.match" xs4 class="text-xs-center">
              <div>Match</div>
              <div
                style="white-space: nowrap"
              >{{ frame.match.scores[frame.players[0].id] }} ({{ frame.match.bestOf }}) {{ frame.match.scores[frame.players[1].id] }}</div>
            </v-flex>
            <v-flex v-if="frame.tournament" xs4 class="text-xs-center">-</v-flex>
            <v-flex xs4>
              <div class="display-2">{{ frame.scores[frame.players[1].id] || 0 }}</div>
            </v-flex>
          </v-layout>
        </template>
      </v-container>
      <v-tabs centered color="transparent" icons-and-text show-arrows v-model="selectedTab">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab href="#breaks">Breaks
          <v-icon>bubble_chart</v-icon>
        </v-tab>
        <v-tab href="#statistics">Statistics
          <v-icon>bar_chart</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="selectedTab">
        <v-tab-item value="breaks">
          <v-container grid-list-md class="pt-2" fluid>
            <v-layout col>
              <v-flex xs12 sm8 offset-sm2 xl6 offset-xl3>
                <v-timeline>
                  <v-timeline-item v-for="n in 4" :key="n" color="white lighten-2" small>
                    <span slot="opposite">Tus eu perfecto</span>
                    <v-card class="elevation-2">
                      <v-card-text>Lorem ipsum dolor sit amet</v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
        <v-tab-item value="statistics">
          <v-card class="elevation-0"></v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-if="frame && canEdit" v-model="showScoreboard" fullscreen hide-overlay scrollable>
      <v-card tile>
        <v-toolbar card dark :color="frame.turnOfId === frame.players[0].id ? 'primary' : 'red'" class="elevation-3">
          <v-toolbar-title>{{ playersById[frame.turnOfId].firstName }} {{ playersById[frame.turnOfId].lastName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-select
            :items="[{name: 'Simple', value: 'simple'}, {name: 'Advanced', value: 'advanced'}, {name: 'Full', value: 'full'}]"
            item-text="name"
            item-value="value"
            v-model="frame.scoreboard.type"
            @change="switchScoreboardType()"
            style="max-width: 100px;"
            class="mr-3"
          ></v-select>
          <v-btn icon dark @click="$router.go(-1)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0">
          <SimpleScoreboard v-if="frame.scoreboard.type === 'simple'" :frame="frame" />
          <AdvancedScoreboard v-if="frame.scoreboard.type === 'advanced'" :frame="frame" />
          <FullScoreboard v-if="frame.scoreboard.type === 'full'" :frame="frame" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.div-next-to-icon {
  position: relative;
  bottom: 3px;
}
</style>

<script>
import Loader from "../../components/Loader.vue";
import SimpleScoreboard from "../../components/scoreboards/Simple.vue";
import AdvancedScoreboard from "../../components/scoreboards/Advanced.vue";
import FullScoreboard from "../../components/scoreboards/Full.vue";

// Real-time updates
let realtimeServer;

export default {
  data() {
    return {
      frame: null,
      selectedTab: localStorage.getItem("frame:selectedTab") || "breaks",
      showScoreboard: false,
      location: window.location
    };
  },
  computed: {
    playersById() {
      if (this.frame && this.frame.players.length) {
        return this.frame.players.reduce((obj, item) => {
          obj[item.id] = item
          return obj
        }, {})
      }
      return {}
    },
    canEdit() {
      // Frame
      if (!this.frame) {
        return false
      }
      // Authenticated
      if (!this.$store.state.authenticated) {
        return false
      }
      // Owner
      if (this.frame.ownerId === this.$store.state.user.id) {
        return true
      }
      // Referee
      if (this.frame.refereeId === this.$store.state.user.id) {
        return true
      }
      // Players
      let playerIds = this.frame.players.map(p => p.id)
      if (playerIds.includes(this.$store.state.user.id)) {
        return true
      }
    }
  },
  mounted() {
    this.getFrame();

    // Real-time updates
    (async () => {
      try {
        realtimeServer = await this.$sse(process.env.VUE_APP_API + '/Frames/change-stream', { format: 'json' }); // omit for no format pre-processing

        realtimeServer.subscribe('data', response => {
          if (response.target === this.frame.id && response.type === 'update') {
            this.frame = Object.assign(this.frame, response.data)
          }
        })

        // Catch any errors (ie. lost connections, etc.)
        realtimeServer.onError(err => {
          this.$logger.error('RT: Lost connection!', err)
        })
      } catch (err) {
        // When this error is caught, it means the initial connection to the
        // events server failed.  No automatic attempts to reconnect will be made.
        this.$logger.error('RT: Failed to connect to server', err)
      }
    })();

    // Scoreboard
    if (this.$route.hash === '#scoreboard') {
      this.showScoreboard = true
    }
  },
  beforeDestroy() {
    // Real-time updates
    if (realtimeServer) realtimeServer.close()
  },
  methods: {
    getFrame() {
      this.$axios
        .get(
          process.env.VUE_APP_API +
            "/Frames/" +
            this.$route.params.id +
            "/detail"
        )
        .then(response => {
          this.frame = response.data
        })
        .catch(error => {
          // Custom info message when the match isn't found by ID or is deleted
          if (error.message === "Frame not found") {
            this.$store.commit("message", {
              type: "info",
              value: `Frame with ID: ${
                this.$route.params.id
              } could not be found or might be deleted.`,
              keepOnNav: 1 // time(s) or -1 for until manually hidden by user
            })
          }

          // Always return to previous page
          this.$router.pop()
        });
    },
    switchScoreboardType() {
      if (!this.frame) {
        return
      }

      this.$axios
        .patch(
          process.env.VUE_APP_API +
            "/Frames/" +
            this.frame.id,
          { scoreboard: { type: this.frame.scoreboard.type }}
        )
        .then(response => {
          this.frame = Object.assign(this.frame, response.data);
        })
    }
  },
  watch: {
    $route(to, from) {
      // Reload frame when id changes in URL
      if (this.frame.id !== to.params.id) {
        this.getFrame()
      }

      // Scoreboard
      if (to.hash === '#scoreboard' && from.hash === '') {
        this.showScoreboard = true
      }
      if (from.hash === '#scoreboard' && to.hash === '') {
        this.showScoreboard = false
      }
    },
    selectedTab(id) {
      // Save to local storage
      localStorage.setItem("frame:selectedTab", id)
    }
  },
  components: {
    Loader,
    SimpleScoreboard,
    AdvancedScoreboard,
    FullScoreboard
  },
  name: "FrameDetail"
};
</script>
