import axios from 'axios';
const state = {
  status: [],
  loadingState: false,
  stateError: null,
};
const getters = {
  get_Status: (state) => state.status,
  get_loadingStatus: (state) => state.loadingState,
  get_statusError: (state) => state.stateError,
};
const actions = {
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
