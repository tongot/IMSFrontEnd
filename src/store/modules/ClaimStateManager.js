import axios from 'axios';
import router from '../../router';
const state = {
  ClaimStatus: [],
  loadingClaimState: false,
  claimStateError: null,
  dialogClaimStatus: false,
};
const getters = {
  get_claimStatus: (state) => state.ClaimStatus,
  get_loadingClaimStatus: (state) => state.loadingClaimState,
  get_claimStatusError: (state) => state.claimStateError,
  get_dialogClaimStatus: (state) => state.dialogClaimStatus,
};
const actions = {
  OpenDialogClaimStatus() {
    state.claimStateError = null;
    state.dialogClaimStatus = !state.dialogClaimStatus;
  },
  async GetClaimStatus({ commit }, status) {
    state.loadingClaimState = true;
    state.claimStateError = null;
    await axios
      .get('/ClaimStateManager/' + status.statusId + '/' + status.claimId)
      .then(
        (response) => {
          if (response.status == 200) {
            commit('set_claimStatuses', response.data.data);
          }
          state.loadingClaimState = false;
        },
        (e) => {
          state.claimStateError = e.response.data.message;
          state.loadingClaimState = false;
        }
      )
      .catch(() => {});
  },
  async ChangeClaimStatus({ state }, newStatus) {
    state.loadingClaimState = true;
    state.claimStateError = null;
    await axios
      .post('ClaimStateManager/ChangeClaimStatus', {
        statusId: newStatus.statusId,
        claimId: newStatus.claimId,
        currentOwner: newStatus.currentOwner,
        statusComment: newStatus.statusComment,
        processId: newStatus.processId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.go();
          }
          state.loadingClaimState = false;
        },
        (e) => {
          state.loadingClaimState = false;
          state.claimStateError = e.response.data.message;
        }
      )
      .catch((ex) => {
        state.loadingClaimState = false;
        state.claimStateError = ex;
      });
  },
  async ReverseClaimStatus({ state }, newStatus) {
    state.loadingClaimState = true;
    state.claimStateError = null;
    await axios
      .post('ClaimStateManager/ReverseClaimStatus', {
        statusId: newStatus.statusId,
        claimId: newStatus.claimId,
        comment: newStatus.statusComment,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.go();
            state.dialogClaimStatus = false;
          }
          state.loadingClaimState = false;
        },
        (e) => {
          state.loadingClaimState = false;
          state.claimStateError = e.response.data.message;
        }
      )
      .catch((ex) => {
        state.loadingClaimState = false;
        state.claimStateError = ex;
      });
  },
};
const mutations = {
  set_claimStatuses: (state, data) => (state.ClaimStatus = data),
  set_stateType: (state, data) => (state.stateType = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
