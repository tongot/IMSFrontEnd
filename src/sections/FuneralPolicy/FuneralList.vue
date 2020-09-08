<template>
  <div>
    <v-card outlined class="mb-1">
      <v-card-actions>
        <v-overflow-btn
          hint="Organization"
          :persistent-hint="true"
          dense
          target="#newPolicy"
          :items="get_Organizations"
          v-model="search.orgId"
          item-value="id"
          item-text="name"
          @change="searchBtn()"
        ></v-overflow-btn>
        <v-spacer></v-spacer>
        <v-text-field class="mt-6" v-model="search.search" placeholder="Name/Suraname/Id Number"></v-text-field>
        <v-btn outlined @click="searchBtn()" class="ml-2">search</v-btn>
      </v-card-actions>
    </v-card>
    <v-card outlined>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-pagination v-model="search.page" :length="get_FPolicyPages" circle @input="searchBtn()"></v-pagination>
        <v-spacer></v-spacer>
        <v-overflow-btn
          reverse
          hint="Page sise"
          :persistent-hint="true"
          dense
          target="#newPolicy"
          :items="pageSizes"
          v-model="search.size"
          @change="searchBtn()"
        ></v-overflow-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    pageSizes: [5, 10, 20, 50, 100],
    search: {
      page: 1,
      search: "",
      status: "",
      size: 10,
      orgId: "",
    },
  }),
  methods: {
    searchBtn() {
      this.GetFuneralPolicies(this.search);
    },
    status(name) {
      if (name == "Active") {
        return "success";
      }
    },
    Details(id) {
      this.$router.push({ name: "funeralDetail", params: { PolicyId: id } });
    },
    ...mapActions(["GetFuneralPolicies", "GetPolicyById", "GetOrganizations"]),
  },
  computed: mapGetters([
    "get_funeralPolicies",
    "get_loadingFPolicy",
    "get_Organizations",
    "get_FPolicyPages",
  ]),
  mounted() {
    this.GetFuneralPolicies(this.search);
    this.GetOrganizations();
  },
};
</script>

<style></style>
