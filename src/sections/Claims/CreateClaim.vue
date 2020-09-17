<template>
  <div v-if="get_funeralClaim!=null">
    <v-dialog width="400" persistent v-model="get_createClaimDialog">
      <v-card>
        <v-card-title>
          CREAT CLAIM
          <v-spacer></v-spacer>
          <v-btn icon color="pink darken-3" @click="CloseCreateClaimDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="formAdd" @submit.prevent="addClaim()">
            <v-alert type="error" v-if="get_funeralClaimError!=null">{{get_funeralClaimError}}</v-alert>
            <v-overflow-btn
              label="Select Process"
              target="#newPolicy"
              width="auto"
              :items="get_processes"
              v-model="get_funeralClaim.claimBase.processId"
              item-value="id"
              :loading="get_loadingProcess"
              :rules="[rules.required]"
              item-text="name"
            ></v-overflow-btn>
            <v-menu
              ref="menuAppDate"
              v-model="applicationaDateMenu"
              :close-on-content-click="false"
              :return-value.sync="get_funeralClaim.claimBase.applicationDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="get_funeralClaim.claimBase.applicationDate"
                  label="Application date"
                  prepend-icon="mdi-calendar"
                  readonly
                  :rules="[rules.required]"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="get_funeralClaim.claimBase.applicationDate"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="applicationaDateMenu = false">Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuAppDate.save(get_funeralClaim.claimBase.applicationDate)"
                >OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="addClaim()" :loading="get_loadingFClaims" depressed>Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    applicationaDateMenu: false,
    rules: {
      required: (v) => !!v || "This fieled is required",
    },
  }),
  methods: {
    ...mapActions(["GetProcesses", "CloseCreateClaimDialog", "AddClaim"]),
    addClaim() {
      if (this.$refs.formAdd.validate()) {
        this.AddClaim();
      }
    },
  },
  computed: mapGetters([
    "get_processes",
    "get_funeralClaim",
    "get_createClaimDialog",
    "get_loadingProcess",
    "get_funeralClaimError",
    "get_loadingFClaims",
  ]),
  mounted() {
    this.GetProcesses();
  },
};
</script>