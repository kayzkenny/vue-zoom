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
import { db, fb } from '@/db.js'
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
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      }
    })
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: yellow;
}
.v-application a {
  color: grey
}
</style>
