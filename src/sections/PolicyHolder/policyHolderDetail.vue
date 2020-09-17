<template>
  <div>
    <v-card v-if="get_policyHolder != null" outlined>
      <v-card-title>
        {{
        get_policyHolder.salutation +
        ' ' +
        get_policyHolder.firstName +
        ' ' +
        get_policyHolder.middleName +
        ' ' +
        get_policyHolder.lastName
        }}
        <v-spacer></v-spacer>
        <v-btn v-if="canEdit" @click="setPolicyHolderToEdit(get_policyHolder)" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-chip small :color="stateColor" class="white--text">{{getState(get_policyHolder.status)}}</v-chip>
      </v-card-title>
      <v-divider></v-divider>
      <v-row class="pa-2">
        <v-col md="4" xs="12" sm="12">
          <h4>Personal Details</h4>
          <v-divider></v-divider>
          <v-subheader>Salutation</v-subheader>
          <p class="pl-4">{{ get_policyHolder.salutation }}</p>
          <v-subheader>Name</v-subheader>
          <p class="pl-4">{{ get_policyHolder.firstName + ' ' + get_policyHolder.middleName }}</p>
          <v-subheader>Surname</v-subheader>
          <p class="pl-4">{{ get_policyHolder.lastName }}</p>
          <v-subheader>Marital Status</v-subheader>
          <p class="pl-4">{{ get_policyHolder.maritalStatus }}</p>
          <v-subheader>Gender</v-subheader>
          <p class="pl-4">{{ get_policyHolder.gender }}</p>
          <v-subheader>Date of birth</v-subheader>
          <p class="pl-4">{{ get_policyHolder.dateOfBirth }}</p>
          <v-subheader>Disabled</v-subheader>
          <span class="ml-4">
            <v-chip small v-if="get_policyHolder.disabled == 'No'">No</v-chip>
            <v-chip small class="red white--text" v-if="get_policyHolder.disabled == 'Yes'">Yes</v-chip>
          </span>
        </v-col>
        <v-col md="4" xs="12" sm="12">
          <h4>Employment</h4>
          <v-divider></v-divider>
          <v-subheader>Department</v-subheader>
          <p class="pl-4">{{ get_policyHolder.department }}</p>
          <v-subheader>Occupation</v-subheader>
          <p class="pl-4">{{ get_policyHolder.occupation }}</p>
          <v-subheader>Branch</v-subheader>
          <p class="pl-4">{{ get_policyHolder.branch }}</p>
        </v-col>
        <v-col md="4" xs="12" sm="12">
          <h4>Identity</h4>
          <v-divider></v-divider>
          <v-subheader>National Id Number</v-subheader>
          <p class="pl-4">{{ get_policyHolder.idNumber }}</p>
          <v-subheader>Type of Id</v-subheader>
          <p class="pl-4">{{ get_policyHolder.idType }}</p>
          <v-subheader>Country Of Issue</v-subheader>
          <p class="pl-4">{{ get_policyHolder.countryOfIssue }}</p>
        </v-col>
      </v-row>
      <v-card v-if="get_policyHolder.contact != null" outlined>
        <v-card-title>Contact details</v-card-title>
        <v-divider></v-divider>
        <v-row>
          <v-col md="6" xs="12" sm="12">
            <v-subheader>Mobile</v-subheader>
            <p class="pl-4">{{ get_policyHolder.contact.mobile }}</p>
            <v-subheader>Home Phone</v-subheader>
            <p class="pl-4">{{ get_policyHolder.contact.telephoneHome }}</p>
            <v-subheader>WOrk Phone</v-subheader>
            <p class="pl-4">{{ get_policyHolder.contact.telephoneWork }}</p>
            <v-subheader>Primary Email</v-subheader>
            <p class="pl-4">{{ get_policyHolder.contact.primaryEmail }}</p>
          </v-col>
          <v-col md="6" xs="12" sm="12">
            <v-subheader>Work Address</v-subheader>
            <p class="pl-4">{{ get_policyHolder.contact.workAddress }}</p>
            <v-subheader>Postal Address</v-subheader>
            <p class="pl-4">{{ get_policyHolder.contact.postalAddress }}</p>
            <v-subheader>Physical Address</v-subheader>
            <p class="pl-4">{{ get_policyHolder.contact.physicalAddress }}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import enums from "../../Dictionary/Dictionary";
export default {
  data: () => ({
    canEdit: true,
    stateColor: "black",
  }),
  methods: {
    ...mapActions(["GetPolicyHolderById", "setPolicyHolderToEdit"]),
    getState(stateId) {
      let state = enums.personStatus[stateId];
      if (state == "Deceased") {
        this.stateColor = "pink darken-3";
      } else {
        this.stateColor = "success";
      }
      return state;
    },
  },
  computed: mapGetters(["get_policyHolder"]),
  mounted() {
    if (typeof this.$route.params.policyHolderId != "undefined") {
      this.GetPolicyHolderById(this.$route.params.policyHolderId);
    } else {
      this.canEdit = false;
    }
  },
};
</script>

<style></style>
