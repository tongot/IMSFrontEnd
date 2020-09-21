<template>
  <div>
    <v-dialog persistent width="500" v-model="get_dialogClaimStatus">
      <v-form ref="commentForm">
        <v-card>
          <v-alert type="error" v-if="get_claimStatusError!=null">{{get_claimStatusError}}</v-alert>
          <v-card-title>Enter Status Comment</v-card-title>
          <v-card-text>
            <v-textarea :rules="[rules.required]" label="Comment" v-model="status.statusComment"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="cancel()" color="pink darken-1 white--text" depressed>close</v-btn>
            <v-btn @click="postNewStatus()" depressed>{{btnText}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-card v-if="get_claimStatus!=null" outlined>
      <v-alert v-if="get_claimStatusError!=null" type="error">{{get_claimStatusError}}</v-alert>
      <v-card-actions>
        <v-btn :loading="get_loadingClaimStatus" text>Status</v-btn>
        <v-btn
          :disabled="getClass(status.isCurrent)"
          small
          v-for="status in  get_claimStatus"
          :key="status.id"
          @click="setPolicy(status)"
        >
          <span v-if="status.isCurrent">{{status.name}}</span>
          <span v-if="!status.isCurrent">{{status.displayName}}</span>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn
          v-if="CurrentStateNotOne()"
          @click="setReverse()"
          class="white--text mr-2"
          small
          color="pink darken-2"
        >
          <v-icon>mdi-arrow-left</v-icon>reverse state
        </v-btn>
        <v-chip color="success" small>{{getCurrentStatusName()}}</v-chip>
      </v-card-actions>
      <div class="pa-2">
        <v-alert prominent outlined type="info" border="left">
          <div class="title">{{getCurrentStatuspActivity()}}</div>
          <div>{{getCurrentStatusComment()}}</div>
        </v-alert>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    isReverse: false,
    btnText: "",
    status: {
      statusId: null,
      claimId: null,
      currentOwner: null,
      statusComment: null,
      processId: null,
    },

    rules: {
      required: (v) => !!v || "Status comment is required",
    },
  }),
  methods: {
    ...mapActions([
      "GetClaimStatus",
      "ChangeClaimStatus",
      "OpenDialogClaimStatus",
      "ReverseClaimStatus",
    ]),
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
    CurrentStateNotOne() {
      let names = this.get_claimStatus.filter(
        (item) =>
          item.isCurrent === true && item.order !== 1 && item.name != "Deceased"
      );
      if (names.length == 0) {
        return false;
      } else {
        return true;
      }
    },
    getCurrentStatusName() {
      return this.getCurrentStatus().length > 0
        ? this.getCurrentStatus()[0].name
        : "";
    },
    getCurrentStatusComment() {
      return this.getCurrentStatus().length > 0
        ? this.getCurrentStatus()[0].comment
        : "";
    },
    getCurrentStatuspActivity() {
      return this.getCurrentStatus().length > 0
        ? this.getCurrentStatus()[0].activity
        : "";
    },
    getCurrentStatus() {
      return this.get_claimStatus.filter((item) => item.isCurrent === true);
    },
    setPolicy(status) {
      if (
        this.get_funeralClaim.bankDetail == null &&
        status.isActiveState == true
      ) {
        this.$router.push({ name: "funeralClaimAdd-bank" });
        return;
      }
      this.isReverse = false;
      this.OpenDialogClaimStatus();
      this.btnText = status.displayName;
      this.status.statusId = status.id;
      this.status.claimId = this.get_funeralClaim.claimId;
      this.status.currentOwner = this.get_claimOwner.id;
      this.status.processId = status.processId;
    },
    setReverse() {
      if (this.getCurrentStatus().length > 0) {
        this.isReverse = true;
        this.OpenDialogClaimStatus();
        this.btnText = "reverse";
        this.status.statusId = this.getCurrentStatus()[0].id;
        this.status.claimId = this.get_funeralClaim.claimId;
      }
    },
    cancel() {
      this.OpenDialogClaimStatus();
      this.dialogComment = false;
      this.btnText = "";
      this.status.statusId = null;
      this.status.statusComment = null;
    },
    postNewStatus() {
      if (this.$refs.commentForm.validate()) {
        if (this.isReverse) {
          this.ReverseClaimStatus(this.status);
        } else {
          this.ChangeClaimStatus(this.status);
        }
      }
    },
  },
  computed: mapGetters([
    "get_claimStatus",
    "get_loadingClaimStatus",
    "get_claimStatusError",
    "get_claimOwner",
    "get_funeralClaim",
    "get_dialogClaimStatus",
  ]),
};
</script>

<style>
</style>