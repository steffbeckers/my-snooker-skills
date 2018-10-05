<template>
  <Loader></Loader>
</template>

<script>
import Loader from '../../../components/Loader.vue'

export default {
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
      credentials.user = await this.$authentication.me()

      // Defensive error handling
      if (!credentials.user) {
        // Reset if problem with user
        this.$store.commit('signOut')
        return
      }

      // Authenticate with store
      this.$store.commit('authenticate', credentials)

      // Remove old cookies
      this.$cookie.delete('userId')
      this.$cookie.delete('access_token')
    }

    this.$router.push('/account')
  },
  components: {
    Loader
  },
  name: 'AccountSocialSuccess'
}
</script>
