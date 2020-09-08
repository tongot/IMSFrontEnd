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
};
const getters = {
  get_user: (state) => state.user,
  get_loginError: (state) => state.loginError,
  get_login_loading: (state) => state.loginLoading,
  get_loadingRoles: (state) => state.loadingRoles,
  get_roles: (state) => state.roles,
  get_users: (state) => state.users,
  get_userEdit: (state) => state.UserEdit,
};
const actions = {
  SetUser({ commit }, user) {
    commit('set_user', user);
  },
  SetUserEdit({ commit }, user) {
    commit('set_userEdit', _.cloneDeep(user));
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
  async UpdateUser({ dispatch }) {
    state.loadingRoles = true;
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
            dispatch('GetAllUsers');
          }
          state.loadingRoles = false;
          return;
        },
        () => {
          state.loadingRoles = false;
        }
      )
      .catch((ex) => {
        alert('Error ' + ex);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
