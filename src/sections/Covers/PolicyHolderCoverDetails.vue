<template>
  <v-card outlined v-if="get_policyHolderCover!=null" class="ma-2">
    <v-card-title>Holder Package</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col md="6" sm="12">
          <v-subheader>Effective Date</v-subheader>
          <p class="pl-4">{{get_policyHolderCover.effectiveDate}}</p>
          <v-subheader>Pay Point</v-subheader>
          <p class="pl-4">{{ get_policyHolderCover.payPoint}}</p>
          <v-subheader>DJC</v-subheader>
          <p class="pl-4">{{ get_policyHolderCover.djcDate }}</p>
          <v-subheader>DJF</v-subheader>
          <p class="pl-4">{{get_policyHolderCover.djfDate}}</p>
          <v-subheader>DPS</v-subheader>
          <p class="pl-4">{{get_policyHolderCover.dpsDate }}</p>
        </v-col>
        <v-col md="6" sm="12">
          <v-card v-if="get_policyHolderCover.package!=null" outlined>
            <v-card-title>Package details</v-card-title>
            <div class="ma-2">
              <v-card>
                <v-card-title>
                  {{ get_policyHolderCover.package.name }}
                  <v-spacer></v-spacer>
                  <v-chip
                    color="success white--text"
                  >{{ get_policyHolderCover.package.coverAmountS }}</v-chip>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-title>Monthly Contribution</v-list-item-title>
                      <v-list-item-action>{{ get_policyHolderCover.package.monthlyContributionS }}</v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Tombstone</v-list-item-title>
                      <v-list-item-action>{{ get_policyHolderCover.package.tombStoneS }}</v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Grocery Amount</v-list-item-title>
                      <v-list-item-action>{{ get_policyHolderCover.package.groceryAmountS }}</v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["GetPolicyHolderCover"]),
  },
  computed: mapGetters(["get_policyHolderCover"]),
  mounted() {
    if (typeof this.$route.params.policyHolderId != "undefined") {
      this.GetPolicyHolderCover(this.$route.params.policyHolderId);
    } else if (typeof this.$route.params.claimOwnerId != "undefined") {
      this.GetPolicyHolderCover(this.$route.params.claimOwnerId);
    }
  },
};
</script>