<template>
  <div>
    <v-dialog v-model="get_ModalAddPackage" persistent width="500">
      <v-card>
        <v-card-title
          >Add Package
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseModalPackage()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="formAdd">
            <v-alert type="error" v-if="get_packagesError != null">{{ get_packagesError }}</v-alert>
            <v-text-field :rules="[rules.required]" v-model="Package.name" label="Package name"></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              type="number"
              v-model="Package.monthlyContribution"
              label="Monthly Contribution"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              type="number"
              v-model="Package.coverAmount"
              label="Cover Amount"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              type="number"
              v-model="Package.tombStone"
              label="Tombstone"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              type="number"
              v-model="Package.groceryAmount"
              label="Grocery Amount"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :loading="get_loadingPackage" @click.prevent="addPackage()" depressed>
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn text @click="CloseModalPackage()">
      <v-icon left>
        mdi-plus
      </v-icon>
      Package
    </v-btn>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col md="6" sm="12" v-for="Package in get_Packages" :key="Package.id">
            <v-card>
              <v-card-title>
                {{ Package.name }}
                <v-spacer></v-spacer>
                <v-chip color="pink darken-1 white--text">{{ Package.coverAmount }} </v-chip>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-title>Monthly Contribution</v-list-item-title>
                    <v-list-item-action>{{ Package.monthlyContribution }}</v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Tombstone</v-list-item-title>
                    <v-list-item-action>{{ Package.tombStone }}</v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Grocery Amount</v-list-item-title>
                    <v-list-item-action>{{ Package.groceryAmount }}</v-list-item-action>
                  </v-list-item>
                </v-list>
                <v-card flat>
                  <v-card-title
                    >Dependent covers
                    <v-spacer></v-spacer>
                    <v-btn text>
                      <v-icon>
                        mdi-plus
                      </v-icon>
                      Add
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-card class="mb-2" v-for="dep in Package.dependentPackages" :key="dep.id">
                      <v-card-title
                        >{{ dep.name }}
                        <v-spacer></v-spacer>
                        <v-chip color="success white--text">{{ Package.coverAmount }} </v-chip>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-title>Monthly Contribution</v-list-item-title>
                            <v-list-item-action>{{ dep.monthlyContribution }}</v-list-item-action>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>Tombstone</v-list-item-title>
                            <v-list-item-action>{{ dep.tombStone }}</v-list-item-action>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>Grocery Amount</v-list-item-title>
                            <v-list-item-action>{{ dep.groceryAmount }}</v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>
                    mdi-pencil
                  </v-icon>
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
import { mapGetters, mapActions } from 'vuex';
export default {
  data: () => ({
    modalAdd: false,
    Package: {
      name: '',
      monthlyContribution: '',
      coverAmount: '',
      tombStone: '',
      groceryAmount: '',
    },
    rules: {
      required: (v) => !!v || 'Feild requierd',
    },
  }),
  methods: {
    addPackage() {
      if (this.$refs.formAdd.validate()) {
        this.AddPackage(this.Package);
      }
    },
    ...mapActions(['GetPackages', 'AddPackage', 'CloseModalPackage']),
  },
  computed: mapGetters(['get_Packages', 'get_loadingPackage', 'get_packagesError', 'get_ModalAddPackage']),
  mounted() {
    this.GetPackages();
  },
};
</script>

<style></style>
