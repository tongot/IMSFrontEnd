import axios from 'axios';
import router from '../../router';
const state = {
  status: [],
  loadingState: false,
  stateError: null,
  dialogStatus: false,
  stateType: 'policy',
};
const getters = {
  get_Status: (state) => state.status,
  get_loadingStatus: (state) => state.loadingState,
  get_statusError: (state) => state.stateError,
  get_dialogStatus: (state) => state.dialogStatus,
};
const actions = {
  SetStateType({ commit }, data) {
    commit('set_stateType', data);
  },
  OpenDialogStatus() {
    state.stateError = null;
    state.dialogStatus = !state.dialogStatus;
  },
  async GetStatus({ commit }, status) {
    state.loadingState = true;
    state.stateError = null;
    await axios
      .get('/stateManager/' + status.id + '/' + status.policyId)
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
        type: state.stateType,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            const status = {
              id: newStatus.statusId,
              policyId: newStatus.policyId,
            };
            dispatch('GetStatus', status);
            dispatch('GetPolicyOwner', response.data.message);
            dispatch('GetPolicyById', newStatus.policyId);
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
  async ReverseStatus({ state }, newStatus) {
    state.loadingState = true;
    state.stateError = null;
    await axios
      .post('StateManager/ReverseStatus', {
        statusId: newStatus.statusId,
        policyId: newStatus.policyId,
        comment: newStatus.statusComment,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.go();
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
  set_stateType: (state, data) => (state.stateType = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
