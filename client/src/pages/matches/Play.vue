<template>
  <div>
    <v-toolbar color='transparent' class='elevation-0'>
      <v-toolbar-title color='grey'>
        <v-icon class='mr-2'>add</v-icon> Start a new match
      </v-toolbar-title>
    </v-toolbar>
    <v-container class='pt-2' grid-list-lg fluid>
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
    // IndexedDB test
    // this.$db.connect()
    // let req = this.$db.connection.transaction(['matches'], 'readwrite').objectStore('matches').add({
    //   startDateTime: new Date().toISOString(),
    //   endDateTime: new Date().toISOString()
    // })
    // req.onsuccess = function(event) {
    //   this.$logger.log(event)
    // }
  },
  name: 'MatchesPlay'
}
</script>
