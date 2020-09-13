import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('authToken');

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      if (router.currentRoute.name != 'login') {
        router.push({ name: 'login' });
        sessionStorage.clear();
      }
    }
    if (error.response.status === 403) {
      if (router.currentRoute.name != 'unauthorized') {
        router.push({ name: 'unauthorized' });
        //router.go();
      }
    }
    return Promise.reject(error);
  }
);
/*
axios.interceptors.response.use(
  function(config) {
    return config;
  },
 
  function(error) {
    //console.log(store.state.token);
    if (store.state.token == null) {
      if (router.currentRoute.name != 'login') {
        console.log('hit 2');
        router.push({ name: 'login' });
      }
      return Promise.reject(error);
    }
    if (error.response.status === 401 && store.state.token != null && typeof store.state.token != undefined) {
      subs.push({ name: store.state.runningMethod, data: store.state.dataForMethod });
      axios
        .post('/userAccount/refresh', {
          token: sessionStorage.getItem('authToken'),
          refreshToken: sessionStorage.getItem('ref'),
        })
        .then((response) => {
          if (response.status === 200) {
            subs.push({ name: store.state.runningMethod, data: store.state.dataForMethod });
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.token;
            sessionStorage.setItem('authToken', response.data.data.token);
            sessionStorage.setItem('ref', response.data.data.refreshToken);
            store.commit('set_Token', response.data.data.token);
          } else {
            sessionStorage.clear();
            if (router.currentRoute.name != 'login') {
              console.log('hit 1');
              router.push({ name: 'login' });
            }
            return Promise.reject(error);
          }
        })
        .then(() => {
          console.log('hit');
          console.log(subs);
          if (subs.length > 0) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token;
            store.dispatch(subs[0].name, subs[0].data);
            subs = [];
          }
          return Promise.reject(error);
        })
        .catch(() => {
          //console.log('halalal');
        });
    } else {
      if (router.currentRoute.name != 'login') {
        console.log('hit 3');
        router.push({ name: 'login' });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);*/

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
