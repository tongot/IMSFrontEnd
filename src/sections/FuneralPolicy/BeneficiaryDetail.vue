<template>
  <div>
    <editBeneficiary />
    <v-card v-if="get_beneficiary != null" outlined>
      <v-toolbar dark color="light-blue" flat>
        <v-toolbar-title>Beneficiary</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-title>
        {{
        get_beneficiary.salutation +
        ' ' +
        get_beneficiary.firstName +
        ' ' +
        get_beneficiary.middleName +
        ' ' +
        get_beneficiary.lastName
        }}
        <v-spacer></v-spacer>
        <v-btn @click="SetEditBeneficiary(get_beneficiary)" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-row class="pa-2">
        <v-col md="4" xs="12" sm="12">
          <h4>Personal Details</h4>
          <v-divider></v-divider>
          <v-subheader>Salutation</v-subheader>
          <p class="pl-4">{{ get_beneficiary.salutation }}</p>
          <v-subheader>Name</v-subheader>
          <p class="pl-4">{{ get_beneficiary.firstName + ' ' + get_beneficiary.middleName }}</p>
          <v-subheader>Surname</v-subheader>
          <p class="pl-4">{{ get_beneficiary.lastName }}</p>
          <v-subheader>Marital Status</v-subheader>
          <p class="pl-4">{{ get_beneficiary.maritalStatus }}</p>
          <v-subheader>Gender</v-subheader>
          <p class="pl-4">{{ get_beneficiary.gender }}</p>
          <v-subheader>Date of birth</v-subheader>
          <p class="pl-4">{{ get_beneficiary.dateOfBirth }}</p>
          <v-subheader>Disabled</v-subheader>
          <span class="ml-4">
            <v-chip small v-if="get_beneficiary.disabled == 'No'">No</v-chip>
            <v-chip small class="red white--text" v-if="get_beneficiary.disabled == 'Yes'">Yes</v-chip>
          </span>
        </v-col>

        <v-col md="4" xs="12" sm="12">
          <h4>Identity</h4>
          <v-divider></v-divider>
          <v-subheader>National Id Number</v-subheader>
          <p class="pl-4">{{ get_beneficiary.idNumber }}</p>
          <v-subheader>Type of Id</v-subheader>
          <p class="pl-4">{{ get_beneficiary.idType }}</p>
          <v-subheader>Country Of Issue</v-subheader>
          <p class="pl-4">{{ get_beneficiary.countryOfIssue }}</p>
        </v-col>
        <v-col md="4" xs="12" sm="12">
          <h4>Contact</h4>
          <v-divider></v-divider>
          <v-subheader>Address</v-subheader>
          <address class="pl-4">{{ get_beneficiary.address }}</address>
          <v-subheader>Phone</v-subheader>
          <p class="pl-4">{{ get_beneficiary.phoneNumber}}</p>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import editBeneficiary from "../FuneralPolicy/EditBeneficiary";
export default {
  components: {
    editBeneficiary,
  },
  methods: {
    ...mapActions(["SetEditBeneficiary"]),
  },
  computed: mapGetters(["get_beneficiary"]),
};
</script>

<style>
</style>