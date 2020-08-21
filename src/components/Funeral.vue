<template>
  <div>
    <v-toolbar dark class="mt-0" flat max-height="60px">
      <v-toolbar-title>Funeral Policy</v-toolbar-title>
      <v-btn :loading="get_loadingFPolicy" :to="{ name: 'funeralList' }" text class="ml-2">
        <v-icon left>
          mdi-format-list-bulleted
        </v-icon>
        Policies
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['get_loadingFPolicy']),
};
</script>

<style></style>
