<template>
  <div>
    <v-dialog persistent width="700" v-model="dialog">
      <v-card>
        <v-alert type="error" v-if="get_orgRoleError!=null">{{get_orgRoleError}}</v-alert>
        <v-card-title>
          Roles
          <v-spacer></v-spacer>
          <v-form @submit.prevent="addRole()" ref="formAdd">
            <v-text-field label="Name" v-model="role" :rules="[rules.required]" class="mt-3"></v-text-field>
          </v-form>
          <v-btn :loading="get_loadingRoles" depressed>Add</v-btn>
        </v-card-title>
        <v-card-text>
          <div class="d-flex justify-start">
            <v-btn v-for="role in get_orgRoles" :key="role.id">{{role.name}}</v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :to="{name:'users'}" class="white--text" color="pink darken-3" depressed>close</v-btn>
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
    rules: {
      required: (v) => !!v || "Role name is required",
    },
  }),
  methods: {
    ...mapActions(["GetOrgRoles", "AddNewOrgRole"]),
    addRole() {
      if (this.$refs.formAdd.validate()) {
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