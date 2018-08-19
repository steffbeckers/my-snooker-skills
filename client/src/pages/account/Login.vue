<template>
<v-container grid-list-lg fluid>
    <v-layout class="mt-3" justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text align-center>
            <v-layout column>
              <v-flex class="text-xs-center" xs12 md6>
                <p>Sign-in with your favorite social account.</p>
                <v-btn fab dark class="google-fab" :href="'/auth/google'">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZCQkIwMDsiIGQ9Ik0xMTMuNDcsMzA5LjQwOEw5NS42NDgsMzc1Ljk0bC02NS4xMzksMS4zNzhDMTEuMDQyLDM0MS4yMTEsMCwyOTkuOSwwLDI1NiAgYzAtNDIuNDUxLDEwLjMyNC04Mi40ODMsMjguNjI0LTExNy43MzJoMC4wMTRsNTcuOTkyLDEwLjYzMmwyNS40MDQsNTcuNjQ0Yy01LjMxNywxNS41MDEtOC4yMTUsMzIuMTQxLTguMjE1LDQ5LjQ1NiAgQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1MThFRjg7IiBkPSJNNTA3LjUyNywyMDguMTc2QzUxMC40NjcsMjIzLjY2Miw1MTIsMjM5LjY1NSw1MTIsMjU2YzAsMTguMzI4LTEuOTI3LDM2LjIwNi01LjU5OCw1My40NTEgIGMtMTIuNDYyLDU4LjY4My00NS4wMjUsMTA5LjkyNS05MC4xMzQsMTQ2LjE4N2wtMC4wMTQtMC4wMTRsLTczLjA0NC0zLjcyN2wtMTAuMzM4LTY0LjUzNSAgYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyOEI0NDY7IiBkPSJNNDE2LjI1Myw0NTUuNjI0bDAuMDE0LDAuMDE0QzM3Mi4zOTYsNDkwLjkwMSwzMTYuNjY2LDUxMiwyNTYsNTEyICBjLTk3LjQ5MSwwLTE4Mi4yNTItNTQuNDkxLTIyNS40OTEtMTM0LjY4MWw4Mi45NjEtNjcuOTFjMjEuNjE5LDU3LjY5OCw3Ny4yNzgsOTguNzcxLDE0Mi41Myw5OC43NzEgIGMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0YxNDMzNjsiIGQ9Ik00MTkuNDA0LDU4LjkzNmwtODIuOTMzLDY3Ljg5NmMtMjMuMzM1LTE0LjU4Ni01MC45MTktMjMuMDEyLTgwLjQ3MS0yMy4wMTIgIGMtNjYuNzI5LDAtMTIzLjQyOSw0Mi45NTctMTQzLjk2NSwxMDIuNzI0bC04My4zOTctNjguMjc2aC0wLjAxNEM3MS4yMyw1Ni4xMjMsMTU3LjA2LDAsMjU2LDAgIEMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                </v-btn>
                <v-btn fab dark class="facebook-fab" :href="'/auth/facebook'">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgOTYuMTI0IDk2LjEyMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOTYuMTI0IDk2LjEyMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik03Mi4wODksMC4wMkw1OS42MjQsMEM0NS42MiwwLDM2LjU3LDkuMjg1LDM2LjU3LDIzLjY1NnYxMC45MDdIMjQuMDM3Yy0xLjA4MywwLTEuOTYsMC44NzgtMS45NiwxLjk2MXYxNS44MDMgICBjMCwxLjA4MywwLjg3OCwxLjk2LDEuOTYsMS45NmgxMi41MzN2MzkuODc2YzAsMS4wODMsMC44NzcsMS45NiwxLjk2LDEuOTZoMTYuMzUyYzEuMDgzLDAsMS45Ni0wLjg3OCwxLjk2LTEuOTZWNTQuMjg3aDE0LjY1NCAgIGMxLjA4MywwLDEuOTYtMC44NzcsMS45Ni0xLjk2bDAuMDA2LTE1LjgwM2MwLTAuNTItMC4yMDctMS4wMTgtMC41NzQtMS4zODZjLTAuMzY3LTAuMzY4LTAuODY3LTAuNTc1LTEuMzg3LTAuNTc1SDU2Ljg0MnYtOS4yNDYgICBjMC00LjQ0NCwxLjA1OS02LjcsNi44NDgtNi43bDguMzk3LTAuMDAzYzEuMDgyLDAsMS45NTktMC44NzgsMS45NTktMS45NlYxLjk4Qzc0LjA0NiwwLjg5OSw3My4xNywwLjAyMiw3Mi4wODksMC4wMnoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </v-btn>
                <v-btn fab dark class="twitter-fab" :href="'/auth/twitter'">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYxMiA2MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxMiA2MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNjEyLDExNi4yNThjLTIyLjUyNSw5Ljk4MS00Ni42OTQsMTYuNzUtNzIuMDg4LDE5Ljc3MmMyNS45MjktMTUuNTI3LDQ1Ljc3Ny00MC4xNTUsNTUuMTg0LTY5LjQxMSAgICBjLTI0LjMyMiwxNC4zNzktNTEuMTY5LDI0LjgyLTc5Ljc3NSwzMC40OGMtMjIuOTA3LTI0LjQzNy01NS40OS0zOS42NTgtOTEuNjMtMzkuNjU4Yy02OS4zMzQsMC0xMjUuNTUxLDU2LjIxNy0xMjUuNTUxLDEyNS41MTMgICAgYzAsOS44MjgsMS4xMDksMTkuNDI3LDMuMjUxLDI4LjYwNkMxOTcuMDY1LDIwNi4zMiwxMDQuNTU2LDE1Ni4zMzcsNDIuNjQxLDgwLjM4NmMtMTAuODIzLDE4LjUxLTE2Ljk4LDQwLjA3OC0xNi45OCw2My4xMDEgICAgYzAsNDMuNTU5LDIyLjE4MSw4MS45OTMsNTUuODM1LDEwNC40NzljLTIwLjU3NS0wLjY4OC0zOS45MjYtNi4zNDgtNTYuODY3LTE1Ljc1NnYxLjU2OGMwLDYwLjgwNiw0My4yOTEsMTExLjU1NCwxMDAuNjkzLDEyMy4xMDQgICAgYy0xMC41MTcsMi44My0yMS42MDcsNC4zOTgtMzMuMDgsNC4zOThjLTguMTA3LDAtMTUuOTQ3LTAuODAzLTIzLjYzNC0yLjMzM2MxNS45ODUsNDkuOTA3LDYyLjMzNiw4Ni4xOTksMTE3LjI1Myw4Ny4xOTQgICAgYy00Mi45NDcsMzMuNjU0LTk3LjA5OSw1My42NTUtMTU1LjkxNiw1My42NTVjLTEwLjEzNCwwLTIwLjExNi0wLjYxMi0yOS45NDQtMS43MjFjNTUuNTY3LDM1LjY4MSwxMjEuNTM2LDU2LjQ4NSwxOTIuNDM4LDU2LjQ4NSAgICBjMjMwLjk0OCwwLDM1Ny4xODgtMTkxLjI5MSwzNTcuMTg4LTM1Ny4xODhsLTAuNDIxLTE2LjI1M0M1NzMuODcyLDE2My41MjYsNTk1LjIxMSwxNDEuNDIyLDYxMiwxMTYuMjU4eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                </v-btn>
              </v-flex>
              <v-flex class="mt-3" xs12 md6>
                <p class="mb-0 text-xs-center">Or with your My Snooker Skills account right here.</p>
                <v-alert
                  :value="verified"
                  class="mt-3 mb-3"
                  type="success"
                  dismissible
                  transition="scale-transition"
                >
                  Successfully verified your account!<br />
                  You can login now.
                </v-alert>
                <v-alert
                  :value="alreadyVerified"
                  class="mt-3 mb-3"
                  type="info"
                  dismissible
                  transition="scale-transition"
                >
                  Your account is already verified.
                </v-alert>
                <v-alert
                  :value="failed"
                  class="mt-3 mb-3"
                  type="error"
                  dismissible
                  transition="scale-transition"
                >
                  Something went wrong during the registration. Please try again or contact <a class="white--text" href="mailto:support@mysnookerskills.com?subject=Registration failed&body=Hi, something went wrong during the registration of my new My Snooker Skills account. EXTRA INFO:">support@mysnookerskills.com</a>.
                </v-alert>
                <v-form
                  ref="loginForm"
                  v-model="loginFormValid"
                  @submit="login"
                >
                  <v-layout column wrap>
                    <v-flex xs12>
                      <v-text-field
                        prepend-icon="person"
                        @click:prepend="usernameOrEmail = ''"
                        name="usernameOrEmail"
                        label="Username or email"
                        type="text"
                        v-model="usernameOrEmail"
                        :rules="usernameOrEmailRules"
                        :error-messages="usernameOrEmailErrors"
                        @input="usernameOrEmailErrors = []"
                      ></v-text-field>
                      <v-text-field
                        prepend-icon="lock"
                        @click:prepend="password = ''"
                        name="password"
                        label="Password"
                        :type="passwordShowPlain ? 'text' : 'password'"
                        v-model="password"
                        :rules="passwordRules"
                        :append-icon="passwordShowPlain ? 'visibility_off' : 'visibility'"
                        @click:append="passwordShowPlain = !passwordShowPlain"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-btn
                    color="primary"
                    block
                    :disabled="!loginFormValid || $store.state.loading"
                    type="submit"
                  >
                    Login
                  </v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      loginFormValid: false,
      usernameOrEmail: localStorage.getItem('login:usernameOrEmail') || '',
      usernameOrEmailRules: [
        v => !!v || 'Username or email is required',
        v => (v && v.length <= 100) || 'Username or email must be less than 100 characters'
      ],
      usernameOrEmailErrors: [],
      password: '',
      passwordShowPlain: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!$%@#£€*?&+-_~]{10,}$/.test(v) ||
          'Minimum 10 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number'
      ],
      verified: false,
      alreadyVerified: false,
      failed: false
    }
  },
  mounted() {
    // Alerts
    // verified
    if (localStorage.getItem('login:verified')) {
      this.verified = true
      localStorage.removeItem('login:verified')
    }
    // already-verified
    if (localStorage.getItem('login:already-verified')) {
      this.alreadyVerified = true
      localStorage.removeItem('login:already-verified')
    }
  },
  methods: {
    login(e) {
      e.preventDefault() // Submit

      // Reset form
      this.usernameOrEmailErrors = []
      this.failed = false

      // Validation
      if (!this.$refs.loginForm.validate()) { return }

      // Credentials
      let credentials = {
        password: this.password
      }

      if (this.isEmail(this.usernameOrEmail)) {
        credentials.email = this.usernameOrEmail
      } else {
        credentials.username = this.usernameOrEmail
      }

      this.$axios
        .post(process.env.API + '/Users/login', credentials)
        .then(response => {
          this.$logger.log('LOGIN RESPONSE', response.data)

          // Authenticate with store
          this.$store.commit('authenticate', response.data)

          // Redirect to Account
          this.$router.push(this.$route.query.redirect || '/account')
        }).catch(error => {
          this.$logger.log('LOGIN ERROR', error)

          this.failed = error.code === 'LOGIN_FAILED'
        })
    },
    isEmail(text) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
    }
  },
  watch: {
    usernameOrEmail(val) {
      if (val) {
        localStorage.setItem('login:usernameOrEmail', val)
      } else {
        localStorage.removeItem('login:usernameOrEmail')
      }
    }
  }
}
</script>
