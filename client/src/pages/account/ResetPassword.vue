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
              <v-flex class="text-xs-center" xs12>
                <p>Reset your My Snooker Skills account. Send an email to recover your password.</p>
                <v-alert
                  :value="passwordResetEmailSent"
                  class="mt-3 mb-3"
                  type="success"
                  dismissible
                  transition="scale-transition"
                >
                  We sent you an email to reset your password. Please check your mailbox and reset your password by clicking the password reset link.
                </v-alert>
                <v-form
                  ref="passwordResetForm"
                  v-model="passwordResetFormValid"
                  @submit="resetPassword"
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
                        @input="emailErrors = []"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-btn
                    color="primary"
                    block
                    :disabled="!passwordResetFormValid || $store.state.loading"
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
      passwordResetFormValid: false,
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && v.length <= 100) || 'Email must be less than 100 characters',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Email has to be valid'
      ],
      emailErrors: [],
      passwordResetEmailSent: false
    }
  },
  methods: {
    resetPassword(e) {
      e.preventDefault() // Submit

      // Reset form
      this.emailErrors = []
      this.passwordResetEmailSent = false

      // Validation
      if (!this.$refs.passwordResetForm.validate()) { return }

      this.$axios
        .post(process.env.API + '/Users/reset', {
          email: this.email
        })
    }
  },
  name: 'ResetPassword'
}
</script>
