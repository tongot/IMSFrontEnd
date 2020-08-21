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
          <tr v-for="policy in get_funeralPolicies" :key="policy.id">
            <td>
              <v-chip small="" :class="status(policy.stateName)">
                {{ policy.stateName }}
              </v-chip>
            </td>
            <td>{{ policy.policyHolder.firstName }}</td>
            <td>{{ policy.policyHolder.lastName }}</td>
            <td>{{ policy.policyNumber }}</td>

            <td>{{ policy.effectiveDate }}</td>
            <td>
              <v-btn small :to="{ name: 'funeralDetail', params: { PolicyId: policy.id } }" icon>
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  methods: {
    status(name) {
      if (name == 'Active') {
        return 'success';
      }
    },
    ...mapActions(['GetFuneralPolicies', 'GetPolicyById']),
  },
  computed: mapGetters(['get_funeralPolicies', 'get_loadingFPolicy']),
  mounted() {
    this.GetFuneralPolicies();
  },
};
</script>

<style></style>
