<template>
  <div class="header" style="position: relative">
    <header>
      <div class="logo">
        <div class="title"><i class="el-icon-menu" style="margin-right: 10px"></i> 姿态识别系统</div>
      </div>
      <div class="user">
   <!--     <div class="pageNow">
          {{title[menuActive - 1]}}
        </div>-->
        <span class="pic" style="position:absolute; right: 9.5%;top: 50%;transform: translateY(-50%)">
          <el-tooltip class="item" effect="dark" content="请妥善保存好您的账号及密码" placement="bottom">
              <i class="el-icon-question" style="cursor: pointer;color: #ffffff">
                <span style="margin-left: 8px;color: #ffffff">帮助</span>
              </i>
          </el-tooltip>
        </span>
        <span style="position:absolute; right: 6.3%;top: 62%;transform: translateY(-62%)">
            <div class="block">
              <el-avatar :size="35" :src="circleUrl"></el-avatar>
            </div>
        </span>

        <el-dropdown trigger="click" style="position: absolute;right: 3.5%;top: 50%;transform: translateY(-50%)"> <!--触发方式为click-->
          <!-- 用户头像 + 用户名-->
          <span class="userinfo-inner" style="color:#ffffff;">
            {{this.username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>  <!--@click.native="logout"给组件绑定原生事件-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: "MainHeader",
    data() {
      return {
        username: 'Jay.Liu',
        title: ['系统首页','相机评定','评比打分','现场训练','录像检测','训练记录'],
        imgUrl: '/static/img/img.jpg', /*这里来动态绑定用户的头像url*/
        circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    },
    mounted() {
      this.username = localStorage.getItem("username");//从本地仓库中取数据
    },
    computed:{
      ...mapState(['menuTitle','menuActive'])
    },
    methods: {
      ...mapMutations(['changeTitle']),
      exit() { //退出登录
        this.$message.success('退出登录');
        this.$router.push('/');
        localStorage.clear();//还要将全局用户清空
      },
    }
  }
</script>

<style scoped>
  header {
    height: 9vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #242f42;
    background-size: 100% 100%;
  }

  header .logo {
    display: flex;
    width: 100%;
    height: 9vh;
    line-height: 9vh; /*字体居中*/
    font-size: 25px;
    color: rgb(255, 255, 255);
  }

  header .title {
    margin-left: 20px;
  }

  header .user {
    display: flex;
    border-bottom: 1px solid #cfcfcf;
  }

  .pageNow {
    margin: 24px 0 0 22px;
    font-size: 22px;
    font-weight: bold;
  }

  .pic img { /*头像*/
    display: block;
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }

  .userinfo-inner { /*用户名*/
    font-size: 16px;
    cursor: pointer;
    color: #fff;
  }

</style>
