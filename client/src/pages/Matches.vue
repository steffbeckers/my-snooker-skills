<template>
  <div>
    <Loader v-if="!matches"></Loader>
    <div v-if="matches">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title color="grey">
          <v-icon class="mr-2">people_outline</v-icon> Matches
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="$store.state.authenticated" :to="{ name: 'MatchesPlay' }" exact color="primary">
          <v-icon small class="mr-2">play_arrow</v-icon>Play
        </v-btn>
        <v-btn icon>
          <v-icon color="rgba(0,0,0,.54)">search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container class="pt-2" grid-list-lg fluid>
        <MatchesCardList v-if="listType === 'cards'" :matches="matches"></MatchesCardList>
      </v-container>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
  data() {
    return {
      matches: null,
      listType: 'cards'
    }
  },
  created() {
    this.listMatches()
  },
  methods: {
    listMatches() {
      this.$axios
        .get(process.env.VUE_APP_API + '/Matches/list')
        .then(response => {
          this.matches = response.data
        })
    }
  },
  components: {
    Loader
  },
  name: 'Matches'
}
</script>
