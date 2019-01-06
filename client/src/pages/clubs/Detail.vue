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
      <v-container grid-list-lg fluid>
        <v-layout row>
          <v-flex xs12>
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
      club: null,
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
    this.getClub();
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
        });
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
