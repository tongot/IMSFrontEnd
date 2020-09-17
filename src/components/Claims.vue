<template>
  <div>
    <v-toolbar dark class="mt-0" flat max-height="60px">
      <v-toolbar-title>Claims</v-toolbar-title>
      <v-btn :to="{name:'funeralClaimList'}" text class="ml-2">
        <v-icon left>mdi-format-list-bulleted</v-icon>Funeral Claims
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
  //computed: mapGetters(["get_loadingFPolicy"]),
};
</script>
<style></style>
