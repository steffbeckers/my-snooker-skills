<template>
<v-container grid-list-lg fluid>
    <v-layout class="mt-3" justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset password</v-toolbar-title>
          </v-toolbar>
          <v-card-text align-center>
            <v-layout column>
              <v-flex v-if="this.$route.query.access_token" xs12>
                <p class="text-xs-center">Choose a new strong password, easy to remember.</p>
                <v-form
                  ref="passwordResetForm"
                  v-model="passwordResetFormValid"
                  @submit="resetPassword"
                >
                  <v-layout column wrap>
                    <v-flex xs12>
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
                  <v-btn
                    color="primary"
                    block
                    :disabled="!passwordResetFormValid || $store.state.loading || !$route.query.access_token"
                    type="submit"
                  >
                    Change password
                  </v-btn>
                </v-form>
              </v-flex>
              <v-flex v-else xs12>
                <p class="text-xs-center">Reset your My Snooker Skills account. Send an email to recover your password.</p>
                <v-alert
                  :value="passwordResetRequestEmailSent"
                  class="mt-3 mb-3"
                  type="success"
                  dismissible
                  transition="scale-transition"
                >
                  We sent you an email to reset your password. Please check your mailbox and reset your password by clicking the password reset link.
                </v-alert>
                <v-alert
                  :value="tokenExpired"
                  class="mt-3 mb-3"
                  type="error"
                  dismissible
                  transition="scale-transition"
                >
                  Your password reset token expired. You get 15 minutes to reset your password after the email is sent. Please send yourself a new email.
                </v-alert>
                <v-form
                  ref="passwordResetRequestForm"
                  v-model="passwordResetRequestFormValid"
                  @submit="resetPasswordRequest"
                >
                  <v-layout column wrap>
                    <v-flex xs12>
                      <v-text-field
                        prepend-icon="person"
                        name="email"
                        label="Email"
                        type="text"
                        v-model="email"
                        :rules="emailRules"
                        :error-messages="emailErrors"
                        @input="emailErrors = []; passwordResetRequestEmailSent = false"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-btn
                    color="primary"
                    block
                    :disabled="!passwordResetRequestFormValid || $store.state.loading || passwordResetRequestEmailSent"
                    type="submit"
                  >
                    Send email
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
      passwordResetRequestFormValid: false,
      email: localStorage.getItem('reset-password:email') || '',
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && v.length <= 100) || 'Email must be less than 100 characters',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Email has to be valid'
      ],
      emailErrors: [],
      passwordResetRequestEmailSent: false,
      passwordResetFormValid: false,
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
      tokenExpired: false
    }
  },
  created() {
    // Access token
    this.$logger.log(this.$route.query.access_token)
  },
  methods: {
    resetPasswordRequest(e) {
      e.preventDefault() // Submit

      // Reset form
      this.emailErrors = []
      this.passwordResetRequestEmailSent = false

      // Validation
      if (!this.$refs.passwordResetRequestForm.validate()) { return }

      this.$axios
        .post(process.env.VUE_APP_API + '/Users/reset', {
          email: this.email
        })
        .then(() => {
          this.passwordResetRequestEmailSent = true
        })
    },
    resetPassword(e) {
      e.preventDefault() // Submit

      // Check token
      if (!this.$route.query.access_token) { return }

      // Validation
      if (!this.$refs.passwordResetForm.validate()) { return }

      this.$axios
        .post(process.env.VUE_APP_API + '/Users/reset-password?access_token=' + this.$route.query.access_token, {
          newPassword: this.password
        })
        .then(() => {
          // Verified, redirect
          localStorage.setItem('login:password-reset', true)
          this.$router.push('/login')
        })
        .catch(error => {
          if (error && error.code === 'AUTHORIZATION_REQUIRED') {
            // Remove token from query params
            let query = Object.assign({}, this.$route.query)
            delete query.access_token
            this.$router.replace({ query })

            // Show token expiration message
            this.tokenExpired = true
          }
        })
    }
  },
  watch: {
    email(val) {
      if (val) {
        localStorage.setItem('reset-password:email', val)
      } else {
        localStorage.removeItem('reset-password:email')
      }
    }
  },
  name: 'ResetPassword'
}
</script>
