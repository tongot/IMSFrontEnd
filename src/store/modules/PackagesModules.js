import axios from 'axios';

const state = {
  Packages: [],
  Package: null,
  loadingPackages: false,
  packagesError: null,
  ModalAddPackage: false,
};
const getters = {
  get_Packages: (state) => state.Packages,
  get_Package: (state) => state.Package,
  get_loadingPackage: (state) => state.loadingPackages,
  get_packagesError: (state) => state.packagesError,
  get_ModalAddPackage: (state) => state.ModalAddPackage,
};
const actions = {
  CloseModalPackage() {
    state.ModalAddPackage = !state.ModalAddPackage;
  },
  async GetPackages({ commit }) {
    state.loadingPackages = true;
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
      .catch(() => {
        alert('something happened');
      });
  },
  async AddPackage({ commit }, Package) {
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
      .catch(() => {
        state.loadingPackages = false;
        state.policyHolderError = 'Error Posting please try again later';
      });
  },
};
const mutations = {
  set_Packages: (state, data) => (state.Packages = data),
  set_Package: (state, data) => (state.Package = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
