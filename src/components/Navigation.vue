<template>
    <v-app-bar app>
        <v-toolbar-title>Vue Zoom</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn to="/login" text>
            Login
        </v-btn>
        <v-btn to="/register" text>
            Register
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: "Navigation"
}
</script>
