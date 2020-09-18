<template>
  <div>
    <div>
      <status />
    </div>
    <div v-if="get_Dependent!=null">
      <dependent />
    </div>
    <div v-if="get_policyHolder!=null">
      <policyHolder />
      <PolicyHolderCoverDetails />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import dependent from "../Dependent/DependentDetails";
import policyHolder from "../PolicyHolder/policyHolderDetail";
import PolicyHolderCoverDetails from "../Covers/PolicyHolderCoverDetails";
import status from "../Claims/ClaimStatus";
export default {
  components: {
    dependent,
    policyHolder,
    PolicyHolderCoverDetails,
    status,
  },
  methods: {
    ...mapActions([
      "GetDependentById",
      "GetPolicyHolderById",
      "GetClaimStatus",
      "GetFuneralClaimById",
      "GetClaimOwner",
    ]),
  },
  computed: mapGetters([
    "get_policyHolder",
    "get_Dependent",
    "get_funeralClaim",
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