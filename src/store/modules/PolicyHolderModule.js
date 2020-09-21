import axios from 'axios';
import enums from '../../Dictionary/Dictionary';
import router from '../../router';
import store from '../index';
const state = {
  policyHolder: null,
  policyHolders: [],
  loadingPolicyHolder: false,
  policyHolderError: null,
  dialogAddPolicyHolder: false,
  dialogEditPolicyHolder: false,
  PolicyHolderPages: 0,
};
const getters = {
  get_policyHolder: (state) => state.policyHolder,
  get_policyHolders: (state) => state.policyHolders,
  get_loadingPolicyHolder: (state) => state.loadingPolicyHolder,
  get_policyHolderError: (state) => state.policyHolderError,
  get_dialogAddPolicyHolder: (state) => state.dialogAddPolicyHolder,
  get_dialogEditPolicyHolder: (state) => state.dialogEditPolicyHolder,
  get_policyHolderPages: (state) => state.PolicyHolderPages,
};
const actions = {
  CloseAddPolicyHolderDialog() {
    state.dialogAddPolicyHolder = !state.dialogAddPolicyHolder;
  },
  CloseEditPolicyHolderDialog() {
    state.dialogEditPolicyHolder = !state.dialogEditPolicyHolder;
  },
  setPolicyHolderToEdit({ commit }, policyHolder) {
    commit('set_localPolicyHolder', policyHolder);
    state.dialogEditPolicyHolder = true;
  },
  async GetPolicyHolders({ commit }, search) {
    store.state.runningMethod = 'GetPolicyHolders';
    state.policyHolderError = null;
    state.loadingPolicyHolder = true;
    axios
      .get(
        'PolicyHolder/getAll?page=' +
          search.page +
          '&size=' +
          search.size +
          '&Search=' +
          search.search +
          '&state=' +
          search.status
      )
      .then((response) => {
        if (response.status === 200) {
          state.policyHolders = [];
          commit('set_policyHolders', response.data.data);
          commit('set_policyHolderPages', response.data.numberOfPages);
          state.loadingPolicyHolder = false;
          return;
        }
        state.loadingPolicyHolder = false;
        state.policyHolderError = response.data.message;
      })
      .catch((ex) => {
        if (ex.response.status === 401 || ex.response.status === 403) {
          return;
        }
        alert('Error ' + ex.response.status);
        state.loadingPolicyHolder = false;
      });
  },
  async GetPolicyHolderById({ commit }, id) {
    store.state.runningMethod = 'GetPolicyHolderById';
    store.state.dataForMethod = id;
    state.policyHolderError = null;
    state.loadingPolicyHolder = true;
    axios
      .get('/PolicyHolder/' + id)
      .then((response) => {
        if (response.status === 200) {
          commit('set_policyHolder', response.data.data);
          state.loadingPolicyHolder = false;
          return;
        }
        state.loadingPolicyHolder = false;
        state.policyHolderError = response.data.message;
      })
      .catch((ex) => {
        if (ex.response.status === 401 || ex.response.status === 403) {
          return;
        }
        alert('Error ' + ex.response.status);
        state.loadingPolicyHolder = false;
      });
  },
  async AddPolicyHolder({ commit }, person) {
    store.state.runningMethod = 'AddPolicyHolder';
    store.state.dataForMethod = person;
    state.policyHolderError = null;
    state.loadingPolicyHolder = true;
    axios
      .post('/PolicyHolder', {
        department: person.department,
        branch: person.branch,
        organizationId: person.organizationId,
        maritalStatus: person.maritalStatus,
        occupation: person.occupation,
        salutation: person.salutation,
        firstName: person.firstName,
        lastName: person.lastName,
        middleName: person.middleName,
        gender: person.gender,
        dateOfBirth: person.dateOfBirth,
        idNumber: person.idNumber,
        idType: person.idType,
        countryOfIssue: person.countryOfIssue,
        disabled: person.disabled,
        contact: person.contact,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            commit('set_policyHolder', response.data.data);
            state.policyHolderError = null;
            state.loadingPolicyHolder = false;
            state.dialogAddPolicyHolder = false;
            router.go();
          }
          state.loadingPolicyHolder = false;
          state.policyHolderError = response.data.message;
        },
        (e) => {
          state.loadingPolicyHolder = false;
          state.policyHolderError = e.response.data.message;
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
  async EditPolicyHolder({ commit }, person) {
    (store.state.runningMethod = 'EditPolicyHolder'),
      (store.state.dataForMethod = person),
      (state.policyHolderError = null);
    state.loadingPolicyHolder = true;
    axios
      .put('/PolicyHolder', {
        id: person.id,
        organizationId: person.organizationId,
        department: person.department,
        branch: person.branch,
        maritalStatus: person.maritalStatus,
        occupation: person.occupation,
        salutation: person.salutation,
        firstName: person.firstName,
        lastName: person.lastName,
        middleName: person.middleName,
        gender: person.gender,
        dateOfBirth: person.dateOfBirth,
        idNumber: person.idNumber,
        idType: person.idType,
        countryOfIssue: person.countryOfIssue,
        disabled: person.disabled == 'Yes' ? true : false,
        contact: person.contact,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            commit('set_localPolicyHolder', person);
            state.policyHolderError = null;
            state.loadingPolicyHolder = false;
            state.dialogEditPolicyHolder = false;
          }
          state.loadingPolicyHolder = false;
          state.policyHolderError = response.data.message;
        },
        (e) => {
          state.loadingPolicyHolder = false;
          state.policyHolderError = e.response.data.message;
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
  set_localPolicyHolder: (state, data) => (state.policyHolder = data),
  set_policyHolder: (state, data) => (
    (data.salutation = enums.title[data.salutation]),
    (data.maritalStatus = enums.maritalStatus[data.maritalStatus]),
    (data.gender = enums.gender[data.gender]),
    (data.idType = enums.idType[data.idType]),
    (data.disabled = data.disabled ? 'Yes' : 'No'),
    (state.policyHolder = data)
  ),
  set_policyHolders: (state, data) =>
    data.forEach((element) => {
      element.salutation = enums.title[element.salutation];
      element.maritalStatus = enums.maritalStatus[element.maritalStatus];
      element.gender = enums.gender[element.gender];
      element.idType = enums.idType[element.idType];
      element.disabled = element.disabled ? 'Yes' : 'No';
      state.policyHolders.push(element);
    }),
  set_policyHolderPages: (state, data) => (state.PolicyHolderPages = data),
};
export default {
  state,
  actions,
  getters,
  mutations,
};
