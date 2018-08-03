<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex>
          <div class="title">Camera</div>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      cordova: Vue.cordova
    }
  },
  created() {
    var self = this
    this.cordova.on('deviceready', () => {
      self.onDeviceReady()
    })
  },
  beforeDestroy: function() {
    if (navigator.camera) navigator.camera.cleanup()
  },
  methods: {
    onDeviceReady: function() {
      // Take a picture
      navigator.camera.getPicture(
        success => {
          alert(JSON.stringify(success))
          setTimeout(() => {
            location.reload()
          }, 5000)
        },
        error => {
          alert(JSON.stringify(error))
        }
      )
    }
  }
}
</script>
