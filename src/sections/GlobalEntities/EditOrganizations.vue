<template>
  <div>
    <v-dialog v-model="get_organizationEditModal" persistent width="500">
      <v-form v-if="get_Organization != null" ref="formUpdate">
        <v-card>
          <v-card-title
            >Edit Organization
            <v-spacer></v-spacer>
            <v-btn icon @click="CloseModalOrg()">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" dismissible v-if="get_OrganizationError != null"></v-alert>
            <v-text-field :rules="[rules.required]" label="Name" v-model="get_Organization.name"> </v-text-field>
            <v-text-field :rules="[rules.required]" label="Phone" v-model="get_Organization.phone"> </v-text-field>
            <v-text-field :rules="[rules.required, rules.email]" label="Email" v-model="get_Organization.email">
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Contact Person Name" v-model="get_Organization.contactPerson">
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Contact Person Number"
              v-model="get_Organization.contactPersonNumber"
            >
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Postal Address" v-model="get_Organization.postalAddress">
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Physical Address" v-model="get_Organization.physicalAddress">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="get_loadingOrganization" depressed @click.prevent="UpdateOrganization()">
              <v-icon left>
                mdi-content-save
              </v-icon>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: () => ({
    model: false,
    rules: {
      required: (v) => !!v || 'This fieled is required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    },
  }),
  methods: {
    ...mapActions(['CloseModalOrg', 'UpdateOrganization']),
    Update() {
      if (this.$refs.formUpdate.validate()) {
        this.UpdateOrganization(this.get_Organization);
      }
    },
  },
  computed: mapGetters([
    'get_OrganizationError',
    'get_loadingOrganization',
    'get_Organization',
    'get_organizationEditModal',
  ]),
  mounted() {
    this.model = true;
  },
};
</script>

<style></style>
