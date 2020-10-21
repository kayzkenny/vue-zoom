<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto pa-2" max-width="480">
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar 
              color="primary" 
              class="subheading white--text" 
              size="24" 
              v-text="step"
            ></v-avatar>
          </v-card-title>
          <v-form
            ref="form"
              v-model="valid"
              lazy-validation 
            @submit.prevent="register"
          >
            <v-window v-model="step" :touchless="true">
              <v-window-item :value="1">
                <v-img
                  class="px-4"
                  :src="require('../assets/logo.svg')"
                  max-height="400"
                  max-width="600"
                  contain
                ></v-img>
                <v-card-text>
                  <v-text-field
                    label="Full Name"
                    v-model="fullName"
                    type="text"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <span class="caption grey--text text--darken-1">
                    This is the name other user's will see
                  </span>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-img
                  class="px-4"
                  :src="require('../assets/logo.svg')"
                  max-height="400"
                  max-width="600"
                  contain
                ></v-img>
                <v-card-text>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    type="email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                  <span class="caption grey--text text--darken-1">
                    This is the email you will use to login to your Vue Zoom
                    account
                  </span>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="3">
                <v-img
                  class="px-4"
                  :src="require('../assets/logo.svg')"
                  max-height="400"
                  max-width="600"
                  contain
                ></v-img>
                <v-card-text>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    label="Confirm Password"
                    v-model="confirmPassword"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>
                  <span
                    class="caption grey--text text--darken-1"
                  >Please enter a password for your account</span>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="4">
                <div class="pa-4 text-center">
                  <v-img
                    class="mb-4"
                    contain
                    height="128"
                    :src="require('../assets/logo.svg')"
                  ></v-img>
                  <h3 class="title font-weight-light mb-2">Welcome to Vue Zoom</h3>
                  <span class="caption grey--text">Thanks for signing up!</span>
                </div>
              </v-window-item>
            </v-window>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn :disabled="step === 1" text @click="step--">Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="step === 4" color="primary" depressed @click="register">Next</v-btn>
          </v-card-actions>
        </v-card>
        <p class="subtitle-2 font-weight-light mt-4 text-center">
          <router-link to="/login"> Already have an account? Login here</router-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "../db.js";
export default {
  name: "Register",
  data: () => ({
      valid: true,
      step: 1,
      user: null,
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      feedback: null,
      show1: false,
      show2: false,
      rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Register";
        case 2:
          return "Enter you email";
        case 3:
          return "Create a password";
        default:
          return "Account created";
      }
    }
  },
  methods: {
    register: async function() {
      const formData = {
        email: this.email,
        password: this.password,
        fullName: this.fullName,
      }
      switch (this.step) {
        case 1:
          if (this.fullName) {
            this.step++;
          }
          break;
        case 2:
          if (this.email) {
            this.step++;
          }
          break;
        case 3:
          if (this.$refs.form.validate()) {
            this.feedback = null;
            this.loading = true;
            try {
              const userCred = await fb
                auth.createUserWithEmailAndPassword(formData.email, formData.password);
              await userCred.user.updateProfile({
                displayName: formData.fullName,
              })
              this.$router.replace('/'); 
            } catch (error) {
              this.feedback = error.message;
            }
            this.loading = false;
          } 
          break;
        default:
          break;
      }
    }
  },
  watch: {
    matchPasswords: function () {
      this.password == this.confirmPassword ? this.error = "Passwords must match" : this.error = null; 
    }
  }
}
</script>