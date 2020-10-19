<template>
  <v-app>
    <Navigation/>
    <v-main>
      <v-container fluid>
      <router-view></router-view>
    </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  data: () => ({
    //
  }),
};
</script>
