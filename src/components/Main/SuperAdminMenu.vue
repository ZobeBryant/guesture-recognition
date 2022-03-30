<template>
  <div id="superAdminMenu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu mode="vertical"
                 :default-active="active"
                 class="el-menu-vertical-demo"
                 text-color="rgb(191, 203, 217)"
                 background-color="#324157"
                 @open="handleOpen"
                 @close="handleClose"
                 ref="menus"
                 :default-openeds="defaultOpen"
                 active-text-color="#20a0ff">

          <el-menu-item index="1" @click="goIndex"><span class="colorTitle"><i class="el-icon-document"></i>系统首页</span></el-menu-item>
          <el-menu-item index="2" @click="goAssessment"><span class="colorTitle"><i class="el-icon-document"></i>考核标准</span></el-menu-item>
          <el-menu-item index="3" @click="goCameraSet"><span class="colorTitle"><i class="el-icon-document"></i>相机评定</span></el-menu-item>
          <el-menu-item index="4" @click="goScore"><span class="colorTitle"><i class="el-icon-document"></i>评比打分-训练列表</span></el-menu-item>
          <el-menu-item index="5" @click="goTrainRecord"><span class="colorTitle"><i class="el-icon-document"></i>训练记录</span></el-menu-item>

          <!--<el-submenu index="4" style="margin-left:21px;">
            <template slot="title">
              <span id="4-score" class="colorTitle"><i class="el-icon-document"></i>评比打分-训练列表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="goTrainingStatic"><span class="colorTitle">单兵姿态训练</span></el-menu-item>
              <el-menu-item index="4-2" @click="goTraining"><span class="colorTitle">单兵动作训练</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5" style="margin-left:21px;">
            <template slot="title">
              <span id="5-train" class="colorTitle"><i class="el-icon-document"></i>训练记录</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="goTrainingDetail"><span class="colorTitle">学员训练详情</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: "MainMenu",
  data() {
    return {
      defaultOpen: [],
      active: "1",
      bindMenuActive:1,
      path:['/admin/systemIndex','/admin/assessment','/admin/cameraSet','/admin/score','/admin/trainingRecord'],
    }
  },
  mounted() {
    let path = this.$route.path;
    console.log(path);
    for(let i = 0;i < this.path.length;i++){
      if(path === this.path[i]){
        this.active = (i+1) + '';
        this.bindMenuActive = (i+1);
      }
    }
  },
  computed: {
    ...mapState(['menuActive'])
  },
  methods: {
    ...mapMutations(['changeActive']),
    handleOpen(key,keyPath) {
      console.log(key,keyPath);
      this.defaultOpen = [key];//设置仅打开一个页面
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
      this.$refs.menus.open(keyPath);
    },

    goIndex() {
      this.$router.push('/admin/systemIndex');
    },
    goAssessment() {
      this.$router.push('/admin/assessment');
    },
    goCameraSet() {
      this.$router.push('/admin/cameraSet');
    },
    goScore(){
      this.$router.push('/admin/score');
    },
    goTrainRecord(){
      this.$router.push('/admin/trainingRecord');
    }
  },

  watch: {
    menuActive: function (v) {
      if (this.bindMenuActive !== v) {
        this.active = v + '';
        this.bindMenuActive = v;
      }
    },
    menuTitle: function (v) {
      if (this.bindMenuActive !== v) {
        this.active = v + '';
        this.bindMenuActive = v;
      }
    }
  }
}
</script>

<style scoped>
.tac {
  background-color: #324157;
  height: 91vh;
}

</style>
