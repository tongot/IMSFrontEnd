
<template>
  <div>
    <v-card v-if="get_dependentCover!=null" outlined>
      <v-card-title>Package details</v-card-title>
      <div class="ma-2">
        <v-card>
          <v-card-title>
            {{ get_dependentCover.name }}
            <v-spacer></v-spacer>
            <v-chip color="success white--text">{{ get_dependentCover.coverAmountS }}</v-chip>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>Monthly Contribution</v-list-item-title>
                <v-list-item-action>{{ get_dependentCover.monthlyContributionS }}</v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Tombstone</v-list-item-title>
                <v-list-item-action>{{ get_dependentCover.tombStoneS }}</v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Grocery Amount</v-list-item-title>
                <v-list-item-action>{{ get_dependentCover.groceryAmountS }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["GetDependentPackage"]),
  },
  computed: mapGetters(["get_dependentCover"]),
  mounted() {
    if (typeof this.$route.params.claimOwnerId != "undefined") {
      this.GetDependentPackage(this.$route.params.claimOwnerId);
    }
  },
};
</script>