<template>
  <v-container grid-list-lg fluid>
    <v-layout class="mt-3 mb-3" justify-center>
      <v-flex xs12 sm8 lg6>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration</v-toolbar-title>
          </v-toolbar>
          <v-card-text align-center>
            <v-layout column>
              <v-flex xs12>
                <v-alert
                  v-if="version"
                  :value="true"
                  type="warning"
                  transition="scale-transition"
                >
                  This application is still in development. Version: {{ version }}
                </v-alert>
              </v-flex>
              <v-flex class="text-xs-center" xs12>
                <p>Sign-up with your favorite social account.</p>
                <v-btn fab dark class="google-fab" :href="'/api/auth/google'">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZCQkIwMDsiIGQ9Ik0xMTMuNDcsMzA5LjQwOEw5NS42NDgsMzc1Ljk0bC02NS4xMzksMS4zNzhDMTEuMDQyLDM0MS4yMTEsMCwyOTkuOSwwLDI1NiAgYzAtNDIuNDUxLDEwLjMyNC04Mi40ODMsMjguNjI0LTExNy43MzJoMC4wMTRsNTcuOTkyLDEwLjYzMmwyNS40MDQsNTcuNjQ0Yy01LjMxNywxNS41MDEtOC4yMTUsMzIuMTQxLTguMjE1LDQ5LjQ1NiAgQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1MThFRjg7IiBkPSJNNTA3LjUyNywyMDguMTc2QzUxMC40NjcsMjIzLjY2Miw1MTIsMjM5LjY1NSw1MTIsMjU2YzAsMTguMzI4LTEuOTI3LDM2LjIwNi01LjU5OCw1My40NTEgIGMtMTIuNDYyLDU4LjY4My00NS4wMjUsMTA5LjkyNS05MC4xMzQsMTQ2LjE4N2wtMC4wMTQtMC4wMTRsLTczLjA0NC0zLjcyN2wtMTAuMzM4LTY0LjUzNSAgYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyOEI0NDY7IiBkPSJNNDE2LjI1Myw0NTUuNjI0bDAuMDE0LDAuMDE0QzM3Mi4zOTYsNDkwLjkwMSwzMTYuNjY2LDUxMiwyNTYsNTEyICBjLTk3LjQ5MSwwLTE4Mi4yNTItNTQuNDkxLTIyNS40OTEtMTM0LjY4MWw4Mi45NjEtNjcuOTFjMjEuNjE5LDU3LjY5OCw3Ny4yNzgsOTguNzcxLDE0Mi41Myw5OC43NzEgIGMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0YxNDMzNjsiIGQ9Ik00MTkuNDA0LDU4LjkzNmwtODIuOTMzLDY3Ljg5NmMtMjMuMzM1LTE0LjU4Ni01MC45MTktMjMuMDEyLTgwLjQ3MS0yMy4wMTIgIGMtNjYuNzI5LDAtMTIzLjQyOSw0Mi45NTctMTQzLjk2NSwxMDIuNzI0bC04My4zOTctNjguMjc2aC0wLjAxNEM3MS4yMyw1Ni4xMjMsMTU3LjA2LDAsMjU2LDAgIEMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                </v-btn>
                <v-btn fab dark class="facebook-fab" :href="'/api/auth/facebook'">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgOTYuMTI0IDk2LjEyMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOTYuMTI0IDk2LjEyMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik03Mi4wODksMC4wMkw1OS42MjQsMEM0NS42MiwwLDM2LjU3LDkuMjg1LDM2LjU3LDIzLjY1NnYxMC45MDdIMjQuMDM3Yy0xLjA4MywwLTEuOTYsMC44NzgtMS45NiwxLjk2MXYxNS44MDMgICBjMCwxLjA4MywwLjg3OCwxLjk2LDEuOTYsMS45NmgxMi41MzN2MzkuODc2YzAsMS4wODMsMC44NzcsMS45NiwxLjk2LDEuOTZoMTYuMzUyYzEuMDgzLDAsMS45Ni0wLjg3OCwxLjk2LTEuOTZWNTQuMjg3aDE0LjY1NCAgIGMxLjA4MywwLDEuOTYtMC44NzcsMS45Ni0xLjk2bDAuMDA2LTE1LjgwM2MwLTAuNTItMC4yMDctMS4wMTgtMC41NzQtMS4zODZjLTAuMzY3LTAuMzY4LTAuODY3LTAuNTc1LTEuMzg3LTAuNTc1SDU2Ljg0MnYtOS4yNDYgICBjMC00LjQ0NCwxLjA1OS02LjcsNi44NDgtNi43bDguMzk3LTAuMDAzYzEuMDgyLDAsMS45NTktMC44NzgsMS45NTktMS45NlYxLjk4Qzc0LjA0NiwwLjg5OSw3My4xNywwLjAyMiw3Mi4wODksMC4wMnoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </v-btn>
                <v-btn fab dark class="twitter-fab" :href="'/api/auth/twitter'">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYxMiA2MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxMiA2MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNjEyLDExNi4yNThjLTIyLjUyNSw5Ljk4MS00Ni42OTQsMTYuNzUtNzIuMDg4LDE5Ljc3MmMyNS45MjktMTUuNTI3LDQ1Ljc3Ny00MC4xNTUsNTUuMTg0LTY5LjQxMSAgICBjLTI0LjMyMiwxNC4zNzktNTEuMTY5LDI0LjgyLTc5Ljc3NSwzMC40OGMtMjIuOTA3LTI0LjQzNy01NS40OS0zOS42NTgtOTEuNjMtMzkuNjU4Yy02OS4zMzQsMC0xMjUuNTUxLDU2LjIxNy0xMjUuNTUxLDEyNS41MTMgICAgYzAsOS44MjgsMS4xMDksMTkuNDI3LDMuMjUxLDI4LjYwNkMxOTcuMDY1LDIwNi4zMiwxMDQuNTU2LDE1Ni4zMzcsNDIuNjQxLDgwLjM4NmMtMTAuODIzLDE4LjUxLTE2Ljk4LDQwLjA3OC0xNi45OCw2My4xMDEgICAgYzAsNDMuNTU5LDIyLjE4MSw4MS45OTMsNTUuODM1LDEwNC40NzljLTIwLjU3NS0wLjY4OC0zOS45MjYtNi4zNDgtNTYuODY3LTE1Ljc1NnYxLjU2OGMwLDYwLjgwNiw0My4yOTEsMTExLjU1NCwxMDAuNjkzLDEyMy4xMDQgICAgYy0xMC41MTcsMi44My0yMS42MDcsNC4zOTgtMzMuMDgsNC4zOThjLTguMTA3LDAtMTUuOTQ3LTAuODAzLTIzLjYzNC0yLjMzM2MxNS45ODUsNDkuOTA3LDYyLjMzNiw4Ni4xOTksMTE3LjI1Myw4Ny4xOTQgICAgYy00Mi45NDcsMzMuNjU0LTk3LjA5OSw1My42NTUtMTU1LjkxNiw1My42NTVjLTEwLjEzNCwwLTIwLjExNi0wLjYxMi0yOS45NDQtMS43MjFjNTUuNTY3LDM1LjY4MSwxMjEuNTM2LDU2LjQ4NSwxOTIuNDM4LDU2LjQ4NSAgICBjMjMwLjk0OCwwLDM1Ny4xODgtMTkxLjI5MSwzNTcuMTg4LTM1Ny4xODhsLTAuNDIxLTE2LjI1M0M1NzMuODcyLDE2My41MjYsNTk1LjIxMSwxNDEuNDIyLDYxMiwxMTYuMjU4eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                </v-btn>
              </v-flex>
              <v-flex class="mt-3" xs12>
                <p class="mb-2 text-xs-center">Or create a My Snooker Skills account right here.</p>
                <v-alert
                  v-if="tempUser"
                  :value="registered"
                  class="mt-3 mb-3"
                  type="success"
                  dismissible
                  transition="scale-transition"
                >
                  Hi {{ tempUser.firstName }}! Please verify your email address by clicking the link we sent to {{ tempUser.email }}.
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
                  ref="registerForm"
                  v-model="registerFormValid"
                  @submit="register"
                >
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-text-field
                        prepend-icon="person"
                        name="firstName"
                        label="First name"
                        type="text"
                        v-model="firstName"
                        :rules="firstNameRules"
                        @input="registered = false"
                        clearable
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        prepend-icon="perm_identity"
                        name="lastName"
                        label="Last name"
                        type="text"
                        v-model="lastName"
                        :rules="lastNameRules"
                        @input="registered = false"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-text-field
                        prepend-icon="email"
                        name="email"
                        label="Email"
                        type="text"
                        v-model="email"
                        :rules="emailRules"
                        :error-messages="emailErrors"
                        @input="emailErrors = []; registered = false"
                        clearable
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        prepend-icon="alternate_email"
                        name="username"
                        label="Username"
                        type="text"
                        v-model="username"
                        :rules="usernameRules"
                        counter
                        maxlength="25"
                        :error-messages="usernameErrors"
                        @input="usernameErrors = []; registered = false"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-text-field
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        :type="passwordShowPlain ? 'text' : 'password'"
                        v-model="password"
                        :rules="passwordRules"
                        counter
                        :append-icon="passwordShowPlain ? 'visibility_off' : 'visibility'"
                        @click:append="passwordShowPlain = !passwordShowPlain"
                        @input="registered = false"
                        clearable
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        prepend-icon="refresh"
                        name="repeatPassword"
                        label="Repeat password"
                        :type="repeatPasswordShowPlain ? 'text' : 'password'"
                        v-model="repeatPassword"
                        :rules="repeatPasswordRules"
                        counter
                        :append-icon="repeatPasswordShowPlain ? 'visibility_off' : 'visibility'"
                        @click:append="repeatPasswordShowPlain = !repeatPasswordShowPlain"
                        @input="registered = false"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-checkbox
                    class="mt-0"
                    color="primary"
                    v-model="privacyPolicy"
                  >
                    <span slot="label">I accept the <a href="https://www.mysnookerskills.com/privacy-policy" target="_blank">privacy policy</a>.</span>
                  </v-checkbox>
                  <v-btn
                    color="primary"
                    block
                    :disabled="!registerFormValid || $store.state.loading || registered || !privacyPolicy"
                    type="submit"
                  >
                    Register
                  </v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-btn class="mt-3 grey--text" block :to="{ name: 'Login' }" flat>Login with an existing account</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      privacyPolicy: false,
      registerFormValid: false,
      firstName: '',
      firstNameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 50) || 'First name must be less than 50 characters'
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 50) || 'Last name must be less than 50 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && v.length <= 100) || 'Email must be less than 100 characters',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Email has to be valid'
      ],
      emailErrors: [],
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 25) || 'Username must be less than 25 characters',
        v =>
          /^((?!@).)*$/.test(v) ||
          'Username can\'t contain an @-sign'
      ],
      usernameErrors: [],
      password: '',
      passwordShowPlain: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!$%@#£€*?&+-_~]{10,}$/.test(v) ||
          'Minimum 10 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number'
      ],
      repeatPassword: '',
      repeatPasswordShowPlain: false,
      repeatPasswordRules: [
        v => !!v || 'Repeat password is required',
        v => (v && v === this.password) || 'Must match password'
      ],
      registered: false,
      tempUser: null,
      failed: false
    }
  },
  created() {
    // Development
    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
      // Settings
      let fillData = false

      if (fillData) {
        let fillDataNumber = 1
        switch (fillDataNumber) {
          case 1:
            this.firstName = 'Steff'
            this.lastName = 'Beckers'
            this.email = 'beckerssteff@gmail.com'
            this.username = 'beckerssteff'
            this.password = 'SteffBeckers123'
            this.repeatPassword = 'SteffBeckers123'
            this.privacyPolicy = true
            break
        }
      }
    }
  },
  mounted() {
    // Alerts
    // verification-failed
    if (localStorage.getItem('register:verification-failed')) {
      this.failed = true
      localStorage.removeItem('register:verification-failed')
    }
  },
  methods: {
    register(e) {
      e.preventDefault() // Submit

      // Reset form
      this.emailErrors = []
      this.usernameErrors = []
      this.registered = false
      this.tempUser = null
      this.failed = false

      // Validation
      if (!this.$refs.registerForm.validate()) { return }

      this.$axios
        .post(process.env.VUE_APP_API + '/Users', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          username: this.username,
          password: this.password
        }).then(response => {
          // Temp user
          this.tempUser = response.data

          // Registered alert
          this.registered = true
        }).catch(error => {
          if (error.statusCode === 422 && error.details && error.details.codes) { // Validation error
            // Uniqueness
            // Email
            if (error.details.codes.email) {
              error.details.codes.email.forEach(code => {
                if (code === 'uniqueness') {
                  this.emailErrors.push('There is already an account registered with this email address. Try logging in or reset your password first')
                }
              })
            }
            // Username
            if (error.details.codes.username) {
              error.details.codes.username.forEach(code => {
                if (code === 'uniqueness') {
                  this.usernameErrors.push('This username is already taken')
                }
              })
            }
          }
        })
    }
  },
  watch: {
    username(val) {
      if (val) {
        localStorage.setItem('login:usernameOrEmail', val)
      } else {
        localStorage.removeItem('login:usernameOrEmail')
      }
    }
  },
  name: 'Register'
}
</script>
