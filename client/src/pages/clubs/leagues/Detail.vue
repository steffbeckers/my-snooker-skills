<template>
  <div>
    <Loader v-if="!league"></Loader>
    <div v-if="league">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title class="mr-1" color="grey">
          <v-icon @click="$router.push({ name: 'Club', params: { slug: league.club.slug }})" class="mr-2">place</v-icon><span style="cursor: pointer" @click="$router.push({ name: 'Club', params: { slug: league.club.slug }})">{{ league.club.name }}</span> - {{ league.name }} {{ league.season }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu v-if="$store.state.authenticated" bottom left>
          <v-btn
            slot="activator"
            icon
          >
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
            <v-card>
              <v-toolbar color="white" class="elevation-0">
                <v-toolbar-title color="rgba(0,0,0,.54)">
                  <v-icon color="rgba(0,0,0,.54)" class="mr-2">line_style</v-icon> Tournaments
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <div style="max-width: 150px;">
                  <v-text-field
                    v-model="tournamentsSearch"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    class="pt-0"
                    clearable
                  ></v-text-field>
                </div>
                <v-btn icon>
                  <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
                </v-btn>
              </v-toolbar>
              <v-data-table
                :headers="[
                  { text: 'Date', value: 'startDateTime', align: 'left' },
                  { text: 'Winner', value: 'winner.firstName', align: 'left' },
                  { text: 'Runner-up', value: 'runnerUp.firstName', align: 'left' },
                  { text: '', sortable: false }
                ]"
                :pagination.sync="tournamentsDataTablePagination"
                :items="league.tournaments"
                class="elevation-0"
                rows-per-page-text="Tournaments per page:"
                :no-data-text="'There are no tournaments added to ' + league.name + ' ' + league.season + ' yet.'"
                :search="tournamentsSearch"
              >
                <template slot="items" slot-scope="props">
                  <td style="cursor: pointer" @click="$router.push({ name: 'Tournament', params: { id: props.item.id }})">{{ props.item.startDateTime | formatDate }}</td>
                  <td style="cursor: pointer" @click="$router.push({ name: 'Tournament', params: { id: props.item.id }})"><span v-if="props.item.winner">{{ props.item.winner.firstName }} {{ props.item.winner.lastName }}</span></td>
                  <td style="cursor: pointer" @click="$router.push({ name: 'Tournament', params: { id: props.item.id }})"><span v-if="props.item.runnerUp">{{ props.item.runnerUp.firstName }} {{ props.item.runnerUp.lastName }}</span></td>
                  <td></td>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Loader from "../../../components/Loader.vue";

export default {
  data() {
    return {
      league: null,
      // Tournaments card
      tournamentsSearch: '',
      tournamentsDataTablePagination: {
        rowsPerPage: 25
      },
    }
  },
  computed: {
    canEdit() {
      // League
      if (!this.league) {
        return false
      }
      // Authenticated
      if (!this.$store.state.authenticated) {
        return false
      }
      // Owner
      if (this.league.ownerId === this.$store.state.user.id) {
        return true
      }
      // TODO: Add players of club?
    }
  },
  mounted() {
    this.getLeague()
  },
  methods: {
    getLeague() {
      this.$axios
        .get(
          process.env.VUE_APP_API +
            '/Leagues/' + this.$route.params.id + '/detail'
        )
        .then(response => {
          this.league = response.data
        })
        .catch(error => {
          // Custom info message when the league isn't found by ID or is deleted
          if (error.message === "League not found") {
            this.$store.commit("message", {
              type: "info",
              value: `League with id: ${
                this.$route.params.id
              } could not be found or might be deleted.`,
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
      // Reload league when id changes in URL
      if (this.league.id !== value.params.id) {
        this.getLeague()
      }
    }
  },
  components: {
    Loader
  },
  name: "ClubLeagueDetail"
};
</script>
