import axios from 'axios';
import store from '..';
//import _ from 'lodash';

const state = {
  Packages: [],
  Package: null,
  loadingPackages: false,
  packagesError: null,
  ModalAddPackage: false,
  ModalEditPackage: false,
  dependentPackage: null,
  DependentCover: null,
  policyHolderCover: null,
  ModalEditCover: false,
  dependentIndex: null,
  EditCover: null,
};
const getters = {
  get_Packages: (state) => state.Packages,
  get_Package: (state) => state.Package,
  get_loadingPackage: (state) => state.loadingPackages,
  get_packagesError: (state) => state.packagesError,
  get_ModalAddPackage: (state) => state.ModalAddPackage,
  get_ModalEditPackage: (state) => state.ModalEditPackage,
  get_dependentCover: (state) => state.dependentPackage,
  get_policyHolderCover: (state) => state.policyHolderCover,
  get_ModalEditCover: (state) => state.ModalEditCover,
  get_EditCover: (state) => state.EditCover,
};
const actions = {
  CloseModalPackage() {
    state.ModalAddPackage = !state.ModalAddPackage;
  },
  OpenModalEditCover() {
    state.ModalEditCover = !state.ModalEditCover;
  },
  CloseModalEditCover() {
    state.ModalEditCover = !state.ModalEditCover;
  },
  CloseModalPackageEdit() {
    state.ModalEditPackage = !state.ModalEditPackage;
  },
  async GetPackages({ commit }) {
    store.state.runningMethod = 'GetPackages';

    state.loadingPackages = true;
    state.packagesError = null;
    axios
      .get('/package/getAll')
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_Packages', response.data.data);
            state.loadingPackages = false;
            return;
          }
          state.packagesError = response.data.message;
          state.loadingPackages = false;
        },
        (e) => {
          state.loadingPackages = false;
          state.packagesError = e.response.data.message;
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
  async AddPackage({ commit }, Package) {
    store.state.runningMethod = 'AddPackage';
    store.state.dataForMethod = Package;

    state.packagesError = null;
    state.loadingPackages = true;
    axios
      .post('/package', {
        name: Package.name,
        monthlyContribution: Package.monthlyContribution,
        coverAmount: Package.coverAmount,
        tombStone: Package.tombStone,
        groceryAmount: Package.groceryAmount,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            state.packagesError = null;
            state.loadingPackages = false;
            state.ModalAddPackage = false;
            state.Packages.push(response.data.data);
            commit('set_Package', response.data.data);
            return;
          }
          state.loadingPackages = false;
          state.packagesError = response.data.message;
        },
        (e) => {
          state.loadingPackages = false;
          state.packagesError = e.response.data.message;
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
  async EditPackage({ commit }, Package) {
    store.state.runningMethod = 'EditPackage';
    store.state.dataForMethod = Package;
    state.packagesError = null;
    state.loadingPackages = true;
    axios
      .put('/package', {
        id: Package.id,
        name: Package.name,
        monthlyContribution: Package.monthlyContribution,
        coverAmount: Package.coverAmount,
        tombStone: Package.tombStone,
        groceryAmount: Package.groceryAmount,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            state.packagesError = null;
            state.loadingPackages = false;
            state.ModalEditPackage = false;
            commit('set_EditPackage', Package);
            return;
          }
          state.loadingPackages = false;
          state.packagesError = response.data.message;
        },
        (e) => {
          state.loadingPackages = false;
          state.packagesError = e.response.data.message;
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
  async AddDependentPackage({ commit }, Package) {
    store.state.runningMethod = 'AddDependentPackage';
    store.state.dataForMethod = Package;
    state.packagesError = null;
    state.loadingPackages = true;
    axios
      .post('/DependentPackage', {
        name: Package.name,
        monthlyContribution: Package.monthlyContribution,
        coverAmount: Package.coverAmount,
        tombStone: Package.tombStone,
        groceryAmount: Package.groceryAmount,
        packageId: Package.packageId,
        relationshipId: Package.relationshipId,
        ageLimit: Package.ageLimit,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            state.packagesError = null;
            state.loadingPackages = false;
            state.ModalAddPackage = false;
            //push dependent package added
            state.Packages[Package.index].dependentPackages.push(response.data.data);
            commit('set_Package', response.data.data);
            return;
          }
          state.loadingPackages = false;
          state.packagesError = response.data.message;
        },
        (e) => {
          state.loadingPackages = false;
          state.packagesError = e.response.data.message;
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
  async EditDependentPackage({ commit }, Package) {
    store.state.runningMethod = 'EditDependentPackage';
    store.state.dataForMethod = Package;
    state.packagesError = null;
    state.loadingPackages = true;
    axios
      .put('/DependentPackage', {
        id: Package.id,
        name: Package.name,
        monthlyContribution: Package.monthlyContribution,
        coverAmount: Package.coverAmount,
        tombStone: Package.tombStone,
        groceryAmount: Package.groceryAmount,
        packageId: Package.packageId,
        relationshipId: Package.relationshipId,
        ageLimit: Package.ageLimit,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            state.packagesError = null;
            state.loadingPackages = false;
            state.ModalEditPackage = false;
            commit('set_EditDependentPackage', Package);
            return;
          }
          state.loadingPackages = false;
          state.packagesError = response.data.message;
        },
        (e) => {
          state.loadingPackages = false;
          state.packagesError = e.response.data.message;
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
  async GetDependentCover({ commit }, id) {
    store.state.runningMethod = 'GetDependentCover';
    store.state.dataForMethod = id;
    state.loadingPackages = true;
    state.DependentCover = null;
    axios
      .get('/DependentPackage/' + id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_dependentCover', response.data.data);
            state.loadingPackages = false;
            return;
          }
          state.packagesError = response.data.message;
          state.loadingPackages = false;
        },
        (e) => {
          state.loadingPackages = false;
          state.packagesError = e.response.data.message;
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
  async GetPolicyHolderCover({ commit, dispatch }, id) {
    dispatch('SetActionRunning', { name: 'GetPolicyHolderCover', data: id });

    state.loadingPackages = true;
    state.policyHolderCover = null;
    axios
      .get('/policyCover/GetPolicyHolderCover/' + id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_policyHolderCover', response.data.data);
            state.loadingPackages = false;
            return;
          }
          state.packagesError = response.data.message;
          state.loadingPackages = false;
        },
        (e) => {
          state.loadingPackages = false;
          state.packagesError = e.response.data.message;
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
  async EditCover({ commit }, cover) {
    store.state.runningMethod = 'EditCover';
    store.state.dataForMethod = cover;

    console.log(cover);
    state.loadingPackages = true;
    state.packagesError = null;
    await axios
      .put('/policyCover', {
        fPolicyId: cover.policyId,
        policyStateId: cover.policyState,
        id: cover.Cover.id,
        payPoint: cover.Cover.payPoint,
        djcDate: cover.Cover.djcDate,
        djfDate: cover.Cover.djfDate,
        dpsDate: cover.Cover.dpsDate,
        packageId: cover.Cover.packageId,
        effectiveDate: cover.Cover.effectiveDate,
        ownerId: cover.Cover.ownerId,
        oldPolicyPackageId: cover.oldPackageId,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            commit('set_policyHolderCover', cover);
            state.ModalEditCover = false;
            state.loadingPackages = false;
            return;
          }
          state.packagesError = response.data.message;
          state.loadingPackages = false;
        },
        (e) => {
          state.packagesError = e.response.data.message;
          state.loadingPackages = false;
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
  async GetCoverById({ commit }, id) {
    store.state.runningMethod = 'GetCoverById';
    store.state.dataForMethod = id;
    state.loadingPackages = true;
    state.packagesError = null;
    await axios.get('/policyCover/' + id).then((response) => {
      if (response.status === 200) {
        commit('set_EditCover', response.data.data);
      }
      state.loadingPackages = false;
    });
  },
};
const mutations = {
  set_EditCover: (state, data) => (state.EditCover = data),
  set_Packages: (state, data) => (state.Packages = data),
  set_Package: (state, data) => (state.Package = data),
  set_dependentCover: (state, data) => (state.dependentPackage = data),
  set_policyHolderCover: (state, data) => (state.policyHolderCover = data),
  set_EditPackage: (state, data) => (
    (state.Packages[data.index].name = data.name),
    (state.Packages[data.index].monthlyContribution = data.monthlyContribution),
    (state.Packages[data.index].coverAmount = data.coverAmount),
    (state.Packages[data.index].tombStone = data.tombStone),
    (state.Packages[data.index].groceryAmount = data.groceryAmount)
  ),
  set_EditDependentPackage: (state, data) => (
    (state.Packages[data.index].dependentPackages[data.index2].name = data.name),
    (state.Packages[data.index].dependentPackages[data.index2].monthlyContribution = data.monthlyContribution),
    (state.Packages[data.index].dependentPackages[data.index2].coverAmount = data.coverAmount),
    (state.Packages[data.index].dependentPackages[data.index2].tombStone = data.tombStone),
    (state.Packages[data.index].dependentPackages[data.index2].groceryAmount = data.groceryAmount),
    (state.Packages[data.index].dependentPackages[data.index2].packageId = data.packageId),
    (state.Packages[data.index].dependentPackages[data.index2].ageLimit = data.ageLimit),
    (state.Packages[data.index].dependentPackages[data.index2].relationshipId = data.relationshipId)
  ),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
