import axios from 'axios';
import router from '../../router';
import store from '../index';
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
    store.state.runningMethod = 'GetFuneralPolicies';

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
      .catch((ex) => {
        if (ex.response.status === 401 || ex.response.status === 403) {
          return;
        }
        alert('Error ' + ex.response.status);
        state.loadingPolicyHolder = false;
      });
  },
  async GetPolicyById({ commit }, id) {
    store.state.runningMethod = 'GetPolicyById';
    store.state.dataForMethod = id;

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
      .catch((ex) => {
        if (ex.response.status === 401 || ex.response.status === 403) {
          return;
        }
        alert('Error ' + ex.response.status);
        state.loadingPolicyHolder = false;
      });
  },
  async HasPolicy({ commit }) {
    store.state.runningMethod = 'HasPolicy';
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
      .catch((ex) => {
        if (ex.response.status === 401 || ex.response.status === 403) {
          return;
        }
        alert('Error ' + ex.response.status);
        state.loadingPolicyHolder = false;
      });
  },
  async AddFuneralPolicy({ commit }, policy) {
    store.state.runningMethod = 'AddFuneralPolicy';
    store.state.dataForMethod = policy;

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
      .catch((ex) => {
        if (ex.response.status === 401 || ex.response.status === 403) {
          return;
        }
        alert('Error ' + ex.response.status);
        state.loadingPolicyHolder = false;
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
