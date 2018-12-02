<template>
  <div>
    <Loader v-if="!frame"></Loader>
    <div v-if="frame">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title color="grey">
          <v-icon class="mr-2">people_outline</v-icon> Frame
        </v-toolbar-title>
        <v-btn v-if="frame.match" :to="{ name: 'Match', params: { id: frame.match.id} }" exact flat>
          To match
        </v-btn>
        <v-btn v-if="frame.tournament" :to="{ name: 'Tournament', params: { id: frame.tournament.id} }" exact flat>
          To tournament
        </v-btn>
        <v-spacer></v-spacer>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-3">
          <v-icon class="mr-1">access_time</v-icon>
          <div class="d-inline-block div-next-to-icon"><strong>Started on:</strong> {{ frame.startDateTime | formatDateTime }}</div>
        </div>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-2">
          <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
          <div class="d-inline-block div-next-to-icon"><strong>Reds:</strong> {{ frame.reds }}</div>
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
            <div class="d-inline-block div-next-to-icon"><strong>Started on:</strong> {{ frame.startDateTime | formatDateTime }}</div>
          </v-flex>
          <v-flex>
            <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
            <div class="d-inline-block div-next-to-icon"><strong>Reds:</strong> {{ frame.reds }}</div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container class="pt-2 pb-2" grid-list-lg fluid>
        <v-layout v-if="$vuetify.breakpoint.smAndUp" col>
          <v-flex xs4 style="cursor: pointer" @click="$router.push({name: 'Profile', params: {username: frame.players[0].username}})">
            <div class="text-xs-center">
              <v-avatar
                class="mb-2"
                size="60px"
                :color="!frame.players[0].profilePicture ? 'red' : 'transparent'"
              >
                <img
                  v-if="frame.players[0].profilePicture && typeof frame.players[0].profilePicture === 'object' && frame.players[0].profilePicture.thumb"
                  :src="frame.players[0].profilePicture.thumb"
                >
                <img
                  v-if="frame.players[0].profilePicture && typeof frame.players[0].profilePicture === 'string'"
                  :src="frame.players[0].profilePicture"
                >
                <v-icon v-if="!frame.players[0].profilePicture" style="font-size: 30px;" dark>person</v-icon>
              </v-avatar>
              <div class="headline">
                {{ frame.players[0].firstName }} {{ frame.players[0].lastName }}
              </div>
            </div>
          </v-flex>
          <v-flex>
            <div class="text-xs-center display-2 mt-4">
              {{ frame.scores[frame.players[0].id] || 0 }}
            </div>
          </v-flex>
          <v-flex class="text-xs-center mt-4">
            <div>Match</div>
            <div style="white-space: nowrap">{{ frame.match.scores[frame.players[0].id] }} ({{ frame.match.bestOf }}) {{ frame.match.scores[frame.players[1].id] }}</div>
          </v-flex>
          <v-flex>
            <div class="text-xs-center display-2 mt-4">
              {{ frame.scores[frame.players[1].id] || 0 }}
            </div>
          </v-flex>
          <v-flex xs4 style="cursor: pointer" @click="$router.push({name: 'Profile', params: {username: frame.players[1].username}})">
            <div class="text-xs-center">
              <v-avatar
                class="mb-2"
                size="60px"
                :color="!frame.players[1].profilePicture ? 'red' : 'transparent'"
              >
                <img
                  v-if="frame.players[1].profilePicture && typeof frame.players[1].profilePicture === 'object' && frame.players[1].profilePicture.thumb"
                  :src="frame.players[1].profilePicture.thumb"
                >
                <img
                  v-if="frame.players[1].profilePicture && typeof frame.players[1].profilePicture === 'string'"
                  :src="frame.players[1].profilePicture"
                >
                <v-icon v-if="!frame.players[1].profilePicture" style="font-size: 30px;" dark>person</v-icon>
              </v-avatar>
              <div class="headline">
                {{ frame.players[1].firstName }} {{ frame.players[1].lastName }}
              </div>
            </div>
          </v-flex>
        </v-layout>
        <template v-else>
          <v-layout row>
            <v-flex style="cursor: pointer" @click="$router.push({name: 'Profile', params: {username: frame.players[0].username}})" xs6>
              <div class="text-xs-center">
                <v-avatar
                  class="mb-2"
                  size="60px"
                  :color="!frame.players[0].profilePicture ? 'red' : 'transparent'"
                >
                  <img
                    v-if="frame.players[0].profilePicture && typeof frame.players[0].profilePicture === 'object' && frame.players[0].profilePicture.thumb"
                    :src="frame.players[0].profilePicture.thumb"
                  >
                  <img
                    v-if="frame.players[0].profilePicture && typeof frame.players[0].profilePicture === 'string'"
                    :src="frame.players[0].profilePicture"
                  >
                  <v-icon v-if="!frame.players[0].profilePicture" style="font-size: 30px;" dark>person</v-icon>
                </v-avatar>
                <div class="headline">
                  {{ frame.players[0].firstName }} {{ frame.players[0].lastName }}
                </div>
              </div>
            </v-flex>
            <v-flex style="cursor: pointer" @click="$router.push({name: 'Profile', params: {username: frame.players[1].username}})" xs6>
              <div class="text-xs-center">
                <v-avatar
                  class="mb-2"
                  size="60px"
                  :color="!frame.players[1].profilePicture ? 'red' : 'transparent'"
                >
                  <img
                    v-if="frame.players[1].profilePicture && typeof frame.players[1].profilePicture === 'object' && frame.players[1].profilePicture.thumb"
                    :src="frame.players[1].profilePicture.thumb"
                  >
                  <img
                    v-if="frame.players[1].profilePicture && typeof frame.players[1].profilePicture === 'string'"
                    :src="frame.players[1].profilePicture"
                  >
                  <v-icon v-if="!frame.players[1].profilePicture" style="font-size: 30px;" dark>person</v-icon>
                </v-avatar>
                <div class="headline">
                  {{ frame.players[1].firstName }} {{ frame.players[1].lastName }}
                </div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4>
              <div class="text-xs-right display-2">
                {{ frame.scores[frame.players[0].id] || 0 }}
              </div>
            </v-flex>
            <v-flex v-if="frame.match" xs4 class="text-xs-center">
              <div>Match</div>
              <div style="white-space: nowrap">{{ frame.match.scores[frame.players[0].id] }} ({{ frame.match.bestOf }}) {{ frame.match.scores[frame.players[1].id] }}</div>
            </v-flex>
            <v-flex v-if="frame.tournament" xs4 class="text-xs-center">
              -
            </v-flex>
            <v-flex xs4>
              <div class="display-2">
                {{ frame.scores[frame.players[1].id] || 0 }}
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
        <v-tab href="#breaks">
          Breaks
          <v-icon>bubble_chart</v-icon>
        </v-tab>
        <v-tab href="#statistics">
          Statistics
          <v-icon>bar_chart</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="selectedTab">
        <v-tab-item value="breaks">
          <v-container grid-list-md class="pt-2" fluid>
            <v-layout col>
              <v-flex>
                <v-timeline>
                  <v-timeline-item
                    v-for="n in 4"
                    :key="n"
                    color="red lighten-2"
                    small
                  >
                    <span slot="opposite">Tus eu perfecto</span>
                    <v-card class="elevation-2">
                      <v-card-text>
                        Lorem ipsum dolor sit amet
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-flex>
            </v-layout>
          </v-container>
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
      frame: null,
      selectedTab: localStorage.getItem('frame:selectedTab') || 'breaks'
    }
  },
  mounted() {
    this.getFrame()
  },
  methods: {
    getFrame() {
      this.$axios
        .get(process.env.VUE_APP_API + '/Frames/' + this.$route.params.id + '/detail')
        .then(response => {
          this.frame = response.data
        })
        .catch(error => {
          this.$logger.error(error)

          // Custom info message when the match isn't found by ID or is deleted
          if (error.message === 'Frame not found') {
            this.$store.commit('message', {
              type: 'info',
              value: `Frame with ID: ${this.$route.params.id} could not be found or might be deleted.`,
              keepOnNav: 1 // time(s) or -1 for until manually hidden by user
            })
          }

          // Always return to previous page
          this.$router.pop()
        })
    }
  },
  watch: {
    $route(value) {
      // Reload frame when id changes in URL
      if (this.frame.id !== value.params.id) {
        this.getFrame()
      }
    },
    selectedTab(id) {
      // Save to local storage
      localStorage.setItem('frame:selectedTab', id)
    }
  },
  components: {
    Loader
  },
  name: 'FrameDetail'
}
</script>
