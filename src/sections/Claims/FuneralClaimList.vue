<template>
  <div>
    <v-card outlined class="mb-1">
      <v-card-actions v-if="get_user!=null">
        <v-overflow-btn
          v-if="get_user.organizationType=='super'"
          hint="Organization"
          :persistent-hint="true"
          dense
          target="#newPolicy"
          :items="get_Organizations"
          v-model="search.orgId"
          item-value="id"
          item-text="name"
          @
          @click="LoadOrganizations()"
          @change="searchBtn()"
        ></v-overflow-btn>
        <v-spacer></v-spacer>
        <v-text-field class="mt-6" v-model="search.search" placeholder="Claim number/Last name"></v-text-field>
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
              <th class="text-left">Claim Number</th>
              <th class="text-left">Application Date</th>
              <th class="text-left">Deceased</th>

              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="claim in get_funeralClaims" :key="claim.claimId">
              <td>
                <v-chip small class="black white--text">{{ claim.status }}</v-chip>
              </td>
              <td>{{ claim.surname }}</td>
              <td>{{ claim.name }}</td>
              <td>{{ claim.claimNumber }}</td>
              <td>{{ claim.applicationDate }}</td>
              <td>{{ claim.deceaseType }}</td>
              <td>
                <v-btn @click="Details(claim.claimId)" color="success" small depressed>details</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-pagination v-model="search.page" :length="get_FClaimsPages" circle @input="searchBtn()"></v-pagination>
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
    LoadOrganizations() {
      this.GetOrganizations();
    },
    searchBtn() {
      this.GetFuneralClaims(this.search);
    },
    status(name) {
      if (name == "Active") {
        return "success";
      }
    },
    Details(claim) {
      this.CreateClaim(claim);
      this.$router.push({
        name: "funeralClaimDetail",
        params: { claimId: claim },
      });
    },
    ...mapActions(["GetFuneralClaims", "GetOrganizations", "CreateClaim"]),
  },
  computed: mapGetters([
    "get_funeralClaims",
    "get_loadingFClaims",
    "get_Organizations",
    "get_FClaimsPages",
    "get_user",
  ]),
  created() {
    this.GetFuneralClaims(this.search);
  },
};
</script>

<style>
</style>