<template>
  <div>
    <v-toolbar dark class="mt-0" flat max-height="60px">
      <v-toolbar-title>Policy Holders</v-toolbar-title>
      <v-btn :loading="get_loadingPolicyHolder" :to="{ name: 'policyholderList' }" text class="ml-2">
        <v-icon left>
          mdi-format-list-bulleted
        </v-icon>
        Policy Holders
      </v-btn>
      <v-spacer> </v-spacer>
      <v-btn @click="CloseAddPolicyHolderDialog()" text="">
        <v-icon left="">
          mdi-file-outline
        </v-icon>
        New
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-alert v-if="get_policyHolderError != null" type="error">{{ get_policyHolderError }}</v-alert>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['CloseAddPolicyHolderDialog']),
  },
  computed: mapGetters(['get_loadingPolicyHolder', 'get_policyHolderError']),
};
</script>

<style></style>
