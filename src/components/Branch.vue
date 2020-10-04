<template>
  <div>
    <v-toolbar flat height="50px">
      <v-btn
        depressed
        color="white"
        :to="{ name: 'branchList' }"
        :loading="get_loadBranch"
        small
        >Branches</v-btn
      >
    </v-toolbar>
    <v-divider></v-divider>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["get_loadBranch"]),
};
</script>

<style>
</style>