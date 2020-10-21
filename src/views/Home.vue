<template>
  <div class="home">
    <v-container>
      <v-row align="center" justify="center" class="mx-auto text-center">
        <v-col cols="7">
          <p>Welcome 
            <span class="font-weight-medium" v-if="user">{{ user.displayName }}</span>
          </p>
          <p class="subtitle-1">
            This app uses Firebase for real time communication
             and WebRTC to create video chats between multiple users, 
             allowing you to create rooms for your meeetings and 
             invite attendees.
          </p>
          <v-btn outlined color="purple" to="/rooms" class="mx-auto text-center">Rooms</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  computed: {
      ...mapGetters("User", ["user"])
  },
}
</script>
