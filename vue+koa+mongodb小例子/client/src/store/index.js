import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  user: {
    _id: window.sessionStorage.getItem('_id') || '',
    user_name: window.sessionStorage.getItem('user_name') || '',
    token: window.sessionStorage.getItem('token') || '',
    avatar: window.sessionStorage.getItem('avatar') || ''
  }
}

const mutations = {
  save: (state,data) => {
    state.user._id = data._id;
    state.user.token = data.token;
    state.user.user_name = data.user_name;
    state.user.avatar = data.avatar;

    window.sessionStorage.setItem('_id', data._id);
    window.sessionStorage.setItem('token', data.token);
    window.sessionStorage.setItem('user_name', data.user_name);
    window.sessionStorage.setItem('avatar', data.avatar);
  },
  remove: (state) => {
    state.user.token = '';
    state.user.user_name = '';
    state.user.avatar = '';
    state.user._id = '';

    window.sessionStorage.removeItem('_id');
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user_name');
    window.sessionStorage.removeItem('avatar');
  }
}

export default new Vuex.Store({
  state,
  mutations
});