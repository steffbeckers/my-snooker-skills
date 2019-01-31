<template>
  <div>
    <v-card
      flat
      height="300px"
    >
      <v-toolbar
        id="search"
        dense
        floating
        class="pa-0 ma-0"
      >
        <vuetify-google-autocomplete
          id="map"
          hide-details
          prepend-icon="search"
          clearable
          single-line
          class="pa-0"
          placeholder="Search"
          v-on:placechanged="getAddressData"
        >
        </vuetify-google-autocomplete>
        <v-btn @click="retrieveMyLocation()" class="mr-0" icon>
          <v-icon>my_location</v-icon>
        </v-btn>
        <v-btn class="ml-1" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <GmapMap
        :center="location"
        :zoom="zoom"
        style="width: 100%; height: 300px"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.location"
          :clickable="true"
          :draggable="false"
          @click="location=m.location"
        />
      </GmapMap>
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
nav#search {
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 10px;
}

nav#search > div.v-toolbar__content {
  padding: 0px 12px !important;
}

nav#search > div.v-toolbar__content > div.v-text-field {
  min-width: 250px;
}
</style>

<script>
export default {
  data() {
    return {
      clubs: [],
      // Map
      location: { // Street of snooker club Karteria
        lat: 51.033564,
        lng: 5.162402
      },
      zoom: 9
    }
  },
  computed: {
    markers() {
      return this.clubs.map(c => { return c.address })
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
    getAddressData(addressData, placeResultData, id) {
      if (addressData) this.$logger.log('getAddressData() => addressData', addressData)
      if (placeResultData) this.$logger.log('getAddressData() => placeResultData', placeResultData)
      if (id) this.$logger.log('getAddressData() => id', id)

      if (placeResultData) {
        this.location = placeResultData.geometry.location
        this.zoom = 15
      }
    },
    retrieveMyLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          location => {
            this.location = { lat: location.coords.latitude, lng: location.coords.longitude }
            this.zoom = 11
          },
          error => {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                this.$logger.error('User denied the request for Geolocation.')
                break;
              case error.POSITION_UNAVAILABLE:
                this.$logger.error('Location information is unavailable.')
                break;
              case error.TIMEOUT:
                this.$logger.error('The request to get user location timed out.')
                break;
              case error.UNKNOWN_ERROR:
                this.$logger.error('An unknown error occurred.')
                break;
            }
          }
        );
      } else {
        this.$logger.error('Geolocation is not supported by this browser.')
      }
    }
  },
  name: 'Clubs'
}
</script>
