<template>
  <v-container v-if="$store.state.authenticated" grid-list-lg fluid>
    <v-breadcrumbs v-if="$vuetify.breakpoint.smAndUp">
      <v-icon slot="divider">fiber_manual_record</v-icon>
      <v-breadcrumbs-item>
        Settings
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>
        Profile
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout :class="$vuetify.breakpoint.smAndUp ? 'pt-3' : ''" row wrap>
      <v-flex xs12>
        <p class="title">My profile settings ...</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ProfileSettings'
}
</script>
