import axios from 'axios';
import router from '../../router';

//import router from '../../router';

const state = {
  funeralPolicy: null,
  funeralPolicies: [],
  loadingFPolicy: false,
};
const getters = {
  get_funeralPolicies: (state) => state.funeralPolicies,
  get_funeralPolicy: (state) => state.funeralPolicy,
  get_loadingFPolicy: (state) => state.loadingFPolicy,
};
const actions = {
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
            router.push({ name: 'funeralDetail', params: { PolicyId: id } });
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
};
const mutations = {
  set_funeralPolicies: (state, data) => (state.funeralPolicies = data),
  set_funeralPolicy: (state, data) => (state.funeralPolicy = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
