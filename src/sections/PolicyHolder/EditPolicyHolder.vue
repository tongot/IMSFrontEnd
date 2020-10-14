<template>
  <div>
    <v-dialog v-model="get_dialogEditPolicyHolder" persistent>
      <v-card flat v-if="get_policyHolder != null">
        <v-card-title>
          Add New Policy Holder
          <v-spacer></v-spacer>
          <v-btn icon @click="Close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-alert type="error" v-if="get_policyHolderError != null">{{ get_policyHolderError }}</v-alert>
          <v-divider></v-divider>
          <v-card-title>Person details
<v-spacer></v-spacer>
<v-chip>
{{get_policyHolder.branch.name}}

</v-chip>
          </v-card-title>

              <v-col md="4" cols="12" sm="12" xs="12">
                       <!-- <v-overflow-btn
                      label="Branch"
                      width="auto"
                      :items="get_Branches"
                      v-model="get_policyHolder.branchId"
                      item-value="id"
                      :loading="get_loadBranch"
                      :rules="[rules.required]"
                      item-text="name"
                      disabled
                    ></v-overflow-btn> -->
              </v-col>
          <v-form ref="formAdd">
            <v-row>
              <v-col md="1" cols="12" sm="4" xs="4">
                <v-combobox
                  label="Title"
                  :items="getTitle()"
                  :rules="[rules.required]"
                  v-model="get_policyHolder.salutation"
                ></v-combobox>
              </v-col>
              <v-col md="1" cols="12" sm="4" xs="4">
                <v-combobox
                  label="Gender"
                  :rules="[rules.required]"
                  :items="getGender()"
                  v-model="get_policyHolder.gender"
                ></v-combobox>
              </v-col>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-text-field
                  v-model="get_policyHolder.firstName"
                  :rules="[rules.required]"
                  label="Fisrt Name"
                ></v-text-field>
              </v-col>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-text-field v-model="get_policyHolder.middleName" label="Middle Name"></v-text-field>
              </v-col>
              <v-col md="4" cols="12" sm="12" xs="12">
                <v-text-field
                  v-model="get_policyHolder.lastName"
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
                  :return-value.sync="get_policyHolder.dateOfBirth"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="get_policyHolder.dateOfBirth"
                      label="Date Of Birth"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="get_policyHolder.dateOfBirth" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(get_policyHolder.dateOfBirth)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col md="2" cols="12" sm="4" xs="4">
                <v-combobox
                  label="Id Type"
                  :rules="[rules.required]"
                  :items="getIdType()"
                  v-model="get_policyHolder.idType"
                ></v-combobox>
              </v-col>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-text-field
                  v-model="get_policyHolder.idNumber"
                  :rules="[rules.required]"
                  label="Id Number"
                ></v-text-field>
              </v-col>
              <v-col md="4" sm="12" cols="12" xs="12">
                <v-text-field
                  v-model="get_policyHolder.countryOfIssue"
                  :rules="[rules.required]"
                  label="Country Of Issue"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" cols="12" sm="12">
                <v-subheader>Disabled</v-subheader>
                <v-divider></v-divider>
                <v-radio-group :rules="[rules.required]" v-model="get_policyHolder.disabled" row>
                  <v-radio :value="'Yes'" label="Yes"></v-radio>
                  <v-radio :value="'No'" label="No"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col md="4" cols="12" sm="12">
                <v-combobox
                  label="Marital Status"
                  :rules="[rules.required]"
                  v-model="get_policyHolder.maritalStatus"
                  :items="getMaritalState()"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-text-field v-model="get_policyHolder.occupation" label="Occupation"></v-text-field>
              </v-col>
              <v-col md="3" cols="12" sm="12" xs="12">
                <v-text-field v-model="get_policyHolder.department" label="Employer"></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title>Contact details</v-card-title>
            <v-row>
              <v-col md="3" sm="12" cols="12" xs="12">
                <v-text-field
                  v-model="get_policyHolder.contact.mobile"
                  :rules="[rules.required]"
                  label="Mobile Number"
                ></v-text-field>
              </v-col>
              <v-col md="3" sm="12" cols="12" xs="12">
                <v-text-field
                  v-model="get_policyHolder.contact.telephoneHome"
                  label="Home Telephone"
                ></v-text-field>
              </v-col>
              <v-col md="3" sm="12" cols="12" xs="12">
                <v-text-field
                  v-model="get_policyHolder.contact.telephoneWork"
                  label="Work Telephone"
                ></v-text-field>
              </v-col>
              <v-col md="3" sm="12" cols="12" xs="12">
                <v-text-field
                  v-model="get_policyHolder.contact.primaryEmail"
                  :rules="[rules.email]"
                  label="Primary Email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" sm="12" cols="12" xs="12">
                <v-textarea
                  v-model="get_policyHolder.contact.physicalAddress"
                  :rules="[rules.required]"
                  label="Physical Address"
                ></v-textarea>
              </v-col>
              <v-col md="4" sm="12" cols="12" xs="12">
                <v-textarea v-model="get_policyHolder.contact.postalAddress" label="Postal Address"></v-textarea>
              </v-col>
              <v-col md="4" sm="12" cols="12" xs="12">
                <v-textarea v-model="get_policyHolder.contact.workAddress" label="Work Address"></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="Cancel()" depressed>Cancel</v-btn>
          <v-btn @click.prevent="PostHolder()" :loading="get_loadingPolicyHolder" depressed>Edit</v-btn>
        </v-card-actions>
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
    getGender() {
      return enums.gender;
    },
    getIdType() {
      return enums.idType;
    },
    getMaritalState() {
      return enums.maritalStatus;
    },
    PostHolder() {
      if (this.$refs.formAdd.validate()) {
        console.log("hit");
        this.EditPolicyHolder(this.get_policyHolder);
      }
    },
    Close() {
      this.CloseEditPolicyHolderDialog();
    },
    Cancel() {
      this.CloseEditPolicyHolderDialog();
    },
    ...mapActions([
      "CloseEditPolicyHolderDialog",
      "AddPolicyHolder",
      "EditPolicyHolder",
      "GetBranches"
    ]),
  },
  computed: mapGetters([
    "get_dialogEditPolicyHolder",
    "get_policyHolderError",
    "get_loadingPolicyHolder",
    "get_policyHolder",
    "get_Branches",
    "get_loadBranch",
    "get_user"
  ]),
  mounted(){
      if(this.get_user!=null)
      {
        this.GetBranches()
      }

  }
};
</script>

<style></style>
