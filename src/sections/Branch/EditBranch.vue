<template>
  <div v-if="get_Branch != null">
    <v-dialog v-model="modalAdd" persistent width="500">
      <v-form ref="formAdd">
        <v-card>
          <v-card-title
            >Add Branch
            <v-spacer></v-spacer>
            <v-btn icon :to="{ name: 'branchList' }">
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
              v-model="get_Branch.name"
            >
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Region"
              v-model="get_Branch.region"
            >
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Phone"
              v-model="get_Branch.phone"
            >
            </v-text-field>
            <v-text-field
              :rules="[rules.required, rules.email]"
              label="Email"
              v-model="get_Branch.email"
            >
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Contact Person Name"
              v-model="get_Branch.contactPerson"
            >
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Contact Person Number"
              v-model="get_Branch.contactPersonNumber"
            >
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Postal Address"
              v-model="get_Branch.postalAddress"
            >
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Physical Address"
              v-model="get_Branch.physicalAddress"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="get_loadBranch" depressed @click.prevent="Edit()">
              <v-icon left> mdi-content-save </v-icon>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    modalAdd: false,
    rules: {
      required: (v) => !!v || "This fieled is required",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    ...mapActions(["GetBranchById", "EditBranch"]),
    Edit() {
      if (this.$refs.formAdd.validate()) {
        this.EditBranch(this.get_Branch);
      }
    },
  },
  computed: mapGetters([
    "get_Branch",
    "get_user",
    "get_loadBranch",
    "get_errorBranch",
  ]),
  mounted() {
    this.modalAdd = true;
    this.GetBranchById(this.$route.params.branchId);
  },
};
</script>


<style>
</style>