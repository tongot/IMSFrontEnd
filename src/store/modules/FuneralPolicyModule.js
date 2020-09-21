import axios from 'axios';
import router from '../../router';
import store from '../index';
import enums from '../../Dictionary/Dictionary';
import _ from 'lodash';
const state = {
  funeralPolicy: null,
  funeralPolicies: [],
  loadingFPolicy: false,
  newPolicyHolderId: null,
  hasPolicy: null,
  ModalAddNewFPolicy: false,
  NameOfHolder: '',
  funeralPolicyErrors: null,
  FPolicyPages: 0,
  Beneficiary: null,
  BeneficiaryDialog: false,
  BeneficiaryEditDialog: false,
  EditBeneficiary: null,
  BeneficiaryError: null,
};
const getters = {
  get_nameOfHolder: (state) => state.NameOfHolder,
  get_funeralPolicies: (state) => state.funeralPolicies,
  get_funeralPolicy: (state) => state.funeralPolicy,
  get_loadingFPolicy: (state) => state.loadingFPolicy,
  get_hasPolicy: (state) => state.hasPolicy,
  get_ModalAddNewFPolicy: (state) => state.ModalAddNewFPolicy,
  get_funeralPolicyErrors: (state) => state.funeralPolicyErrors,
  get_FPolicyPages: (state) => state.FPolicyPages,
  get_beneficiaryDialog: (state) => state.BeneficiaryDialog,
  get_beneficiary: (state) => state.Beneficiary,
  get_beneficiaryEditDialog: (state) => state.BeneficiaryEditDialog,
  get_editBeneficiary: (state) => state.EditBeneficiary,
  get_beneficiaryError: (state) => state.BeneficiaryError,
};
const actions = {
  SetEditBeneficiary({ commit }, beneficiary) {
    commit('set_EditBeneficiary', _.clone(beneficiary));
    state.BeneficiaryEditDialog = true;
  },
  OpenBeneficiaryEditDialog() {
    state.BeneficiaryEditDialog = !state.BeneficiaryEditDialog;
  },
  OpenBeneficiaryDialog() {
    console.log(state.Beneficiary);
    state.BeneficiaryDialog = !state.BeneficiaryDialog;
  },
  setPolicyHolderId({ commit }, holder) {
    state.hasPolicy = null;
    state.NameOfHolder = holder.name;
    commit('set_newPolicyHolderId', holder.id);
  },
  SetBeneficiary({ commit }, beneficiary) {
    commit('set_BeneficiaryLocal', beneficiary);
  },
  ClearBeneficiary() {
    state.Beneficiary = null;
  },
  CloseModalAddNewFPolicy() {
    state.ModalAddNewFPolicy = !state.ModalAddNewFPolicy;
  },
  async GetFuneralPolicies({ commit }, search) {
    store.state.runningMethod = 'GetFuneralPolicies';

    state.loadingFPolicy = true;
    await axios
      .get(
        '/funeralPolicy/GetFPolicies?page=' +
          search.page +
          '&size=' +
          search.size +
          '&Search=' +
          search.search +
          '&state=' +
          search.status +
          '&orgId=' +
          search.orgId
      )
      .then((response) => {
        if (response.status === 200) {
          commit('set_funeralPolicies', response.data.data);
          state.FPolicyPages = response.data.numberOfPages;
          state.loadingFPolicy = false;
          return;
        }
        alert(response.data.message);
        state.loadingFPolicy = false;
      })
      .catch((ex) => {
        if (ex.response.status === 401 || ex.response.status === 403) {
          return;
        }
        alert('Error ' + ex.response.status);
        state.loadingPolicyHolder = false;
      });
  },
  async GetPolicyById({ commit }, id) {
    store.state.runningMethod = 'GetPolicyById';
    store.state.dataForMethod = id;

    state.loadingFPolicy = true;
    await axios
      .get('/funeralPolicy/GetFuneralPolicy/' + id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_funeralPolicy', response.data.data);
            state.loadingFPolicy = false;
            return;
          }
          alert(response.data.message);
          state.loadingFPolicy = false;
        },
        (e) => {
          alert('failed to load data ' + e.response);
          state.loadingFPolicy = false;
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
  async HasPolicy({ commit }) {
    store.state.runningMethod = 'HasPolicy';
    state.loadingFPolicy = true;
    await axios
      .get('/funeralPolicy/HasPolicy/' + state.newPolicyHolderId)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data == null) {
            state.ModalAddNewFPolicy = true;
            state.loadingFPolicy = false;
            return;
          }
          commit('set_hasPolicy', response.data.data);
          state.loadingFPolicy = false;
          return;
        }
        alert(response.data.message);
        state.loadingFPolicy = false;
      })
      .catch((ex) => {
        if (ex.response.status === 401 || ex.response.status === 403) {
          return;
        }
        alert('Error ' + ex.response.status);
        state.loadingPolicyHolder = false;
      });
  },
  async AddFuneralPolicy({ commit }, policy) {
    store.state.runningMethod = 'AddFuneralPolicy';
    store.state.dataForMethod = policy;

    state.loadingFPolicy = true;
    state.funeralPolicyErrors = null;
    await axios
      .post('/funeralPolicy', {
        effectiveDate: policy.effectiveDate,
        applicationDate: policy.applicationDate,
        joiningDate: policy.joiningDate,
        underwriterId: policy.underwriterId,
        organizationId: policy.organizationId,
        processId: policy.processId,
        cover: policy.cover,
        policyHolderId: state.newPolicyHolderId,
        beneficiary: state.Beneficiary,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            commit('set_funeralPolicy', response.data.data);
            state.loadingFPolicy = false;
            state.funeralPolicyErrors = null;
            state.ModalAddNewFPolicy = false;
            state.Beneficiary = null;
            router.push({ name: 'funeralDetail', params: { PolicyId: response.data.data.id } });
          }
          state.loadingFPolicy = false;
          state.funeralPolicyErrors = response.data.message;
        },
        (e) => {
          state.loadingFPolicy = false;
          state.funeralPolicyErrors = e.response.data.message;
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
  async GetBeneficiaryById({ commit }, id) {
    state.loadingFPolicy = true;
    await axios
      .get('/funeralPolicy/GetBeneficiary/' + id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_Beneficiary', response.data.data);
            state.loadingFPolicy = false;
            return;
          }
          alert(response.data.message);
          state.loadingFPolicy = false;
        },
        (e) => {
          alert('failed to load beneficiary ' + e.response);
          state.loadingFPolicy = false;
        }
      )
      .catch((ex) => {
        alert('Error ' + ex);
        state.loadingPolicyHolder = false;
      });
  },
  async UpdateBeneficiary({ dispatch }, beneficiary) {
    console.log(beneficiary);
    state.loadingFPolicy = true;
    state.BeneficiaryError = null;
    await axios
      .put('/funeralPolicy/UpdateBeneficiary', {
        id: beneficiary.id,
        maritalStatus: beneficiary.maritalStatus,
        salutation: beneficiary.salutation,
        firstName: beneficiary.firstName,
        lastName: beneficiary.lastName,
        middleName: beneficiary.middleName,
        gender: beneficiary.gender,
        dateOfBirth: beneficiary.dateOfBirth,
        idNumber: beneficiary.idNumber,
        idType: beneficiary.idType,
        countryOfIssue: beneficiary.countryOfIssue,
        disabled: beneficiary.disabled == 'Yes' ? true : false,
        phoneNumber: beneficiary.phoneNumber,
        address: beneficiary.address,
        relationshipId: beneficiary.relationshipId,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            dispatch('GetBeneficiaryById', beneficiary.id);
            state.BeneficiaryEditDialog = false;
          }
          state.loadingFPolicy = false;
          state.BeneficiaryError = response.data.message;
        },
        (e) => {
          state.loadingFPolicy = false;
          state.BeneficiaryError = e.response.data.message;
        }
      )
      .catch((ex) => {
        state.loadingPolicyHolder = false;
        alert('Error ' + ex.response.status);
      });
  },
};
const mutations = {
  set_funeralPolicies: (state, data) => (state.funeralPolicies = data),
  set_funeralPolicy: (state, data) => (state.funeralPolicy = data),
  set_newPolicyHolderId: (state, data) => (state.newPolicyHolderId = data),
  set_hasPolicy: (state, data) => (state.hasPolicy = data),
  set_Beneficiary: (state, data) => (
    (data.salutation = enums.title[data.salutation]),
    (data.maritalStatus = enums.maritalStatus[data.maritalStatus]),
    (data.gender = enums.gender[data.gender]),
    (data.idType = enums.idType[data.idType]),
    (data.disabled = data.disabled ? 'Yes' : 'No'),
    (state.Beneficiary = data)
  ),
  set_BeneficiaryLocal: (state, data) => (state.Beneficiary = data),
  set_EditBeneficiary: (state, data) => (state.EditBeneficiary = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
