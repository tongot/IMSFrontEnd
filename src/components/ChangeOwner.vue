<template>
  <div>
    <v-btn text v-if="get_policyOwner==null" :loading="get_loadingPolicy"></v-btn>
    <v-menu
      :close-on-content-click="get_menuAssignUser"
      :close-on-click="false"
      offset-y
      v-if="get_policyOwner!=null"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" @click="open()" :loading="get_loadingEligibleUser" v-on="on">
          {{get_policyOwner.name}}
          <v-chip outlined small>{{get_policyOwner.email}}</v-chip>
        </v-btn>
      </template>
      <v-card width="500">
        <v-alert type="error" v-if="get_eligibleUserError!=null">{{get_eligibleUserError}}</v-alert>
        <v-card-title>
          <v-btn text :loading="get_loadingEligibleUser">Reassign to user</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="search"
            outlined
            placeholder="User email or name"
            append-icon="mdi-magnify"
          ></v-text-field>
          <v-card v-for="user in filterdUsers" :key="user.id">
            <v-card-actions>
              <v-badge
                overlap
                color="pink darken-3"
                v-if="user.workLoadCount>0"
                :content="user.workLoadCount"
              >
                <v-avatar color="blue" size="40">
                  <v-icon>mdi-account</v-icon>
                </v-avatar>
              </v-badge>
              <v-avatar v-if="user.workLoadCount==0" color="blue" size="40">
                <v-icon>mdi-account</v-icon>
              </v-avatar>
              <v-spacer></v-spacer>
              <v-subheader>{{user.name+ " "+user.surname}}</v-subheader>
              <v-chip outlined small>{{user.email}}</v-chip>
              <v-btn
                :disabled="user.email==get_policyOwner.email"
                @click="Reassign(user.id)"
                depressed
                fab
                small
                color="success"
                class="ml-2"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
  }),
  methods: {
    ...mapActions([
      "OpenMenuReassign",
      "CloseMenuReassign",
      "GetEligibleUsers",
      "ManualReassign",
      "GetPolicyOwner",
      "GetPolicyById",
    ]),
    close() {
      this.CloseMenuReassign();
    },
    open() {
      this.OpenMenuReassign();
      this.GetEligibleUsers(this.get_funeralPolicy.stateId);
    },
    Reassign(newOwner) {
      const data = {
        operator: this.get_user.id,
        newOwner: newOwner,
        policyId: this.get_funeralPolicy.id,
      };
      this.ManualReassign(data).then(() => {
        this.GetPolicyById(this.$route.params.PolicyId).then(() => {
          this.GetPolicyOwner(this.get_funeralPolicy.owner).then(() => {
            this.GetEligibleUsers(this.get_funeralPolicy.stateId);
          });
        });
      });
    },
  },
  computed: {
    ...mapGetters([
      "get_loadingPolicy",
      "get_policyOwner",
      "get_eligibleUsers",
      "get_funeralPolicy",
      "get_loadingEligibleUser",
      "get_menuAssignUser",
      "get_eligibleUserError",
      "get_user",
    ]),
    filterdUsers() {
      return this.get_eligibleUsers.filter((item) => {
        return (
          item.surname.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
};
</script>

<style>
</style>