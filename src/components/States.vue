<template>
  <div>
    <v-dialog persistent width="500" v-model="dialogComment">
      <v-form ref="commentForm">
        <v-card>
          <v-card-title>Enter Status Comment</v-card-title>
          <v-card-text>
            <v-textarea :rules="[rules.required]" label="Comment" v-model="status.statusComment"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="cancel()" color="pink darken-1 white--text" depressed>cancel</v-btn>
            <v-btn @click="postNewStatus()" depressed>{{btnText}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-card v-if="get_Status!=null" outlined>
      <v-alert v-if="get_statusError!=null" type="error">{{get_statusError}}</v-alert>
      <v-card-actions>
        <v-btn :loading="get_loadingStatus" text>Status</v-btn>
        <v-btn
          :disabled="getClass(status.isCurrent)"
          small
          v-for="status in  get_Status"
          :key="status.id"
          @click="setPolicy(status)"
        >
          <span v-if="status.isCurrent">{{status.name}}</span>
          <span v-if="!status.isCurrent">{{status.displayName}}</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-chip color="success" small>{{getCurrentStatus()}}</v-chip>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    btnText: "",
    dialogComment: null,
    status: {
      statusId: null,
      policyId: null,
      currentOwner: null,
      statusComment: null,
    },

    rules: {
      required: (v) => !!v || "Status comment is required",
    },
  }),
  methods: {
    //  ...mapActions(['GetStatus'])
    getClass(isCurrent) {
      return isCurrent ? true : false;
    },
    disabled(status) {
      if (status.isCurrent) {
        return true;
      } else {
        return status.hasPermission ? false : true;
      }
    },
    getCurrentStatus() {
      let names = this.get_Status.filter((item) => item.isCurrent === true);

      return names.length > 0 ? names[0].name : "";
    },
    setPolicy(status) {
      this.dialogComment = true;
      this.btnText = status.displayName;
      this.status.statusId = status.id;
      this.status.policyId = this.get_funeralPolicy.id;
      this.status.currentOwner = this.get_policyOwner.id;
    },
    cancel() {
      this.dialogComment = false;
      this.btnText = "";
      this.status.statusId = null;
      this.status.statusComment = null;
    },
    postNewStatus() {
      if (this.$refs.commentForm.validate()) {
        console.log(this.status);
      }
    },
  },
  computed: mapGetters([
    "get_Status",
    "get_loadingStatus",
    "get_statusError",
    "get_policyOwner",
    "get_funeralPolicy",
  ]),
};
</script>

<style>
</style>