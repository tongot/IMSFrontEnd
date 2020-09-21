<template>
  <div>
    <v-btn text v-if="get_claimOwner==null" :loading="get_loadingClaim"></v-btn>
    <v-menu
      :close-on-content-click="get_menuAssignClaimUser"
      :close-on-click="false"
      offset-y
      v-if="get_claimOwner!=null"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="open()"
          :loading="get_loadingEligibleClaimUser"
          v-on="on"
        >
          {{get_claimOwner.name}}
          <v-chip outlined small>{{get_claimOwner.email}}</v-chip>
        </v-btn>
      </template>
      <v-card width="500">
        <v-alert type="error" v-if="get_eligibleClaimUserError!=null">{{get_eligibleClaimUserError}}</v-alert>
        <v-card-title>
          <v-btn text :loading="get_loadingEligibleClaimUser">Reassign to user</v-btn>
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
                :disabled="user.email==get_claimOwner.email"
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
      "OpenMenuClaimReassign",
      "CloseMenuClaimReassign",
      "GetEligibleClaimUsers",
      "ManualClaimReassign",
      "GetClaimOwner",
      "GetFuneralClaimById",
    ]),
    close() {
      this.CloseMenuClaimReassign();
    },
    open() {
      this.OpenMenuClaimReassign();
      this.GetEligibleClaimUsers(this.get_funeralClaim.statusId);
    },
    Reassign(newOwner) {
      const data = {
        operator: this.get_user.id,
        newOwner: newOwner,
        claimId: this.get_funeralClaim.claimId,
      };
      console.log(data);
      this.ManualClaimReassign(data).then(() => {
        this.GetFuneralClaimById(this.$route.params.claimId).then(() => {
          this.GetClaimOwner(this.get_funeralClaim.owner).then(() => {
            this.GetEligibleClaimUsers(this.get_funeralClaim.statusId);
          });
        });
      });
    },
  },
  computed: {
    ...mapGetters([
      "get_loadingClaim",
      "get_claimOwner",
      "get_eligibleClaimUsers",
      "get_funeralClaim",
      "get_loadingEligibleClaimUser",
      "get_menuAssignClaimUser",
      "get_eligibleClaimUserError",
      "get_user",
    ]),
    filterdUsers() {
      return this.get_eligibleClaimUsers.filter((item) => {
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