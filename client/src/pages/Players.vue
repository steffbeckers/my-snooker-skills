<template>
  <div>
    <Loader v-if="!players"></Loader>
    <div v-if="players">
      <v-toolbar color="transparent" class="elevation-0">
        <v-toolbar-title color="grey">
          <v-icon class="mr-2">people</v-icon> Players
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="rgba(0,0,0,.54)">search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container class="pt-2" grid-list-lg fluid>
        <PlayersCardList v-if="listType === 'cards'" :players="players"></PlayersCardList>
      </v-container>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
  data() {
    return {
      players: null,
      listType: "cards"
    };
  },
  created() {
    this.listPlayers();
  },
  methods: {
    listPlayers() {
      this.$axios
        .get(process.env.VUE_APP_API + "/Users/list")
        .then(response => {
          this.players = response.data;
        });
    }
  },
  components: {
    Loader
  },
  name: "Players"
};
</script>
