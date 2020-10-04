<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <v-form ref="formEdit" @submit.prevent="updateUser()">
          <v-text-field
            :rules="[rules.required]"
            label="Name"
            v-model="get_userEdit.name"
          ></v-text-field>
          <v-text-field
            :rules="[rules.required]"
            label="Suname"
            v-model="get_userEdit.surname"
          ></v-text-field>
          <v-text-field
            :rules="[rules.required, rules.email]"
            label="Email"
            v-model="get_userEdit.email"
          ></v-text-field>
          <v-overflow-btn
            label="Select package"
            target="#newPolicy"
            width="auto"
            :items="get_Branches"
            v-model="get_userEdit.branchId"
            item-value="id"
            :loading="get_loadBranch"
            :rules="[rules.required]"
            item-text="name"
          ></v-overflow-btn>
          <v-checkbox
            v-model="get_userEdit.isActive"
            label="Active"
          ></v-checkbox>
          <v-card outlined>
            <v-card-subtitle>User Roles</v-card-subtitle>
            <v-card-actions>
              <v-checkbox
                class="ml-5"
                v-for="role in get_userEdit.roles"
                :key="role.name"
                v-model="role.isSelected"
                :label="role.name + ' |'"
              ></v-checkbox>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          small
          @click="updateUser()"
          :loading="get_loadingRoles"
          color="success"
          >save changes</v-btn
        >
        <v-btn depressed small color="error">reset password</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    rules: {
      required: (v) => !!v || "this fieled is required",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    ...mapActions(["UpdateUser", "GetBranches"]),
    updateUser() {
      if (this.$refs.formEdit.validate()) {
        this.UpdateUser();
      }
    },
  },
  computed: mapGetters([
    "get_userEdit",
    "get_loadingRoles",
    "get_Branches",
    "get_user",
    "get_loadBranch",
  ]),
  mounted() {
    this.GetBranches(this.get_user.organizationId);
  },
};
</script>

<style>
</style>