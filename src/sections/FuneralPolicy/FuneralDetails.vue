<template>
  <div v-if="get_funeralPolicy != null">
    <v-row>
      <v-col>
        <statuses />
      </v-col>
    </v-row>
    <v-card v-if="get_funeralPolicy.policyHolder != null" outlined>
      <v-card flat dark class="light-blue">
        <v-card-text>
          <v-row>
            <v-col>
              <v-row>
                <v-toolbar-title>Policy holder details</v-toolbar-title>
                <v-chip
                  depressed
                  small
                  @click="
                    createClaim('member', get_funeralPolicy.policyHolder.id)
                  "
                  class="ml-2"
                  >Claim</v-chip
                >
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-spacer></v-spacer>
                <changeOwner />
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-row class="pa-2">
        <v-col cols="12" md="4" xs="12" sm="12">
          <h4>Personal Details</h4>
          <v-divider></v-divider>
          <v-subheader>Salutation</v-subheader>
          <p class="pl-4">
            {{ getTitle(get_funeralPolicy.policyHolder.salutation) }}
          </p>
          <v-subheader>Name</v-subheader>
          <p class="pl-4">
            {{
              get_funeralPolicy.policyHolder.firstName +
              " " +
              get_funeralPolicy.policyHolder.middleName
            }}
          </p>
          <v-subheader>Surname</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.lastName }}</p>
          <v-subheader>Marital Status</v-subheader>
          <p class="pl-4">
            {{ getMaritalState(get_funeralPolicy.policyHolder.maritalStatus) }}
          </p>
          <v-subheader>Gender</v-subheader>
          <p class="pl-4">
            {{ getGender(get_funeralPolicy.policyHolder.gender) }}
          </p>
          <v-subheader>Date of birth</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.dateOfBirth }}</p>
          <v-subheader>Disabled</v-subheader>
          <span class="ml-4">
            <v-chip small v-if="!get_funeralPolicy.policyHolder.disabled"
              >No</v-chip
            >
            <v-chip
              small
              class="red white--text"
              v-if="get_funeralPolicy.policyHolder.disabled"
              >Yes</v-chip
            >
          </span>
        </v-col>
        <v-col cols="12" md="4" xs="12" sm="12">
          <h4>Employment</h4>
          <v-divider></v-divider>
          <v-subheader>Department</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.department }}</p>
          <v-subheader>Occupation</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.occupation }}</p>
          <v-subheader>Branch</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.branch }}</p>
        </v-col>
        <v-col md="4" xs="12" sm="12">
          <h4>Identity</h4>
          <v-divider></v-divider>
          <v-subheader>National Id Number</v-subheader>
          <p class="pl-4">{{ get_funeralPolicy.policyHolder.idNumber }}</p>
          <v-subheader>Type of Id</v-subheader>
          <p class="pl-4">
            {{ getIdType(get_funeralPolicy.policyHolder.idType) }}
          </p>
          <v-subheader>Country Of Issue</v-subheader>
          <p class="pl-4">
            {{ get_funeralPolicy.policyHolder.countryOfIssue }}
          </p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title>
          Cover Details
          <v-spacer></v-spacer>
          <v-btn
            icon
            :loading="get_loadingPackage"
            @click="
              openModalEditCover(
                get_policyHolderCover.id,
                get_funeralPolicy.funeralPolicy.id
              )
            "
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <div v-if="get_policyHolderCover != null" class="ma-2">
          <v-row>
            <v-col md="6" cols="12" sm="12">
              <v-subheader>Effective Date</v-subheader>
              <p class="pl-4">{{ get_policyHolderCover.effectiveDate }}</p>
              <v-subheader>Pay Point</v-subheader>
              <p class="pl-4">{{ get_policyHolderCover.payPoint }}</p>
              <v-subheader>DJC</v-subheader>
              <p class="pl-4">{{ get_policyHolderCover.djcDate }}</p>
              <v-subheader>DJF</v-subheader>
              <p class="pl-4">{{ get_policyHolderCover.djfDate }}</p>
              <v-subheader>DPS</v-subheader>
              <p class="pl-4">{{ get_policyHolderCover.dpsDate }}</p>
            </v-col>
            <v-col md="6" cols="12" sm="12">
              <v-card v-if="get_policyHolderCover.package != null" outlined>
                <v-card-title
                  >Package details
                  <v-spacer></v-spacer>
                  <v-chip color="primary white--text">{{
                    "Total Premium: " + get_funeralPolicy.totalPremiumS
                  }}</v-chip>
                </v-card-title>
                <div class="ma-2">
                  <v-card>
                    <v-card-title>
                      {{ get_policyHolderCover.package.name }}
                      <v-spacer></v-spacer>
                      <v-chip color="success white--text">{{
                        get_policyHolderCover.package.coverAmountS
                      }}</v-chip>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-title
                            >Monthly Contribution</v-list-item-title
                          >
                          <v-list-item-action>{{
                            get_policyHolderCover.package.monthlyContributionS
                          }}</v-list-item-action>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>Tombstone</v-list-item-title>
                          <v-list-item-action>{{
                            get_policyHolderCover.package.tombStoneS
                          }}</v-list-item-action>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>Grocery Amount</v-list-item-title>
                          <v-list-item-action>{{
                            get_policyHolderCover.package.groceryAmountS
                          }}</v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-card>

    <!--dependencies card -->
    <v-card class="mt-2" outlined>
      <v-toolbar flat dark color="light-blue">
        <v-toolbar-title>
          Dependencies
          <v-avatar size="30" color="blue">{{
            get_Dependencies.length
          }}</v-avatar>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          :loading="get_loadingDependent"
          text
          @click="
            addDependent(
              get_funeralPolicy.policyHolder.id,
              get_funeralPolicy.funeralPolicy.id
            )
          "
        >
          <v-icon left>mdi-plus</v-icon>Add
        </v-btn>
      </v-toolbar>
      <v-card-text v-if="get_Dependencies.length > 0">
        <v-expansion-panels style="margin: 0" flat>
          <v-expansion-panel
            @click="openDependent(dependent.policyCover.dependentPackageId)"
            v-for="(dependent, index) in get_Dependencies"
            :key="dependent.id"
          >
            <v-expansion-panel-header>{{
              dependent.firstName +
              " " +
              dependent.middleName +
              " " +
              dependent.lastName
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card outlined>
                <v-card-title>
                  <v-btn small depressed :color="stateColor" class="ml-2">{{
                    getState(dependent.status)
                  }}</v-btn>
                  <v-chip
                    depressed
                    small
                    @click="createClaim('dependent', dependent.id)"
                    class="ml-2"
                    >Claim</v-chip
                  >
                  <v-btn
                    icon
                    :loading="get_loadingPackage"
                    @click="
                      openModalEditDependent(
                        dependent,
                        index,
                        get_funeralPolicy.policyHolder.id
                      )
                    "
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-card-title>
                <v-row class="ma-1">
                  <v-col cols="12" md="4" sm="12">
                    <v-overflow-btn
                      label="Relationship"
                      width="auto"
                      :items="get_Relationships"
                      v-model="dependent.relationshipId"
                      item-value="id"
                      :loading="get_loadingRelationship"
                      disabled
                      item-text="name"
                    ></v-overflow-btn>
                    <v-subheader>Salutation</v-subheader>
                    <p class="pl-4">{{ dependent.salutation }}</p>
                    <v-subheader>Name</v-subheader>
                    <p class="pl-4">
                      {{ dependent.firstName + " " + dependent.middleName }}
                    </p>
                    <v-subheader>Surname</v-subheader>
                    <p class="pl-4">{{ dependent.lastName }}</p>
                    <v-subheader>Marital Status</v-subheader>
                    <p class="pl-4">{{ dependent.maritalStatus }}</p>
                    <v-subheader>Gender</v-subheader>
                    <p class="pl-4">{{ dependent.gender }}</p>
                    <v-subheader>Date of birth</v-subheader>
                    <p class="pl-4">{{ dependent.dateOfBirth }}</p>
                    <v-subheader>Age</v-subheader>
                    <p class="pl-4">{{ dependent.age }}</p>
                    <v-subheader>Disabled</v-subheader>
                    <span class="ml-4">
                      <v-chip small v-if="dependent.disabled == 'No'"
                        >No</v-chip
                      >
                      <v-chip
                        small
                        class="red white--text"
                        v-if="dependent.disabled == 'Yes'"
                        >Yes</v-chip
                      >
                    </span>
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-card outlined>
                      <v-card-title>Cover details</v-card-title>
                      <div class="ma-2">
                        <v-subheader>Effective Date</v-subheader>
                        <p class="pl-4">
                          {{ dependent.policyCover.effectiveDate }}
                        </p>
                        <v-subheader>Pay Point</v-subheader>
                        <p class="pl-4">{{ dependent.policyCover.payPoint }}</p>
                        <v-subheader>DJC</v-subheader>
                        <p class="pl-4">{{ dependent.policyCover.djcDate }}</p>
                        <v-subheader>DJF</v-subheader>
                        <p class="pl-4">{{ dependent.policyCover.djfDate }}</p>
                        <v-subheader>DPS</v-subheader>
                        <p class="pl-4">{{ dependent.policyCover.dpsDate }}</p>
                      </div>
                    </v-card>
                  </v-col>
                  <v-col md="4" sm="12">
                    <v-card v-if="get_dependentCover != null" outlined>
                      <v-card-title>Package details</v-card-title>
                      <div class="ma-2">
                        <v-card>
                          <v-card-title>
                            {{ get_dependentCover.name }}
                            <v-spacer></v-spacer>
                            <v-chip color="success white--text">{{
                              get_dependentCover.coverAmountS
                            }}</v-chip>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-title
                                  >Monthly Contribution</v-list-item-title
                                >
                                <v-list-item-action>{{
                                  get_dependentCover.monthlyContributionS
                                }}</v-list-item-action>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Tombstone</v-list-item-title>
                                <v-list-item-action>{{
                                  get_dependentCover.tombStoneS
                                }}</v-list-item-action>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title
                                  >Grocery Amount</v-list-item-title
                                >
                                <v-list-item-action>{{
                                  get_dependentCover.groceryAmountS
                                }}</v-list-item-action>
                              </v-list-item>
                            </v-list>
                          </v-card-text>
                        </v-card>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-text v-if="get_Dependencies.length == 0">
        <v-row justify="center">
          <v-btn
            large
            :loading="get_loadingDependent"
            text
            @click="
              addDependent(
                get_funeralPolicy.policyHolder.id,
                get_funeralPolicy.funeralPolicy.id
              )
            "
          >
            <v-icon left>mdi-plus</v-icon>Add Dependencies Here
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <div class="mt-2">
      <Beneficiary />
    </div>
    <v-card class="mt-2" outlined>
      <v-toolbar dark color="light-blue" flat>
        <v-toolbar-title>Policy Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn depressed disabled>Funeral</v-btn>
        <v-btn @click="opeModalEditPolicy(get_funeralPolicy)" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-row>
        <v-col md="4" cols="12" sm="12">
          <v-card outlined>
            <v-card-title>
              Policy
              <v-spacer></v-spacer>
              <v-btn depressed disabled>Funeral</v-btn>
              <v-btn class="ml-1" :to="{ name: 'policyAudit' }" depressed
                >View Audit</v-btn
              >
            </v-card-title>
            <v-divider></v-divider>
            <v-subheader>Status</v-subheader>
            <span v-if="get_funeralPolicy.status != null">
              <p class="pl-4">{{ get_funeralPolicy.status.name }}</p>
            </span>

            <v-subheader>Policy Number</v-subheader>
            <p class="pl-4">{{ get_funeralPolicy.policyNumber }}</p>
            <v-subheader>Effective Date</v-subheader>
            <p class="pl-4">{{ get_funeralPolicy.effectiveDate | Date }}</p>
            <v-subheader>Application Date</v-subheader>
            <p class="pl-4">{{ get_funeralPolicy.applicationDate | Date }}</p>
            <v-subheader>Joining Date</v-subheader>
            <p class="pl-4">{{ get_funeralPolicy.joiningDate | Date }}</p>
            <v-subheader>Created On</v-subheader>
            <p class="pl-4">{{ get_funeralPolicy.createdOn | Date }}</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-card outlined v-if="get_funeralPolicy.underwriter != null">
            <v-card-title>Underwriter</v-card-title>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" md="6" xs="12" sm="12">
                <v-subheader>Name</v-subheader>
                <p class="pl-4">{{ get_funeralPolicy.underwriter.name }}</p>
                <v-subheader>Commission</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.underwriter.commission }}
                </p>
                <v-subheader>Phone Number</v-subheader>
                <p class="pl-4">{{ get_funeralPolicy.underwriter.phone }}</p>
                <v-subheader>Email</v-subheader>
                <p class="pl-4">{{ get_funeralPolicy.underwriter.email }}</p>
                <v-subheader>Contact Person</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.underwriter.contactPerson }}
                </p>
              </v-col>
              <v-col cols="12" md="6" xs="12" sm="12">
                <v-subheader>Contact Person Phone</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.underwriter.contactPersonNumber }}
                </p>
                <v-subheader>Postal Address</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.underwriter.postalAddress }}
                </p>
                <v-subheader>Physical Address</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.underwriter.physicalAddress }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col md="4" cols="12" sm="12">
          <v-card v-if="get_funeralPolicy.organization != null" outlined>
            <v-card-title>Organization</v-card-title>
            <v-divider></v-divider>
            <v-row>
              <v-col md="6" cols="12" xs="12" sm="12">
                <v-subheader>Name</v-subheader>
                <p class="pl-4">{{ get_funeralPolicy.organization.name }}</p>
                <v-subheader>Phone Number</v-subheader>
                <p class="pl-4">{{ get_funeralPolicy.organization.phone }}</p>
                <v-subheader>Email</v-subheader>
                <p class="pl-4">{{ get_funeralPolicy.organization.email }}</p>
                <v-subheader>Contact Person</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.organization.contactPerson }}
                </p>
              </v-col>
              <v-col md="6" cols="12" xs="12" sm="12">
                <v-subheader>Contact Person Phone</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.organization.contactPersonNumber }}
                </p>
                <v-subheader>Postal Address</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.organization.postalAddress }}
                </p>
                <v-subheader>Physical Address</v-subheader>
                <p class="pl-4">
                  {{ get_funeralPolicy.organization.physicalAddress }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog width="500" v-model="modalEditPolicy">
      <v-card width="500">
        <policyEdit />
      </v-card>
    </v-dialog>
    <CreateClaim />
    <router-view></router-view>
  </div>
</template>

<script>
import enums from "../../Dictionary/Dictionary";
import statuses from "../../components/States";
import changeOwner from "../../components/ChangeOwner";
import policyEdit from "../../sections/Policy/EditPolicy";
import Beneficiary from "../../sections/FuneralPolicy/BeneficiaryDetail";
import CreateClaim from "../Claims/CreateClaim";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    modalEditPolicy: false,
    stateColor: "",
  }),
  components: {
    statuses,
    changeOwner,
    policyEdit,
    Beneficiary,
    CreateClaim,
  },
  methods: {
    ...mapActions([
      "GetPolicyById",
      "CloseAddDependentDialog",
      "GetDependentPackage",
      "GetPackages",
      "SetPolicyId",
      "GetDependenciesForPolicy",
      "GetDependentCover",
      "GetPolicyHolderCover",
      "OpenModalEditCover",
      "GetCoverById",
      "GetRelationships",
      "OpenEditDependentDialog",
      "GetStatus",
      "GetPolicyOwner",
      "GetPolicyToEdit",
      "GetBeneficiaryById",
      "CreateClaim",
      "CloseCreateClaimDialog",
    ]),

    createClaim(typeOfDeceased, IdOfDeceased) {
      const claim = {
        funeralPolicyId: this.get_funeralPolicy.funeralPolicy.id,
        deceasedType: typeOfDeceased,
        deceased: IdOfDeceased,
        policyId: this.get_funeralPolicy.id,
        policyProcessId: this.get_funeralPolicy.processId,
        claimBase: {
          organizationId: this.get_user.organizationId,
          processId: null,
          applicationDate: null,
        },
      };
      this.CreateClaim(claim);
      this.CloseCreateClaimDialog();
    },
    opeModalEditPolicy(policy) {
      this.GetPolicyToEdit(policy);
      this.modalEditPolicy = true;
    },
    openModalEditCover(id, policyId) {
      this.GetCoverById(id);
      this.OpenModalEditCover();
      this.GetPackages();
      this.SetPolicyId(policyId);
    },
    openModalEditDependent(dependent, index, holderId) {
      this.GetCoverById(dependent.policyCover.id);
      this.GetDependentPackage(holderId);
      dependent.policyStateId = this.get_funeralPolicy.stateId;
      dependent.policyBaseId = this.get_funeralPolicy.id;
      this.OpenEditDependentDialog(dependent);
    },
    getGender(n) {
      return enums.gender[n];
    },
    getTitle(t) {
      return enums.title[t];
    },
    getMaritalState(m) {
      return enums.maritalStatus[m];
    },
    getState(stateId) {
      let state = enums.personStatus[stateId];
      if (state == "Deceased") {
        this.stateColor = "pink darken-3 white--text";
      } else {
        this.stateColor = "success";
      }
      return state;
    },
    getIdType(id) {
      return enums.idType[id];
    },
    addDependent(holderId, policyId) {
      this.GetDependentPackage(holderId);
      this.SetPolicyId(policyId);
      this.CloseAddDependentDialog();
    },
    openDependent(PackageId) {
      this.GetDependentCover(PackageId);
    },
  },
  computed: mapGetters([
    "get_funeralPolicy",
    "get_Dependencies",
    "get_loadingDependent",
    "get_dependentCover",
    "get_policyHolderCover",
    "get_loadingPackage",
    "get_Relationships",
    "get_loadingRelationship",
    "get_user",
  ]),
  mounted() {
    this.GetPolicyById(this.$route.params.PolicyId).then(() => {
      const status = {
        id: this.get_funeralPolicy.stateId,
        policyId: this.get_funeralPolicy.id,
      };
      this.GetStatus(status);
      this.GetDependenciesForPolicy(this.get_funeralPolicy.funeralPolicy.id);
      this.GetPolicyHolderCover(this.get_funeralPolicy.policyHolder.id);
      this.GetPolicyOwner(this.get_funeralPolicy.owner);
      this.GetRelationships();
      this.GetBeneficiaryById(this.get_funeralPolicy.id);
    });
  },
};
</script>

<style></style>
