import axios from 'axios';
import router from '../../router';

const state = {
  underwriterError: null,
  loadingUnderwriter: false,
  underwriters: [],
  underwriter: null,
  underwriterEditModal: false,
  underwriterAddModal: false,
};
const getters = {
  get_loadingUnderwriter: (state) => state.loadingUnderwriter,
  get_UnderwriterError: (state) => state.underwriterError,
  get_Underwriters: (state) => state.underwriters,
  get_Underwriter: (state) => state.underwriter,
  get_underwriterEditModal: (state) => state.underwriterEditModal,
  get_underwriterAddModal: (state) => state.underwriterAddModal,
};
const actions = {
  CloseModal() {
    state.underwriterEditModal = !state.underwriterEditModal;
  },
  CloseModalAdd() {
    state.underwriterAddModal = !state.underwriterAddModal;
  },
  async GetUnderwriters({ commit }) {
    state.loadingUnderwriter = true;
    state.underwriterError = null;
    axios
      .get('/Underwriter/getAll')
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_underwriters', response.data.data);
          }
          commit('set_underwriterError', response.data.message);
          state.loadingUnderwriter = false;
        },
        (e) => {
          commit('set_underwriterError', e.response.data.message);
          state.loadingUnderwriter = false;
        }
      )
      .catch(() => {
        commit('set_underwriterError', 'Failed to load data');
        state.loadingUnderwriter = false;
      });
  },
  async GetUnderwriterById({ commit }, id) {
    state.loadingUnderwriter = true;
    state.underwriterError = null;
    axios
      .get('/Underwriter/' + id)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_underwriter', response.data.data);
          }
          commit('set_underwriterError', response.data.message);
          state.loadingUnderwriter = false;
        },
        (e) => {
          commit('set_underwriterError', e.response.data.message);
          state.loadingUnderwriter = false;
        }
      )
      .catch(() => {
        commit('set_underwriterError', 'Failed to load data');
        state.loadingUnderwriter = false;
      });
  },
  async UpdateUnderwriter({ commit }) {
    state.loadingUnderwriter = true;
    state.underwriterError = null;
    axios
      .put('/Underwriter', {
        id: state.underwriter.id,
        name: state.underwriter.name,
        commission: state.underwriter.commission,
        phone: state.underwriter.phone,
        email: state.underwriter.email,
        contactPerson: state.underwriter.contactPerson,
        contactPersonNumber: state.underwriter.contactPersonNumber,
        postalAddress: state.underwriter.postalAddress,
        physicalAddress: state.underwriter.physicalAddress,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.go();
          }
          commit('set_underwriterError', response.data.message);
          state.loadingUnderwriter = false;
        },
        (e) => {
          commit('set_underwriterError', e.response.data.message);
          state.loadingUnderwriter = false;
        }
      )
      .catch(() => {
        commit('set_underwriterError', 'Failed to load data');
        state.loadingUnderwriter = false;
      });
  },
  async AddNewUnderwriter({ commit }, underwriter) {
    state.loadingUnderwriter = true;
    state.underwriterError = null;
    axios
      .post('/Underwriter', {
        name: underwriter.name,
        commission: underwriter.commission,
        phone: underwriter.phone,
        email: underwriter.email,
        contactPerson: underwriter.contactPerson,
        contactPersonNumber: underwriter.contactPersonNumber,
        postalAddress: underwriter.postalAddress,
        physicalAddress: underwriter.physicalAddress,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            router.go();
          }
          commit('set_underwriterError', response.data.message);
          state.loadingUnderwriter = false;
        },
        (e) => {
          commit('set_underwriterError', e.response.data.message);
          state.loadingUnderwriter = false;
        }
      )
      .catch(() => {
        commit('set_underwriterError', 'Failed to load data');
        state.loadingUnderwriter = false;
      });
  },
};
const mutations = {
  set_underwriters: (state, data) => (state.underwriters = data),
  set_underwriterError: (state, data) => (state.underwriterError = data),
  set_underwriter: (state, data) => (state.underwriter = data),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
