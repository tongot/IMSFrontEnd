import axios from 'axios';
import router from '../../router';
import store from '../index';
const state = {
  organizationError: null,
  loadingOrganization: false,
  organizations: [],
  organization: null,
  organizationEditModal: false,
  organizationAddModal: false,
};
const getters = {
  get_loadingOrganization: (state) => state.loadingOrganization,
  get_OrganizationError: (state) => state.organizationError,
  get_Organizations: (state) => state.organizations,
  get_Organization: (state) => state.organization,
  get_organizationEditModal: (state) => state.organizationEditModal,
  get_organizationAddModal: (state) => state.organizationAddModal,
};
const actions = {
  setCurrentOrganization({ commit }, org) {
    commit('set_organization', org);
  },
  CloseModalOrg() {
    state.organizationEditModal = !state.organizationEditModal;
  },
  CloseModalAddOrg() {
    state.organizationAddModal = !state.organizationAddModal;
  },
  async GetOrganizations({ commit }) {
    store.state.runningMethod = 'GetOrganizations';

    state.loadingOrganization = true;
    state.organizationError = null;
    axios
      .get('/Organization/getAll')
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_organizations', response.data.data);
          }
          commit('set_organizationError', response.data.message);
          state.loadingOrganization = false;
        },
        (e) => {
          commit('set_organizationError', e.response.data.message);
          state.loadingOrganization = false;
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
  async GetOrganizationById({ commit }, id) {
    store.state.runningMethod = 'GetOrganizationById';
    store.state.dataForMethod = id;

    state.loadingOrganization = true;
    state.organizationError = null;
    axios
      .get('/Organization/' + id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_organization', response.data.data);
          }
          commit('set_organizationError', response.data.message);
          state.loadingOrganization = false;
        },
        (e) => {
          commit('set_organizationError', e.response.data.message);
          state.loadingOrganization = false;
        }
      )
      .catch((ex) => {
        commit('set_organizationError', ex);
        state.loadingPolicyHolder = false;
      });
  },
  async UpdateOrganization({ commit }) {
    store.state.runningMethod = 'UpdateOrganization';

    state.loadingOrganization = true;
    state.organizationError = null;
    axios
      .put('/Organization', {
        id: state.organization.id,
        name: state.organization.name,
        phone: state.organization.phone,
        email: state.organization.email,
        contactPerson: state.organization.contactPerson,
        contactPersonNumber: state.organization.contactPersonNumber,
        postalAddress: state.organization.postalAddress,
        physicalAddress: state.organization.physicalAddress,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.go();
          }
          commit('set_organizationError', response.data.message);
          state.loadingOrganization = false;
        },
        (e) => {
          commit('set_organizationError', e.response.data.message);
          state.loadingOrganization = false;
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
  async AddNewOrganization({ commit }, organization) {
    store.state.runningMethod = 'AddNewOrganization';
    store.state.dataForMethod = organization;

    state.loadingOrganization = true;
    state.organizationError = null;
    axios
      .post('/Organization', {
        name: organization.name,
        phone: organization.phone,
        email: organization.email,
        contactPerson: organization.contactPerson,
        contactPersonNumber: organization.contactPersonNumber,
        postalAddress: organization.postalAddress,
        physicalAddress: organization.physicalAddress,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            router.go();
          }
          commit('set_organizationError', response.data.message);
          state.loadingOrganization = false;
        },
        (e) => {
          commit('set_organizationError', e.response.data.message);
          state.loadingOrganization = false;
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
  set_organizations: (state, data) => (state.organizations = data),
  set_organizationError: (state, data) => (state.organizationError = data),
  set_organization: (state, data) => (state.organization = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
