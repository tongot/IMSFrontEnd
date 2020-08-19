<template>
  <div v-if="get_funeralPolicy != null">
    <v-card v-if="get_funeralPolicy.policyHolder != null" outlined>
      <v-card-title>Policy holder details</v-card-title>
      <v-divider></v-divider>
      <v-row class="pa-2">
        <v-col md="4" xs="12" sm="12">
          <h4>Personal Details</h4>
          <v-divider></v-divider>
          <v-subheader>Salutation</v-subheader>
          <p class="pl-4">{{ getTitle(get_funeralPolicy.policyHolder.salutation) }}</p>
          <v-subheader>Name</v-subheader>
          <p class="pl-4">
            {{ get_funeralPolicy.policyHolder.firstName + ' ' + get_funeralPolicy.policyHolder.middleName }}
          </p>
          <v-subheader>Surname</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.lastName }}</p>
          <v-subheader>Marital Status</v-subheader>
          <p class="pl-4">{{ getMaritalState(get_funeralPolicy.policyHolder.maritalStatus) }}</p>
          <v-subheader>Gender</v-subheader>
          <p class="pl-4">{{ getGender(get_funeralPolicy.policyHolder.gender) }}</p>
          <v-subheader>Date of birth</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.dateOfBirth }}</p>
          <v-subheader>Disabled</v-subheader>
          <span class="ml-4">
            <v-chip small v-if="!get_funeralPolicy.policyHolder.disables">No</v-chip>
            <v-chip small class="red white--text" v-if="get_funeralPolicy.policyHolder.disabled">Yes</v-chip>
          </span>
        </v-col>
        <v-col md="4" xs="12" sm="12">
          <h4>Employment</h4>
          <v-divider></v-divider>
          <v-subheader>Department</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.department }}</p>
          <v-subheader>Occupation</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.occupation }}</p>
          <v-subheader>Branch</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.branch }}</p>
        </v-col>
        <v-col md="4" xs="12" sm="12">
          <h4>Identity</h4>
          <v-divider></v-divider>
          <v-subheader>National Id Number</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.idNumber }}</p>
          <v-subheader>Type of Id</v-subheader>
          <p class="pl-4">{{ getIdType(get_funeralPolicy.policyHolder.idType) }}</p>
          <v-subheader>Country Of Issue</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.countryOfIssue }}</p>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col md="4" xs="12" sm="12">
        <v-card outlined="">
          <v-card-title
            >Policy
            <v-spacer></v-spacer>
            <v-btn depressed disabled>Funeral</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-subheader>Status</v-subheader>
          <span v-if="get_funeralPolicy.status != null">
            <p class="pl-4">{{ get_funeralPolicy.status.name }}</p>
          </span>

          <v-subheader>Policy Number</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyNumber }}</p>
          <v-subheader>Effective Date</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.effectiveDate }}</p>
          <v-subheader>Application Date</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.applicationDate }}</p>
          <v-subheader>Joining Date</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.joiningDate }}</p>
          <v-subheader>Created On</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.createdOn }}</p>
        </v-card>
      </v-col>
      <v-col md="4" xs="12" sm="12">
        <v-card outlined="" v-if="get_funeralPolicy.underwriter != null">
          <v-card-title>Underwriter </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col md="6" xs="12" sm="12">
              <v-subheader>Name</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.underwriter.name }}</p>
              <v-subheader>Commission</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.underwriter.commission }}</p>
              <v-subheader>Phone Number</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.underwriter.phone }}</p>
              <v-subheader>Email</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.underwriter.email }}</p>
              <v-subheader>Contact Person</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.underwriter.contactPerson }}</p>
            </v-col>
            <v-col md="6" xs="12" sm="12">
              <v-subheader>Contact Person Phone</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.underwriter.contactPersonNumber }}</p>
              <v-subheader>Postal Address</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.underwriter.postalAddress }}</p>
              <v-subheader>Physical Address</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.underwriter.physicalAddress }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col md="4" xs="12" sm="12">
        <v-card v-if="get_funeralPolicy.organization != null" outlined="">
          <v-card-title>Organization </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col md="6" xs="12" sm="12">
              <v-subheader>Name</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.organization.name }}</p>
              <v-subheader>Phone Number</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.organization.phone }}</p>
              <v-subheader>Email</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.organization.email }}</p>
              <v-subheader>Contact Person</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.organization.contactPerson }}</p>
            </v-col>
            <v-col md="6" xs="12" sm="12">
              <v-subheader>Contact Person Phone</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.organization.contactPersonNumber }}</p>
              <v-subheader>Postal Address</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.organization.postalAddress }}</p>
              <v-subheader>Physical Address</v-subheader>
              <p class="pl-4">{{ get_funeralPolicy.organization.physicalAddress }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import enums from '../../Dictionary/Dictionary';
import { mapGetters, mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['GetPolicyById']),
    getGender(n) {
      return enums.gender[n];
    },
    getTitle(t) {
      return enums.title[t];
    },
    getMaritalState(m) {
      return enums.maritalStatus[m];
    },
    getIdType(id) {
      return enums.idType[id];
    },
  },
  computed: mapGetters(['get_funeralPolicy']),
  mounted() {
    this.GetPolicyById(this.$route.params.PolicyId);
  },
};
</script>

<style></style>
