<template>
  <div>
    <Loader v-if="!match"></Loader>
    <div v-if="match">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title color="grey">
          <v-icon class="mr-2">people_outline</v-icon> Match
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-3">
          <v-icon class="mr-1">access_time</v-icon>
          <div class="d-inline-block div-next-to-icon"><strong>Started on:</strong> {{ match.startDateTime | formatDateTime }}</div>
        </div>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-2">
          <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
          <div class="d-inline-block div-next-to-icon"><strong>Reds:</strong> {{ match.reds }}</div>
        </div>
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
            <v-container v-if="match.frames && match.frames.length > 0" grid-list-md class="pt-2" fluid>
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
                  <div class="caption">{{ frame.startDateTime | formatTime }}<span v-if="frame.endDateTime"> {{ frame.endDateTime | formatTime }}</span></div>
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
