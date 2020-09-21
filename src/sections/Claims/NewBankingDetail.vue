<template>
  <v-dialog persistent v-model="modalBank" width="500">
    <v-card>
      <v-form ref="addForm" @submit.prevent="addBank()">
        <v-card-title>
          Enter Banking Details
          <v-spacer></v-spacer>
          <v-btn :to="{name: 'funeralClaimDetail'}" color="error" small icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field :rules="[rules.required]" label="Bank name" v-model="bank.name"></v-text-field>
          <v-text-field :rules="[rules.required]" label="Bank Branch" v-model="bank.branchName"></v-text-field>
          <v-text-field :rules="[rules.required]" label="Bank Account" v-model="bank.bankAccount"></v-text-field>
          <v-text-field
            :rules="[rules.required]"
            label="Full name of holder"
            v-model="bank.holderName"
          ></v-text-field>
          <v-text-field
            :rules="[rules.required]"
            label="Payment Method"
            v-model="bank.paymentMethods"
          ></v-text-field>
          <v-checkbox label="Paid" v-model="bank.isSettled"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="addBank()" :loading="get_loadingFClaims" depressed>Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    modalBank: false,
    bank: {
      name: "",
      bankAccount: "",
      branchName: "",
      holderName: "",
      claimId: null,
      paymentMethods: "",
      isSettled: false,
      statusId: null,
    },
    rules: {
      required: (v) => !!v || "this fieled is required",
    },
  }),
  methods: {
    ...mapActions(["AddClaimBanking"]),
    addBank() {
      if (
        this.$refs.addForm.validate() &&
        this.get_funeralClaim.bankDetail == null
      ) {
        this.bank.statusId = this.get_funeralClaim.statusId;
        this.AddClaimBanking(this.bank);
      }
    },
  },
  computed: mapGetters([
    "get_claimBankError",
    "get_loadingFClaims",
    "get_funeralClaim",
  ]),
  mounted() {
    this.bank.claimId = this.$route.params.claimId;
    if (this.bank.claimId != null) {
      this.modalBank = true;
    }
  },
};
</script>

<style>
</style>