<template>
  <Loader></Loader>
</template>

<script>
import Loader from '../../components/Loader.vue'

export default {
  created() {
    // Logout functionality
    this.$axios
      .post(process.env.VUE_APP_API + '/Users/logout')
      .then(() => {
        this.$store.commit('signOut')
        this.$router.push({ name: 'Root' })
      })
  },
  components: {
    Loader
  },
  name: 'Logout'
}
</script>
