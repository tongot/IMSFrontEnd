<template>
  <div>
    <v-toolbar flat height="50px">
      <v-btn depressed color="white" :to="{ name: 'underwriters' }" :loading="get_loadingUnderwriter" small
        >Underwriters</v-btn
      >
      <v-btn
        depressed
        color="white"
        :to="{ name: 'organizations' }"
        :loading="get_loadingOrganization"
        class="ml-2"
        small
        >Organisations</v-btn
      >
    </v-toolbar>
    <v-divider></v-divider>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['get_loadingUnderwriter', 'get_loadingOrganization']),
};
</script>

<style></style>
