<template>
  <div class="admin">
    <MainHeader/>
    <div class="right">
      <div class="left-menu">
        <MainMenu/>
      </div>
      <div class="right_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    import MainHeader from './MainHeader';//引入使用相对路径
    import MainMenu from "./SuperAdminMenu";
    import '../../../static/css/main.css';
    export default {
        name: "Main",
        components: {MainMenu, MainHeader},
    }
</script>

<style scoped>
  .right {
    display: flex;
  }

  .left-menu {
    height: 100%;
    width:15%;
    background-color: #324157;
  }

  .right_content {
    height:91vh;
    flex:1;
    overflow: scroll;
  }
</style>
