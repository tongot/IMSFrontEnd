<template>
  <div>
    <beneficiary />
    <v-dialog width="1000" persistent v-model="get_ModalAddNewFPolicy">
      <v-card>
        <v-card-title>
          {{get_nameOfHolder}}
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseModalAddNewFPolicy()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form id="newPolicy" ref="formAdd">
            <v-alert type="error" v-if="get_funeralPolicyErrors!= null">{{get_funeralPolicyErrors}}</v-alert>
            <v-row>
              <v-col md="6" sm="12">
                <v-overflow-btn
                  label="Select underwriter"
                  target="#newPolicy"
                  width="auto"
                  :items="get_Underwriters"
                  v-model="Policy.underwriterId"
                  item-value="id"
                  :loading="get_loadingUnderwriter"
                  :rules="[rules.required]"
                  item-text="name"
                ></v-overflow-btn>

                <v-menu
                  ref="menuEdate"
                  v-model="effectiveDate"
                  :close-on-content-click="false"
                  :return-value.sync="Policy.effectiveDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="Policy.effectiveDate"
                      label="Effective Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="[rules.required]"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="Policy.effectiveDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menuEdate.save(Policy.effectiveDate)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="menuAdata"
                  v-model="applicationDate"
                  :close-on-content-click="false"
                  :return-value.sync="Policy.applicationDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="Policy.applicationDate"
                      label="Application Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="[rules.required]"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="Policy.applicationDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="applicationDate = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menuAdata.save(Policy.applicationDate)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="menuJdata"
                  v-model="joiningDate"
                  :close-on-content-click="false"
                  :return-value.sync="Policy.joiningDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="Policy.joiningDate"
                      label="Joining Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="[rules.required]"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="Policy.joiningDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="joiningDate = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menuJdata.save(Policy.joiningDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-overflow-btn
                  label="Select Process"
                  target="#newPolicy"
                  width="auto"
                  :items="get_processes"
                  v-model="Policy.processId"
                  item-value="id"
                  :loading="get_loadingProcess"
                  :rules="[rules.required]"
                  item-text="name"
                ></v-overflow-btn>
              </v-col>
              <v-col md="6" sm="12">
                <v-text-field
                  v-model="Policy.cover.payPoint"
                  :rules="[rules.required]"
                  label="Pay point"
                ></v-text-field>
                <v-menu
                  ref="menuDJC"
                  v-model="dJCDate"
                  :close-on-content-click="false"
                  :return-value.sync="Policy.cover.dJCDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="Policy.cover.dJCDate"
                      label="DJC Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="[rules.required]"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="Policy.cover.dJCDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menuDJC.save(Policy.cover.dJCDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="menuDJF"
                  v-model="dJFDate"
                  :close-on-content-click="false"
                  :return-value.sync="Policy.cover.dJFDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="Policy.cover.dJFDate"
                      label="Application Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="[rules.required]"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="Policy.cover.dJFDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dJFDate = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menuDJF.save(Policy.cover.dJFDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="menuDPS"
                  v-model="dPSDate"
                  :close-on-content-click="false"
                  :return-value.sync="Policy.cover.dPSDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="Policy.cover.dPSDate"
                      label="Application Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="[rules.required]"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="Policy.cover.dPSDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dPSDate = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menuDPS.save(Policy.cover.dPSDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-overflow-btn
                  label="Select package"
                  target="#newPolicy"
                  width="auto"
                  :items="get_Packages"
                  v-model="Policy.cover.packageId"
                  item-value="id"
                  :loading="get_loadingPackage"
                  :rules="[rules.required]"
                  item-text="name"
                ></v-overflow-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :loading="get_loadingFPolicy" depressed @click="OpenBeneficiaryDialog()">
            <span v-if="get_beneficiary!=null">Amend Beneficiary</span>
            <span v-if="get_beneficiary==null">Add Beneficiary</span>
          </v-btn>
          <v-btn
            :loading="get_loadingFPolicy"
            v-if="get_beneficiary!=null"
            depressed
            color="success"
            @click="savePolicy()"
          >Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import beneficiary from "../FuneralPolicy/NewBeneficiary";
export default {
  components: {
    beneficiary,
  },
  data: () => ({
    dJCDate: false,
    dJFDate: false,
    dPSDate: false,
    applicationDate: false,
    joiningDate: false,
    effectiveDate: false,
    Policy: {
      effectiveDate: "",
      applicationDate: "",
      joiningDate: "",
      underwriterId: "",
      organizationId: "",
      processId: "",
      cover: {
        payPoint: "",
        dJCDate: "",
        dJFDate: "",
        dPSDate: "",
        packageId: "",
        effectiveDate: "",
      },
    },
    rules: {
      required: (v) => !!v || "this field is required",
    },
  }),
  methods: {
    ...mapActions([
      "CloseModalAddNewFPolicy",
      "GetUnderwriters",
      "GetOrganizations",
      "GetProcesses",
      "GetPackages",
      "AddFuneralPolicy",
      "OpenBeneficiaryDialog",
    ]),
    savePolicy() {
      if (this.$refs.formAdd.validate()) {
        this.Policy.cover.effectiveDate = this.Policy.effectiveDate;
        this.Policy.organizationId = this.get_user.organizationId;
        this.AddFuneralPolicy(this.Policy);
      }
    },
  },
  computed: mapGetters([
    "get_loadingUnderwriter",
    "get_Underwriters",
    "get_ModalAddNewFPolicy",
    "get_loadingOrganization",
    "get_loadingProcess",
    "get_processes",
    "get_nameOfHolder",
    "get_Packages",
    "get_loadingPackage",
    "get_loadingFPolicy",
    "get_funeralPolicyErrors",
    "get_user",
    "get_beneficiary",
  ]),
  watch: {
    get_ModalAddNewFPolicy(newV, oldV) {
      if (newV && !oldV) {
        this.GetUnderwriters();
        this.GetProcesses();
        this.GetPackages();
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>