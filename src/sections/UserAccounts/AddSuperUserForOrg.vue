<template>
  <div>
    <v-dialog persistent width="500" v-model="get_addOrgUserDialog">
      <v-form ref="formAdd">
        <v-card>
          <v-card-title>
            Add superuser
            <v-spacer></v-spacer>
            <v-btn @click="OpenAddOrgUserDialog()" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" v-if="get_AddOrgUserError">{{get_AddOrgUserError}}</v-alert>
            <v-text-field label="Name" v-model="user.name" :rules="[rules.required]"></v-text-field>
            <v-text-field label="Surname" v-model="user.surname" :rules="[rules.required]"></v-text-field>
            <v-text-field label="Email" v-model="user.email" :rules="[rules.required]"></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              :rules="passWordMatch"
              v-model="user.password"
            ></v-text-field>
            <v-text-field type="password" label="passwordConfirm" v-model="user.passwordConfirm"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="postRegister" :loading="get_loadingRoles" depressed>REGISTER</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    user: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      organizationId: null,
    },
    rules: {
      required: (v) => !!v || "this field is required",
    },
  }),
  methods: {
    ...mapActions(["OpenAddOrgUserDialog", "RegisterOrgAdminUser"]),
    postRegister() {
      if (this.$refs.formAdd.validate()) {
        this.user.organizationId = this.get_Organization.id;
        this.RegisterOrgAdminUser(this.user);
      }
    },
  },
  computed: {
    ...mapGetters([
      "get_addOrgUserDialog",
      "get_AddOrgUserError",
      "get_Organization",
      "get_loadingRoles",
    ]),
    passWordMatch() {
      let errors = [];
      if (!this.user.password) {
        errors.push("Password is requierd");
      }
      if (this.user.password) {
        if (this.user.password !== this.user.passwordConfirm) {
          errors.push("password donot match");
        }
      }
      return errors;
    },
  },
};
</script>

<style>
</style>