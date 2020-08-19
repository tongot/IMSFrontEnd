import axios from 'axios';
import router from '../../router';

const state = {
  loginError: null,
  user: null,
  openMenu: false,
  loginLoading: false,
  loadingRoles: false,
  roles: [],
};
const getters = {
  get_user: (state) => state.user,
  get_loginError: (state) => state.loginError,
  get_login_loading: (state) => state.loginLoading,
  get_loadingRoles: (state) => state.loadingRoles,
  get_roles: (state) => state.roles,
};
const actions = {
  async Login({ commit }, credentials) {
    state.loginLoading = true;
    axios
      .post('/userAccount/login', {
        email: credentials.Email,
        password: credentials.Password,
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            commit('set_user', response.data.data);
            state.openMenu = true;
            router.push({ name: 'dashboard' });
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
      .catch((e) => {
        console.log(e);
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
      alert('failed to load roles ' + error.response);
    }
  },
};
const mutations = {
  set_user: (state, data) => (state.user = data),
  set_loginError: (state, data) => (state.loginError = data),
  set_roles: (state, data) => (state.roles = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
