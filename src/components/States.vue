<template>
  <div>
    <v-card v-if="get_Status!=null" outlined>
      <v-alert v-if="get_statusError!=null" type="error">{{get_statusError}}</v-alert>
      <v-card-actions>
        <v-btn :loading="get_loadingStatus" text>Status</v-btn>
        <v-btn
          :class="getClass(status.isCurrent)"
          small
          v-for="status in  get_Status"
          :key="status.id"
          :disabled="disabled(status)"
        >
          <span v-if="status.isCurrent">{{status.name}}</span>
          <span v-if="!status.isCurrent">{{status.displayName}}</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-chip color="success" small>{{getCurrentStatus()}}</v-chip>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    //  ...mapActions(['GetStatus'])
    getClass(isCurrent) {
      return isCurrent ? "success" : "primary";
    },
    disabled(status) {
      if (status.isCurrent) {
        return true;
      } else {
        return status.hasPermission ? false : true;
      }
    },
    getCurrentStatus() {
      let names = this.get_Status.filter((item) => item.isCurrent === true);

      return names.length > 0 ? names[0].name : "";
    },
  },
  computed: mapGetters(["get_Status", "get_loadingStatus", "get_statusError"]),
};
</script>

<style>
</style>