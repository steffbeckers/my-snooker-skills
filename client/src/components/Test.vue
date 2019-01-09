<template>
  <div class="pa-3">
    <v-btn @click="triggerJSONParseError()" color="primary">
      Trigger JSON.parse() error
    </v-btn>
    <v-btn @click="triggerFancyTrack()" color="primary">
      Trigger Fancy Track
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    triggerJSONParseError() {
      let json = JSON.parse('{"Not quiet json"}')
      this.$logger.log(json)
    },
    triggerFancyTrack() {
      window.FancyTrack.track("My Error")
    }
  },
  name: 'Test'
}
</script>

