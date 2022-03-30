import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//状态
const state = {
  menuActive:'', //菜单栏状态

};

//方法
const mutations = {
  changeActive(state, active) {
    state.menuActive = active;
  },
};


export default new Vuex.Store({
  state, mutations
});
