<template>
  <v-app>
    <Navigation :user="user" />
    <v-main>
      <v-container fluid>
      <router-view :user="user" />
    </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '@/db.js'
import Navigation from './components/Navigation';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  data: function() {
    return {
      user: null
    }
  },
  async mounted() {
    const snapshot = await db
      .collection('users')
      .doc('ogRmkCUqZGmLmFWCf0pw')
      .get();
    this.user = snapshot.data().name;
  }
};
</script>
