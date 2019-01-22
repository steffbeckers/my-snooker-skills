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
            <div class="mt-2" v-if="club.address">
              <div>{{ club.address.street }} {{ club.address.number }}<span v-if="club.address.extension">{{ club.address.extension }}</span></div>
              <div>{{ club.address.zipcode }} {{ club.address.city }}</div>
              <div v-if="club.address.country">{{ club.address.country }}</div>
            </div>
            <div class="mt-2" v-if="club.telephone">
              {{ club.telephone }}
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn v-if="club.telephone" :href="'tel:' + club.telephone" flat>Call</v-btn>
          <v-btn v-if="club.address && club.address.googleMapsLink" :href="club.address.googleMapsLink" target="_blank" flat>Navigate</v-btn>
          <v-btn v-else-if="club.address && club.address.street && club.address.number && (club.address.zipcode || club.address.city)" :href="'https://www.google.com/maps/dir/?api=1&destination=' + club.address.street + '+' + club.address.number + (club.address.zipcode ? '+' + club.address.zipcode : '') + (club.address.city ? '+' + club.address.city : '')" target="_blank" flat>Navigate</v-btn>
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
