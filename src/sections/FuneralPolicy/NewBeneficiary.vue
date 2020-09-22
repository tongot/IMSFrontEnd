<template>
  <div>
    <v-dialog persistent v-model="get_beneficiaryDialog">
      <v-card class="mt-1">
        <v-card-text>
          <v-card-title>
            Beneficiary Details
            <v-spacer></v-spacer>
            <v-btn color="red" icon @click="Close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="formAdd" id="newDependent">
            <v-row>
              <v-col md="4" cols="12" sm="12">
                <v-overflow-btn
                  label="Relationship"
                  target="#newDependent"
                  width="auto"
                  :items="get_Relationships"
                  v-model="beneficiary.relationshipId"
                  item-value="id"
                  :loading="get_loadingRelationship"
                  :rules="[rules.required]"
                  item-text="name"
                ></v-overflow-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="1" cols="12" sm="4" xs="4">
                <v-combobox
                  label="Title"
                  :items="getTitle()"
                  :rules="[rules.required]"
                  v-model="beneficiary.salutation"
                ></v-combobox>
              </v-col>
              <v-col md="1" cols="12" sm="4" xs="4">
                <v-combobox
                  label="Gender"
                  :rules="[rules.required]"
                  :items="getGender()"
                  v-model="beneficiary.gender"
                ></v-combobox>
              </v-col>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-text-field
                  v-model="beneficiary.firstName"
                  :rules="[rules.required]"
                  label="Fisrt Name"
                ></v-text-field>
              </v-col>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-text-field v-model="beneficiary.middleName" label="Middle Name"></v-text-field>
              </v-col>
              <v-col md="4" cols="12" sm="12" xs="12">
                <v-text-field
                  v-model="beneficiary.lastName"
                  :rules="[rules.required]"
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" ols="12" md="4" sm="12"></v-col>
            </v-row>
            <v-row>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="beneficiary.dateOfBirth"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="beneficiary.dateOfBirth"
                      label="Date Of Birth"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="beneficiary.dateOfBirth" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(beneficiary.dateOfBirth)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col md="2" cols="12" sm="4" xs="4">
                <v-combobox
                  label="Id Type"
                  :rules="[rules.required]"
                  :items="getIdType()"
                  v-model="beneficiary.idType"
                ></v-combobox>
              </v-col>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-text-field
                  v-model="beneficiary.idNumber"
                  :rules="[rules.required]"
                  label="Id Number"
                ></v-text-field>
              </v-col>
              <v-col md="4" cols="12" sm="12" xs="12">
                <v-text-field
                  v-model="beneficiary.countryOfIssue"
                  :rules="[rules.required]"
                  label="Country Of Issue"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" cols="12" sm="12">
                <v-subheader>Disabled</v-subheader>
                <v-divider></v-divider>
                <v-radio-group :rules="[rules.required]" v-model="beneficiary.disabled" row>
                  <v-radio value="true" label="Yes"></v-radio>
                  <v-radio value="false" label="No"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col md="4" cols="12" sm="12">
                <v-combobox
                  label="Marital Status"
                  :rules="[rules.required]"
                  v-model="beneficiary.maritalStatus"
                  :items="getMaritalState()"
                ></v-combobox>
              </v-col>
              <v-col md="4" cols="12" sm="12">
                <v-text-field
                  v-model="beneficiary.phoneNumber"
                  :rules="[rules.required]"
                  label="Phone number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" sm="12">
                <v-textarea v-model="beneficiary.address" :rules="[rules.required]" label="Address"></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addBeneficiary()" color="success" depressed>Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import enums from "../../Dictionary/Dictionary";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    menu: false,
    beneficiary: {
      maritalStatus: "",
      salutation: "",
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "",
      dateOfBirth: "",
      idNumber: "",
      idType: "",
      countryOfIssue: "",
      disabled: "",
      relationshipId: "",
      phoneNumber: "",
      address: "",
    },
    rules: {
      required: (v) => !!v || "This fieled is required",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  methods: {
    ...mapActions([
      "OpenBeneficiaryDialog",
      "GetRelationships",
      "SetBeneficiary",
      "ClearBeneficiary",
    ]),
    getTitle() {
      return enums.title;
    },
    getIdType() {
      return enums.idType;
    },
    getGender() {
      return enums.gender;
    },
    getMaritalState() {
      return enums.maritalStatus;
    },
    getRelationship() {
      return enums.relationships;
    },
    Close() {
      this.OpenBeneficiaryDialog();
      this.Clear();
      this.ClearBeneficiary();
    },
    Clear() {
      this.beneficiary.department = "";
      this.beneficiary.branch = "";
      this.beneficiary.maritalStatus = "";
      this.beneficiary.occupation = "";
      this.beneficiary.salutation = "";
      this.beneficiary.firstName = "";
      this.beneficiary.lastName = "";
      this.beneficiary.middleName = "";
      this.beneficiary.gender = "";
      this.beneficiary.dateOfBirth = "";
      this.beneficiary.idNumber = "";
      this.beneficiary.idType = "";
      this.beneficiary.countryOfIssue = "";
      this.beneficiary.disabled = "";
      this.beneficiary.phoneNumber = "";
      this.beneficiary.address = "";
    },
    Cancel() {
      this.Clear();
      this.OpenBeneficiaryDialog();
    },
    addBeneficiary() {
      if (this.$refs.formAdd.validate()) {
        this.SetBeneficiary(this.beneficiary);
        this.OpenBeneficiaryDialog();
      }
    },
  },
  computed: {
    ...mapGetters([
      "get_beneficiaryDialog",
      "get_Relationships",
      "get_loadingRelationship",
    ]),
  },
  mounted() {
    this.GetRelationships();
  },
};
</script>

<style>
</style>