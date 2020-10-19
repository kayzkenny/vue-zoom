<template>
  <div class="home">
    <h1>Welcome {{user}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/db.js'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data: function() {
    return {
      user: null
    }
  },
  async mounted() {
    const snapshot = await db.collection('users').doc('ogRmkCUqZGmLmFWCf0pw').get();
    this.user = snapshot.data().name;
  }
}
</script>
