<template>
  <v-row justify="center">
    <v-form ref="login" class="registerForm">
      <v-card width="350" class="pa-4 mt-10" flat>
        <div class="d-flex justify-center mb-4">
          <v-avatar color="blue" size="70">
            <v-icon class="display-3 white--text">mdi-account</v-icon>
          </v-avatar>
        </div>
        <v-alert type="error" v-if="get_loginError != null">{{ get_loginError }}</v-alert>
        <v-text-field outlined :rules="[rules.required]" v-model="credentials.Email" label="Email"></v-text-field>
        <v-text-field
          outlined
          :rules="[rules.required]"
          label="Password"
          type="password"
          v-model="credentials.Password"
        ></v-text-field>
        <v-flex class="d-flex justify-center">
          <v-btn
            @click="LogIn()"
            depressed
            :loading="get_login_loading"
            color="blue"
            class="white--text"
          >
            <v-icon left>mdi-login</v-icon>login
          </v-btn>
        </v-flex>
        <v-divider class="mt-3"></v-divider>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-form>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    credentials: {
      Email: "",
      Password: "",
    },
    rules: {
      required: (v) => !!v || "This fieled is required",
    },
  }),
  methods: {
    ...mapActions(["Login"]),
    LogIn() {
      if (this.$refs.login.validate()) {
        this.Login(this.credentials);
      }
    },
  },
  computed: mapGetters(["get_loginError", "get_login_loading"]),
};
</script>

<style></style>
