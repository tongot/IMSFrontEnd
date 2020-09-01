import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:5000';

var token = 'Bearer ' + sessionStorage.getItem('authToken');
axios.defaults.headers.common['Authorization'] = token;

axios.interceptors.response.use(
  function(config) {
    return config;
  },
  function(error) {
    if (error.response.status === 401 && sessionStorage.getItem('authToken') != null) {
      axios
        .post('/userAccount/refresh', {
          token: sessionStorage.getItem('authToken'),
          refreshToken: sessionStorage.getItem('ref'),
        })
        .then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem('authToken', response.data.data.token);
            sessionStorage.setItem('ref', response.data.data.refreshToken);
          } else {
            sessionStorage.clear();
            router.push({ name: 'login' });
            return Promise.reject(error);
          }
        })
        .then(() => {
          if (store.state.runningMethod == null || store.state.runningMethod == '') {
            if (sessionStorage.getItem('authToken') != null) {
              router.go();
              return Promise.reject(error);
            } else {
              router.push({ name: 'login' });
            }
          }
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('authToken');
          console.log(store.state.runningMethod + ' ' + store.state.dataForMethod);
          store.dispatch(store.state.runningMethod, store.state.dataForMethod);
        })
        .then(() => {
          store.state.runningMethod = '';
          store.state.dataForMethod = null;
        })
        .catch(() => {
          sessionStorage.clear();
          router.push({ name: 'login' });
          return Promise.reject(error);
        });
    } else {
      router.push({ name: 'login' });
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
