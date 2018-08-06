<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="usernameOrEmail" prepend-icon="person" name="usernameOrEmail" label="Username or email" type="text"></v-text-field>
              <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VueCookie from 'vue-cookie'

export default {
  data() {
    return {
      errors: [],
      userNameOrEmail: '',
      password: ''
    }
  },
  created() {
    // TODO
  },
  methods: {
    login() {
      this.$authentication.login(this.userNameOrEmail, this.password)
    }
  }
}
</script>
