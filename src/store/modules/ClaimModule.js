import axios from 'axios';

const state = {
  ClaimOwner: null,
  loadingClaim: false,
  claimError: null,
  EditClaim: null,
};
const getters = {
  get_claimOwner: (state) => state.ClaimOwner,
  get_loadingClaim: (state) => state.loadingClaim,
  get_claimError: (state) => state.claimError,
  get_EditClaim: (state) => state.EditClaim,
};
const actions = {
  async GetClaimOwner({ commit }, id) {
    state.loadingPolicy = true;
    state.policyError = null;
    await axios
      .get('/claims/claimOwner/' + id)
      .then(
        (response) => {
          if (response.status == 200) {
            commit('set_claimOwner', response.data.data);
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
  set_claimOwner: (state, data) => (state.ClaimOwner = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
