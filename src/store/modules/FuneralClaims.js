import axios from 'axios';
import router from '../../router';
import _ from 'lodash';
const state = {
  FuneralClaims: [],
  FuneralClaim: null,
  FuneralClaimLoading: false,
  FuneralClaimError: null,
  FClaimsPages: 0,
  CreateClaimDialog: false,
  BankingDetail: null,
  ClaimBankError: null,
  EditClaim: null,
  ModalEditClaim: false,
};
const getters = {
  get_funeralClaims: (state) => state.FuneralClaims,
  get_funeralClaim: (state) => state.FuneralClaim,
  get_loadingFClaims: (state) => state.FuneralClaimLoading,
  get_funeralClaimError: (state) => state.FuneralClaimError,
  get_FClaimsPages: (state) => state.FClaimsPages,
  get_createClaimDialog: (state) => state.CreateClaimDialog,
  get_claimBankError: (state) => state.ClaimBankError,
  get_EditFClaim: (state) => state.EditClaim,
  get_ModalEditClaim: (state) => state.ModalEditClaim,
};
const actions = {
  CreateClaim({ commit }, claim) {
    commit('set_funeralClaim', claim);
  },
  SetEditClaim({ commit }, claim) {
    console.log(claim);
    commit('set_EditClaim', _.cloneDeep(claim));
    state.ModalEditClaim = true;
  },
  CloseModalEditClaim() {
    state.ModalEditClaim = false;
  },
  CloseCreateClaimDialog() {
    state.FuneralClaimLoading = false;
    state.FuneralClaimError = null;
    state.CreateClaimDialog = !state.CreateClaimDialog;
  },
  async GetFuneralClaims({ commit }, search) {
    state.FuneralClaimLoading = true;
    await axios
      .get(
        '/funeralClaims/GetFPClaims?page=' +
          search.page +
          '&size=' +
          search.size +
          '&Search=' +
          search.search +
          '&state=' +
          search.status +
          '&orgId=' +
          search.orgId
      )
      .then((response) => {
        if (response.status === 200) {
          commit('set_funeralClaims', response.data.data);
          state.FClaimsPages = response.data.numberOfPages;
          state.FuneralClaimLoading = false;
          return;
        }
        alert(response.data.message);
        state.FuneralClaimLoading = false;
      })
      .catch((ex) => {
        alert('Error ' + ex);
        state.FuneralClaimLoading = false;
      });
  },
  async GetFuneralClaimById({ commit }, id) {
    state.FuneralClaimLoading = true;
    await axios
      .get('/funeralClaims/GetFuneralClaimById/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_funeralClaim', response.data.data);
          state.FuneralClaimLoading = false;
          return;
        }
        alert(response.data.message);
        state.FuneralClaimLoading = false;
      })
      .catch((ex) => {
        alert('Error ' + ex);
        state.FuneralClaimLoading = false;
      });
  },
  async AddClaim({ state }) {
    state.FuneralClaimLoading = true;
    state.FuneralClaimError = null;
    axios
      .post('/funeralClaims', {
        funeralPolicyId: state.FuneralClaim.funeralPolicyId,
        deceasedType: state.FuneralClaim.deceasedType,
        deceased: state.FuneralClaim.deceased,
        policyId: state.FuneralClaim.policyId,
        policyProcessId: state.FuneralClaim.policyProcessId,
        claimBase: state.FuneralClaim.claimBase,
        causeOfDeath: state.FuneralClaim.causeOfDeath,
        dateOfDeath: state.FuneralClaim.dateOfDeath,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            state.FuneralClaimLoading = false;
            state.CreateClaimDialog = false;
            router.go();
          }
        },
        (e) => {
          state.FuneralClaimError = e.response.data.message;
          state.FuneralClaimLoading = false;
        }
      )
      .catch((ex) => {
        state.FuneralClaimError = ex;
        state.FuneralClaimLoading = false;
      });
  },
  async AddClaimBanking({ state }, bank) {
    console.warn(bank);
    state.FuneralClaimLoading = true;
    state.ClaimBankError = null;
    axios
      .post('/funeralClaims/AddBankingDetails', {
        name: bank.name,
        bankAccount: bank.bankAccount,
        branchName: bank.branchName,
        holderName: bank.holderName,
        claimId: bank.claimId,
        paymentMethods: bank.paymentMethods,
        statusId: bank.statusId,
        isSettled: bank.isSettled,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            state.FuneralClaimLoading = false;
            state.CreateClaimDialog = false;
            router.go(-1);
          }
        },
        (e) => {
          state.ClaimBankError = e.response.data.message;
          state.FuneralClaimLoading = false;
        }
      )
      .catch((ex) => {
        state.ClaimBankError = ex;
        state.FuneralClaimLoading = false;
      });
  },
  async EditFClaim({ state }) {
    console.log(state.EditClaim);
    state.FuneralClaimLoading = true;
    state.ClaimBankError = null;
    axios
      .put('/funeralClaims/UpdateFClaim', {
        causeOfDeath: state.EditClaim.causeOfDeaeth,
        claimId: state.EditClaim.claimId,
        statusId: state.EditClaim.statusId,
        applicationDate: state.EditClaim.applicationDate,
        dateOfDeath: state.EditClaim.dateOfDeath,
        bank: state.EditClaim.bankDetail,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            state.FuneralClaimLoading = false;
            state.CreateClaimDialog = false;
            router.go();
          }
        },
        (e) => {
          state.ClaimBankError = e.response.data.message;
          state.FuneralClaimLoading = false;
        }
      )
      .catch((ex) => {
        state.ClaimBankError = ex;
        state.FuneralClaimLoading = false;
      });
  },
};
const mutations = {
  set_funeralClaims: (state, data) => (state.FuneralClaims = data),
  set_funeralClaim: (state, data) => (state.FuneralClaim = data),
  set_EditClaim: (state, data) => (state.EditClaim = data),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
