<template>
  <div>
    <Loader v-if="!club"></Loader>
    <div v-if="club">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title class="mr-1" color="grey">
          <v-icon class="mr-2">place</v-icon>{{ club.name }}
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
          <v-flex md6 xs12>
            <v-card>
              <v-toolbar color="white" class="elevation-0">
                <v-toolbar-title color="rgba(0,0,0,.54)">
                  <v-icon color="rgba(0,0,0,.54)" class="mr-2">people</v-icon> Players
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <div style="max-width: 150px;">
                  <v-text-field
                    v-model="playersSearch"
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
                  { text: '', sortable: false, width: '50px' },
                  { text: 'Name', value: 'firstName', align: 'left' },
                  { text: 'Username', value: 'username', align: 'left' },
                  { text: '', sortable: false }
                ]"
                :pagination.sync="playersDataTablePagination"
                :items="club.players"
                class="elevation-0"
                rows-per-page-text="Players per page:"
                :no-data-text="'There are no players linked to ' + club.name + ' yet.'"
                :search="playersSearch"
              >
                <template slot="items" slot-scope="props">
                  <td class="pr-0">
                    <v-avatar
                      style="cursor: pointer"
                      @click="$router.push({ name: 'Profile', params: { username: props.item.username }})"
                      size="40px"
                      :color="!props.item.profilePicture ? 'red' : 'transparent'"
                    >
                      <img
                        v-if="props.item.profilePicture && typeof props.item.profilePicture === 'object' && props.item.profilePicture.thumb"
                        :src="props.item.profilePicture.thumb"
                      >
                      <img
                        v-if="props.item.profilePicture && typeof props.item.profilePicture === 'string'"
                        :src="props.item.profilePicture"
                      >
                      <v-icon v-if="!props.item.profilePicture" style="font-size: 30px;" dark>person</v-icon>
                    </v-avatar>
                  </td>
                  <td style="cursor: pointer" @click="$router.push({ name: 'Profile', params: { username: props.item.username }})">{{ props.item.firstName }} {{ props.item.lastName }}</td>
                  <td style="cursor: pointer" @click="$router.push({ name: 'Profile', params: { username: props.item.username }})">@{{ props.item.username }}</td>
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

<style>
.v-table thead tr:first-of-type {
  height: 35px !important;
}
.v-table thead tr th.column {
  padding-top: 0px !important;
}
</style>

<script>
import Loader from "../../components/Loader.vue";

export default {
  data() {
    return {
      club: null,
      // Players card
      playersSearch: '',
      playersDataTablePagination: {
        rowsPerPage: 25
      }
    };
  },
  computed: {
    canEdit() {
      // Club
      if (!this.club) {
        return false
      }
      // Authenticated
      if (!this.$store.state.authenticated) {
        return false
      }
      // Owner
      if (this.club.ownerId === this.$store.state.user.id) {
        return true
      }
      // TODO: Add players of club?
    }
  },
  mounted() {
    this.getClub()
  },
  methods: {
    getClub() {
      this.$axios
        .get(
          process.env.VUE_APP_API +
            '/Clubs/slug/' + this.$route.params.slug
        )
        .then(response => {
          this.club = response.data
        })
        .catch(error => {
          // Custom info message when the club isn't found by ID or is deleted
          if (error.message === "Club not found") {
            this.$store.commit("message", {
              type: "info",
              value: `Club with slug: ${
                this.$route.params.slug
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
      // Reload club when slug changes in URL
      if (this.club.slug !== value.params.slug) {
        this.getClub()
      }
    }
  },
  components: {
    Loader
  },
  name: "ClubDetail"
};
</script>
