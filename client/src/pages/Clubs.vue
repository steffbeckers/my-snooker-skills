<template>
  <div>
    <v-card
      class="pa-3"
      flat
      height="300px"
      img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
    >
      <v-toolbar
        id="search"
        dense
        floating
        class="ma-0 pa-0"
      >
        <vuetify-google-autocomplete
          id="map"
          hide-details
          prepend-icon="search"
          single-line
          class="pa-0"
          placeholder="Search"
        >
        </vuetify-google-autocomplete>
        <!-- <vuetify-google-autocomplete
          id="map"
          hide-details
          prepend-icon="search"
          single-line
          class="pa-0"
          placeholder="Search"
          v-on:placechanged="getAddressData"
        >
        </vuetify-google-autocomplete> -->
        <v-btn class="mr-0" icon>
          <v-icon>my_location</v-icon>
        </v-btn>
        <v-btn class="ml-1" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-toolbar color="transparent" class="elevation-0">
      <v-toolbar-title color="grey">
        <v-icon class="mr-2">place</v-icon> Clubs
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.authenticated && $store.state.user.club" :to="{ name: 'Club', params: { slug: $store.state.user.club.slug } }" exact color="primary">
        {{ $store.state.user.club.name }}
      </v-btn>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="pt-2" grid-list-lg fluid>
      <ClubsCardList :clubs="clubs"></ClubsCardList>
    </v-container>
  </div>
</template>

<style>
nav#search > div.v-toolbar__content {
  padding: 0px 12px!important;
}
</style>

<script>
export default {
  data() {
    return {
      clubs: []
    }
  },
  mounted() {
    this.listClubs()
    // this.listNearbyClubs()
  },
  methods: {
    listClubs() {
      this.$axios.get(process.env.VUE_APP_API + '/Clubs/list').then(response => {
        this.clubs = response.data
      })
    },
    listNearbyClubs() {
      this.$axios.get(process.env.VUE_APP_API + '/Clubs/nearby').then(response => {
        this.clubs = response.data
      })
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.$logger.log('getAddressData() => addressData', addressData)
      this.$logger.log('getAddressData() => placeResultData', placeResultData)
      this.$logger.log('getAddressData() => id', id)
    }
  },
  name: 'Clubs'
}
</script>
