<template>
  <div>
    <v-dialog
      v-model="get_dialogAddDependent"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card flat>
        <v-toolbar dark>
          <v-toolbar-title>Add New Dependent</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-2" @click="Cancel()" depressed>Cancel</v-btn>
          <v-btn
            color="grey"
            @click.prevent="addDependent()"
            class="mr-2"
            :loading="get_loadingDependent"
            depressed
          >Add</v-btn>
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
              <v-form ref="formAdd" id="newDependent">
                <v-row>
                  <v-col md="4" sm="12">
                    <v-overflow-btn
                      label="Relationship"
                      target="#newDependent"
                      width="auto"
                      :items="get_Relationships"
                      v-model="dependent.relationshipId"
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
                      v-model="dependent.salutation"
                    ></v-combobox>
                  </v-col>
                  <v-col md="1" sm="4" xs="4">
                    <v-combobox
                      label="Gender"
                      :rules="[rules.required]"
                      :items="getGender()"
                      v-model="dependent.gender"
                    ></v-combobox>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field
                      v-model="dependent.firstName"
                      :rules="[rules.required]"
                      label="Fisrt Name"
                    ></v-text-field>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field v-model="dependent.middleName" label="Middle Name"></v-text-field>
                  </v-col>
                  <v-col md="4" sm="12" xs="12">
                    <v-text-field
                      v-model="dependent.lastName"
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
                      :return-value.sync="dependent.dateOfBirth"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dependent.dateOfBirth"
                          label="Date Of Birth"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dependent.dateOfBirth" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(dependent.dateOfBirth)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col md="2" sm="4" xs="4">
                    <v-combobox
                      label="Id Type"
                      :rules="[rules.required]"
                      :items="getIdType()"
                      v-model="dependent.idType"
                    ></v-combobox>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field
                      v-model="dependent.idNumber"
                      :rules="[rules.required]"
                      label="Id Number"
                    ></v-text-field>
                  </v-col>
                  <v-col md="4" sm="12" xs="12">
                    <v-text-field
                      v-model="dependent.countryOfIssue"
                      :rules="[rules.required]"
                      label="Country Of Issue"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="4" sm="12">
                    <v-subheader>Disabled</v-subheader>
                    <v-divider></v-divider>
                    <v-radio-group :rules="[rules.required]" v-model="dependent.disabled" row>
                      <v-radio value="true" label="Yes"></v-radio>
                      <v-radio value="false" label="No"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col md="4" sm="12">
                    <v-combobox
                      label="Marital Status"
                      :rules="[rules.required]"
                      v-model="dependent.maritalStatus"
                      :items="getMaritalState()"
                    ></v-combobox>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row justify="end">
                  <v-col md="6" sm="12">
                    <v-card>
                      <v-card-title>Cover Details</v-card-title>
                      <v-card-text>
                        <v-text-field
                          v-model="dependent.cover.payPoint"
                          :rules="[rules.required]"
                          label="Pay point"
                        ></v-text-field>
                        <v-menu
                          ref="menuEdate"
                          v-model="effectiveDate"
                          :close-on-content-click="false"
                          :return-value.sync="dependent.cover.effectiveDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="dependent.cover.effectiveDate"
                              label="Effective Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              :rules="[rules.required]"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="dependent.cover.effectiveDate"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuEdate.save(dependent.cover.effectiveDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-menu
                          ref="menuDJC"
                          v-model="dJCDate"
                          :close-on-content-click="false"
                          :return-value.sync="dependent.cover.dJCDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="dependent.cover.dJCDate"
                              label="DJC Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              :rules="[rules.required]"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="dependent.cover.dJCDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuDJC.save(dependent.cover.dJCDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-menu
                          ref="menuDJF"
                          v-model="dJFDate"
                          :close-on-content-click="false"
                          :return-value.sync="dependent.cover.dJFDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="dependent.cover.dJFDate"
                              label="DJF Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              :rules="[rules.required]"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="dependent.cover.dJFDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="dJFDate = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuDJF.save(dependent.cover.dJFDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-menu
                          ref="menuDPS"
                          v-model="dPSDate"
                          :close-on-content-click="false"
                          :return-value.sync="dependent.cover.dPSDate"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="dependent.cover.dPSDate"
                              label="DPS Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              :rules="[rules.required]"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="dependent.cover.dPSDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="dPSDate = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuDPS.save(dependent.cover.dPSDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-overflow-btn
                          label="Select package"
                          target="#newPolicy"
                          width="auto"
                          :items="get_dependentPackages.dependentPackages"
                          v-model="dependent.cover.dependentPackageId"
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
      cover: {
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
      "AddDependent",
      "CloseAddDependentDialog",
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
      this.CloseAddDependentDialog();
    },
    Clear() {
      this.dependent.department = "";
      this.dependent.branch = "";
      this.dependent.maritalStatus = "";
      this.dependent.occupation = "";
      this.dependent.salutation = "";
      this.dependent.firstName = "";
      this.dependent.lastName = "";
      this.dependent.middleName = "";
      this.dependent.gender = "";
      this.dependent.dateOfBirth = "";
      this.dependent.idNumber = "";
      this.dependent.idType = "";
      this.dependent.countryOfIssue = "";
      this.dependent.disabled = "";
      this.dependent.cover.payPoint = "";
      this.dependent.cover.dJCDate = "";
      this.dependent.cover.dJFDate = "";
      this.dependent.cover.dPSDate = "";
      this.dependent.cover.packageId = "";
      this.dependent.cover.effectiveDate = "";
    },
    Cancel() {
      this.Clear();
      this.CloseAddDependentDialog();
    },
    RelationshipChanged(value) {
      this.isOthers = value == "Other" ? true : false;
    },
    addDependent() {
      if (this.$refs.formAdd.validate()) {
        this.AddDependent(this.dependent).then(() => {
          this.GetDependenciesForPolicy(
            this.get_funeralPolicy.funeralPolicy.id
          );
        });
      }
    },
  },
  computed: {
    ...mapGetters([
      "get_loadingDependent",
      "get_dependentError",
      "get_dialogAddDependent",
      "get_dependentPackages",
      "get_loadingRelationship",
      "get_Relationships",
      "get_funeralPolicy",
    ]),
  },
};
</script>

<style>
</style>