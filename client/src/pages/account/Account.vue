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
import Authentication from '../../services/authentication'

export default {
  data() {
    return {
      errors: [],
      auth: new Authentication()
    }
  },
  async created() {
    // Check if the user authenticated from social logins
    let userId = this.$cookie.get('userId')
    this.$logger.log(userId)

    let accessToken = this.$cookie.get('access_token')
    this.$logger.log(accessToken)

    if (accessToken) {
      this.$logger.log('Authenticated with social auth')

      // Sign out logged in user
      this.$store.commit('signOut')

      // Set Authorization token on request
      this.$axios.defaults.headers.common['Authorization'] = accessToken

      // Setup credentials
      let credentials = {}
      credentials.id = accessToken
      credentials.ttl = 1209600
      credentials.user = await this.auth.me()

      // Authenticate with store
      this.$store.commit('authenticate', credentials)

      // Remove old cookies
      this.$cookie.delete('userId')
      this.$cookie.delete('access_token')
    }
  },
  name: 'Account'
}
</script>
