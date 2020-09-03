import axios from 'axios';

const state = {
  PolicyOwner: null,
  loadingPolicy: false,
  policyError: null,
  EditPolicy: false,
};
const getters = {
  get_policyOwner: (state) => state.PolicyOwner,
  get_loadingPolicy: (state) => state.loadingPolicy,
  get_policyError: (state) => state.policyError,
  get_EditPolicy: (state) => state.EditPolicy,
};
const actions = {
  async GetPolicyOwner({ commit }, id) {
    state.loadingPolicy = true;
    state.policyError = null;
    await axios
      .get('/policy/policyOwner/' + id)
      .then(
        (response) => {
          if (response.status == 200) {
            commit('set_PolicyOwner', response.data.data);
          }
          state.loadingPolicy = false;
        },
        (e) => {
          state.policyError = e.response.data.message;
          state.loadingPolicy = false;
        }
      )
      .catch(() => {});
  },
};
const mutations = {
  set_PolicyOwner: (state, data) => (state.PolicyOwner = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
