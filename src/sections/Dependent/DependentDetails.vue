<template>
  <v-card class="mt-2" outlined>
    <v-card-title>
      Dependent
      <v-spacer></v-spacer>
      <v-chip color="black" class="white--text">{{get_Dependent.relationship.name}}</v-chip>
    </v-card-title>

    <v-row class="ma-1">
      <v-col md="4" sm="12">
        <v-subheader>Salutation</v-subheader>
        <p class="pl-4">{{get_Dependent.salutation}}</p>
        <v-subheader>Name</v-subheader>
        <p class="pl-4">{{ get_Dependent.firstName + ' ' + get_Dependent.middleName }}</p>
        <v-subheader>Surname</v-subheader>
        <p class="pl-4">{{ get_Dependent.lastName }}</p>
        <v-subheader>Marital Status</v-subheader>
        <p class="pl-4">{{get_Dependent.maritalStatus}}</p>
        <v-subheader>Gender</v-subheader>
        <p class="pl-4">{{get_Dependent.gender }}</p>
        <v-subheader>Date of birth</v-subheader>
        <p class="pl-4">{{ get_Dependent.dateOfBirth }}</p>
        <v-subheader>Age</v-subheader>
        <p class="pl-4">{{ get_Dependent.age }}</p>
        <v-subheader>Disabled</v-subheader>
        <span class="ml-4">
          <v-chip small v-if="get_Dependent.disabled=='No'">No</v-chip>
          <v-chip small class="red white--text" v-if="get_Dependent.disabled=='Yes'">Yes</v-chip>
        </span>
      </v-col>
      <v-col md="4" sm="12">
        <v-card outlined>
          <v-card-title>Cover details</v-card-title>
          <div class="ma-2">
            <v-subheader>Effective Date</v-subheader>
            <p class="pl-4">{{get_Dependent.policyCover.effectiveDate}}</p>
            <v-subheader>Pay Point</v-subheader>
            <p class="pl-4">{{ get_Dependent.policyCover.payPoint}}</p>
            <v-subheader>DJC</v-subheader>
            <p class="pl-4">{{ get_Dependent.policyCover.djcDate }}</p>
            <v-subheader>DJF</v-subheader>
            <p class="pl-4">{{get_Dependent.policyCover.djfDate}}</p>
            <v-subheader>DPS</v-subheader>
            <p class="pl-4">{{get_Dependent.policyCover.dpsDate }}</p>
          </div>
        </v-card>
      </v-col>
      <v-col md="4" sm="12">
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
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["GetDependentCover"]),
  },
  computed: mapGetters(["get_Dependent", "get_dependentCover"]),
  mounted() {
    this.GetDependentCover(this.get_Dependent.policyCover.dependentPackageId);
  },
};
</script>