import axios from 'axios';
import enums from '../../Dictionary/Dictionary';
import _ from 'lodash';
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
  async AddDependent({ commit }, person) {
    state.loadingDependent = true;
    state.dependentError = null;
    await axios
      .post('/policyHolder/addDependent', {
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
        policyId: state.PolicyId,
        PolicyCover: person.cover,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_localDependent', response.data.data);
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
      .catch(() => {
        alert('failed to post dependent');
      });
  },

  //get the covers eligible for the dependents of current policy holder
  async GetDependentPackage({ commit }, holderId) {
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
      .catch(() => {
        alert('failed to get dependent packages');
        state.loadingDependent = false;
      });
  },
  async GetDependenciesForPolicy({ commit }, id) {
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
          state.loadingDependent = false;
          alert('Error ' + e.response.data.message);
        }
      )
      .catch(() => {
        alert('failed to load dependencies');
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
