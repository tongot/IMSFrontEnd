<template>
  <v-snackbar color="primary" dark="" v-model="$store.state.showSnack" bottom="bottom" right="right">
    {{ get_snackText }}
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['get_showSnack', 'get_snackText']),
};
</script>

<style></style>
