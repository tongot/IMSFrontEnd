<template>
  <div>
    <v-dialog width="600" v-model="dialog">
      <v-card outlined>
        <v-card-title>
          Add New User
          <v-spacer></v-spacer>
          <v-btn icon :to="{name:'users'}">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-alert type="error" v-if="get_AddOrgUserError!=null">{{get_AddOrgUserError}}</v-alert>
          <v-form ref="formEdit" @submit.prevent="addUser()">
            <v-text-field :rules="[rules.required]" label="Name" v-model="user.name"></v-text-field>
            <v-text-field :rules="[rules.required]" label="Suname" v-model="user.surname"></v-text-field>
            <v-text-field :rules="[rules.required,rules.email]" label="Email" v-model="user.email"></v-text-field>
            <v-text-field
              type="password"
              :rules="passWordMatch"
              label="Password"
              v-model="user.password"
            ></v-text-field>
            <v-text-field type="password" label="Confirm Password" v-model="user.passwordConfirm"></v-text-field>
            <v-card outlined>
              <v-alert type="warning" v-if="RoleError!=null">{{RoleError}}</v-alert>
              <v-card-subtitle>User Roles</v-card-subtitle>
              <v-card-actions>
                <v-checkbox
                  class="ml-5"
                  v-for="role in get_orgRoles"
                  :key="role.name"
                  v-model="user.roles"
                  :label="role.name+' |'"
                  :value="role.name"
                ></v-checkbox>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed small @click="addUser()" :loading="get_loadingRoles" color="success">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    RoleError: null,
    dialog: false,
    user: {
      name: "",
      surname: "",
      password: "",
      passwordConfirm: "",
      organizationId: "",
      roles: [],
    },
    rules: {
      required: (v) => !!v || "this fieled is required",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    ...mapActions(["AddNewUser", "GetOrgRoles"]),
    addUser() {
      this.RoleError = null;
      if (this.$refs.formEdit.validate()) {
        this.user.organizationId = this.get_user.organizationId;
        if (this.user.roles.length < 1) {
          this.RoleError = "Please select at least one role";
          return;
        } else {
          this.AddNewUser(this.user);
        }
      }
    },
    addToRole() {},
  },
  computed: {
    ...mapGetters([
      "get_loadingRoles",
      "get_orgRoles",
      "get_user",
      "get_AddOrgUserError",
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
  mounted() {
    this.dialog = true;
    this.GetOrgRoles();
  },
};
</script>

<style>
</style>