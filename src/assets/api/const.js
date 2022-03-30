//这里写常量
var login = 0;//表示未登录
export function setLoginState(isLogin) { //无法对常量进行直接修改，故写了get、set方法间接修改
  login = isLogin;
}

export function getLoginState() {
  return login;
}
