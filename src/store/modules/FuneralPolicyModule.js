import axios from 'axios';
import router from '../../router';
const state = {
  funeralPolicy: null,
  funeralPolicies: [],
  loadingFPolicy: false,
  newPolicyHolderId: null,
  hasPolicy: null,
  ModalAddNewFPolicy: false,
  NameOfHolder: '',
  funeralPolicyErrors: null,
};
const getters = {
  get_nameOfHolder: (state) => state.NameOfHolder,
  get_funeralPolicies: (state) => state.funeralPolicies,
  get_funeralPolicy: (state) => state.funeralPolicy,
  get_loadingFPolicy: (state) => state.loadingFPolicy,
  get_hasPolicy: (state) => state.hasPolicy,
  get_ModalAddNewFPolicy: (state) => state.ModalAddNewFPolicy,
  get_funeralPolicyErrors: (state) => state.funeralPolicyErrors,
};
const actions = {
  setPolicyHolderId({ commit }, holder) {
    state.hasPolicy = null;
    state.NameOfHolder = holder.name;
    commit('set_newPolicyHolderId', holder.id);
  },
  CloseModalAddNewFPolicy() {
    state.ModalAddNewFPolicy = !state.ModalAddNewFPolicy;
  },
  async GetFuneralPolicies({ commit }) {
    state.loadingFPolicy = true;
    await axios
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
    await axios
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
    await axios
      .get('/funeralPolicy/HasPolicy/' + state.newPolicyHolderId)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data == null) {
            state.ModalAddNewFPolicy = true;
            state.loadingFPolicy = false;
            return;
          }
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
  async AddFuneralPolicy({ commit }, policy) {
    state.loadingFPolicy = true;
    state.funeralPolicyErrors = null;
    await axios
      .post('/funeralPolicy', {
        effectiveDate: policy.effectiveDate,
        applicationDate: policy.applicationDate,
        joiningDate: policy.joiningDate,
        underwriterId: policy.underwriterId,
        organizationId: policy.organizationId,
        processId: policy.processId,
        cover: policy.cover,
        policyHolderId: state.newPolicyHolderId,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            commit('set_funeralPolicy', response.data.data);
            state.loadingFPolicy = false;
            state.funeralPolicyErrors = null;
            state.ModalAddNewFPolicy = false;
            router.push({ name: 'funeralDetail', params: { PolicyId: response.data.data.id } });
          }
          state.loadingFPolicy = false;
          state.funeralPolicyErrors = response.data.message;
        },
        (e) => {
          state.loadingFPolicy = false;
          state.funeralPolicyErrors = e.response.data.message;
        }
      )
      .catch(() => {
        alert('failed to post funeral policy');
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
