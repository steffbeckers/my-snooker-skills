<template>
  <v-container grid-list-lg fluid>
    <v-layout v-if="errors.length > 0" row>
      <v-flex>
        <v-alert :value="true" v-for="(error, index) in errors" :key="index" type="error">
          {{ error.message }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <div class="title">My Account</div>
      </v-flex>
    </v-layout>
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
</template>

<script>
// import Vue from 'vue'

export default {
  data() {
    return {
      errors: []
    }
  },
  created() {
    // Vue.prototype.$logger.log(Vue.cookie.get('access_token'))
  },
  name: 'Account'
}
</script>
