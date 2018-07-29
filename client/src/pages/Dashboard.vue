<template>
  <v-container grid-list-lg fluid v-touch="{ down: () => reload }">
    <v-layout v-if="errors.length > 0" row>
      <v-flex>
        <v-alert :value="true" v-for="(error, index) in errors" :key="index" type="error">
          {{ error.message }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <div class="title">Dashboard</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xl3
        lg4
        sm6
        xs12
      >
      {{ debug }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      debug: '',
      errors: []
    }
  },
  methods: {
    reload () {
      console.log('reload')
      this.debug += 'reload; '

      location.reload(false)
    }
  },
  name: 'Dashboard'
}
</script>
