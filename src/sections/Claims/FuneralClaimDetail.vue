<template>
  <div v-if="get_funeralClaim!=null">
    <!--
      edit modal claim 
    -->
    <v-dialog persistent v-model="get_ModalEditClaim" width="1000">
      <v-card>
        <v-form ref="editForm" @submit.prevent="editClaim()">
          <v-card-title>
            Edit claim
            <v-spacer></v-spacer>
            <v-btn @click="CloseModalEditClaim()" small icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-if="get_EditFClaim!=null">
            <v-alert type="error" v-if="get_claimBankError!=null">{{get_claimBankError}}</v-alert>
            <v-row>
              <v-col md="6" cols="12" sm="12">
                <v-card outlined>
                  <v-card-text>
                    <v-textarea
                      placeholder="Cause of death"
                      :rules="[rules.required]"
                      v-model="get_EditFClaim.causeOfDeaeth"
                    ></v-textarea>
                    <v-menu
                      ref="menuAppDate"
                      v-model="applicationaDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="get_EditFClaim.applicationDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="get_EditFClaim.applicationDate"
                          label="Application date"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="[rules.required]"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="get_EditFClaim.applicationDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="applicationaDateMenu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menuAppDate.save(get_EditFClaim.applicationDate)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-menu
                      ref="menuDD"
                      v-model="dateOfDeath"
                      :close-on-content-click="false"
                      :return-value.sync="get_EditFClaim.dateOfDeath"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="get_EditFClaim.dateOfDeath"
                          label="Date Of death"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="[rules.required]"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="get_EditFClaim.dateOfDeath" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="applicationaDateMenu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menuDD.save(get_EditFClaim.dateOfDeath)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="6" cols="12" sm="12">
                <v-card v-if="get_EditFClaim.bankDetail" class="mt-2 pa-2" outlined>
                  <v-card-text>
                    <v-text-field
                      :rules="[rules.required]"
                      label="Bank name"
                      v-model="get_EditFClaim.bankDetail.name"
                    ></v-text-field>
                    <v-text-field
                      :rules="[rules.required]"
                      label="Bank Branch"
                      v-model="get_EditFClaim.bankDetail.branchName"
                    ></v-text-field>
                    <v-text-field
                      :rules="[rules.required]"
                      label="Bank Account"
                      v-model="get_EditFClaim.bankDetail.bankAccount"
                    ></v-text-field>
                    <v-text-field
                      :rules="[rules.required]"
                      label="Full name of holder"
                      v-model="get_EditFClaim.bankDetail.holderName"
                    ></v-text-field>
                    <v-text-field
                      :rules="[rules.required]"
                      label="Payment Method"
                      v-model="get_EditFClaim.bankDetail.paymentMethods"
                    ></v-text-field>
                    <v-checkbox label="Paid" v-model="get_EditFClaim.bankDetail.isSettled"></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="editClaim()" :loading="get_loadingFClaims" depressed>Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <div>
      <status />
    </div>
    <div>
      <v-card class="mt-2" outlined>
        <v-card-title>
          Claim ({{get_funeralClaim.claimNumber}})
          <v-spacer></v-spacer>
          <v-chip>
            Current owner
            <owner />
          </v-chip>
        </v-card-title>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn @click="SetEditClaim(get_funeralClaim)" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-subheader>Application date</v-subheader>
          <p class="pl-4">{{get_funeralClaim.applicationDate}}</p>
        </v-card-text>
      </v-card>
    </div>
    <div v-if="get_funeralClaim!=null">
      <v-card class="mt-2" outlined color="pink darken-3" dark>
        <v-card-title>
          Cause of death
          <v-spacer></v-spacer>
          <v-chip outlined>Date of death: {{get_funeralClaim.dateOfDeath | Date}}</v-chip>
        </v-card-title>
        <v-card-text>{{get_funeralClaim.causeOfDeaeth}}</v-card-text>
      </v-card>
    </div>
    <div>
      <v-card class="mt-2" outlined>
        <v-card-title>
          Banking Details
          <v-spacer></v-spacer>
          <v-btn text v-if="get_funeralClaim.bankDetail==null" :to="{name:'funeralClaimAdd-bank'}">
            <v-icon left>mdi-plus</v-icon>Add Banking Details
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="get_funeralClaim.bankDetail!=null">
            <v-row>
              <v-col md="4" cols="12" sm="12">
                <v-subheader>Bank name</v-subheader>
                <p class="pl-4">{{get_funeralClaim.bankDetail.name}}</p>
                <v-subheader>Branch</v-subheader>
                <p class="pl-4">{{get_funeralClaim.bankDetail.branchName }}</p>
                <v-subheader>Holder</v-subheader>
                <p class="pl-4">{{ get_funeralClaim.bankDetail.holderName }}</p>
              </v-col>
              <v-col md="4" cols="12" sm="12">
                <v-card outlined>
                  <v-card-title></v-card-title>
                  <div class="ma-2">
                    <v-subheader>Account</v-subheader>
                    <p class="pl-4">{{get_funeralClaim.bankDetail.bankAccount}}</p>
                    <v-subheader>Payment method</v-subheader>
                    <p class="pl-4">{{ get_funeralClaim.bankDetail.paymentMethods}}</p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div v-if="get_Dependent!=null">
      <dependent />
    </div>
    <div v-if="get_policyHolder!=null">
      <policyHolder />
      <PolicyHolderCoverDetails />
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import dependent from "../Dependent/DependentDetails";
import policyHolder from "../PolicyHolder/policyHolderDetail";
import PolicyHolderCoverDetails from "../Covers/PolicyHolderCoverDetails";
import status from "../Claims/ClaimStatus";
import owner from "../Claims/ChangeClaimOwner";
export default {
  components: {
    dependent,
    policyHolder,
    PolicyHolderCoverDetails,
    status,
    owner,
  },
  data: () => ({
    applicationaDateMenu: false,
    dateOfDeath: false,
    rules: {
      required: (v) => !!v || "this fieled is required",
    },
  }),
  methods: {
    ...mapActions([
      "GetDependentById",
      "GetPolicyHolderById",
      "GetClaimStatus",
      "GetFuneralClaimById",
      "GetClaimOwner",
      "SetEditClaim",
      "CloseModalEditClaim",
      "EditFClaim",
    ]),
    editClaim() {
      if (this.$refs.editForm.validate()) {
        this.EditFClaim();
      }
    },
  },
  computed: mapGetters([
    "get_policyHolder",
    "get_Dependent",
    "get_funeralClaim",
    "get_EditFClaim",
    "get_claimBankError",
    "get_ModalEditClaim",
    "get_loadingFClaims",
  ]),
  mounted() {
    this.GetFuneralClaimById(this.$route.params.claimId).then(() => {
      if (this.get_funeralClaim != null) {
        if (this.get_funeralClaim.deceaseType == "member") {
          this.GetPolicyHolderById(this.get_funeralClaim.deceased);
        } else {
          this.GetDependentById(this.get_funeralClaim.deceased);
        }

        const status = {
          statusId: this.get_funeralClaim.statusId,
          claimId: this.get_funeralClaim.claimId,
        };

        this.GetClaimStatus(status);
        this.GetClaimOwner(this.get_funeralClaim.owner);
      }
    });
  },
};
</script>
<style>
</style>