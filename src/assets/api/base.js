//基本设置
import axios from 'axios';
import qs from 'qs'
import Vue from '../../main'


axios.defaults.baseURL = 'http://192.168.124.2:8888/'; //请求的时候，baseURL+接口URL（不通过代理 需要解决跨域问题） 192.168.149.24
axios.defaults.timeout = 8000;//超时时间
axios.defaults.crossDomain = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'; //修改参数方式为 form-data
axios.defaults.withCredentials = true; //允许请求携带cookie

//在axios配置文件里面加入拦截器
axios.interceptors.request.use(config => {
  //每次发起请求，拦截在这里
  const headers = config.headers;
  config.data = qs.stringify(config.data);//qs自动转换参数格式，将config中的data转换好后再存入data中

  if (config.url.indexOf('login') === -1) {//对非登录页面进行拦截
    let token = localStorage.getItem("token");
    if (token != null) {
      headers['token'] = token;
    }
  }
  // console.log(config);
  return config;

}, err => {
  return Promise.reject(err);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.code === 501){
    //window.reload();//页面刷新
    Vue.$router.push('/');
    Vue.$message.error('登录过期，请重新登录');//或账号在其他地方登录
  }
  return response;
}, function (error) {
  /*console.log(error.response.data);
  console.log(error.response.status); //状态401
  console.log(error.response.headers);
  // 对响应错误做点什么
  if(error.response.status === 501){
    //window.reload();//页面刷新
    Vue.$router.push('/');
    Vue.$message.error('登录过期，请重新登录');//或账号在其他地方登录
  }*/
  return Promise.reject(error);
});

export default axios;
