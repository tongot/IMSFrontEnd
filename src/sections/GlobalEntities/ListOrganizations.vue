<template>
  <div class="ma-1">
    <addUser />
    <editUser />
    <v-btn :loading="get_loadingOrganization" @click.prevent="Add()" text>
      <v-icon left>mdi-plus</v-icon>Organization
    </v-btn>
    <v-row>
      <v-col md="12" sm="12">
        <v-expansion-panels>
          <v-expansion-panel
            @click="GetAdminsForOrganization(organization.id)"
            v-for="organization in get_Organizations"
            :key="organization.id"
          >
            <v-expansion-panel-header>{{ organization.name }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col md="6" sm="12">
                  <v-card class="ma-2" outlined>
                    <v-card-title>
                      {{ organization.name }}
                      <v-spacer></v-spacer>
                      <v-btn
                        :loading="get_loadingOrganization"
                        small
                        @click.prevent="Edit(organization.id)"
                        icon
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-row>
                      <v-col md="6" sm="12">
                        <v-subheader>Phone</v-subheader>
                        <p class="pl-4">{{ organization.phone }}</p>
                        <v-subheader>Email</v-subheader>
                        <p class="pl-4">{{ organization.email }}</p>
                        <v-subheader>Contact Person</v-subheader>
                        <p class="pl-4">{{ organization.contactPerson }}</p>
                      </v-col>
                      <v-col md="6" sm="12">
                        <v-subheader>Contact Person Phone</v-subheader>
                        <p class="pl-4">{{ organization.contactPersonNumber }}</p>
                        <v-subheader>Physical Address</v-subheader>
                        <p class="pl-4">{{ organization.physicalAddress }}</p>
                        <v-subheader>Postal Address</v-subheader>
                        <p class="pl-4">{{ organization.postalAddress }}</p>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col md="6" sm="12">
                  <v-card flat>
                    <v-btn
                      small
                      text
                      :loading="get_loadingRoles"
                      @click="openAdduser(organization)"
                    >
                      <v-icon>mdi-plus</v-icon>Admins
                    </v-btn>
                    <v-card-text>
                      <v-list dense>
                        <v-divider></v-divider>
                        <v-list-item-group>
                          <v-list-item v-for="admin in get_adminForOrg" :key="admin.id">
                            <v-list-item-title>{{admin.surname+" "+admin.name}}</v-list-item-title>
                            <v-btn @click="SetAdminUserEdit(admin)" icon>
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-tooltip bottom>
                              <template v-slot:activator="{on,attrs}">
                                <v-btn color="red" v-bind="attrs" v-on="on" icon>
                                  <v-icon>mdi-key</v-icon>
                                </v-btn>
                              </template>
                              <span>Reset password</span>
                            </v-tooltip>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import addUser from "../../sections/UserAccounts/AddSuperUserForOrg";
import editUser from "../../sections/UserAccounts/EditOrgAdmin";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    addUser,
    editUser,
  },
  methods: {
    ...mapActions([
      "GetOrganizations",
      "OpenAddOrgUserDialog",
      "CloseModalOrg",
      "CloseModalAddOrg",
      "GetOrganizationById",
      "setCurrentOrganization",
      "GetAdminsForOrganization",
      "SetAdminUserEdit",
    ]),
    Edit(id) {
      this.GetOrganizationById(id);
      this.CloseModalOrg();
    },
    openAdduser(org) {
      this.OpenAddOrgUserDialog();
      this.setCurrentOrganization(org);
    },
    openEdituser() {},
    Add() {
      this.CloseModalAddOrg();
    },
  },
  computed: mapGetters([
    "get_Organizations",
    "get_loadingOrganization",
    "get_OrganizationError",
    "get_adminForOrg",
    "get_loadingRoles",
  ]),
  mounted() {
    this.GetOrganizations();
  },
};
</script>

<style></style>
