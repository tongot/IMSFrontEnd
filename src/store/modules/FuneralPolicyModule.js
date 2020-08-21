import axios from 'axios';

const state = {
  funeralPolicy: null,
  funeralPolicies: [],
  loadingFPolicy: false,
  newPolicyHolderId: null,
  hasPolicy: null,
};
const getters = {
  get_funeralPolicies: (state) => state.funeralPolicies,
  get_funeralPolicy: (state) => state.funeralPolicy,
  get_loadingFPolicy: (state) => state.loadingFPolicy,
  get_hasPolicy: (state) => state.hasPolicy,
};
const actions = {
  setPolicyHolderId({ commit }, id) {
    state.hasPolicy = null;
    commit('set_newPolicyHolderId', id);
  },
  async GetFuneralPolicies({ commit }) {
    state.loadingFPolicy = true;
    axios
      .get('/funeralPolicy/getAll/2')
      .then((response) => {
        if (response.status === 200) {
          commit('set_funeralPolicies', response.data.data);
          state.loadingFPolicy = false;
          return;
        }
        alert(response.data.message);
        state.loadingFPolicy = false;
      })
      .catch(() => {
        alert('something happened');
        state.loadingFPolicy = false;
      });
  },
  async GetPolicyById({ commit }, id) {
    state.loadingFPolicy = true;
    axios
      .get('/funeralPolicy/GetFuneralPolicy/' + id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_funeralPolicy', response.data.data);
            state.loadingFPolicy = false;
            return;
          }
          alert(response.data.message);
          state.loadingFPolicy = false;
        },
        (e) => {
          alert('failed to load data ' + e.response);
          state.loadingFPolicy = false;
        }
      )
      .catch(() => {
        alert('Failed to load data');
        state.loadingFPolicy = false;
      });
  },
  async HasPolicy({ commit }) {
    state.loadingFPolicy = true;
    axios
      .get('/funeralPolicy/HasPolicy/' + state.newPolicyHolderId)
      .then((response) => {
        if (response.status === 200) {
          commit('set_hasPolicy', response.data.data);
          state.loadingFPolicy = false;
          return;
        }
        alert(response.data.message);
        state.loadingFPolicy = false;
      })
      .catch(() => {
        alert('something happened');
        state.loadingFPolicy = false;
      });
  },
};
const mutations = {
  set_funeralPolicies: (state, data) => (state.funeralPolicies = data),
  set_funeralPolicy: (state, data) => (state.funeralPolicy = data),
  set_newPolicyHolderId: (state, data) => (state.newPolicyHolderId = data),
  set_hasPolicy: (state, data) => (state.hasPolicy = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
