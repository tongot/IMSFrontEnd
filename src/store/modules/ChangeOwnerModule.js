import axios from 'axios';
const state = {
  EligibleUsers: [],
  loadingEligibleUser: false,
  eligibleUserError: null,
  menuAssignUser: false,
};
const getters = {
  get_eligibleUsers: (state) => state.EligibleUsers,
  get_loadingEligibleUser: (state) => state.loadingEligibleUser,
  get_eligibleUserError: (state) => state.eligibleUserError,
  get_menuAssignUser: (state) => state.menuAssignUser,
};
const actions = {
  OpenMenuReassign() {
    state.menuAssignUser = false;
  },
  CloseMenuReassign() {
    state.menuAssignUser = true;
  },
  async GetEligibleUsers({ commit }, Id) {
    state.loadingEligibleUser = true;
    state.eligibleUserError = null;
    state.EligibleUsers = [];
    await axios
      .get('/stateManager/GetUsersToReassign/' + Id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_eligibleUsers', response.data.data);
          }
          state.loadingEligibleUser = false;
        },
        (e) => {
          state.eligibleUserError = e.response.data.message;
          state.loadingEligibleUser = false;
        }
      )
      .catch((ex) => {
        state.eligibleUserError = ex;
      });
  },
  async ManualReassign({ state }, newOwner) {
    state.loadingEligibleUser = true;
    state.eligibleUserError = null;
    await axios
      .post('/stateManager/ChangeOwner', {
        operator: newOwner.operator,
        newOwner: newOwner.newOwner,
        policyId: newOwner.policyId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            state.loadingEligibleUser = false;
            state.menuAssignUser = false;
          }
        },
        (e) => {
          state.eligibleUserError = e.response.data.message;
          state.loadingEligibleUser = false;
        }
      )
      .catch((ex) => {
        state.eligibleUserError = ex;
        state.loadingEligibleUser = false;
      });
  },
};
const mutations = {
  set_eligibleUsers: (state, data) => (state.EligibleUsers = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
