<template>
  <div>
    <v-dialog
      v-model="get_dialogEditDependent"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card v-if="get_EditDependent!=null" flat>
        <v-toolbar dark>
          <v-toolbar-title>Edit Dependent</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            @click.prevent="editDependent()"
            class="mr-2"
            :loading="get_loadingDependent"
            depressed
          >Edit</v-btn>
          <v-btn color="red" icon @click="Close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-card class="mt-1" outlined>
            <v-card-text>
              <v-alert type="error" v-if="get_dependentError != null">{{ get_dependentError }}</v-alert>
              <v-card-title>Person details</v-card-title>
              <v-divider></v-divider>
              <v-form ref="formEdit" id="newDependent">
                <v-row>
                  <v-col md="4" sm="12">
                    <v-overflow-btn
                      label="Relationship"
                      target="#newDependent"
                      width="auto"
                      :items="get_Relationships"
                      v-model="get_EditDependent.relationshipId"
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
                      v-model="get_EditDependent.salutation"
                    ></v-combobox>
                  </v-col>
                  <v-col md="1" cols="12" sm="4" xs="4">
                    <v-combobox
                      label="Gender"
                      :rules="[rules.required]"
                      :items="getGender()"
                      v-model="get_EditDependent.gender"
                    ></v-combobox>
                  </v-col>
                  <v-col md="3" cols="12" sm="12" xs="12">
                    <v-text-field
                      v-model="get_EditDependent.firstName"
                      :rules="[rules.required]"
                      label="Fisrt Name"
                    ></v-text-field>
                  </v-col>
                  <v-col md="3" cols="12" sm="12" xs="12">
                    <v-text-field v-model="get_EditDependent.middleName" label="Middle Name"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12" sm="12" xs="12">
                    <v-text-field
                      v-model="get_EditDependent.lastName"
                      :rules="[rules.required]"
                      label="Last Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="12"></v-col>
                </v-row>
                <v-row>
                  <v-col md="3" cols="12" sm="12" xs="12">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="get_EditDependent.dateOfBirth"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="get_EditDependent.dateOfBirth"
                          label="Date Of Birth"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="get_EditDependent.dateOfBirth" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(get_EditDependent.dateOfBirth)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col md="2" cols="12" sm="4" xs="4">
                    <v-combobox
                      label="Id Type"
                      :rules="[rules.required]"
                      :items="getIdType()"
                      v-model="get_EditDependent.idType"
                    ></v-combobox>
                  </v-col>
                  <v-col md="3" cols="12" sm="12" xs="12">
                    <v-text-field
                      v-model="get_EditDependent.idNumber"
                      :rules="[rules.required]"
                      label="Id Number"
                    ></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12" sm="12" xs="12">
                    <v-text-field
                      v-model="get_EditDependent.countryOfIssue"
                      :rules="[rules.required]"
                      label="Country Of Issue"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="4" cols="12" sm="12">
                    <v-subheader>Disabled</v-subheader>
                    <v-divider></v-divider>
                    <v-radio-group
                      :rules="[rules.required]"
                      v-model="get_EditDependent.disabled"
                      row
                    >
                      <v-radio :value="'Yes'" label="Yes"></v-radio>
                      <v-radio :value="'No'" label="No"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col md="4" cols="12" sm="12">
                    <v-combobox
                      label="Marital Status"
                      :rules="[rules.required]"
                      v-model="get_EditDependent.maritalStatus"
                      :items="getMaritalState()"
                    ></v-combobox>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row justify="end">
                  <v-col md="6" cols="12" sm="12">
                    <v-card>
                      <v-card-title>Cover Details</v-card-title>
                      <v-card-text>
                        <v-text-field
                          v-model="get_EditDependent.policyCover.payPoint"
                          :rules="[rules.required]"
                          label="Pay point"
                        ></v-text-field>
                        <v-menu
                          ref="menuEdate"
                          v-model="effectiveDate"
                          :close-on-content-click="false"
                          :return-value.sync="get_EditDependent.policyCover.effectiveDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="get_EditDependent.policyCover.effectiveDate"
                              label="Effective Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              :rules="[rules.required]"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="get_EditDependent.policyCover.effectiveDate"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuEdate.save(get_EditDependent.policyCover.effectiveDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-menu
                          ref="menuDJC"
                          v-model="dJCDate"
                          :close-on-content-click="false"
                          :return-value.sync="get_EditDependent.policyCover.djcDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="get_EditDependent.policyCover.djcDate"
                              label="DJC Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              :rules="[rules.required]"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="get_EditDependent.policyCover.djcDate"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuDJC.save(get_EditDependent.policyCover.djcDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-menu
                          ref="menuDJF"
                          v-model="dJFDate"
                          :close-on-content-click="false"
                          :return-value.sync="get_EditDependent.policyCover.djfDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="get_EditDependent.policyCover.djfDate"
                              label="DJF Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              :rules="[rules.required]"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="get_EditDependent.policyCover.djfDate"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="djfDate = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuDJF.save(get_EditDependent.policyCover.djfDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-menu
                          ref="menuDPS"
                          v-model="dPSDate"
                          :close-on-content-click="false"
                          :return-value.sync="get_EditDependent.policyCover.dpsDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="get_EditDependent.policyCover.dpsDate"
                              label="DPS Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              :rules="[rules.required]"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="get_EditDependent.policyCover.dpsDate"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="dpsDate = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuDPS.save(get_EditDependent.policyCover.dpsDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-overflow-btn
                          label="Select package"
                          target="#newPolicy"
                          width="auto"
                          :items="get_dependentPackages.dependentPackages"
                          v-model="get_EditDependent.policyCover.dependentPackageId"
                          item-value="id"
                          :loading="get_loadingDependent"
                          :rules="[rules.required]"
                          item-text="name"
                        ></v-overflow-btn>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import enums from "../../Dictionary/Dictionary";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    effectiveDate: false,
    dJCDate: false,
    dJFDate: false,
    dPSDate: false,
    menu: false,
    isOthers: false,
    dependent: {
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
      policyCover: {
        payPoint: "",
        dJCDate: "",
        dJFDate: "",
        dPSDate: "",
        dependentPackageId: "",
        effectiveDate: "",
      },
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
      "EditDependent",
      "CloseEditDependentDialog",
      "EditDependentF",
      "GetDependenciesForPolicy",
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
      this.CloseEditDependentDialog();
    },
    RelationshipChanged(value) {
      this.isOthers = value == "Other" ? true : false;
    },
    editDependent() {
      if (this.$refs.formEdit.validate()) {
        this.EditDependentF(this.get_EditDependent).then(() => {
          this.GetDependenciesForPolicy(this.get_EditDependent.policyId);
        });
      }
    },
  },
  computed: {
    ...mapGetters([
      "get_loadingDependent",
      "get_dependentError",
      "get_dialogEditDependent",
      "get_dependentPackages",
      "get_loadingRelationship",
      "get_Relationships",
      "get_EditDependent",
    ]),
  },
};
</script>

<style>
</style>