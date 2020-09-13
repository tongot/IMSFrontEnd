<template>
  <div>
    <v-dialog v-model="get_organizationAddModal" persistent width="500">
      <v-form ref="formAdd">
        <v-card>
          <v-card-title>
            Add Organization
            <v-spacer></v-spacer>
            <v-btn icon @click="CloseModalAddOrg()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" dismissible v-if="get_OrganizationError != null"></v-alert>
            <v-text-field :rules="[rules.required]" label="Name" v-model="Organization.name"></v-text-field>
            <v-text-field :rules="[rules.required]" label="Phone" v-model="Organization.phone"></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.email]"
              label="Email"
              v-model="Organization.email"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Contact Person Name"
              v-model="Organization.contactPerson"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Contact Person Number"
              v-model="Organization.contactPersonNumber"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Postal Address"
              v-model="Organization.postalAddress"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Physical Address"
              v-model="Organization.physicalAddress"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="get_loadingOrganization" depressed @click.prevent="AddOrganization()">
              <v-icon left>mdi-content-save</v-icon>Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    Organization: {
      name: "",
      phone: "",
      email: "",
      contactPerson: "",
      contactPersonNumber: "",
      postalAddress: "",
      physicalAddress: "",
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
    ...mapActions(["CloseModalAddOrg", "AddNewOrganization"]),
    AddOrganization() {
      if (this.$refs.formAdd.validate()) {
        this.AddNewOrganization(this.Organization);
      }
    },
  },
  computed: mapGetters([
    "get_OrganizationError",
    "get_loadingOrganization",
    "get_Organization",
    "get_organizationAddModal",
  ]),
  mounted() {
    this.model = true;
  },
};
</script>

<style></style>
