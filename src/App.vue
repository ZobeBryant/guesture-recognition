<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ::-webkit-scrollbar{
    display: none;
  }

  #superAdminMenu .el-submenu__title{ /*全局配置，可修改element-ui的格式。在其自身页面，因为scope原因，不能修改element的样式*/
    font-size:16px;
    height: 66px;
    line-height: 66px;
  }
  #superAdminMenu .el-menu-item{
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    margin-left: 20px;
  }
  #superAdminMenu .el-submenu__icon-arrow,#superAdminMenu .el-icon-arrow-down,#superAdminMenu .el-menu-item-group__title{
    display: none;
  }

  #root .el-form-item {
    margin-bottom: 7px;
  }

</style>
