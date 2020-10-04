<template>
  <div v-if="get_user != null">
    <v-toolbar>
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-toolbar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["get_user"]),
};
</script>

<style></style>
