<template>
  <div>
    <v-col cols="6">
      <v-btn :loading="get_loadingOrganization" @click.prevent="Add()" text>
        <v-icon left>
          mdi-plus
        </v-icon>
        Organization
      </v-btn>
      <v-expansion-panels flat="">
        <v-expansion-panel v-for="organization in get_Organizations" :key="organization.id">
          <v-expansion-panel-header>{{ organization.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="ma-2" outlined>
              <v-card-title>
                {{ organization.name }}
                <v-spacer></v-spacer>
                <v-btn :loading="get_loadingOrganization" @click.prevent="Edit(organization.id)" icon>
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-subheader>Phone</v-subheader>
              <p class="pl-4">{{ organization.phone }}</p>
              <v-subheader>Email</v-subheader>
              <p class="pl-4">{{ organization.email }}</p>
              <v-subheader>Contact Person</v-subheader>
              <p class="pl-4">{{ organization.contactPerson }}</p>
              <v-subheader>Contact Person Phone</v-subheader>
              <p class="pl-4">{{ organization.contactPhoneNumber }}</p>
              <v-subheader>Physical Address</v-subheader>
              <p class="pl-4">{{ organization.physicalAddress }}</p>
              <v-subheader>Postal Address</v-subheader>
              <p class="pl-4">{{ organization.postalAddress }}</p>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['GetOrganizations', 'CloseModalOrg', 'CloseModalAddOrg', 'GetOrganizationById']),
    Edit(id) {
      this.GetOrganizationById(id);
      this.CloseModalOrg();
    },
    Add() {
      this.CloseModalAddOrg();
    },
  },
  computed: mapGetters(['get_Organizations', 'get_loadingOrganization', 'get_OrganizationError']),
  mounted() {
    this.GetOrganizations();
  },
};
</script>

<style></style>
