<template>
  <div>
    <v-dialog width="500" persistent v-model="get_editOrgAdminsDialog">
      <v-form @submit.prevent="postUpdate()" ref="formEdit">
        <v-card v-if="get_adminUserEdit!=null">
          <v-card-title>
            Edit Admin
            <v-spacer></v-spacer>
            <v-btn icon @click="OpenDialogEditOrgAdmin()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert v-if="get_AddOrgUserError!=null">{{get_AddOrgUserError}}</v-alert>
            <v-text-field label="Name" v-model="get_adminUserEdit.name" :rules="[rules.required]"></v-text-field>
            <v-text-field
              label="Surname"
              v-model="get_adminUserEdit.surname"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field label="Email" v-model="get_adminUserEdit.email" :rules="[rules.required]"></v-text-field>
            <v-checkbox v-model="get_adminUserEdit.isActive" label="Active"></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="postUpdate()" depressed>Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    rules: {
      required: (v) => !!v || "this field is required",
    },
  }),
  methods: {
    postUpdate() {
      if (this.$refs.formEdit.validate()) {
        this.UpdateUserAdmin();
      }
    },
    ...mapActions(["OpenDialogEditOrgAdmin", "UpdateUserAdmin"]),
  },
  computed: mapGetters([
    "get_editOrgAdminsDialog",
    "get_adminUserEdit",
    "get_AddOrgUserError",
  ]),
};
</script>

<style>
</style>