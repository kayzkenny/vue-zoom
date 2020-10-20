<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="7">
        <v-card class="mx-auto pa-2">
          <v-card-title 
            class="title font-weight-regular justify-space-between"
          >
            <span>Login</span>
          </v-card-title>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation 
            @submit.prevent="login"
          >
            <v-img
              contain
              class="px-4"
              max-width="600"
              max-height="400"
              justify="center"
              :src="require('../assets/logo.svg')"
            ></v-img>
            <v-card-text>
              <v-text-field
                type="email"
                label="E-mail"
                v-model="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                counter
                label="Password"
                v-model="password"
                hint="At least 8 characters"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-card-text>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn 
              small 
              color="primary" 
              @click="login" 
              :loading="loading"
            >Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn 
              small 
              text 
              class="body-2"
            >Forgot password</v-btn>
          </v-card-actions>
        </v-card>
        <p class="subtitle-2 font-weight-light mt-4 text-center">
          <router-link to="/register"> Don't have an account? Sign up here</router-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "Login",
  data: () => ({
      valid: true,
      feedback: "",
      email: "",
      password: "",
      loading: false,
      showPassword: false,
      rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
  }),
  methods: {
    login: async function() {
      const formData = {
        email: this.email,
        password: this.password,
      }
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const userCred = 
            await fb.auth().signInWithEmailAndPassword(formData.email, formData.password);
          userCred != null 
            ? this.$router.push('/') 
            : this.feedback = "Something went wrong";
        } catch (error) {
          this.feedback = error.message;
        }
        this.loading = false; 
      }
    }
  }
}
</script>