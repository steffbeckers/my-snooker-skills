<template>
  <v-container grid-list-lg fluid>
    <v-layout class="pt-2" align-center justify-space-around wrap>
      <v-avatar size="90px" color="primary">
        <img v-if="$store.state.user && $store.state.user.profilePicture" :src="$store.state.user.profilePicture">
        <v-icon style="font-size: 42px;" dark v-else>person</v-icon>
      </v-avatar>
    </v-layout>
    <v-layout class="headline mt-3" align-center justify-space-around wrap>
      {{ $store.state.user.firstName }} {{ $store.state.user.lastName }}
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  name: 'Profile'
}
</script>
