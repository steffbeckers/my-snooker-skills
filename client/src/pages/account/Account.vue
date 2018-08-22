<template>
  <v-container v-if="$store.state.authenticated" grid-list-lg fluid>
    <v-breadcrumbs v-if="$vuetify.breakpoint.smAndUp">
      <v-icon slot="divider">fiber_manual_record</v-icon>
      <v-breadcrumbs-item>
        User Settings
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>
        Account
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout v-if="errors.length > 0" row>
      <v-flex>
        <v-alert :value="true" v-for="(error, index) in errors" :key="index" type="error">
          {{ error.message }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout class="pt-3" row wrap>
      <v-flex xs12 sm4>
        <p class="title">Social sign-in</p>
        <p class="sub-title">Activate sign-in with one of the following services.</p>
      </v-flex>
      <v-flex xs12 sm8>
        <p class="body-2">Connected Accounts</p>
        <p>Click on icon to activate signin with one of the following services.</p>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xl3
        lg4
        sm6
        xs12
      >
        Hi {{ $store.state.user.firstName }}!
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      errors: []
    }
  },
  name: 'Account'
}
</script>
