<template>
    <v-app-bar app>
        <v-toolbar-title>Vue Zoom</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small text v-if="!user" to="/login">Login</v-btn>
        <v-btn small text v-if="!user" to="/register">Register</v-btn>
        <v-btn small text v-if="user" @click="logOut">Log Out</v-btn>
    </v-app-bar>
</template>

<script>
import { fb } from "../db"
export default {
    name: "Navigation",
    props: ['user'],
    methods: {
        logOut: async function () {
            try {
                await fb.auth().signOut();
                this.$router.replace('/login'); 
            } catch (error) {
                error => alert(error.message);
            }
        }
    }
}
</script>
