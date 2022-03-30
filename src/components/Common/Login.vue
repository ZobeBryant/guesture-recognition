<template>
    <div id="root">
      <div class="container">
        <div class="ms-login">
          <div class="ms-title">姿态识别管理系统</div>
          <el-form class="ms-content" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="用户名" style="margin-bottom: 15px" autofocus clearable>
                <template slot="prepend"><i class="el-icon-user"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="密码" style="margin-bottom: 15px" @keyup.enter.native="submitForm('ruleForm')" show-password clearable>
                <template slot="prepend"><i class="el-icon-lock"></i></template> <!--在密码输入框加入事件：@keyup.enter.native, 登录button加入事件：@click-->
              </el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-radio v-model="ruleForm.identity" label="1">考官</el-radio>
              <el-radio v-model="ruleForm.identity" label="2">管理员</el-radio>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" id="login" @click="submitForm('ruleForm')" :loading="LoginLoading">登录 </el-button>
            </div>
            <p class="login-tips" style="color: #f2f2f2">Tips : 请妥善保管好您的登录账号及密码！</p>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
  import '../../../static/css/main.css';   //引入使用相对路径
  import {login} from '../../assets/api/request';
  import {changeTime} from "../../assets/api/utils";

  export default {
    name: "Login",
    data() {
      let checkPhoneOrEmail = function (rule,value,callback) { //这个对象同时校验phone和email
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; //邮箱验证
        const reg = /(^1\d{10}$)|(^[0-9]\d{7}$)/; //手机号验证
        if (! value) {
          return callback(new Error('用户名不能为空'))
        }else{
          if(value.indexOf("@") > 0 ){ //含有字母@
            setTimeout(() => {
              if (mailReg.test(value)) {
                callback()
              } else {
                callback(new Error('邮箱格式不正确'))
              }
            }, 100)
          }else{
            let re = new RegExp(reg);
            if (!re.test(value)) {
              callback(new Error('手机号格式不正确'));
            } else {
              callback();
            }
          }
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
          identity:'1',
        },
        rules: {
          username: [{required: true, message: ' ', trigger: 'blur'}/*,{validator: checkPhoneOrEmail, trigger: 'blur'}*/], //validator传入一个对象
          password: [{required: true, message: ' ', trigger: 'blur'}]
        },
        LoginLoading: false, //登录loading效果
      }
    },
    mounted() {
      var timestamp = Date.parse(new Date());
      // console.log(timestamp);
      // console.log(changeTime(timestamp))
    },
    methods: {
      submitForm(formName) { //登录验证 两种验证方式：一种是检验账号密码是否正确、第二种是检验用户身份（根据用户名检验）
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.LoginLoading = true;
            let password = this.$md5(this.ruleForm.password); //密码加密
            login(this.ruleForm.username, password, this.ruleForm.identity)//登录
              .then(data => {
                // console.log(data);
                if(data.data.code === 200){
                  this.LoginLoading = false;
                  this.$message.success('登录成功');
                  localStorage.setItem("username", this.ruleForm.username);//存用户名
                  localStorage.setItem('token', data.data.token);
                  this.$router.push('/admin/systemIndex'); //页面跳转
                } else{
                  this.LoginLoading = false;
                  this.$message.error('用户名或密码错误');
                }
              })
          } else {
            console.log('error');
            return false;
          }
        });
      },
  },
  }
</script>

<style scoped>
  #root {
    height: 100vh;
    background-image:url('../../../static/img/bgm.jpg');
    background-size: cover;
  }
  /*登录页面*/
  .ms-title { /*后台标题*/
    width: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
    color: #393939;
    border-bottom: 1px solid #ababab;
  }

  .ms-login {
    position: absolute;
    left: 65%;
    top: 46%;
    width: 485px;
    margin: -210px 0 0 -175px;
    border-radius: 8px;
    background: rgba(209, 221, 228, 0.9);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 15px;
  }

  .login-tips {
    font-size: 13px;
    line-height: 30px;
    color: #bfbfbf;
  }

</style>
