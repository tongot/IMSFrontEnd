<template>
  <div>
    <v-dialog persistent width="700" v-model="dialog">
      <v-card>
        <v-alert type="error" v-if="get_orgRoleError != null">{{
          get_orgRoleError
        }}</v-alert>
        <v-alert type="warning" v-if="error">{{ error }}</v-alert>
        <v-card-title>
          Roles
          <v-spacer></v-spacer>
          <v-form @submit.prevent="addRole()" ref="formAdd">
            <v-text-field
              label="Name"
              v-model="role"
              :rules="[rules.required]"
              class="mt-3"
            ></v-text-field>
          </v-form>
          <v-btn
            :loading="get_loadingRoles"
            @click.prevent="addRole()"
            depressed
            >Add</v-btn
          >
        </v-card-title>
        <v-card-text>
          <div class="d-flex flex-wrap">
            <v-btn v-for="role in get_orgRoles" :key="role.id">{{
              role.name
            }}</v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :to="{ name: 'users' }"
            class="white--text"
            color="pink darken-3"
            depressed
            >close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    role: "",
    error: null,
    rules: {
      required: (v) => !!v || "Role name is required",
    },
  }),
  methods: {
    ...mapActions(["GetOrgRoles", "AddNewOrgRole"]),
    addRole() {
      this.error = null;
      if (this.$refs.formAdd.validate()) {
        for (let index = 0; index < this.role.length; index++) {
          if (!isNaN(this.role[index])) {
            this.error = "Numbers are not allowed";
            return;
          }
        }
        this.AddNewOrgRole(this.role);
      }
    },
  },
  computed: {
    ...mapGetters(["get_orgRoles", "get_orgRoleError", "get_loadingRoles"]),
  },
  mounted() {
    this.dialog = true;
    this.GetOrgRoles();
  },
};
</script>

<style>
</style>