<template>
  <v-dialog
    value="true"
    hide-overlay
    persistent
    width="300"
  >
    <v-card
      color="primary"
      dark
    >
      <v-card-text>
        <v-progress-linear
          indeterminate
          color="white"
          class="mt-0 mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

