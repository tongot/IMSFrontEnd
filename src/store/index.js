import Vue from 'vue';
import Vuex from 'vuex';
import accountsModule from './modules/AccountModule';
import funeralPolicyModule from './modules/FuneralPolicyModule';
import underwriterModule from './modules/UnderwritersModule';
import organizationModule from './modules/OrganizationModule';
import processesModule from './modules/ProcessesModule';
import policyHolderModule from './modules/PolicyHolderModule';
import packageModule from './modules/PackagesModules';
import dependentModule from './modules/DependentModule';
import relationshipModule from './modules/RelationshipModule';
import StateManager from './modules/StateManager';
import PolicyModule from './modules/PolicyModule';
import ChangeOwnerModule from './modules/ChangeOwnerModule';
import FuneralClams from './modules/FuneralClaims';
import ClaimModule from './modules/ClaimModule';
import ClaimStateManger from './modules/ClaimStateManager';
import ChangeClaimOwner from './modules/ChangeClaimOwner';
import AuditModule from './modules/AuditModule';
import BranchesModule from './modules/BranchesModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSnack: false,
    snackText: '',
    runningMethod: '',
    dataForMethod: null,
    token: sessionStorage.getItem('authToken'),
  },
  getters: {
    get_snackText: (state) => state.snackText,
  },
  mutations: {
    set_RunningAction: (state, data) => ((state.runningMethod = data.name), (state.dataForMethod = data.data)),
    set_Token: (state, data) => (state.token = data),
  },
  actions: {
    SetActionRunning({ commit }, data) {
      commit('set_RunningAction', data);
    },
    SetToken({ commit }, token) {
      commit('set_Token', token);
    },
  },
  modules: {
    accountsModule,
    funeralPolicyModule,
    underwriterModule,
    organizationModule,
    processesModule,
    policyHolderModule,
    packageModule,
    dependentModule,
    relationshipModule,
    StateManager,
    PolicyModule,
    ChangeOwnerModule,
    FuneralClams,
    ClaimModule,
    ClaimStateManger,
    ChangeClaimOwner,
    AuditModule,
    BranchesModule,
  },
});
