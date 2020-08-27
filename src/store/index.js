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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSnack: false,
    snackText: '',
  },
  getters: {
    get_snackText: (state) => state.snackText,
  },
  mutations: {},
  actions: {},
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
  },
});
