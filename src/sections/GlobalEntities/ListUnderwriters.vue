<template>
  <div>
    <div class="ma-1">
      <v-btn :loading="get_loadingUnderwriter" @click.prevent="Add()" text>
        <v-icon left> mdi-plus </v-icon>
        Underwriter
      </v-btn>
      <v-row>
        <v-col
          md="4"
          sm="12"
          v-for="underwriter in get_Underwriters"
          :key="underwriter.id"
        >
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>{{
                underwriter.name
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="ma-2" outlined>
                  <v-card-title>
                    {{ underwriter.name }}
                    <v-spacer></v-spacer>
                    <v-btn
                      :loading="get_loadingUnderwriter"
                      @click.prevent="Edit(underwriter.id)"
                      icon
                    >
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-subheader>Commission</v-subheader>
                  <p class="pl-4">{{ underwriter.commission }}</p>
                  <v-subheader>Phone</v-subheader>
                  <p class="pl-4">{{ underwriter.phone }}</p>
                  <v-subheader>Email</v-subheader>
                  <p class="pl-4">{{ underwriter.email }}</p>
                  <v-subheader>Contact Person</v-subheader>
                  <p class="pl-4">{{ underwriter.contactPerson }}</p>
                  <v-subheader>Contact Person Phone</v-subheader>
                  <p class="pl-4">{{ underwriter.contactPhoneNumber }}</p>
                  <v-subheader>Physical Address</v-subheader>
                  <p class="pl-4">{{ underwriter.physicalAddress }}</p>
                  <v-subheader>Postal Address</v-subheader>
                  <p class="pl-4">{{ underwriter.postalAddress }}</p>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions([
      "GetUnderwriters",
      "CloseModal",
      "CloseModalAdd",
      "GetUnderwriterById",
    ]),
    Edit(id) {
      this.GetUnderwriterById(id);
      this.CloseModal();
    },
    Add() {
      this.CloseModalAdd();
    },
  },
  computed: mapGetters([
    "get_Underwriters",
    "get_loadingUnderwriter",
    "get_UnderwriterError",
  ]),
  mounted() {
    this.GetUnderwriters();
  },
};
</script>

<style></style>
