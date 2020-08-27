<template>
  <div>
    <v-dialog v-model="get_ModalAddPackage" persistent width="500">
      <v-card>
        <v-card-title>
          {{ AddTilte }}
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseModalPackage()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="formAdd">
            <v-alert type="error" v-if="get_packagesError != null">{{ get_packagesError }}</v-alert>
            <v-text-field :rules="[rules.required]" v-model="Package.name" label="Package name"></v-text-field>
            <v-text-field
              :rules="[rules.required,rules.wholeNumber]"
              type="number"
              v-model="Package.monthlyContribution"
              label="Monthly Contribution"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required,rules.wholeNumber]"
              type="number"
              v-model="Package.coverAmount"
              label="Cover Amount"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required,rules.wholeNumber]"
              type="number"
              v-model="Package.tombStone"
              label="Tombstone"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required,rules.wholeNumber]"
              type="number"
              v-model="Package.groceryAmount"
              label="Grocery Amount"
            ></v-text-field>
            <v-card outlined v-if="isDependent">
              <v-card-text>
                <v-overflow-btn
                  label="Select relationship"
                  target="#newPolicy"
                  width="auto"
                  :items="get_Relationships"
                  v-model="Package.relationshipId"
                  item-value="id"
                  :loading="get_loadingRelationship"
                  :rules="[rules.required]"
                  item-text="name"
                ></v-overflow-btn>
                <v-text-field
                  :rules="[rules.required,rules.wholeNumber]"
                  type="number"
                  v-model="Package.ageLimit"
                  label="Age Limit (0 means no age limit)"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            v-if="isDependent == false"
            :loading="get_loadingPackage"
            @click.prevent="addPackage()"
            depressed
          >Add</v-btn>
          <v-btn
            v-if="isDependent"
            color="success"
            :loading="get_loadingPackage"
            @click.prevent="addDependentPackage()"
            depressed
          >Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Edit window-->
    <v-dialog v-model="get_ModalEditPackage" persistent width="500">
      <v-card>
        <v-card-title>
          {{ EditTilte }}
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseModalPackageEdit()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="formAdd">
            <v-alert type="error" v-if="get_packagesError != null">{{ get_packagesError }}</v-alert>
            <v-text-field :rules="[rules.required]" v-model="Package.name" label="Package name"></v-text-field>
            <v-text-field
              :rules="[rules.required,rules.wholeNumber]"
              type="number"
              v-model="Package.monthlyContribution"
              label="Monthly Contribution"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required,rules.wholeNumber]"
              type="number"
              v-model="Package.coverAmount"
              label="Cover Amount"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required,rules.wholeNumber]"
              type="number"
              v-model="Package.tombStone"
              label="Tombstone"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required,rules.wholeNumber]"
              type="number"
              v-model="Package.groceryAmount"
              label="Grocery Amount"
            ></v-text-field>
            <v-card outlined v-if="isDependent">
              <v-card-text>
                <v-overflow-btn
                  label="Select relationship"
                  target="#newPolicy"
                  width="auto"
                  :items="get_Relationships"
                  v-model="Package.relationshipId"
                  item-value="id"
                  :loading="get_loadingRelationship"
                  :rules="[rules.required]"
                  item-text="name"
                ></v-overflow-btn>
                <v-text-field
                  :rules="[rules.required,rules.wholeNumber]"
                  type="number"
                  v-model="Package.ageLimit"
                  label="Age Limit (0 means no age limit)"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            v-if="isDependent == false"
            :loading="get_loadingPackage"
            @click.prevent="editPackage()"
            depressed
          >Edit</v-btn>
          <v-btn
            v-if="isDependent"
            color="success"
            :loading="get_loadingPackage"
            @click.prevent="editDependentPackage()"
            depressed
          >Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn text @click="openAddPackage()">
      <v-icon left>mdi-plus</v-icon>Package
    </v-btn>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col md="4" sm="12" v-for="(Package, index) in get_Packages" :key="Package.id">
            <v-card>
              <v-card-title>
                {{ Package.name }}
                <v-spacer></v-spacer>
                <v-chip color="pink darken-1 white--text">{{ Package.coverAmountS }}</v-chip>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-title>Monthly Contribution</v-list-item-title>
                    <v-list-item-action>{{ Package.monthlyContributionS }}</v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Tombstone</v-list-item-title>
                    <v-list-item-action>{{ Package.tombStoneS }}</v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Grocery Amount</v-list-item-title>
                    <v-list-item-action>{{ Package.groceryAmountS }}</v-list-item-action>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card flat>
                  <v-card-title>
                    Dependent covers
                    <v-spacer></v-spacer>
                    <v-btn text @click="openAddDependent(index, Package.id)">
                      <v-icon>mdi-plus</v-icon>Add
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <v-card
                      class="mb-2"
                      v-for="(dep, index2) in Package.dependentPackages"
                      :key="dep.id"
                    >
                      <v-card-title>
                        {{ dep.name }}
                        <v-spacer></v-spacer>
                        <v-chip color="success white--text">{{ dep.coverAmountS }}</v-chip>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-title>Monthly ContributionS</v-list-item-title>
                            <v-list-item-action>{{ dep.monthlyContributionS }}</v-list-item-action>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>Tombstone</v-list-item-title>
                            <v-list-item-action>{{ dep.tombStoneS }}</v-list-item-action>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>Grocery Amount</v-list-item-title>
                            <v-list-item-action>{{ dep.groceryAmountS }}</v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="openEditDependentPackage(dep, index, index2)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="openEditPackage(Package, index)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    isDependent: false,
    AddTilte: "",
    EditTilte: "",
    Package: {
      name: "",
      monthlyContribution: "",
      coverAmount: "",
      tombStone: "",
      groceryAmount: "",
      id: "",
      // for adding dependent
      index: "",
      packageId: "",
      relationshipId: null,
      ageLimit: "",
      index2: "",
    },
    rules: {
      required: (v) => !!v || "Feild requierd",
      wholeNumber: (v) => v >= 0 || "Field must be greater than or 0",
    },
  }),
  methods: {
    clearData() {
      this.Package.name = "";
      this.Package.monthlyContribution = "";
      this.Package.coverAmount = "";
      this.Package.tombStone = "";
      this.Package.groceryAmount = "";
      this.Package.id = "";
      this.Package.packageId = "";
      this.Package.relationshipId = null;
      this.Package.ageLimit = "";
      this.index2 = "";
    },
    openEditPackage(item, index) {
      this.isDependent = false;
      this.Package.name = item.name;
      this.Package.monthlyContribution = item.monthlyContribution;
      this.Package.coverAmount = item.coverAmount;
      this.Package.tombStone = item.tombStone;
      this.Package.groceryAmount = item.groceryAmount;
      this.Package.id = item.id;
      this.Package.index = index;
      this.EditTilte = "Edit Package";
      this.CloseModalPackageEdit();
    },
    openEditDependentPackage(item, index, index2) {
      //index of parent package index2 child index
      this.isDependent = true;
      this.Package.name = item.name;
      this.Package.monthlyContribution = item.monthlyContribution;
      this.Package.coverAmount = item.coverAmount;
      this.Package.tombStone = item.tombStone;
      this.Package.groceryAmount = item.groceryAmount;
      this.Package.id = item.id;
      this.Package.packageId = item.packageId;
      this.Package.ageLimit = item.ageLimit;
      this.Package.relationshipId = item.relationshipId;
      this.Package.index = index;
      this.Package.index2 = index2;
      this.GetRelationships();
      this.EditTilte = "Edit Dependent Package";
      this.CloseModalPackageEdit();
    },
    editPackage() {
      if (this.$refs.formAdd.validate()) {
        this.EditPackage(this.Package);
      }
    },
    editDependentPackage() {
      if (this.$refs.formAdd.validate()) {
        this.EditDependentPackage(this.Package);
      }
    },
    openAddDependent(index, id) {
      this.clearData();
      this.CloseModalPackage();
      this.GetRelationships();
      this.isDependent = true;
      this.AddTilte = "Add Dependent Package";
      this.Package.index = index;
      this.Package.packageId = id;
    },
    openAddPackage() {
      this.isDependent = false;
      this.CloseModalPackage();
      this.AddTilte = "Add Package";
    },
    addPackage() {
      if (this.$refs.formAdd.validate()) {
        this.AddPackage(this.Package);
      }
    },
    addDependentPackage() {
      if (this.$refs.formAdd.validate()) {
        this.AddDependentPackage(this.Package);
      }
    },
    ...mapActions([
      "GetPackages",
      "AddPackage",
      "CloseModalPackage",
      "AddDependentPackage",
      "CloseModalPackageEdit",
      "EditDependentPackage",
      "EditPackage",
      "GetRelationships",
    ]),
  },
  computed: mapGetters([
    "get_Packages",
    "get_loadingPackage",
    "get_packagesError",
    "get_ModalAddPackage",
    "get_ModalEditPackage",
    "get_Relationships",
    "get_loadingRelationship",
  ]),
  mounted() {
    this.GetPackages();
  },
};
</script>

<style></style>
