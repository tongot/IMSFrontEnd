<template>
  <div>
    <v-dialog width="300" v-model="policyType">
      <v-card>
        <v-card-title>
          Select policy Type
          <v-spacer></v-spacer>
          <v-btn icon @click="policyType=!policyType">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="get_hasPolicy != null" type="error">
            Already has a policy
            <v-btn
              :to="{ name: 'funeralDetail', params: { PolicyId: get_hasPolicy } }"
              small
              text
            >go to policy</v-btn>
          </v-alert>
          <v-btn
            color="primary"
            :loading="get_loadingFPolicy"
            block
            @click="CheckPolicyExist()"
          >funeral Cover</v-btn>
          <v-btn color="primary" block class="mt-1" disabled>motor</v-btn>
          <v-btn color="primary" class="mt-1" block disabled>non motor</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card outlined class="mb-1">
      <v-card-actions>
        <v-overflow-btn
          dense
          hint="Status"
          :persistent-hint="true"
          target="#newPolicy"
          width="auto"
          :items="getStatus()"
          item-value="value"
          item-text="name"
          v-model="search.status"
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
              <th class="text-left">Salutation</th>
              <th class="text-left">Name</th>
              <th class="text-left">Surname</th>
              <th class="text-left">Gender</th>
              <th class="text-left">Id Number</th>
              <th class="text-left">Branch</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="holder in get_policyHolders" :key="holder.id">
              <td>{{ holder.salutation }}</td>
              <td>{{ holder.firstName + ' ' + holder.middleName }}</td>
              <td>{{ holder.lastName }}</td>
              <td>{{ holder.gender }}</td>

              <td>{{ holder.idNumber }}</td>
              <td>{{ holder.branch }}</td>
              <td>
                <v-btn
                  small
                  :to="{ name: 'policyholderDetail', params: { policyHolderId: holder.id } }"
                  icon
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn
                  small
                  @click="GetPolicyHolder(holder.id, holder.firstName + ' ' + holder.lastName)"
                  icon
                >
                  <v-icon left>mdi-file-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="search.page"
          @input="searchBtn()"
          :length="get_policyHolderPages"
          circle
        ></v-pagination>
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
import enums from "../../Dictionary/Dictionary";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    policyType: false,
    pageSizes: [5, 10, 20, 50, 100],
    search: {
      page: 1,
      search: "",
      status: "",
      size: 10,
    },
  }),
  methods: {
    searchBtn() {
      this.GetPolicyHolders(this.search);
    },
    getGender(g) {
      return enums.gender[g];
    },
    getTitle(t) {
      return enums.title[t];
    },
    GetPolicyHolder(id, name) {
      this.policyType = true;
      const holder = {
        id: id,
        name: name,
      };
      this.setPolicyHolderId(holder);
    },
    getStatus() {
      return enums.personState;
    },
    CheckPolicyExist() {
      this.HasPolicy();
      setTimeout(() => {
        if (this.get_hasPolicy == null) {
          this.policyType = false;
        }
      }, 500);
    },
    ...mapActions([
      "GetPolicyHolders",
      "GetPolicyHolderById",
      "setPolicyHolderId",
      "HasPolicy",
    ]),
  },
  computed: mapGetters([
    "get_policyHolders",
    "get_hasPolicy",
    "get_loadingFPolicy",
    "get_policyHolderPages",
  ]),
  mounted() {
    this.GetPolicyHolders(this.search);
  },
};
</script>

<style></style>
