<template>
  <v-container v-if="$store.state.authenticated" grid-list-lg fluid>
    <v-breadcrumbs v-if="$vuetify.breakpoint.smAndUp">
      <v-icon slot="divider">fiber_manual_record</v-icon>
      <v-breadcrumbs-item>
        Settings
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>
        Account
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout :class="$vuetify.breakpoint.smAndUp ? 'pt-3 pb-3' : 'pb-3'" row wrap>
      <v-flex xs12 sm4>
        <p class="title">Social sign-in</p>
        <p :class="$vuetify.breakpoint.xs ? 'sub-title mb-0' : 'sub-title'">Activate sign-in with one of the following services.</p>
      </v-flex>
      <v-flex xs12 sm8>
        <p class="body-2">Connected Accounts</p>
        <p>Click on icon to activate signin with one of the following services.</p>
        <v-btn fab dark class="google-fab" :href="'/api/link/google'">
          <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZCQkIwMDsiIGQ9Ik0xMTMuNDcsMzA5LjQwOEw5NS42NDgsMzc1Ljk0bC02NS4xMzksMS4zNzhDMTEuMDQyLDM0MS4yMTEsMCwyOTkuOSwwLDI1NiAgYzAtNDIuNDUxLDEwLjMyNC04Mi40ODMsMjguNjI0LTExNy43MzJoMC4wMTRsNTcuOTkyLDEwLjYzMmwyNS40MDQsNTcuNjQ0Yy01LjMxNywxNS41MDEtOC4yMTUsMzIuMTQxLTguMjE1LDQ5LjQ1NiAgQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1MThFRjg7IiBkPSJNNTA3LjUyNywyMDguMTc2QzUxMC40NjcsMjIzLjY2Miw1MTIsMjM5LjY1NSw1MTIsMjU2YzAsMTguMzI4LTEuOTI3LDM2LjIwNi01LjU5OCw1My40NTEgIGMtMTIuNDYyLDU4LjY4My00NS4wMjUsMTA5LjkyNS05MC4xMzQsMTQ2LjE4N2wtMC4wMTQtMC4wMTRsLTczLjA0NC0zLjcyN2wtMTAuMzM4LTY0LjUzNSAgYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyOEI0NDY7IiBkPSJNNDE2LjI1Myw0NTUuNjI0bDAuMDE0LDAuMDE0QzM3Mi4zOTYsNDkwLjkwMSwzMTYuNjY2LDUxMiwyNTYsNTEyICBjLTk3LjQ5MSwwLTE4Mi4yNTItNTQuNDkxLTIyNS40OTEtMTM0LjY4MWw4Mi45NjEtNjcuOTFjMjEuNjE5LDU3LjY5OCw3Ny4yNzgsOTguNzcxLDE0Mi41Myw5OC43NzEgIGMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0YxNDMzNjsiIGQ9Ik00MTkuNDA0LDU4LjkzNmwtODIuOTMzLDY3Ljg5NmMtMjMuMzM1LTE0LjU4Ni01MC45MTktMjMuMDEyLTgwLjQ3MS0yMy4wMTIgIGMtNjYuNzI5LDAtMTIzLjQyOSw0Mi45NTctMTQzLjk2NSwxMDIuNzI0bC04My4zOTctNjguMjc2aC0wLjAxNEM3MS4yMyw1Ni4xMjMsMTU3LjA2LDAsMjU2LDAgIEMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
        </v-btn>
        <v-btn fab dark class="facebook-fab" :href="'/api/link/facebook'">
          <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgOTYuMTI0IDk2LjEyMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOTYuMTI0IDk2LjEyMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik03Mi4wODksMC4wMkw1OS42MjQsMEM0NS42MiwwLDM2LjU3LDkuMjg1LDM2LjU3LDIzLjY1NnYxMC45MDdIMjQuMDM3Yy0xLjA4MywwLTEuOTYsMC44NzgtMS45NiwxLjk2MXYxNS44MDMgICBjMCwxLjA4MywwLjg3OCwxLjk2LDEuOTYsMS45NmgxMi41MzN2MzkuODc2YzAsMS4wODMsMC44NzcsMS45NiwxLjk2LDEuOTZoMTYuMzUyYzEuMDgzLDAsMS45Ni0wLjg3OCwxLjk2LTEuOTZWNTQuMjg3aDE0LjY1NCAgIGMxLjA4MywwLDEuOTYtMC44NzcsMS45Ni0xLjk2bDAuMDA2LTE1LjgwM2MwLTAuNTItMC4yMDctMS4wMTgtMC41NzQtMS4zODZjLTAuMzY3LTAuMzY4LTAuODY3LTAuNTc1LTEuMzg3LTAuNTc1SDU2Ljg0MnYtOS4yNDYgICBjMC00LjQ0NCwxLjA1OS02LjcsNi44NDgtNi43bDguMzk3LTAuMDAzYzEuMDgyLDAsMS45NTktMC44NzgsMS45NTktMS45NlYxLjk4Qzc0LjA0NiwwLjg5OSw3My4xNywwLjAyMiw3Mi4wODksMC4wMnoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
        </v-btn>
        <v-btn fab dark class="twitter-fab" :href="'/api/auth/twitter'">
          <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYxMiA2MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxMiA2MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNjEyLDExNi4yNThjLTIyLjUyNSw5Ljk4MS00Ni42OTQsMTYuNzUtNzIuMDg4LDE5Ljc3MmMyNS45MjktMTUuNTI3LDQ1Ljc3Ny00MC4xNTUsNTUuMTg0LTY5LjQxMSAgICBjLTI0LjMyMiwxNC4zNzktNTEuMTY5LDI0LjgyLTc5Ljc3NSwzMC40OGMtMjIuOTA3LTI0LjQzNy01NS40OS0zOS42NTgtOTEuNjMtMzkuNjU4Yy02OS4zMzQsMC0xMjUuNTUxLDU2LjIxNy0xMjUuNTUxLDEyNS41MTMgICAgYzAsOS44MjgsMS4xMDksMTkuNDI3LDMuMjUxLDI4LjYwNkMxOTcuMDY1LDIwNi4zMiwxMDQuNTU2LDE1Ni4zMzcsNDIuNjQxLDgwLjM4NmMtMTAuODIzLDE4LjUxLTE2Ljk4LDQwLjA3OC0xNi45OCw2My4xMDEgICAgYzAsNDMuNTU5LDIyLjE4MSw4MS45OTMsNTUuODM1LDEwNC40NzljLTIwLjU3NS0wLjY4OC0zOS45MjYtNi4zNDgtNTYuODY3LTE1Ljc1NnYxLjU2OGMwLDYwLjgwNiw0My4yOTEsMTExLjU1NCwxMDAuNjkzLDEyMy4xMDQgICAgYy0xMC41MTcsMi44My0yMS42MDcsNC4zOTgtMzMuMDgsNC4zOThjLTguMTA3LDAtMTUuOTQ3LTAuODAzLTIzLjYzNC0yLjMzM2MxNS45ODUsNDkuOTA3LDYyLjMzNiw4Ni4xOTksMTE3LjI1Myw4Ny4xOTQgICAgYy00Mi45NDcsMzMuNjU0LTk3LjA5OSw1My42NTUtMTU1LjkxNiw1My42NTVjLTEwLjEzNCwwLTIwLjExNi0wLjYxMi0yOS45NDQtMS43MjFjNTUuNTY3LDM1LjY4MSwxMjEuNTM2LDU2LjQ4NSwxOTIuNDM4LDU2LjQ4NSAgICBjMjMwLjk0OCwwLDM1Ny4xODgtMTkxLjI5MSwzNTcuMTg4LTM1Ny4xODhsLTAuNDIxLTE2LjI1M0M1NzMuODcyLDE2My41MjYsNTk1LjIxMSwxNDEuNDIyLDYxMiwxMTYuMjU4eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout class="pt-3 pb-3" row wrap>
      <v-flex xs12 sm4>
        <p class="title">Change username</p>
        <p :class="$vuetify.breakpoint.xs ? 'mb-0' : ''">A username must be unique.</p>
      </v-flex>
      <v-flex xs12 sm8>
        <v-form
          ref="changeUsernameForm"
          v-model="changeUsernameFormValid"
          @submit="changeUsername"
        >
          <v-layout row wrap>
            <v-flex xs12>
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
                @input="usernameErrors = []"
                clearable
              ></v-text-field>
              <p v-if="$vuetify.breakpoint.smAndUp" class="text-xs-center mb-0">
                <span v-if="$store.state.user.username !== this.username">https://app.mysnookerskills.com/@{{ username }}</span><router-link :to="{ name: 'Profile', params: { username: username }}" v-else>https://app.mysnookerskills.com/@{{ username }}</router-link>
              </p>
            </v-flex>
          </v-layout>
          <v-btn
            color="primary"
            :disabled="!changeUsernameFormValid || $store.state.loading || $store.state.user.username === this.username"
            type="submit"
            :block="$vuetify.breakpoint.xs"
          >
            Update username
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout class="pt-3 pb-3" row wrap>
      <v-flex xs12 sm4>
        <p class="title">Change password</p>
        <p :class="$vuetify.breakpoint.xs ? 'mb-0' : ''">Minimum 10 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number</p>
      </v-flex>
      <v-flex xs12 sm8>
        <v-alert
          :value="passwordChanged"
          type="success"
          dismissible
          transition="scale-transition"
        >
          Successfully changed your password! You must use this new password during your next login.
        </v-alert>
        <v-form
          ref="changePasswordForm"
          v-model="changePasswordFormValid"
          @submit="changePassword"
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                prepend-icon="lock"
                name="currentPassword"
                label="Current password"
                :type="currentPasswordShowPlain ? 'text' : 'password'"
                v-model="currentPassword"
                :rules="passwordRules"
                counter
                :append-icon="currentPasswordShowPlain ? 'visibility_off' : 'visibility'"
                @click:append="currentPasswordShowPlain = !currentPasswordShowPlain"
                :error-messages="currentPasswordErrors"
                @input="currentPasswordErrors = []; passwordChanged = false"
                validate-on-blur
                clearable
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="New password"
                :type="passwordShowPlain ? 'text' : 'password'"
                v-model="password"
                :rules="passwordRules"
                counter
                :append-icon="passwordShowPlain ? 'visibility_off' : 'visibility'"
                @click:append="passwordShowPlain = !passwordShowPlain"
                @input="passwordChanged = false"
                clearable
              ></v-text-field>
              <v-text-field
                prepend-icon="refresh"
                name="repeatPassword"
                label="Repeat new password"
                :type="repeatPasswordShowPlain ? 'text' : 'password'"
                v-model="repeatPassword"
                :rules="repeatPasswordRules"
                counter
                :append-icon="repeatPasswordShowPlain ? 'visibility_off' : 'visibility'"
                @click:append="repeatPasswordShowPlain = !repeatPasswordShowPlain"
                @input="passwordChanged = false"
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-btn
            color="primary"
            :disabled="!changePasswordFormValid || $store.state.loading || passwordChanged"
            type="submit"
            :block="$vuetify.breakpoint.xs"
          >
            Update password
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout class="pt-3 pb-3" row wrap>
      <v-flex xs12 sm4>
        <p class="title">Delete your account</p>
        <p>Deleting your account means that ...</p>
      </v-flex>
      <v-flex xs12 sm8>
        <!-- <v-form
          ref="changeUsernameForm"
          v-model="changeUsernameFormValid"
          @submit="changeUsername"
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                prepend-icon="alternate_email"
                @click:prepend="username = ''"
                name="username"
                label="Username"
                type="text"
                v-model="username"
                :rules="usernameRules"
                counter
                maxlength="25"
                :error-messages="usernameErrors"
                @input="usernameErrors = []"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-btn
            color="primary"
            :disabled="!changeUsernameFormValid || $store.state.loading || $store.state.user.username === this.username"
            type="submit"
          >
            Update username
          </v-btn>
        </v-form> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      changeUsernameFormValid: false,
      username: this.$store.state.user.username,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 25) || 'Username must be less than 25 characters',
        v =>
          /^((?!@).)*$/.test(v) ||
          'Username can\'t contain an @-sign'
      ],
      usernameErrors: [],
      changePasswordFormValid: false,
      currentPassword: '',
      currentPasswordShowPlain: false,
      currentPasswordErrors: [],
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
      passwordChanged: false
    }
  },
  async created() {
    let user = await this.$authentication.me()
    if (user) this.$store.commit('updateMe', user)
  },
  methods: {
    changeUsername(e) {
      e.preventDefault() // Submit

      // Reset form
      this.usernameErrors = []

      // Validation
      if (!this.$refs.changeUsernameForm.validate()) { return }

      this.$axios
        .patch(process.env.VUE_APP_API + '/Users/' + this.$store.state.user.id, {
          username: this.username
        }).then(response => {
          // Update user in store
          this.$store.commit('changeUsername', response.data.username)
        }).catch(error => {
          if (error.statusCode === 422 && error.details && error.details.codes) { // Validation error
            // Uniqueness
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
    },
    changePassword(e) {
      e.preventDefault() // Submit

      // Reset form
      this.currentPasswordErrors = []
      this.passwordChanged = false

      // Validation
      if (!this.$refs.changePasswordForm.validate()) { return }

      this.$axios
        .post(process.env.VUE_APP_API + '/Users/change-password', {
          oldPassword: this.currentPassword,
          newPassword: this.password
        }).then(() => {
          // Reset the form
          this.$refs.changePasswordForm.reset()
          // Message
          this.passwordChanged = true
        }).catch(error => {
          // Invalid current password
          if (error.code === 'INVALID_PASSWORD') {
            this.currentPasswordErrors.push('Current password is invalid')
          }
        })
    }
  },
  name: 'AccountSettings'
}
</script>
