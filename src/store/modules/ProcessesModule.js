import axios from 'axios';
import router from '../../router';
//import router from '../../router';

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
      .catch(() => {
        commit('set_processError', 'Failed to load data');
        state.loadingProcess = false;
      });
  },
  async AddProcess({ commit }, process) {
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
      .catch(() => {
        commit('set_processError', 'Failed to load data');
        state.loadingProcess = false;
      });
  },
  async EditProcess({ commit }, process) {
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
      .catch(() => {
        commit('set_processError', 'Failed to load data');
        state.loadingProcess = false;
      });
  },
  async AddStatus({ commit }, status) {
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
      .catch(() => {
        commit('set_stateError', 'Failed to load data');
        state.loadingState = false;
      });
  },
  async EditStatus({ commit }, status) {
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
      .catch(() => {
        commit('set_stateError', 'Failed to load data');
        state.loadingState = false;
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
