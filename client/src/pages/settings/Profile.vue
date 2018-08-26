<template>
  <v-container v-if="$store.state.authenticated" grid-list-lg fluid>
    <v-breadcrumbs v-if="$vuetify.breakpoint.smAndUp">
      <v-icon slot="divider">fiber_manual_record</v-icon>
      <v-breadcrumbs-item>
        Settings
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>
        Profile
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout :class="$vuetify.breakpoint.smAndUp ? 'pt-3 bb-1px-s-eee pb-3' : 'bb-1px-s-eee pb-3'" row wrap>
      <v-flex xs12 sm3>
        <p class="title">Avatar</p>
        <p :class="$vuetify.breakpoint.xs ? 'sub-title mb-0' : 'sub-title'">You can upload an avatar here or change it at <a href="https://www.gravatar.com/" target="_blank">gravatar.com</a></p>
      </v-flex>
      <v-flex class="text-xs-center" xs12 sm3>
        <v-avatar size="160px" :color="!$store.state.user.profilePicture ? 'red' : 'transparent'">
          <img v-if="$store.state.user.profilePicture" :src="profilePicture($store.state.user.profilePicture, 90)">
          <v-icon style="font-size: 42px;" dark v-else>person</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs12 sm6>
        <p class="body-2 mb-2">Upload new avatar</p>
        <upload-btn
          accept="image/*"
          title="Choose new avatar"
          :fileChangedCallback="uploadNewAvatar"
        >
        </upload-btn>
        <p class="mt-2">The maximum image size allowed is 500KB.</p>
      </v-flex>
    </v-layout>
    <v-layout class="pt-3 pb-3" row wrap>
      <v-flex xs12 sm4>
        <p class="title">Main settings</p>
        <p :class="$vuetify.breakpoint.xs ? 'mb-0' : ''">This information will appear on your profile.</p>
      </v-flex>
      <v-flex xs12 sm8>
        <v-form
          ref="changeProfileForm"
          v-model="changeProfileFormValid"
          @submit="changeProfile"
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
                @input="profileChanged = false"
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
                @input="profileChanged = false"
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="text"
                v-model="email"
                :rules="emailRules"
                :error-messages="emailErrors"
                @input="emailErrors = []; profileChanged = false"
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-btn
            color="primary"
            :disabled="!changeProfileFormValid || $store.state.loading"
            type="submit"
            :block="$vuetify.breakpoint.xs"
          >
            Update profile
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
  div.upload-btn {
    padding: 0px;
  }
  div.upload-btn label[for='uploadFile'] {
    margin-left: 0px!important;
  }
</style>

<script>
export default {
  data() {
    return {
      changeProfileFormValid: false,
      firstName: this.$store.state.user.firstName,
      firstNameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 50) || 'First name must be less than 50 characters'
      ],
      lastName: this.$store.state.user.lastName,
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 50) || 'Last name must be less than 50 characters'
      ],
      email: this.$store.state.user.email,
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && v.length <= 100) || 'Email must be less than 100 characters',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Email has to be valid'
      ],
      emailErrors: [],
      profileChanged: false
    }
  },
  methods: {
    uploadNewAvatar(file) {
      this.$logger.log('uploadNewAvatar(file) => file', file)
    },
    changeProfile(e) {
      e.preventDefault() // Submit

      // Reset form
      this.profileChanged = false
      this.emailErrors = []

      // Validation
      if (!this.$refs.changeProfileForm.validate()) { return }

      this.$axios
        .patch(process.env.API + '/Users/' + this.$store.state.user.id, {
          firstName: this.firstName,
          lastName: this.lastName
        }).then(response => {
          this.$logger.log('CHANGE PROFILE RESPONSE', response.data)

          // Update user in store
          this.$store.commit('changeProfile', response.data)

          // Fill updated data in form
          this.firstName = this.$store.state.user.firstName
          this.lastName = this.$store.state.user.lastName
          this.email = this.$store.state.user.email
        }).catch(error => {
          this.$logger.log('CHANGE PROFILE ERROR', error)

          if (error.statusCode === 422 && error.details && error.details.codes) { // Validation error
            // Uniqueness
            // Email
            if (error.details.codes.email) {
              error.details.codes.email.forEach(code => {
                if (code === 'uniqueness') {
                  this.emailErrors.push('There is already an account registered with this email address')
                }
              })
            }
          }
        })
    }
  },
  name: 'ProfileSettings'
}
</script>
