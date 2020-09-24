import axios from 'axios';
const state = {
  loadingAuditData: false,
  auditError: null,
  AuditList: {
    headers: [
      { text: 'Initiated By', align: 'start', sortable: false, value: 'userId' },
      { text: 'From state', value: 'fromStatusName', sortable: false },
      { text: 'To state', value: 'toStatusName', sortable: false },
      { text: 'Old Owner', value: 'oldOwnerId', sortable: false },
      { text: 'New Owner', value: 'newOwnerId', sortable: false },
      { text: 'Activity', value: 'activity', sortable: false },
      { text: 'Comment', value: 'comment', sortable: false },
      { text: 'Date', value: 'date' },
    ],
    data: [],
  },
};
const getters = {
  get_auditData: (state) => state.AuditList,
  get_loadingAuditData: (state) => state.loadingAuditData,
  get_auditError: (state) => state.auditError,
};
const actions = {
  async GetAuditForPolicy({ commit }, id) {
    console.log(id);
    state.loadingAuditData = true;
    axios
      .get('audit/GetPolicyAudit/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_auditData', response.data.data);
        }
        state.loadingAuditData = false;
      })
      .catch((ex) => {
        state.auditError = ex;
        state.loadingAuditData = false;
      });
  },
};
const mutations = {
  set_auditData: (state, data) => (state.AuditList.data = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
