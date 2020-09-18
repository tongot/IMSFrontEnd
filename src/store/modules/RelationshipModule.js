import axios from 'axios';
import store from '../index';
const state = {
  Relationship: null,
  Relationships: [],
  loadingRelationship: false,
  relationshipError: null,
  ModalRelationship: false,
};
const getters = {
  get_Relationships: (state) => state.Relationships,
  get_loadingRelationship: (state) => state.loadingRelationship,
  get_relationshipError: (state) => state.relationshipError,
  get_ModalRelationship: (state) => state.ModalRelationship,
};
const actions = {
  ClearErrorRelationship() {
    state.relationshipError = null;
  },
  CloseModalRelationship() {
    state.ModalRelationship = !state.ModalRelationship;
  },
  async GetRelationships({ commit, dispatch }) {
    dispatch('SetActionRunning', { name: 'GetRelationships', data: null });
    state.loadingRelationship = true;
    state.relationshipError = null;
    await axios
      .get('Relationship/getAll')
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_Relationships', response.data.data);
          }
          state.loadingRelationship = false;
        },
        (e) => {
          state.loadingRelationship = false;
          console.log(e.response.data);
        }
      )
      .catch((ex) => {
        alert('Error ' + ex);
        state.loadingPolicyHolder = false;
      });
  },
  async AddRelationship({ commit }, relation) {
    store.state.runningMethod = 'AddRelationship';
    store.state.dataForMethod = relation;
    state.loadingRelationship = true;
    state.relationshipError = null;
    axios
      .post('/relationship', {
        name: relation.name,
      })
      .then(
        (response) => {
          if (response.status === 201) {
            state.loadingRelationship = false;
            state.ModalRelationship = false;
            state.Relationships.push(response.data.data);
            commit('set_Relationship', response.data.data);
            return;
          }
          state.loadingRelationship = false;
          state.relationshipError = response.data.message;
        },
        (e) => {
          state.loadingRelationship = false;
          state.relationshipError = e.response.data.message;
        }
      )
      .catch((ex) => {
        alert('Error ' + ex);
        state.loadingPolicyHolder = false;
      });
  },
  async EditRelationship({ commit }, relation) {
    store.state.runningMethod = 'EditRelationship';
    store.state.dataForMethod = relation;
    console.log(relation);
    state.loadingRelationship = true;
    state.relationshipError = null;
    axios
      .put('/relationship', {
        name: relation.name,
        id: relation.id,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            state.loadingRelationship = false;
            state.ModalRelationship = false;
            commit('set_localRelation', relation);
            return;
          }
          state.loadingRelationship = false;
          state.relationshipError = response.data.message;
        },
        (e) => {
          state.loadingRelationship = false;
          state.relationshipError = e.response.data.message;
        }
      )
      .catch((ex) => {
        alert('Error ' + ex);
        state.loadingPolicyHolder = false;
      });
  },
};
const mutations = {
  set_localRelation: (state, data) => (state.Relationships[data.index] = data),
  set_Relationships: (state, data) => (state.Relationships = data),
  set_Relationship: (state, data) => (state.Relationship = data),
};
export default {
  state,
  actions,
  mutations,
  getters,
};
