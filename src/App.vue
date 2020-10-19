<template>
  <v-app>
    <Navigation />
    <v-main>
      <h1>Hello</h1>
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
