// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts' // 引入echarts
import md5 from 'js-md5';

// import './assets/icon/iconfont.css'
import {getLoginState} from './assets/api/const'

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
Vue.prototype.$message = Message; //ElementUI绑定在Vue prototy中
const path = ['/admin/systemIndex','/admin/assessment','/admin/cameraSet','/admin/score','/admin/trainingRecord']
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  for(let i = 0;i < path.length;i++){
    if(to.path === path[i]){
      console.log(i);
      store.commit('changeActive', i+1);
    }
  }
  //let isLogin = getLoginState(); //获取当前的登录状态
  next();
  if(to.path === '/'){ //本身就是处于登录页面
  }else{
    /*if(isLogin === 1){
      next();
    }else{
      ElementUI.Message.error('请先登录');
      next('/') //强制进入登录页面
    }*/
  }
});

/* eslint-disable no-new */
var v = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
export default v;
