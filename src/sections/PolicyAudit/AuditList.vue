<template>
  <v-dialog v-model="modal" dark>
    <v-card>
      <v-card-title>
        <v-btn :loading="get_loadingAuditData">Audit Data</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon :to="{name:'funeralDetail',params:{PolicyId:this.$route.params.PolicyId}}">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          dense
          :headers="get_auditData.headers"
          :items="get_auditData.data"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    modal: false,
  }),

  methods: {
    ...mapActions(["GetAuditForPolicy"]),
  },
  computed: mapGetters(["get_auditData", "get_loadingAuditData"]),
  mounted() {
    this.modal = true;
    this.GetAuditForPolicy(this.$route.params.PolicyId);
  },
};
</script>

<style>
</style>