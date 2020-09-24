import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

import Policy from '../views/Policy.vue';

import Funeral from '../components/Funeral.vue';
import FuneralList from '../sections/FuneralPolicy/FuneralList';
import FuneralDetail from '../sections/FuneralPolicy/FuneralDetails';
import PolicyAudit from '../sections/PolicyAudit/AuditList';

import Settings from '../views/Settings';

import GlobalEntities from '../components/GlobalEntities';
import Underwriters from '../sections/GlobalEntities/ListUnderwriters';
import Organizations from '../sections/GlobalEntities/ListOrganizations';

import Packages from '../components/Packages';
import packagesList from '../sections/Packages/PackagesList';

import Processes from '../components/Processes';
import Status from '../sections/Processes/PolicyStates';

import Users from '../components/Users';
import Roles from '../sections/UserAccounts/UserRoles';
import newUser from '../sections/UserAccounts/AddNewUser';

import PolicyHolder from '../components/PolicyHolder';

import policyholderList from '../sections/PolicyHolder/policyHolderList';
import policyholderDetail from '../sections/PolicyHolder/policyHolderDetail';

import Relationship from '../components/Relationship';

import relationshipList from '../sections/Relationships/RelationshipList';
import Forbidden from '../views/Forbidden';

import Claim from '../views/Claims.vue';
import FuneralClaim from '../components/Claims';
import FuneralClaimList from '../sections/Claims/FuneralClaimList';
import FuneralClaimDetail from '../sections/Claims/FuneralClaimDetail';
import AddFuneralBank from '../sections/Claims/NewBankingDetail';

Vue.use(VueRouter);

const routes = [
  {
    path: '/Login',
    name: 'login',
    component: Login,
  },
  {
    path: '/Settings',
    name: 'settings',
    component: Settings,
    children: [
      {
        path: 'GlobalEntities',
        name: 'globalEntities',
        component: GlobalEntities,
        children: [
          {
            path: 'Underwriters',
            name: 'underwriters',
            component: Underwriters,
          },
          {
            path: 'organizations',
            name: 'organizations',
            component: Organizations,
          },
        ],
      },
      {
        path: 'Processes',
        name: 'processes',
        component: Processes,
        children: [
          {
            path: 'Status',
            name: 'status',
            component: Status,
          },
        ],
      },
      {
        path: 'Relationship',
        name: 'relationship',
        component: Relationship,
        children: [
          {
            path: 'relationship',
            name: 'relationshipList',
            component: relationshipList,
          },
        ],
      },
      {
        path: 'Users',
        name: 'users',
        component: Users,
        children: [
          {
            path: 'newUser',
            name: 'newUser',
            component: newUser,
          },
          {
            path: 'roles',
            name: 'roles',
            component: Roles,
          },
        ],
      },
      {
        path: 'Packages',
        name: 'packages',
        component: Packages,
        children: [
          {
            path: 'list',
            name: 'packagesList',
            component: packagesList,
          },
        ],
      },
    ],
  },
  {
    path: '/Policy',
    name: 'policy',
    component: Policy,
    children: [
      {
        path: 'funeral-policy',
        name: 'funeral',
        component: Funeral,
        children: [
          {
            path: 'list',
            name: 'funeralList',
            component: FuneralList,
          },
          {
            path: ':PolicyId',
            name: 'funeralDetail',
            component: FuneralDetail,
            children: [
              {
                path: 'policyAudit',
                name: 'policyAudit',
                component: PolicyAudit,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/Claim',
    name: 'claim',
    component: Claim,
    children: [
      {
        path: 'funeral-claim',
        name: 'funeralClaim',
        component: FuneralClaim,
        children: [
          {
            path: 'list',
            name: 'funeralClaimList',
            component: FuneralClaimList,
          },
          {
            path: ':claimId',
            name: 'funeralClaimDetail',
            component: FuneralClaimDetail,
            children: [
              {
                path: 'AddBank',
                name: 'funeralClaimAdd-bank',
                component: AddFuneralBank,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/PolicyHolder',
    name: 'policyHolder',
    component: PolicyHolder,
    children: [
      {
        path: 'list',
        name: 'policyholderList',
        component: policyholderList,
      },
      {
        path: 'holder/:policyHolderId',
        name: 'policyholderDetail',
        component: policyholderDetail,
      },
    ],
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Forbidden,
  },
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" '../views/About.vue'),
  },*/
];

const router = new VueRouter({
  routes,
});

export default router;
