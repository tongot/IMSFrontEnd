import axios from 'axios';
import enums from '../../Dictionary/Dictionary';
import _ from 'lodash';
import store from '../index';
const state = {
  Dependent: null,
  Dependencies: [],
  loadingDependent: false,
  dependentError: null,
  dialogAddDependent: false,
  dialogEditDependent: false,
  DependentPackages: [],
  PolicyId: null,
  EditDependent: null,
};
const getters = {
  get_Dependent: (state) => state.Dependent,
  get_Dependencies: (state) => state.Dependencies,
  get_dialogAddDependent: (state) => state.dialogAddDependent,
  get_dialogEditDependent: (state) => state.dialogEditDependent,
  get_dependentError: (state) => state.dependentError,
  get_dependentPackages: (state) => state.DependentPackages,
  get_loadingDependent: (state) => state.loadingDependent,
  get_EditDependent: (state) => state.EditDependent,
  get_PolicyId: (state) => state.PolicyId,
};
const actions = {
  CloseAddDependentDialog() {
    state.dialogAddDependent = !state.dialogAddDependent;
  },
  CloseEditDependentDialog() {
    state.dialogEditDependent = !state.dialogEditDependent;
  },
  OpenEditDependentDialog({ commit }, dependent) {
    commit('set_editDependent', _.cloneDeep(dependent));

    state.dialogEditDependent = true;
  },
  SetPolicyId({ commit }, policyId) {
    commit('set_policyId', policyId);
  },
  async AddDependent({ dispatch }, dependent) {
    store.state.runningMethod = 'AddDependent';
    store.state.dataForMethod = dependent;
    console.log(dependent);
    state.loadingDependent = true;
    state.dependentError = null;
    await axios
      .post('/policyHolder/addDependent', {
        maritalStatus: dependent.person.maritalStatus,
        salutation: dependent.person.salutation,
        firstName: dependent.person.firstName,
        lastName: dependent.person.lastName,
        middleName: dependent.person.middleName,
        relationshipId: dependent.person.relationshipId,
        gender: dependent.person.gender,
        dateOfBirth: dependent.person.dateOfBirth,
        idNumber: dependent.person.idNumber,
        idType: dependent.person.idType,
        countryOfIssue: dependent.person.countryOfIssue,
        disabled: dependent.person.disabled == 'Yes' ? true : false,
        policyId: state.PolicyId,
        policyStateId: dependent.stateId,
        PolicyCover: dependent.person.cover,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            dispatch('CloseAddDependentDialog');
            state.dialogAddDependent = false;
            state.dependentError = null;
            state.loadingDependent = false;
          }
          state.dependentError = response.data.message;
          state.loadingDependent = false;
        },
        (e) => {
          state.dependentError = e.response.data.message;
          state.loadingDependent = false;
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
  async EditDependentF({ dispatch }, person) {
    store.state.runningMethod = 'EditDependentF';
    store.state.dataForMethod = person;
    state.loadingDependent = true;
    state.dependentError = null;
    await axios
      .put('/policyHolder/UpdateDependent', {
        id: person.id,
        policyId: person.policyId,
        createdOn: person.createdOn,
        maritalStatus: person.maritalStatus,
        salutation: person.salutation,
        firstName: person.firstName,
        lastName: person.lastName,
        middleName: person.middleName,
        relationshipId: person.relationshipId,
        gender: person.gender,
        dateOfBirth: person.dateOfBirth,
        idNumber: person.idNumber,
        idType: person.idType,
        countryOfIssue: person.countryOfIssue,
        disabled: person.disabled == 'Yes' ? true : false,
        PolicyCover: person.policyCover,
        policyStateId: person.policyStateId,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            dispatch('CloseEditDependentDialog');
            state.dialogEditDependent = false;
            state.loadingDependent = false;
          }
          state.dependentError = response.data.message;
          state.loadingDependent = false;
        },
        (e) => {
          state.dependentError = e.response.data.message;
          state.loadingDependent = false;
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
  //get the covers eligible for the dependents of current policy holder
  async GetDependentPackage({ commit }, holderId) {
    store.state.runningMethod = 'GetDependentPackage';
    store.state.dataForMethod = holderId;

    state.loadingDependent = true;
    state.dependentError = null;
    await axios
      .get('/package/GetDependentPackage/' + holderId)
      .then(
        (response) => {
          if (response.status === 200) {
            if (response.data.data === null) {
              state.dependentError = response.data.message;
            }
            commit('set_dependentPackages', response.data.data);
            state.loadingDependent = false;
            return;
          }
        },
        (e) => {
          state.dependentError = e.response.data.message;
          state.loadingDependent = false;
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
  async GetDependenciesForPolicy({ commit, dispatch }, id) {
    dispatch('SetActionRunning', { name: 'GetDependenciesForPolicy', data: id });
    state.Dependencies = [];
    state.loadingDependent = true;
    await axios
      .get('/PolicyHolder/GetPolicyDependents/' + id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_Dependencies', response.data.data);
          }
          state.loadingDependent = false;
        },
        (e) => {
          console.log(e.response);
          state.loadingDependent = false;
          //alert('Error ' + e.response.data.message);
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
  set_editDependent: (state, data) => (state.EditDependent = data),
  set_dependentPackages: (state, data) => (state.DependentPackages = data),
  set_policyId: (state, data) => (state.PolicyId = data),
  set_Dependent: (state, data) => (
    (data.salutation = enums.title[data.salutation]),
    (data.maritalStatus = enums.maritalStatus[data.maritalStatus]),
    (data.gender = enums.gender[data.gender]),
    (data.relationship = enums.relationships[data.relationship]),
    (data.idType = enums.idType[data.idType]),
    (data.disabled = data.disabled ? 'Yes' : 'No'),
    (state.Dependent = data)
  ),
  set_localDependent: (state, data) => (
    (data.salutation = enums.title[data.salutation]),
    (data.maritalStatus = enums.maritalStatus[data.maritalStatus]),
    (data.gender = enums.gender[data.gender]),
    (data.relationship = enums.relationships[data.relationship]),
    (data.idType = enums.idType[data.idType]),
    (data.disabled = data.disabled ? 'Yes' : 'No'),
    state.Dependencies.push(data)
  ),
  set_Dependencies: (state, data) =>
    data.forEach((element) => {
      element.salutation = enums.title[element.salutation];
      element.maritalStatus = enums.maritalStatus[element.maritalStatus];
      element.gender = enums.gender[element.gender];
      element.idType = enums.idType[element.idType];
      element.disabled = element.disabled ? 'Yes' : 'No';
      state.Dependencies.push(element);
    }),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
