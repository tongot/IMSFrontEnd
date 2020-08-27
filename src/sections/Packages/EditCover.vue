<template>
  <div>
    <v-dialog width="500" persistent v-model="get_ModalEditCover">
      <v-form @submit.prevent="editCover" ref="fromAdd">
        <v-card v-if="get_EditCover!=null">
          <v-card-title>
            Cover Details
            <v-spacer></v-spacer>
            <v-btn @click="CloseModalEditCover()" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" v-if="get_packagesError!=null">{{get_packagesError}}</v-alert>
            <v-text-field
              v-model="get_EditCover.payPoint"
              :rules="[rules.required]"
              label="Pay point"
            ></v-text-field>
            <v-menu
              ref="menuEdate"
              v-model="effectiveDate"
              :close-on-content-click="false"
              :return-value.sync="get_EditCover.effectiveDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="get_EditCover.effectiveDate"
                  label="Effective Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  :rules="[rules.required]"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="get_EditCover.effectiveDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuEdate.save(get_EditCover.effectiveDate)"
                >OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="menuDJC"
              v-model="djcDate"
              :close-on-content-click="false"
              :return-value.sync="get_EditCover.djcDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="get_EditCover.djcDate"
                  label="DJC Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  :rules="[rules.required]"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="get_EditCover.djcDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="effectiveDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menuDJC.save(get_EditCover.djcDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="menuDJF"
              v-model="djfDate"
              :close-on-content-click="false"
              :return-value.sync="get_EditCover.djfDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="get_EditCover.djfDate"
                  label="DJF Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  :rules="[rules.required]"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="get_EditCover.djfDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="djfDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menuDJF.save(get_EditCover.djfDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="menuDPS"
              v-model="dpsDate"
              :close-on-content-click="false"
              :return-value.sync="get_EditCover.dpsDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="get_EditCover.dpsDate"
                  label="DPS Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  :rules="[rules.required]"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="get_EditCover.dpsDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dpsDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menuDPS.save(get_EditCover.dpsDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-overflow-btn
              label="Select package"
              target="#newPolicy"
              width="auto"
              :items="get_Packages"
              v-model="get_EditCover.packageId"
              item-value="id"
              :loading="get_loadingDependent"
              :rules="[rules.required]"
              item-text="name"
            ></v-overflow-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="editCover()" text>edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    effectiveDate: false,
    djcDate: false,
    djfDate: false,
    dpsDate: false,
    cover: {
      id: null,
      payPoint: "",
      dJCDate: "",
      dJFDate: "",
      dPSDate: "",
      effectiveDate: "",
    },
    rules: {
      required: (v) => !!v || "This fieled is required",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    ...mapActions(["CloseModalEditCover", "EditCover", "GetPolicyHolderCover"]),
    editCover() {
      if (this.$refs.fromAdd.validate()) {
        this.EditCover(this.get_EditCover).then(() => {
          this.GetPolicyHolderCover(this.get_EditCover.ownerId);
        });
      }
    },
  },
  computed: mapGetters([
    "get_ModalEditCover",
    "get_Packages",
    "get_packagesError",
    "get_loadingDependent",
    "get_EditCover",
  ]),
};
</script>

<style>
</style>