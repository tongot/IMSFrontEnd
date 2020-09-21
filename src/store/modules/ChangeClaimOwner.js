import axios from 'axios';
const state = {
  EligibleClaimUsers: [],
  loadingEligibleClaimUser: false,
  eligibleClaimUserError: null,
  menuAssignClaimUser: false,
};
const getters = {
  get_eligibleClaimUsers: (state) => state.EligibleClaimUsers,
  get_loadingEligibleClaimUser: (state) => state.loadingEligibleClaimUser,
  get_eligibleClaimUserError: (state) => state.eligibleClaimUserError,
  get_menuAssignClaimUser: (state) => state.menuAssignClaimUser,
};
const actions = {
  OpenMenuClaimReassign() {
    state.menuAssignClaimUser = false;
  },
  CloseMenuClaimReassign() {
    state.menuAssignClaimUser = true;
  },
  async GetEligibleClaimUsers({ commit }, Id) {
    state.loadingEligibleClaimUser = true;
    state.eligibleClaimUserError = null;
    state.EligibleClaimUsers = [];
    await axios
      .get('/stateManager/GetUsersToReassign/' + Id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_eligibleUsers', response.data.data);
          }
          state.loadingEligibleClaimUser = false;
        },
        (e) => {
          state.eligibleClaimUserError = e.response.data.message;
          state.loadingEligibleClaimUser = false;
        }
      )
      .catch((ex) => {
        state.eligibleClaimUserError = ex;
      });
  },
  async ManualClaimReassign({ state }, newOwner) {
    state.loadingEligibleClaimUser = true;
    state.eligibleClaimUserError = null;
    await axios
      .post('/ClaimStateManager/ChangeClaimOwner', {
        operator: newOwner.operator,
        newOwner: newOwner.newOwner,
        claimId: newOwner.claimId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            state.loadingEligibleClaimUser = false;
            state.menuAssignClaimUser = false;
          }
        },
        (e) => {
          state.eligibleClaimUserError = e.response.data.message;
          state.loadingEligibleUser = false;
        }
      )
      .catch((ex) => {
        state.eligibleClaimUserError = ex;
        state.loadingEligibleUser = false;
      });
  },
};
const mutations = {
  set_eligibleUsers: (state, data) => (state.EligibleClaimUsers = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
