<template>
  <div>
    <v-toolbar color='transparent' class='elevation-0'>
      <v-toolbar-title color='grey'>
        Frame
      </v-toolbar-title>
    </v-toolbar>
    <v-container class='pt-2' grid-list-lg fluid>
      <v-layout>
        <v-flex>
          <v-timeline>
            <v-timeline-item
              v-for="n in 4"
              :key="n"
              color="red lighten-2"
              small
            >
              <span slot="opposite">Tus eu perfecto</span>
              <v-card class="elevation-2">
                <v-card-text>
                  Lorem ipsum dolor sit amet
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      frame: {}
    }
  },
  mounted() {
    this.getFrame()
  },
  methods: {
    getFrame() {
      this.$axios
        .get(process.env.VUE_APP_API + '/Frames/' + this.$route.params.id)
        .then(response => {
          this.frame = response.data
        })
        .catch(error => {
          this.$logger.error(error)
        })
    }
  },
  watch: {
    $route(value) {
      // Reload frame when id changes in URL
      if (this.frame.id !== value.params.id) {
        this.getFrame()
      }
    }
  },
  name: 'FrameDetail'
}
</script>
