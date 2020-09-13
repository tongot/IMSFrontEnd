<template>
  <div>
    <v-dialog
      v-model="get_dialogAddPolicyHolder"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card flat>
        <v-toolbar dark>
          <v-toolbar-title>Add New Policy Holder</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-2" @click="Cancel()" depressed>Cancel</v-btn>
          <v-btn
            color="grey"
            @click.prevent="PostHolder()"
            class="mr-2"
            :loading="get_loadingPolicyHolder"
            depressed
          >Add</v-btn>
          <v-btn color="red" icon @click="Close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-card class="mt-1" outlined>
            <v-card-text>
              <v-alert type="error" v-if="get_policyHolderError != null">{{ get_policyHolderError }}</v-alert>
              <v-card-title>Person details</v-card-title>
              <v-divider></v-divider>
              <v-form ref="formAdd">
                <v-row>
                  <v-col md="1" sm="4" xs="4">
                    <v-combobox
                      label="Title"
                      :items="getTitle()"
                      :rules="[rules.required]"
                      v-model="holder.salutation"
                    ></v-combobox>
                  </v-col>
                  <v-col md="1" sm="4" xs="4">
                    <v-combobox
                      label="Gender"
                      :rules="[rules.required]"
                      :items="getGender()"
                      v-model="holder.gender"
                    ></v-combobox>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field
                      v-model="holder.firstName"
                      :rules="[rules.required]"
                      label="Fisrt Name"
                    ></v-text-field>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field v-model="holder.middleName" label="Middle Name"></v-text-field>
                  </v-col>
                  <v-col md="4" sm="12" xs="12">
                    <v-text-field
                      v-model="holder.lastName"
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
                      :return-value.sync="holder.dateOfBirth"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="holder.dateOfBirth"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="holder.dateOfBirth" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(holder.dateOfBirth)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col md="2" sm="4" xs="4">
                    <v-combobox
                      label="Id Type"
                      :rules="[rules.required]"
                      :items="getIdType()"
                      v-model="holder.idType"
                    ></v-combobox>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field
                      v-model="holder.idNumber"
                      :rules="[rules.required]"
                      label="Id Number"
                    ></v-text-field>
                  </v-col>
                  <v-col md="4" sm="12" xs="12">
                    <v-text-field
                      v-model="holder.countryOfIssue"
                      :rules="[rules.required]"
                      label="Country Of Issue"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="4" sm="12">
                    <v-subheader>Disabled</v-subheader>
                    <v-divider></v-divider>
                    <v-radio-group :rules="[rules.required]" v-model="holder.disabled" row>
                      <v-radio value="true" label="Yes"></v-radio>
                      <v-radio value="false" label="No"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col md="4" sm="12">
                    <v-combobox
                      label="Marital Status"
                      :rules="[rules.required]"
                      v-model="holder.maritalStatus"
                      :items="getMaritalState()"
                    ></v-combobox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field v-model="holder.occupation" label="Occupation"></v-text-field>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field v-model="holder.department" label="Department"></v-text-field>
                  </v-col>
                  <v-col md="4" sm="12" xs="12">
                    <v-text-field v-model="holder.branch" label="Branch"></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-card-title>Contact details</v-card-title>
                <v-row>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field
                      v-model="holder.contact.mobile"
                      :rules="[rules.required]"
                      label="Mobile Number"
                    ></v-text-field>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field
                      v-model="holder.contact.telephoneHome"
                      :rules="[rules.required]"
                      label="Home Telephone"
                    ></v-text-field>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field
                      v-model="holder.contact.telephoneWork"
                      :rules="[rules.required]"
                      label="Work Telephone"
                    ></v-text-field>
                  </v-col>
                  <v-col md="3" sm="12" xs="12">
                    <v-text-field
                      v-model="holder.contact.primaryEmail"
                      :rules="[rules.email]"
                      label="Primary Email"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="4" sm="12" xs="12">
                    <v-textarea
                      v-model="holder.contact.physicalAddress"
                      :rules="[rules.required]"
                      label="Physical Address"
                    ></v-textarea>
                  </v-col>
                  <v-col md="4" sm="12" xs="12">
                    <v-textarea v-model="holder.contact.postalAddress" label="Postal Address"></v-textarea>
                  </v-col>
                  <v-col md="4" sm="12" xs="12">
                    <v-textarea v-model="holder.contact.workAddress" label="Work Address"></v-textarea>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    menu: false,
    holder: {
      department: "",
      branch: "",
      maritalStatus: "",
      occupation: "",
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
      organizationId: "",
      contact: {
        mobile: "",
        telephoneHome: "",
        telephoneWork: "",
        primaryEmail: "",
        workAddress: "",
        postalAddress: "",
        physicalAddress: "",
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
    PostHolder() {
      if (this.$refs.formAdd.validate()) {
        this.holder.organizationId = this.get_user.organizationId;
        this.AddPolicyHolder(this.holder).then(() => {
          const search = {
            page: 1,
            search: "",
            status: "",
            size: 10,
          };
          this.GetPolicyHolders(search);
        });
      }
    },
    Close() {
      this.CloseAddPolicyHolderDialog();
    },
    Cancel() {
      this.clearForm();
      this.CloseAddPolicyHolderDialog();
    },
    clearForm() {
      this.holder.department = "";
      this.holder.branch = "";
      this.holder.maritalStatus = "";
      this.holder.occupation = "";
      this.holder.salutation = "";
      this.holder.firstName = "";
      this.holder.lastName = "";
      this.holder.middleName = "";
      this.holder.gender = "";
      this.holder.dateOfBirth = "";
      this.holder.idNumber = "";
      this.holder.idType = "";
      this.holder.countryOfIssue = "";
      this.holder.disabled = "";
      this.holder.contact.mobile = "";
      this.holder.contact.telephoneHome = "";
      this.holder.contact.telephoneWork = "";
      this.holder.contact.primaryEmail = "";
      this.holder.contact.workAddress = "";
      this.holder.contact.postalAddress = "";
      this.holder.contact.physicalAddress = "";
    },
    ...mapActions([
      "CloseAddPolicyHolderDialog",
      "AddPolicyHolder",
      "GetPolicyHolders",
    ]),
  },
  computed: mapGetters([
    "get_dialogAddPolicyHolder",
    "get_policyHolderError",
    "get_loadingPolicyHolder",
    "get_user",
  ]),
};
</script>

<style></style>
