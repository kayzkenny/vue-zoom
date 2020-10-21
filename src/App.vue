<template>
  <v-app>
    <Navigation :user="user" />
    <v-main>
      <v-container fluid>
      <router-view />
    </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from './components/Navigation';
export default {
  name: 'App',
  components: {
    Navigation,
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters("User", ["user"])
  },
  async created() {
    await this.$store.dispatch("User/loadUser");
  },
  async updated() {
    await this.$store.dispatch("User/loadUser");
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
