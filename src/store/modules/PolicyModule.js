import axios from 'axios';
import _ from 'lodash';
import router from '../../router';

const state = {
  PolicyOwner: null,
  loadingPolicy: false,
  policyError: null,
  EditPolicy: null,
};
const getters = {
  get_policyOwner: (state) => state.PolicyOwner,
  get_loadingPolicy: (state) => state.loadingPolicy,
  get_policyError: (state) => state.policyError,
  get_EditPolicy: (state) => state.EditPolicy,
};
const actions = {
  GetPolicyToEdit({ commit }, policy) {
    commit('set_EditPolicy', _.cloneDeep(policy));
  },
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
  async UpdatePolicy({ state }) {
    state.loadingPolicy = true;
    state.policyError = null;
    await axios
      .put('/policy/Update', {
        policyId: state.EditPolicy.id,
        effectiveDate: state.EditPolicy.effectiveDate,
        applicationDate: state.EditPolicy.applicationDate,
        joiningDate: state.EditPolicy.joiningDate,
        organizationId: state.EditPolicy.organization.id,
        underwriterId: state.EditPolicy.underwriter.id,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.go();
          }
          state.loadingPolicy = false;
        },
        (e) => {
          state.policyError = e.response.data.message;
          state.loadingPolicy = false;
        }
      )
      .catch((ex) => {
        state.policyError = ex;
      });
  },
};
const mutations = {
  set_PolicyOwner: (state, data) => (state.PolicyOwner = data),
  set_EditPolicy: (state, data) => (state.EditPolicy = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
