<template>
</template>

<script>
export default {
  async created() {
    // Confirm the newly created account from link in email

    // User
    let userId = this.$route.query.uid
    this.$logger.log(userId)

    // Confirmation token
    let token = this.$route.query.token
    this.$logger.log(token)

    // Verify the user
    // Parameters
    let params = `?uid=${userId}&token=${token}`

    this.$axios
      .get(process.env.API + '/Users/confirm' + params).then(response => {
        this.$logger.log('CONFIRMATION RESPONSE', response)

        // Verified, redirect
        localStorage.setItem('login:verified', true)
        this.$router.push('/login')
      }).catch(error => {
        this.$logger.log('CONFIRMATION ERROR', error)

        // Already verified
        if (error.code === 'INVALID_TOKEN') {
          localStorage.setItem('login:already-verified', true)
          this.$router.push('/login')
          return
        }

        // Redirect to Registration for error message
        localStorage.setItem('register:verification-failed', true)
        this.$router.push('/register')
      })
  },
  name: 'AccountConfirmation'
}
</script>
