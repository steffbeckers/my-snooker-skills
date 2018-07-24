<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        cordova: Vue.cordova
      }
    },
    created () {
      var self = this
      this.cordova.on('deviceready', () => {
        self.onDeviceReady()
      })
    },
    beforeDestroy: function () {
      if (navigator.camera) navigator.camera.cleanup()
    },
    methods: {
      onDeviceReady: function () {
        // Take a picture
        navigator.camera.getPicture(
          (success) => {
            alert(JSON.stringify(success))
          },
          (error) => {
            alert(JSON.stringify(error))
          }
        )
      }
    }
  }
</script>
