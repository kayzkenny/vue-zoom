<template>
  <div class="home">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="11">
          <p class="text-center">Welcome 
            <span class="font-weight-medium">{{ user.displayName }}</span>
          </p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="7">
          <p class="subtitle-1 text-center">
            This app uses Firebase for real time communication
             and WebRTC to create video chats between multiple users, 
             allowing you to create rooms for your meeetings and 
             invite attendees.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  props: ['user'],
}
</script>
