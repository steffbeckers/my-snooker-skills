<template>
  <div>
    <Loader v-if="!tournament"></Loader>
    <div v-if="tournament">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title class="mr-1" color="grey">
          <v-icon class="mr-2">line_style</v-icon>
          {{ tournament.league.club.name }} - {{ tournament.league.name }} - {{ tournament.startDateTime | formatDate }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-3" v-if="$store.state.authenticated" exact color="primary">
            <v-icon small class="mr-2">play_arrow</v-icon>Play
          </v-btn>
        <v-menu v-if="$store.state.authenticated" bottom left>
          <v-btn slot="activator" icon>
            <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Option</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-container grid-list-lg class="pt-0" fluid>
        <v-layout row>
          <v-flex xs12>
            <div class="headline">Pools</div>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th v-if="Object.keys(tournament.handicaps).length">Handicap</th>
                  <th>#</th>
                  <th v-for="(player, playerIndex) in tournament.players" :key="player.id">
                    {{ playerIndex + 1 }}
                  </th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, playerIndex) in tournament.players" :key="player.id">
                  <td>{{ player.firstName }} {{ player.lastName }}</td>
                  <td v-if="Object.keys(tournament.handicaps).length">{{ tournament.handicaps[player.id] }}</td>
                  <td>{{ playerIndex + 1 }}</td>
                </tr>
              </tbody>
            </table>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Loader from "../../components/Loader.vue";

export default {
  data() {
    return {
      tournament: null
    };
  },
  computed: {
    canEdit() {
      // Tournament
      if (!this.tournament) {
        return false;
      }
      // Authenticated
      if (!this.$store.state.authenticated) {
        return false;
      }
      // Owner
      if (this.tournament.ownerId === this.$store.state.user.id) {
        return true;
      }

      // TODO: Players of tournament can edit also

      return false;
    }
  },
  mounted() {
    this.getTournament();
  },
  methods: {
    getTournament() {
      this.$axios
        .get(
          process.env.VUE_APP_API +
            "/Tournaments/" +
            this.$route.params.id +
            "/detail"
        )
        .then(response => {
          this.tournament = response.data;
        })
        .catch(error => {
          // Custom info message when the tournament isn't found by ID or is deleted
          if (error.message === "Tournament not found") {
            this.$store.commit("message", {
              type: "info",
              value: `Tournament with id: ${
                this.$route.params.id
              } could not be found or might be deleted.`,
              keepOnNav: 1 // time(s) or -1 for until manually hidden by user
            });
          }

          // Always return to previous page
          this.$router.pop();
        });
    }
  },
  watch: {
    $route(value) {
      // Reload tournament when id changes in URL
      if (this.tournament.id !== value.params.id) {
        this.getTournament();
      }
    }
  },
  components: {
    Loader
  },
  name: "TournamentDetail"
};
</script>
