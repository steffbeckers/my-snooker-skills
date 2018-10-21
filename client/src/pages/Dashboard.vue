<template>
  <div>
    <v-toolbar color="transparent" class="elevation-0">
      <v-toolbar-title color="grey">
        <v-icon class="mr-2">dashboard</v-icon> Dashboard
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container grid-list-lg fluid>
      <v-layout row wrap>
        <v-flex
          xl3
          lg4
          sm6
          xs12
        >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard"
};
</script>
