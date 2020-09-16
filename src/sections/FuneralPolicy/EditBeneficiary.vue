<template>
  <div v-if="get_editBeneficiary!=null">
    <v-dialog persistent v-model="get_beneficiaryEditDialog">
      <v-card class="mt-1">
        <v-card-text>
          <v-card-title>
            Person details
            <v-spacer></v-spacer>
            <v-btn color="red" icon @click="Close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="formEdit" id="newDependent">
            <v-alert v-if="get_beneficiaryError!=null" type="error">{{get_beneficiaryError}}</v-alert>
            <v-row>
              <v-col md="4" sm="12">
                <v-overflow-btn
                  label="Relationship"
                  target="#newDependent"
                  width="auto"
                  :items="get_Relationships"
                  v-model="get_editBeneficiary.relationshipId"
                  item-value="id"
                  :loading="get_loadingRelationship"
                  :rules="[rules.required]"
                  item-text="name"
                ></v-overflow-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="1" sm="4" xs="4">
                <v-combobox
                  label="Title"
                  :items="getTitle()"
                  :rules="[rules.required]"
                  v-model="get_editBeneficiary.salutation"
                ></v-combobox>
              </v-col>
              <v-col md="1" sm="4" xs="4">
                <v-combobox
                  label="Gender"
                  :rules="[rules.required]"
                  :items="getGender()"
                  v-model="get_editBeneficiary.gender"
                ></v-combobox>
              </v-col>
              <v-col md="3" sm="12" xs="12">
                <v-text-field
                  v-model="get_editBeneficiary.firstName"
                  :rules="[rules.required]"
                  label="Fisrt Name"
                ></v-text-field>
              </v-col>
              <v-col md="3" sm="12" xs="12">
                <v-text-field v-model="get_editBeneficiary.middleName" label="Middle Name"></v-text-field>
              </v-col>
              <v-col md="4" sm="12" xs="12">
                <v-text-field
                  v-model="get_editBeneficiary.lastName"
                  :rules="[rules.required]"
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="12"></v-col>
            </v-row>
            <v-row>
              <v-col md="3" sm="12" xs="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="get_editBeneficiary.dateOfBirth"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="get_editBeneficiary.dateOfBirth"
                      label="Date Of Birth"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="get_editBeneficiary.dateOfBirth" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(get_editBeneficiary.dateOfBirth)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col md="2" sm="4" xs="4">
                <v-combobox
                  label="Id Type"
                  :rules="[rules.required]"
                  :items="getIdType()"
                  v-model="get_editBeneficiary.idType"
                ></v-combobox>
              </v-col>
              <v-col md="3" sm="12" xs="12">
                <v-text-field
                  v-model="get_editBeneficiary.idNumber"
                  :rules="[rules.required]"
                  label="Id Number"
                ></v-text-field>
              </v-col>
              <v-col md="4" sm="12" xs="12">
                <v-text-field
                  v-model="get_editBeneficiary.countryOfIssue"
                  :rules="[rules.required]"
                  label="Country Of Issue"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" sm="12">
                <v-subheader>Disabled</v-subheader>
                <v-divider></v-divider>
                <v-radio-group :rules="[rules.required]" v-model="get_editBeneficiary.disabled" row>
                  <v-radio :value="'Yes'" label="Yes"></v-radio>
                  <v-radio :value="'No'" label="No"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col md="4" sm="12">
                <v-combobox
                  label="Marital Status"
                  :rules="[rules.required]"
                  v-model="get_editBeneficiary.maritalStatus"
                  :items="getMaritalState()"
                ></v-combobox>
              </v-col>
              <v-col md="4" sm="12">
                <v-text-field
                  v-model="get_editBeneficiary.phoneNumber"
                  :rules="[rules.required]"
                  label="Phone number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" sm="12">
                <v-textarea
                  v-model="get_editBeneficiary.address"
                  :rules="[rules.required]"
                  label="Address"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="editBeneficiary(get_editBeneficiary)"
            :loading="get_loadingFPolicy"
            color="success"
            depressed
          >Ok</v-btn>
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
    menu: false,
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
      "OpenBeneficiaryEditDialog",
      "UpdateBeneficiary",
    ]),
    getTitle() {
      return enums.title;
    },
    getGender() {
      return enums.gender;
    },
    getIdType() {
      return enums.idType;
    },
    getMaritalState() {
      return enums.maritalStatus;
    },
    Close() {
      this.OpenBeneficiaryEditDialog();
    },
    editBeneficiary(beneficiary) {
      if (this.$refs.formEdit.validate()) {
        this.UpdateBeneficiary(beneficiary);
      }
    },
  },
  computed: {
    ...mapGetters([
      "get_beneficiaryEditDialog",
      "get_Relationships",
      "get_loadingRelationship",
      "get_editBeneficiary",
      "get_beneficiaryError",
      "get_loadingFPolicy",
    ]),
  },
  mounted() {
    this.GetRelationships();
  },
};
</script>

<style>
</style>