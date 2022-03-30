<template>
  <div class="adminLog">
    <div class="top"><i class="el-icon-notebook-1"></i> 训练记录 </div>
    <!--第一部分-->
    <div class="form border">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0">
        <el-form :inline="true">
          <el-form-item prop="name" label="姓名：">
            <el-input v-model="name" style="width: 240px;" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="num" label="编号：" style="margin-left: 30px;">
            <el-input v-model="num" style="width: 240px;" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" style="width: 100px;margin-left: 10px;">搜索</el-button>
          </el-form-item>
      <!--    <el-form-item>
            <el-dropdown trigger="click">
              <el-button>展开 <i class="el-icon-arrow-down"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="a">aa</el-dropdown-item>
                <el-dropdown-item @click.native="b">bb</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>-->
        </el-form>
      </el-col>
    </div>

    <!--第二部分-->
    <!--<div style="margin:20px 0 0 20px">
      <el-button type="primary" @click="add">添加项目</el-button>
      <el-button @click="operate">批量操作</el-button>
      <el-dropdown trigger="click" style="margin-left: 8px">
        <el-button>更多操作 <i class="el-icon-arrow-down"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="modify">修改</el-dropdown-item>
          <el-dropdown-item @click.native="del">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>-->

    <!--第三部分-->
    <div style="margin:10px 0 0 15px">
      <el-table ref="multipleTable"
                :header-cell-style="{background:'#eef1f6'}"
                :data="tableData"
                tooltip-effect="dark"
                v-loading="loading"
                element-loading-text="拼命加载中"
                style="width:100%;">
        <el-table-column
          label="编号"
          prop="num"
          width="200px">
        </el-table-column>

        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>

        <el-table-column
          label="训练时间"
          prop="time"
          sortable>
        </el-table-column>

        <el-table-column
          label="综合得分"
          prop="score">
        </el-table-column>

        <el-table-column
          label="查看详情"
          prop="details">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="color: dodgerblue" @click="goDetail(scope.row.num,scope.row.name,scope.row.time,scope.row.endTime)" class="buttonText" >查看详情</a>
          </template>>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getAllSoldierTrainingScore} from "../../assets/api/request";
  export default {
    name: "TrainingRecord",
    data() {
      return {
        name: '',
        num:'',
        value: '',
        tableData:[],
        tmp:[],
        //显示是否加载中提示
        loading: false,
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      query(){
        this.loading = true;
        getAllSoldierTrainingScore()
        .then(data=>{
          this.tableData = [];
          this.tmp = [];
          if(data.data.code === 200){
            this.loading = false;
            let arr = data.data.data;
            console.log(arr);
            for(let i = 0;i < arr.length;i++){
              if(arr[i].cfinalScore > 0 && arr[i].soldier !== null){ //arr[i].cfinalScore > 0 &&
                let temp = {};
                temp['num'] = arr[i].soldier.csoldierId;
                temp['name'] = arr[i].soldier.csoldierName;
                temp['cid'] = arr[i].soldier.cid;
                temp['score'] = arr[i].cfinalScore;
                temp['time'] = arr[i].cStartTime;
                temp['endTime'] = arr[i].cEndTime;
                this.tableData.push(temp);
                this.tmp.push(temp);
              }
            }
            //console.log(this.tableData);
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      onChange(file, fileList) { //跟踪上传信息
        this.file = file.raw;//file.raw为文件
      },
      onRemove(file, fileList) {
        this.file = null;
      },
      search() {   //查询用户
        var arr = [];
        this.loading = true;
        this.tableData = JSON.parse(JSON.stringify(this.tmp)); //拷贝
        for (var i = 0; i < this.tableData.length; i++) {
          console.log(this.tableData[i].num.indexOf(this.num), this.tableData[i].name.indexOf(this.name), this.name,this.tableData[i].name)
          if (this.tableData[i].num.indexOf(this.num) >= 0 && this.tableData[i].name.indexOf(this.name) >= 0) {
            arr.push(this.tableData[i]);
          }
        }
        this.loading = false;
        console.log(arr);
        this.tableData = arr;
      },
      goDetail(soliderId,name,time,endTime){
        this.$router.push({path:'/admin/trainingDetail',query:{soliderId:soliderId,name:name,time:time,endTime:endTime}});
      }
    }
  }
</script>

<style scoped>
  .adminLog {
    padding: 16px;
  }
  .top {
    font-size: 15px;
    color: #4B4B4B;
    margin-bottom: 12px;
  }

  .form {
    margin: 10px 0;
  }

  .toolbar {
    padding: 30px;
    background-color: #f7f7f7;
    height: 100px;
    border: 1px solid #f1f1f1;
    margin-bottom: 40px;
  }


</style>
