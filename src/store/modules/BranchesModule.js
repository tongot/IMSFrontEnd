import axios from 'axios';
import router from '../../router';
import _ from 'lodash';
const state = {
  Branches: [],
  Branch: null,
  loadBranch: false,
  errorBranch: null,
};
const getters = {
  get_Branches: (state) => state.Branches,
  get_Branch: (state) => state.Branch,
  get_loadBranch: (state) => state.loadBranch,
  get_errorBranch: (state) => state.errorBranch,
};
const actions = {
  SetEditBranch({ commit }, branch) {
    commit('set_EditBranch', _.clone(branch));
  },
  async GetBranches({ commit }, id) {
    state.loadBranch = true;
    await axios
      .get('Branch/GetForOrg/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_Branches', response.data.data);
        }
        state.loadBranch = false;
      })
      .catch((ex) => {
        state.loadBranch = false;
        alert('could not load branch ' + ex);
      });
  },
  async GetBranchById({ commit }, id) {
    state.loadBranch = true;
    await axios
      .get('Branch/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_EditBranch', response.data.data);
        }
        state.loadBranch = false;
      })
      .catch((ex) => {
        state.loadBranch = false;
        alert('could not load branch ' + ex);
      });
  },
  async AddBranch({ state }, branch) {
    state.loadBranch = true;
    state.errorBranch = null;
    axios
      .post('Branch', {
        name: branch.name,
        region: branch.region,
        Phone: branch.phone,
        email: branch.email,
        contactPerson: branch.contactPerson,
        contactPersonNumber: branch.contactPersonNumber,
        faxNumber: branch.faxNumber,
        postalAddress: branch.postalAddress,
        physicalAddress: branch.physicalAddress,
        organizationId: branch.organizationId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.go();
          }
          state.loadBranch = false;
        },
        (er) => {
          state.loadBranch = false;
          state.errorBranch = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorBranch = ex;
      });
  },
  async EditBranch({ state }, branch) {
    state.loadBranch = true;
    state.errorBranch = null;
    axios
      .put('Branch', {
        id: branch.id,
        name: branch.name,
        region: branch.region,
        Phone: branch.phone,
        email: branch.email,
        contactPerson: branch.contactPerson,
        contactPersonNumber: branch.contactPersonNumber,
        faxNumber: branch.faxNumber,
        postalAddress: branch.postalAddress,
        physicalAddress: branch.physicalAddress,
        organizationId: branch.organizationId,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.push({ name: 'branchList' });
          }
          state.loadBranch = false;
        },
        (er) => {
          state.loadBranch = false;
          state.errorBranch = er.response.data.message;
        }
      )
      .catch((ex) => {
        state.errorBranch = ex;
      });
  },
};
const mutations = {
  set_Branches: (state, data) => (state.Branches = data),
  set_EditBranch: (state, data) => (state.Branch = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
