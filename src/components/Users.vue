<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn :to="{name:'newUser'}" :loading="get_loadingRoles" text>
          <v-icon left>mdi-plus</v-icon>Add New User
        </v-btn>
        <v-btn :to="{name:'roles'}" text>
          <v-icon left>mdi-plus</v-icon>Add New Roles
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-expansion-panels>
          <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search surname"></v-text-field>
          <v-expansion-panel @click="SetUserEdit(user)" v-for="user in AllUser" :key="user.id">
            <v-expansion-panel-header>{{user.name+" "+user.surname}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <EditUser />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditUser from "../sections/UserAccounts/EditUser";
export default {
  components: {
    EditUser,
  },
  data: () => ({
    search: "",
  }),
  methods: {
    ...mapActions(["GetAllUsers", "SetUserEdit"]),
    LoadUser() {
      alert("drop");
    },
  },
  computed: {
    ...mapGetters(["get_users", "get_loadingRoles"]),
    AllUser() {
      return this.get_users.filter((item) => {
        return (
          item.surname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  mounted() {
    this.GetAllUsers();
  },
};
</script>

<style>
</style>