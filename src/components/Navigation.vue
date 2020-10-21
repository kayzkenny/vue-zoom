<template>
    <v-app-bar app>
        <v-toolbar-title>Vue Zoom</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small text v-if="user" to="/rooms">Rooms</v-btn>
        <v-btn small text v-if="!user" to="/login">Login</v-btn>
        <v-btn small text v-if="!user" to="/register">Register</v-btn>
        <v-btn small text v-if="user" @click="logOut">Log Out</v-btn>
    </v-app-bar>
</template>

<script>
import { auth } from "../db";
import { mapGetters } from "vuex";
export default {
    name: "Navigation",
    methods: {
        logOut: async function () {
            try {
                await auth.signOut();
                await this.$store.dispatch("User/resetUser");
                this.$router.replace('/login'); 
            } catch (error) {
                error => alert(error.message);
            }
        }
    },
    props: ['user']
}
</script>
