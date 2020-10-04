<template>
  <div>
    <div>
      <v-dialog v-model="modalAdd" persistent width="500">
        <v-form ref="formAdd">
          <v-card>
            <v-card-title
              >Add Branch
              <v-spacer></v-spacer>
              <v-btn icon @click="modalAdd = !modalAdd">
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-alert
                type="error"
                dismissible
                v-if="get_errorBranch != null"
              ></v-alert>
              <v-text-field
                :rules="[rules.required]"
                label="Name"
                v-model="branch.name"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required]"
                label="Region"
                v-model="branch.region"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required]"
                label="Phone"
                v-model="branch.phone"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required, rules.email]"
                label="Email"
                v-model="branch.email"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required]"
                label="Contact Person Name"
                v-model="branch.contactPerson"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required]"
                label="Contact Person Number"
                v-model="branch.contactPersonNumber"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required]"
                label="Postal Address"
                v-model="branch.postalAddress"
              >
              </v-text-field>
              <v-text-field
                :rules="[rules.required]"
                label="Physical Address"
                v-model="branch.physicalAddress"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :loading="get_loadBranch"
                depressed
                @click.prevent="AddNew()"
              >
                <v-icon left> mdi-content-save </v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </div>

    <div class="ma-1">
      <v-btn
        :loading="get_loadBranch"
        @click.prevent="modalAdd = !modalAdd"
        text
      >
        <v-icon left> mdi-plus </v-icon>
        Branch
      </v-btn>
      <v-expansion-panels>
        <v-expansion-panel v-for="branch in get_Branches" :key="branch.id">
          <v-expansion-panel-header>{{ branch.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="ma-2" outlined>
              <v-card-title>
                {{ branch.name }}
                <v-spacer></v-spacer>
                <v-btn
                  :loading="get_loadBranch"
                  :to="{ name: 'branchEdit', params: { branchId: branch.id } }"
                  icon
                >
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
              </v-card-title>
              <v-subheader>Region</v-subheader>
              <p class="pl-4">{{ branch.region }}</p>
              <v-subheader>Phone</v-subheader>
              <p class="pl-4">{{ branch.phone }}</p>
              <v-subheader>Email</v-subheader>
              <p class="pl-4">{{ branch.email }}</p>
              <v-subheader>Contact Person</v-subheader>
              <p class="pl-4">{{ branch.contactPerson }}</p>
              <v-subheader>Contact Person Phone</v-subheader>
              <p class="pl-4">{{ branch.contactPersonNumber }}</p>
              <v-subheader>Physical Address</v-subheader>
              <p class="pl-4">{{ branch.physicalAddress }}</p>
              <v-subheader>Postal Address</v-subheader>
              <p class="pl-4">{{ branch.postalAddress }}</p>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    modalAdd: false,
    branch: {
      name: "",
      region: "",
      phone: "",
      email: "",
      contactPerson: "",
      contactPersonNumber: "",
      postalAddress: "",
      physicalAddress: "",
      organizationId: null,
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
    ...mapActions(["GetBranches", "AddBranch", "SetEditBranch"]),
    AddNew() {
      if (this.$refs.formAdd.validate()) {
        this.branch.organizationId = this.get_user.organizationId;
        this.AddBranch(this.branch);
      }
    },
    Edit(branch) {
      this.SetEditBranch(branch);
    },
  },
  computed: mapGetters([
    "get_Branches",
    "get_user",
    "get_loadBranch",
    "get_errorBranch",
  ]),
  mounted() {
    this.GetBranches(this.get_user.organizationId);
  },
};
</script>

<style>
</style>