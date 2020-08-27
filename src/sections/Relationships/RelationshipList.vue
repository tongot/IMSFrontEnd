<template>
  <v-container>
    <v-dialog width="500" v-model="get_ModalRelationship" persistent>
      <v-form @submit.prevent="addRelationship()" ref="formAdd">
        <v-card>
          <v-card-title>
            Add New Relationship
            <v-spacer></v-spacer>
            <v-btn icon @click="closeModal()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" v-if="get_relationshipError!=null">{{get_relationshipError}}</v-alert>
            <v-text-field :rules="[rules.required]" v-model="relationship.name" label="Name"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="isEditing"
              :loading="get_loadingRelationship"
              @click.prevent="addRelationship()"
              depressed
            >edit</v-btn>
            <v-btn
              v-if="!isEditing"
              :loading="get_loadingRelationship"
              @click.prevent="addRelationship()"
              depressed
            >add</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn text @click="openModalAdd()">
          <v-icon left>mdi-plus</v-icon>Add
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-list v-for="(relation,index) in get_Relationships" :key="relation.id">
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title>{{relation.name}}</v-list-item-title>
              <v-list-item-action>
                <v-btn @click="openModalEdit(index,relation)" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    isEditing: false,
    relationship: {
      name: "",
      index: null,
      id: null,
    },
    rules: {
      required: (v) => !!v || "This fieled is required",
    },
  }),
  methods: {
    ...mapActions([
      "GetRelationships",
      "CloseModalRelationship",
      "AddRelationship",
      "ClearErrorRelationship",
      "EditRelationship",
    ]),
    openModalEdit(index, relation) {
      this.isEditing = true;
      this.relationship.index = index;
      this.relationship.id = relation.id;
      this.relationship.name = relation.name;
      this.CloseModalRelationship();
    },
    closeModal() {
      this.clear();
      this.CloseModalRelationship();
    },
    openModalAdd() {
      this.isEditing = false;
      this.CloseModalRelationship();
    },
    addRelationship() {
      if (this.$refs.formAdd.validate()) {
        if (!this.isEditing) {
          this.AddRelationship(this.relationship);
        } else {
          this.EditRelationship(this.relationship);
        }
      }
    },
    clear() {
      this.relationship.index = null;
      this.relationship.id = null;
      this.relationship.name = "";
      this.ClearErrorRelationship();
    },
  },
  computed: mapGetters([
    "get_Relationships",
    "get_ModalRelationship",
    "get_loadingRelationship",
    "get_relationshipError",
  ]),
  mounted() {
    this.GetRelationships();
  },
};
</script>

<style>
</style>