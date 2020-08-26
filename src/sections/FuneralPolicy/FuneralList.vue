<template>
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Status</th>
            <th class="text-left">Name</th>
            <th class="text-left">Surname</th>
            <th class="text-left">Policy Number</th>

            <th class="text-left">Effective Date</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr @click="Details(policy.id)" v-for="policy in get_funeralPolicies" :key="policy.id">
            <td>
              <v-chip small :class="status(policy.stateName)">{{ policy.stateName }}</v-chip>
            </td>
            <td>{{ policy.policyHolder.firstName }}</td>
            <td>{{ policy.policyHolder.lastName }}</td>
            <td>{{ policy.policyNumber }}</td>

            <td>{{ policy.effectiveDate }}</td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    status(name) {
      if (name == "Active") {
        return "success";
      }
    },
    Details(id) {
      this.$router.push({ name: "funeralDetail", params: { PolicyId: id } });
    },
    ...mapActions(["GetFuneralPolicies", "GetPolicyById"]),
  },
  computed: mapGetters(["get_funeralPolicies", "get_loadingFPolicy"]),
  mounted() {
    this.GetFuneralPolicies();
  },
};
</script>

<style></style>
