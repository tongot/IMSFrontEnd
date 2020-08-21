<template>
  <div>
    <v-dialog width="300" v-model="policyType">
      <v-card>
        <v-card-title>Select policy Type</v-card-title>
        <v-card-text>
          <v-alert v-if="get_hasPolicy != null" type="error">
            Already has a policy
            <v-btn :to="{ name: 'funeralDetail', params: { PolicyId: get_hasPolicy } }" small text>go to policy</v-btn>
          </v-alert>
          <v-btn color="primary" :loading="get_loadingFPolicy" block @click="CheckPolicyExist()">
            funeral Cover
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
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
              <td>
                {{ holder.salutation }}
              </td>
              <td>{{ holder.firstName + ' ' + holder.middleName }}</td>
              <td>{{ holder.lastName }}</td>
              <td>{{ holder.gender }}</td>

              <td>{{ holder.idNumber }}</td>
              <td>{{ holder.branch }}</td>
              <td>
                <v-btn small :to="{ name: 'policyholderDetail', params: { policyHolderId: holder.id } }" icon>
                  <v-icon>
                    mdi-eye
                  </v-icon>
                </v-btn>
                <v-btn small @click="GetPolicyHolder(holder.id)" icon>
                  <v-icon left>
                    mdi-file-outline
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import enums from '../../Dictionary/Dictionary';
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    policyType: false,
  }),
  methods: {
    getGender(g) {
      return enums.gender[g];
    },
    getTitle(t) {
      return enums.title[t];
    },
    GetPolicyHolder(id) {
      this.policyType = true;
      this.setPolicyHolderId(id);
    },
    CheckPolicyExist() {
      this.HasPolicy();
    },
    ...mapActions(['GetPolicyHolders', 'GetPolicyHolderById', 'setPolicyHolderId', 'HasPolicy']),
  },
  computed: mapGetters(['get_policyHolders', 'get_hasPolicy', 'get_loadingFPolicy']),
  mounted() {
    this.GetPolicyHolders();
  },
};
</script>

<style></style>
