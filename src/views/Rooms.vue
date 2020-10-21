<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center" class="mx-auto text-center">
      <v-col cols="7">
        <v-card class="mx-auto pt-6">
            <p class="title">Add Zoom</p>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation 
            @submit.prevent="addRoom"
          >
            <v-card-text>
              <v-text-field
                filled
                label="Room Name"
                v-model="roomName"
                :append-icon="'mdi-plus'"
                :rules="[rules.required, rules.min]"
                @click:append.prevent="addRoom"
              ></v-text-field>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mx-auto text-center">
      <v-col cols="7">
        <v-card class="mx-auto pt-6">
          <p class="title">You rooms</p>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Date Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in rooms"
                    :key="item.id"
                  >
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-left">
                      {{ 
                        item.createdAt == null 
                          ? "" 
                          : item.createdAt.toDate().toDateString() 
                      }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Login",
  data: () => ({
      valid: true,
      feedback: "",
      roomName: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
      }
  }),
  async created() {
    const payload = {
      user: this.user,
    }
    await this.$store.dispatch("Rooms/getRooms", payload);
  },
  methods: {
      addRoom: async function() {
        if (this.$refs.form.validate()) {
            const payload = {
                roomName: this.roomName,
                user: this.user,
            }
            try {
                await this.$store.dispatch("Rooms/addRoom", payload);
            } catch (error) {
                console.log(error.message);
            }
        }
      }
  },
  computed: {
    ...mapState({
      rooms: state => state.Rooms.rooms
    }),
    ...mapGetters("User", ["user"])
  },
}
</script>