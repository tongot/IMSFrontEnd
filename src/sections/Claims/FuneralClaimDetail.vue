<template>
  <div>
    <div>
      <statuses />
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
import statuses from "../../components/States";
export default {
  components: {
    dependent,
    policyHolder,
    PolicyHolderCoverDetails,
    statuses,
  },
  methods: {
    ...mapActions([
      "GetDependentById",
      "GetPolicyHolderById",
      "SetStateType",
      "GetStatus",
    ]),
  },
  computed: mapGetters([
    "get_policyHolder",
    "get_Dependent",
    "get_funeralClaim",
  ]),
  mounted() {
    this.SetStateType("claim");
    if (this.$route.params.deceased == "member") {
      this.GetPolicyHolderById(this.$route.params.claimOwnerId);
    }
  },
};
</script>
<style>
</style>