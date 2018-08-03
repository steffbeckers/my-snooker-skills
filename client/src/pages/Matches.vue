<template>
  <v-container grid-list-lg fluid>
    <v-layout v-if="errors.length > 0" row>
      <v-flex>
        <v-alert :value="true" v-for="(error, index) in errors" :key="index" type="error">
          {{ error.message }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <div class="title">Recent matches</div>
      </v-flex>
    </v-layout>
    <MatchesCardList></MatchesCardList>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      errors: []
    }
  },
  name: 'Matches'
}
</script>
