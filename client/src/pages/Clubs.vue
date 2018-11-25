<template>
  <div>
    <v-card
      class="pa-3"
      flat
      height="300px"
      img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
    >
      <v-toolbar
        dense
        floating
      >
        <v-text-field
          hide-details
          prepend-icon="search"
          single-line
        ></v-text-field>
        <v-btn icon>
          <v-icon>my_location</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-toolbar color="transparent" class="elevation-0">
      <v-toolbar-title color="grey">
        <v-icon class="mr-2">place</v-icon> Clubs
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="pt-1" grid-list-lg fluid>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clubs: []
    }
  },
  created() {
    // this.listNearbyClubs()
  },
  methods: {
    listNearbyClubs() {
      this.$axios.get(process.env.VUE_APP_API + '/Clubs/nearby').then(response => {
        this.clubs = response.data
      })
    }
  },
  name: 'Clubs'
}
</script>
