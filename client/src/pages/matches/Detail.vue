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
          <div class="d-inline-block"><strong>Started on:</strong> {{ match.startDateTime | formatDateTime }}</div>
        </div>
        <div v-if="!$vuetify.breakpoint.xs" class="mr-2">
          <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
          <div class="d-inline-block"><strong>Reds:</strong> {{ match.reds }}</div>
        </div>
        <v-btn icon>
          <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container v-if="$vuetify.breakpoint.xs" grid-list-sm fluid class="pt-0">
        <v-layout row>
          <v-flex>
            <v-icon class="mr-1">access_time</v-icon>
            <div class="d-inline-block"><strong>Started on:</strong> {{ match.startDateTime | formatDateTime }}</div>
          </v-flex>
          <v-flex>
            <v-icon class="mr-1" color="red">fiber_manual_record</v-icon>
            <div class="d-inline-block"><strong>Reds:</strong> {{ match.reds }}</div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container class="pt-2" grid-list-lg fluid>
        <v-layout col>
          <v-flex>
            <div class="text-xs-center">
              <v-avatar class="mb-2" size="60px" :color="!match.players[0].profilePicture ? 'red' : 'transparent'">
                <img v-if="match.players[0].profilePicture" :src="match.players[0].profilePicture">
                <v-icon v-else style="font-size: 30px;" dark>person</v-icon>
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
            <div>(Best of {{ match.bestOf }})</div>
          </v-flex>
          <v-flex>
            <div class="text-xs-center display-2 mt-4">
              {{ match.scores[match.players[1].id] || 0 }}
            </div>
          </v-flex>
          <v-flex>
            <div class="text-xs-center">
              <v-avatar class="mb-2" size="60px" :color="!match.players[1].profilePicture ? 'red' : 'transparent'">
                <img v-if="match.players[1].profilePicture" :src="match.players[1].profilePicture">
                <v-icon v-else style="font-size: 30px;" color="white">person</v-icon>
              </v-avatar>
              <div class="headline">
                {{ match.players[1].firstName }} {{ match.players[1].lastName }}
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Loader from '../../components/Loader.vue'

export default {
  data() {
    return {
      match: null
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
          this.match = response.data;
        })
        .catch(error => {
          this.$logger.error(error);
        });
    }
  },
  watch: {
    $route(value) {
      // Reload match when id changes in URL
      if (this.match.id !== value.params.id) {
        this.getMatch();
      }
    }
  },
  components: {
    Loader
  },
  name: "MatchDetail"
};
</script>
