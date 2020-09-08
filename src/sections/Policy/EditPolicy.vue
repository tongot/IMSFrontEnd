<template>
  <div>
    <v-form @submit.prevent="editCover" ref="formEdit">
      <v-card>
        <v-card-title>Edit Policy</v-card-title>
        <v-card-text>
          <v-alert type="error" v-if="get_policyError!=null">{{get_policyError}}</v-alert>
          <v-menu
            ref="menuDJC"
            v-model="effectiveDate"
            :close-on-content-click="false"
            :return-value.sync="get_EditPolicy.effectiveDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="get_EditPolicy.effectiveDate"
                label="DJC Date"
                prepend-icon="mdi-calendar"
                readonly
                :rules="[rules.required]"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="get_EditPolicy.effectiveDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menuDJC.save(get_EditPolicy.effectiveDate)"
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menuDJF"
            v-model="applicationDate"
            :close-on-content-click="false"
            :return-value.sync="get_EditPolicy.applicationDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="get_EditPolicy.applicationDate"
                label="DJF Date"
                prepend-icon="mdi-calendar"
                readonly
                :rules="[rules.required]"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="get_EditPolicy.applicationDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="applicationDate = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menuDJF.save(get_EditPolicy.applicationDate)"
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menuDPS"
            v-model="joiningDate"
            :close-on-content-click="false"
            :return-value.sync="get_EditPolicy.joiningDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="get_EditPolicy.joiningDate"
                label="DPS Date"
                prepend-icon="mdi-calendar"
                readonly
                :rules="[rules.required]"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="get_EditPolicy.joiningDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="joiningDate = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menuDPS.save(get_EditPolicy.joiningDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-overflow-btn
            label="Select Organization"
            target="#newPolicy"
            width="auto"
            :items="get_Organizations"
            v-model="get_EditPolicy.organization.id"
            item-value="id"
            :loading="get_loadingOrganization"
            :rules="[rules.required]"
            item-text="name"
          ></v-overflow-btn>
          <v-overflow-btn
            label="Select Underwriter"
            target="#newPolicy"
            width="auto"
            :items="get_Underwriters"
            v-model="get_EditPolicy.underwriter.id"
            item-value="id"
            :loading="get_loadingUnderwriter"
            :rules="[rules.required]"
            item-text="name"
          ></v-overflow-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="editPolicy()" text>edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    effectiveDate: false,
    applicationDate: false,
    joiningDate: false,
    rules: {
      required: (v) => !!v || "This fieled is required",
    },
  }),
  methods: {
    ...mapActions(["GetOrganizations", "GetUnderwriters", "UpdatePolicy"]),
    editPolicy() {
      if (this.$refs.formEdit.validate()) {
        this.UpdatePolicy();
      }
    },
  },
  computed: mapGetters([
    "get_EditPolicy",
    "get_Organizations",
    "get_loadingOrganization",
    "get_Underwriters",
    "get_loadingUnderwriter",
    "get_policyError",
  ]),
  mounted() {
    this.GetOrganizations();
    this.GetUnderwriters();
  },
};
</script>

<style>
</style>