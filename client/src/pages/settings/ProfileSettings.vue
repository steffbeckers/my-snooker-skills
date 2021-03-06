<template>
  <div>
    <v-toolbar color="transparent" class="elevation-0">
      <v-toolbar-title color="grey">
        <v-icon class="mr-2">settings</v-icon> Profile
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'AccountSettings' }" exact flat>
        Account settings
      </v-btn>
      <v-btn icon>
        <v-icon color="rgba(0,0,0,.54)">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-if="$store.state.authenticated" class="pt-1" grid-list-lg fluid>
      <v-layout class="pb-3" row wrap>
        <v-flex xs12 sm3>
          <p class="title">Avatar</p>
          <p :class="$vuetify.breakpoint.xs ? 'sub-title mb-0' : 'sub-title'">You can upload an avatar here or change it at <a href="https://www.gravatar.com/" target="_blank">gravatar.com</a></p>
          <div class="mt-2" style="cursor: pointer" v-if="$store.state.user.profilePicture" @click="removeAvatar()">
            <v-icon>delete</v-icon> Remove
          </div>
        </v-flex>
        <v-flex class="text-xs-center" xs12 sm3>
          <v-avatar
            size="140px"
            :color="!$store.state.user.profilePicture ? 'red' : 'transparent'"
          >
            <img
              v-if="$store.state.user.profilePicture && typeof $store.state.user.profilePicture === 'object' && $store.state.user.profilePicture.small"
              :src="$store.state.user.profilePicture.small"
            >
            <img
              v-if="$store.state.user.profilePicture && typeof $store.state.user.profilePicture === 'string'"
              :src="$store.state.user.profilePicture"
            >
            <v-icon v-if="!$store.state.user.profilePicture" style="font-size: 60px;" dark>person</v-icon>
          </v-avatar>
        </v-flex>
        <v-flex xs12 sm6>
          <p class="body-2 mb-2">Upload new avatar</p>
          <v-alert
            :value="newAvatarTooLarge"
            type="error"
            transition="scale-transition"
          >
            This image is too big. Try uploading a smaller image.
          </v-alert>
          <upload-btn
            accept="image/*"
            title="Choose new avatar"
            :fileChangedCallback="uploadNewAvatar"
            class="pl-0 pr-0"
            :loading="uploadingImage"
            :block="$vuetify.breakpoint.xs"
          ></upload-btn>
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
              <v-flex xs12>
                <v-alert
                  :value="!$store.state.user.emailVerified && !resentVerificationEmail"
                  type="warning"
                  transition="scale-transition"
                >
                  Please check your mailbox and verify your email address by clicking the verification link.
                </v-alert>
                <v-btn
                  v-if="!$store.state.user.emailVerified && !resentVerificationEmail"
                  class="mt-3 mb-3 white--text"
                  color="warning"
                  block
                  :disabled="$store.state.loading || !email"
                  @click="resendVerificationEmail"
                >
                  Resend verification email
                </v-btn>
                <v-alert
                  :value="resentVerificationEmail"
                  type="success"
                  dismissible
                  transition="scale-transition"
                >
                  We resent you a verification email. Please check your mailbox and verify your email address by clicking the verification link.
                </v-alert>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  prepend-icon="person"
                  name="firstName"
                  label="First name"
                  type="text"
                  v-model="firstName"
                  :rules="firstNameRules"
                  @input="profileChanged = false"
                  :disabled="!$store.state.user.emailVerified"
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
                  :disabled="!$store.state.user.emailVerified"
                  clearable
                ></v-text-field>
              </v-flex>
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
              <v-flex>
                <v-textarea
                  prepend-icon="subject"
                  name="bio"
                  label="Bio"
                  v-model="bio"
                  :rules="bioRules"
                  @input="profileChanged = false"
                  :disabled="!$store.state.user.emailVerified"
                  counter
                  clearable
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-btn
              color="primary"
              :disabled="
                ($store.state.user.firstName === this.firstName &&
                $store.state.user.lastName === this.lastName &&
                $store.state.user.email === this.email &&
                $store.state.user.bio === this.bio) ||
                $store.state.loading ||
                !changeProfileFormValid
              "
              type="submit"
              :block="$vuetify.breakpoint.xs"
            >
              Update profile
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style scoped>
div.upload-btn > label {
  margin-left: 0px !important;
}
</style>

<script>
import UploadButton from 'vuetify-upload-button'

export default {
  data() {
    return {
      newAvatarTooLarge: false,
      uploadingImage: false,
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
      bio: this.$store.state.user.bio || '',
      bioRules: [
        v => (v.length <= 255) || 'Bio must be less than 255 characters'
      ],
      profileChanged: false,
      resentVerificationEmail: false
    }
  },
  async created() {
    let user = await this.$authentication.me()
    if (user) this.$store.commit('updateMe', user)
  },
  methods: {
    uploadNewAvatar(file) {
      // Do nothing when file is undefined
      if (!file) {
        this.$logger.log('UPLOAD New profile picture -> No image selected')
        return
      }

      // Visible uploading
      this.uploadingImage = true

      // Logging
      this.$logger.log('UPLOAD New profile picture')
      /* eslint no-console: ["error", { allow: ["log"] }] */
      if (this.$store.state.debug) console.log(file)

      // Check image size
      this.newAvatarTooLarge = file.size > 51200000 // TODO: Add config setting
      if (this.newAvatarTooLarge) return

      // Create form data
      let bodyFormData = new FormData()
      bodyFormData.append('uploadedFile', file)

      this.$axios
        .post(
          process.env.VUE_APP_API + '/Users/' + this.$store.state.user.id + '/upload/profilePicture',
          bodyFormData,
          { headers: { 'Content-Type': 'multipart/form-data' }}
        ).then(response => {
          // Update user in store
          this.$store.commit('changeAvatar', response.data.imageSetForUI)
        }).finally(() => {
          this.uploadingImage = false
        })
    },
    removeAvatar() {
      this.$axios
        .patch(process.env.VUE_APP_API + '/Users/' + this.$store.state.user.id, { profilePicture: null })
        .then(() => {
          // Update user in store
          this.$store.commit('removeAvatar')
        })
    },
    changeProfile(e) {
      e.preventDefault() // Submit

      // Reset form
      this.profileChanged = false
      this.emailErrors = []

      // Validation
      if (!this.$refs.changeProfileForm.validate()) { return }

      this.$axios
        .patch(process.env.VUE_APP_API + '/Users/' + this.$store.state.user.id, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          bio: this.bio
        }).then(response => {
          // Update user in store
          this.$store.commit('changeProfile', response.data)

          // Fill updated data in form
          this.firstName = this.$store.state.user.firstName
          this.lastName = this.$store.state.user.lastName
          this.email = this.$store.state.user.email
          this.bio = this.$store.state.user.bio
        }).catch(error => {
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
    },
    resendVerificationEmail() {
      // TODO Refactor same code on login and profile settings page

      if (this.email === '') { return }

      this.$axios
        .post(process.env.VUE_APP_API + '/Users/resendVerificationEmailTo', { usernameOrEmail: this.email })
        .then(response => {
          // Message
          this.resentVerificationEmail = response.data.code === 'RESENT_VERIFICATION_EMAIL'
          // Already verified
          if (response.data.code === 'EMAIL_ALREADY_VERIFIED') {
            this.$store.commit('changeProfile', { emailVerified: true })
          }
        })
    }
  },
  components: {
    'upload-btn': UploadButton,
  },
  name: 'ProfileSettings'
}
</script>
