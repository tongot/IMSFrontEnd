<template>
  <div>
    <v-toolbar flat height="50" dark>
        <v-btn :loading="get_loadingDash">
          Main
        </v-btn>
    </v-toolbar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
computed:mapGetters(['get_loadingDash'])
};
</script>

<style>
</style>