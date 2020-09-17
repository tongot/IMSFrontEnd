<template>
  <div v-if="get_user!=null">
    <v-toolbar dark>
      <v-toolbar-title>Settings</v-toolbar-title>
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
