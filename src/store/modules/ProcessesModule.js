import axios from 'axios';
import router from '../../router';
//import router from '../../router';
import store from '../index';
const state = {
  processes: [],
  process: null,
  loadingProcess: false,
  processError: null,
  stateError: null,
  loadingState: false,
};
const getters = {
  get_processes: (state) => state.processes,
  get_process: (state) => state.process,
  get_processError: (state) => state.processError,
  get_loadingProcess: (state) => state.loadingProcess,
  get_stateError: (state) => state.stateError,
  get_loadingState: (state) => state.loadingState,
};
const actions = {
  async GetProcesses({ commit }) {
    store.state.runningMethod = 'GetProcesses';

    state.loadingProcess = true;
    state.processError = null;
    axios
      .get('/state/getAll')
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_processes', response.data.data);
          }
          commit('set_processError', response.data.message);
          state.loadingProcess = false;
        },
        (e) => {
          commit('set_processError', e.response.data.message);
          state.loadingProcess = false;
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
  async AddProcess({ commit }, process) {
    store.state.runningMethod = 'AddProcess';
    store.state.dataForMethod = process;
    state.loadingProcess = true;
    state.processError = null;
    axios
      .post('/state/AddProcess', {
        name: process.name,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            router.go();
          }
          commit('set_processError', response.data.message);
          state.loadingProcess = false;
        },
        (e) => {
          commit('set_processError', e.response.data.message);
          state.loadingProcess = false;
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
  async EditProcess({ commit }, process) {
    store.state.runningMethod = 'EditProcess';
    store.state.dataForMethod = process;
    state.loadingProcess = true;
    state.processError = null;
    axios
      .put('/state/UpdateProcess', {
        id: process.id,
        name: process.name,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.go();
          }
          commit('set_processError', response.data.message);
          state.loadingProcess = false;
        },
        (e) => {
          commit('set_processError', e.response.data.message);
          state.loadingProcess = false;
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
  async AddStatus({ commit }, status) {
    store.state.runningMethod = 'AddStatus';
    store.state.dataForMethod = status;
    state.loadingState = true;
    state.processError = null;
    axios
      .post('/state/AddState', {
        displayName: status.displayName,
        name: status.name,
        order: status.order,
        processId: status.processId,
        active: true,
        isFinal: status.isFinal,
        isActiveState: status.isActiveState,
        rolesAllowed: status.roles,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            router.go();
          }
          commit('set_stateError', response.data.message);
          state.loadingState = false;
        },
        (e) => {
          commit('set_stateError', e.response.data.message);
          state.loadingState = false;
        }
      )
      .catch((ex) => {
        state.processError = ex.response.status;
        state.loadingPolicyHolder = false;
      });
  },
  async EditStatus({ commit }, status) {
    store.state.runningMethod = 'EditStatus';
    store.state.dataForMethod = status;

    state.loadingState = true;
    state.processError = null;
    console.log(status);
    axios
      .put('/state/UpdateStatus', {
        id: status.id,
        displayName: status.displayName,
        name: status.name,
        order: status.order,
        processId: status.processId,
        Active: status.active,
        isFinal: status.isFinal,
        rolesAllowed: status.roles,
        isActiveState: status.isActiveState,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.go();
          }
          commit('set_stateError', response.data.message);
          state.loadingState = false;
        },
        (e) => {
          commit('set_stateError', e.response.data.message);
          state.loadingState = false;
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
  set_processError: (state, data) => (state.processError = data),
  set_processes: (state, data) => (state.processes = data),
  set_stateError: (state, data) => (state.stateError = data),
};

export default {
  state,
  actions,
  mutations,
  getters,
};
