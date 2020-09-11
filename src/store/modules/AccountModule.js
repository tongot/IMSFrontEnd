import axios from 'axios';
import router from '../../router';
import _ from 'lodash';
//import store from '..';

const state = {
  loginError: null,
  user: null,
  openMenu: false,
  loginLoading: false,
  loadingRoles: false,
  roles: [],
  users: [],
  UserEdit: null,
  AddOrgUserDialog: false,
  AddOrgUserError: null,
  AdminsForOrg: [],
  EditOrgAdminDialog: false,
  AdminUserEdit: null,
};
const getters = {
  get_user: (state) => state.user,
  get_loginError: (state) => state.loginError,
  get_login_loading: (state) => state.loginLoading,
  get_loadingRoles: (state) => state.loadingRoles,
  get_roles: (state) => state.roles,
  get_users: (state) => state.users,
  get_userEdit: (state) => state.UserEdit,
  get_addOrgUserDialog: (state) => state.AddOrgUserDialog,
  get_AddOrgUserError: (state) => state.AddOrgUserError,
  get_adminForOrg: (state) => state.AdminsForOrg,
  get_editOrgAdminsDialog: (state) => state.EditOrgAdminDialog,
  get_adminUserEdit: (state) => state.AdminUserEdit,
};
const actions = {
  OpenDialogEditOrgAdmin() {
    state.EditOrgAdminDialog = !state.EditOrgAdminDialog;
  },
  OpenAddOrgUserDialog() {
    state.AddOrgUserDialog = !state.AddOrgUserDialog;
  },
  SetUser({ commit }, user) {
    commit('set_user', user);
  },
  SetUserEdit({ commit }, user) {
    commit('set_userEdit', _.cloneDeep(user));
  },
  SetAdminUserEdit({ commit }, user) {
    commit('set_adminUserEdit', _.clone(user));
    state.EditOrgAdminDialog = true;
  },
  async Login({ commit, dispatch }, credentials) {
    state.loginLoading = true;
    await axios
      .post('/userAccount/login', {
        email: credentials.Email,
        password: credentials.Password,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            dispatch('SetUser', response.data.data);
            state.openMenu = true;
            sessionStorage.setItem('authToken', response.data.data.token);
            sessionStorage.setItem('ref', response.data.data.refreshToken);
            sessionStorage.setItem('Oid', response.data.data.id);
            router.push({ name: 'dashboard' });
            router.go();
            state.loginLoading = false;
            return;
          }
          commit('set_loginError', response.data.message);
          state.loginLoading = false;
        },
        (e) => {
          commit('set_loginError', e.response.data.message);
          state.loginLoading = false;
        }
      )
      .catch(() => {
        state.loginLoading = false;
      });
  },
  async GetAllRoles() {
    let response;
    response = await axios.get('/userAccount/allRoles');
    try {
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      alert('failed to load roles ' + error);
    }
  },
  async GetUserDetails({ dispatch }) {
    dispatch('SetActionRunning', { name: 'GetUserDetails', data: null });
    if (state.user == null) {
      let response;
      let id = sessionStorage.getItem('Oid');
      if (id != null) {
        response = await axios.get('/userAccount/GetUserDetails/' + id);
        try {
          if (response.status === 200) {
            dispatch('SetUser', response.data);
          }
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            return;
          }
          alert('failed to load roles ' + error.response);
        }
      } else {
        if (router.currentRoute.name != 'login') {
          router.push({ name: 'login' });
        }
      }
    }
  },
  async GetAllUsers({ commit }) {
    state.loadingRoles = true;
    await axios
      .get('/userAccount/GetAllUsers/')
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_allUsers', response.data.data);
          }
          state.loadingRoles = false;
        },
        () => {
          state.loadingRoles = false;
        }
      )
      .catch((ex) => {
        state.loadingRoles = false;
        alert(ex);
      });
  },
  async GetAdminsForOrganization({ commit }, orgId) {
    state.AdminsForOrg = [];
    state.loadingRoles = true;
    await axios
      .get('/userAccount/GetAdminForOrg/' + orgId)
      .then(
        (response) => {
          if (response.status === 200) {
            commit('set_adminsForOrg', response.data.data);
          }
          state.loadingRoles = false;
        },
        () => {
          state.loadingRoles = false;
        }
      )
      .catch((ex) => {
        state.loadingRoles = false;
        alert(ex);
      });
  },
  async RegisterOrgAdminUser({ state }, User) {
    state.AddOrgUserError = null;
    state.loadingRoles = true;
    await axios
      .post('/userAccount/RegisterOrgAdmin', {
        id: User.id,
        name: User.name,
        surname: User.surname,
        email: User.email,
        password: User.password,
        passwordConfirm: User.passwordConfirm,
        organizationId: User.organizationId,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            router.go();
          }
          state.loadingRoles = false;
          return;
        },
        (e) => {
          state.loadingRoles = false;
          state.AddOrgUserError = e.response.data.message;
        }
      )
      .catch((ex) => {
        state.AddOrgUserError = ex;
        state.loadingRoles = false;
      });
  },
  async UpdateUser({ state }) {
    state.loadingRoles = true;
    state.AddOrgUserError = null;
    await axios
      .put('/userAccount/UpdateUser', {
        id: state.UserEdit.id,
        name: state.UserEdit.name,
        surname: state.UserEdit.surname,
        email: state.UserEdit.email,
        roles: state.UserEdit.roles,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.go();
          }
          state.loadingRoles = false;
          return;
        },
        (e) => {
          state.loadingRoles = false;
          state.AddOrgUserError = e.response.data.message;
        }
      )
      .catch((ex) => {
        state.AddOrgUserError = ex;
        state.loadingRoles = false;
      });
  },
  async UpdateUserAdmin({ state }) {
    state.loadingRoles = true;
    state.AddOrgUserError = null;
    await axios
      .put('/userAccount/UpdateUserAdmin', {
        id: state.AdminUserEdit.id,
        name: state.AdminUserEdit.name,
        surname: state.AdminUserEdit.surname,
        email: state.AdminUserEdit.email,
        isActive: state.AdminUserEdit.isActive,
      })
      .then(
        (response) => {
          if (response.status === 204) {
            router.go();
          }
          state.loadingRoles = false;
          return;
        },
        (e) => {
          state.loadingRoles = false;
          state.AddOrgUserError = e.response.data.message;
        }
      )
      .catch((ex) => {
        state.AddOrgUserError = ex;
        state.loadingRoles = false;
      });
  },
};
const mutations = {
  set_user: (state, data) => (state.user = data),
  set_loginError: (state, data) => (state.loginError = data),
  set_roles: (state, data) => (state.roles = data),
  set_allUsers: (state, data) => (state.users = data),
  set_userEdit: (state, data) => (state.UserEdit = data),
  set_adminsForOrg: (state, data) => (state.AdminsForOrg = data),
  set_adminUserEdit: (state, data) => (state.AdminUserEdit = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
