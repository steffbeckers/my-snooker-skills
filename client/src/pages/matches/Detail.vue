<template>
  <div>
    <v-toolbar color='transparent' class='elevation-0'>
      <v-toolbar-title color='grey'>
        Match
      </v-toolbar-title>
    </v-toolbar>
    <v-container class='pt-2' grid-list-lg fluid>
      <v-layout>
        <v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      match: {}
    }
  },
  mounted() {
    this.getMatch()
  },
  methods: {
    getMatch() {
      this.$axios
        .get(process.env.VUE_APP_API + '/Matches/' + this.$route.params.id)
        .then(response => {
          this.match = response.data
        })
        .catch(error => {
          this.$logger.error(error)
        })
    }
  },
  watch: {
    $route(value) {
      // Reload match when id changes in URL
      if (this.match.id !== value.params.id) {
        this.getMatch()
      }
    }
  },
  name: 'MatchDetail'
}
</script>
