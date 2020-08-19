import Vue from 'vue';
import Vuex from 'vuex';
import accountsModule from './modules/AccountModule';
import funeralPolicyModule from './modules/FuneralPolicyModule';
import underwriterModule from './modules/UnderwritersModule';
import organizationModule from './modules/OrganizationModule';
import processesModule from './modules/ProcessesModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    accountsModule,
    funeralPolicyModule,
    underwriterModule,
    organizationModule,
    processesModule,
  },
});
