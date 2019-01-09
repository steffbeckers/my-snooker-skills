<template>
  <v-layout row wrap>
    <v-flex
      xl3
      md4
      sm6
      xs12
      v-for="club in clubs" :key="club.id"
    >
      <v-card>
        <v-img
          v-if="club.banner && club.banner.card"
          style="cursor: pointer"
          @click="$router.push({ name: 'Club', params: { slug: club.slug }})"
          :src="club.banner.card"
          aspect-ratio="2.50"
        ></v-img>
        <v-card-title
          style="cursor: pointer"
          @click="$router.push({ name: 'Club', params: { slug: club.slug }})"
          primary-title
        >
          <div>
            <h3 class="headline mb-0">{{ club.name }}</h3>
            <div v-if="club.address">
              <div>{{ club.address.street }} {{ club.address.number }}<span v-if="club.address.extension">{{ club.address.extension }}</span></div>
              <div>{{ club.address.zipcode }} {{ club.address.city }}</div>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Call</v-btn>
          <v-btn flat>Navigate</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.card__media,
.card__title {
  cursor: pointer;
}
</style>

<script>
export default {
  props: [
    'clubs'
  ],
  name: 'ClubsCardList'
}
</script>
