<template>
  <div>
    <v-toolbar dark class="mt-0" flat max-height="60px">
      <v-toolbar-title>Funeral Policy</v-toolbar-title>
      <v-btn :loading="get_loadingFPolicy" :to="{ name: 'funeralList' }" text class="ml-2">
        <v-icon left>mdi-format-list-bulleted</v-icon>Policies
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :loading="get_loadingPolicy"></v-btn>
      <v-chip v-if="get_policyOwner!=null">
        <v-btn small smalll text>
          {{get_policyOwner.name}}
          <v-chip outlined small>{{get_policyOwner.email}}</v-chip>
        </v-btn>
      </v-chip>
      <v-btn fab small class="ma-1" color="grey">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters([
    "get_loadingFPolicy",
    "get_loadingPolicy",
    "get_policyError",
    "get_policyOwner",
  ]),
};
</script>

<style></style>
