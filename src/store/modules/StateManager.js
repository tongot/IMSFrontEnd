import axios from 'axios';
const state = {
  status: [],
  loadingState: false,
  stateError: null,
  dialogStatus: false,
};
const getters = {
  get_Status: (state) => state.status,
  get_loadingStatus: (state) => state.loadingState,
  get_statusError: (state) => state.stateError,
  get_dialogStatus: (state) => state.dialogStatus,
};
const actions = {
  OpenDialogStatus() {
    state.stateError = null;
    state.dialogStatus = !state.dialogStatus;
  },
  async GetStatus({ commit }, status) {
    state.loadingState = true;
    state.stateError = null;
    await axios
      .get('/stateManager/' + status.id + '/' + status.processId)
      .then(
        (response) => {
          if (response.status == 200) {
            commit('set_Statuses', response.data.data);
          }
          state.loadingState = false;
        },
        (e) => {
          state.stateError = e.response.data.message;
          state.loadingState = false;
        }
      )
      .catch(() => {});
  },
  async ChangeStatus({ dispatch }, newStatus) {
    state.loadingState = true;
    state.stateError = null;
    await axios
      .post('StateManager/ChangeStatus', {
        statusId: newStatus.statusId,
        policyId: newStatus.policyId,
        currentOwner: newStatus.currentOwner,
        statusComment: newStatus.statusComment,
        processId: newStatus.processId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            const status = {
              id: newStatus.statusId,
              processId: newStatus.processId,
            };
            dispatch('GetStatus', status);
            dispatch('GetPolicyOwner', response.data.message);
            state.dialogStatus = false;
          }
          state.loadingState = false;
        },
        (e) => {
          state.loadingState = false;
          state.stateError = e.response.data.message;
        }
      )
      .catch((ex) => {
        state.loadingState = false;
        state.stateError = ex;
      });
  },
};
const mutations = {
  set_Statuses: (state, data) => (state.status = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
