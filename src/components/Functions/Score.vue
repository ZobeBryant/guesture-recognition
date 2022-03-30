<template>
  <div class="adminLog">
    <div class="top"><i class="el-icon-notebook-1"></i> 评比打分 / <span style="font-size: 17px;font-weight: bold">训练列表</span></div>
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
            <el-button type="primary" @click="search" style="margin-left: 10px;width: 100px">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>

    <!--第二部分-->
    <div style="margin:20px 0 0 20px">
      <el-button type="primary" @click="addSoldier">添加项目</el-button>
      <el-button @click="operate">批量操作</el-button>
     <!-- <el-dropdown trigger="click" style="margin-left: 8px">
        <el-button>更多操作 <i class="el-icon-arrow-down"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="modify">修改</el-dropdown-item>
          <el-dropdown-item @click.native="del">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
    <!--新增-->
    <span>
      <el-dialog :visible.sync="dialogAddSoldier" title="添加待训练士兵" width="600px">
        <el-form ref="add" :model="add">
          <el-form-item label="士兵编号：">
            <el-input v-model="add.num" style="width: 80%;" type="text"/>
          </el-form-item>
          <el-form-item label="士兵姓名：">
            <el-input v-model="add.name" style="width: 80%;" type="text"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddSoldier = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd('add')">确 定</el-button>
        </div>
      </el-dialog>
    </span>
    <!--批量添加-->
    <span>
      <el-dialog :visible.sync="dialogAddSoldiers" title="批量导入待训练士兵" width="600px">
        <el-form :inline="true" ref="formExcel" :model="formExcel">
          <el-form-item> <!--上传Excel-->
            <el-upload
              class="upload-demo"
              style="display:inline-block"
              :limit="1"
              :multiple="false"
              ref="upload"
              accept=".xls,.xlsx"
              action="#"
              :on-change="onChange"
              :on-remove="onRemove"
              :on-exceed="onExceed"
              :auto-upload="false">
              <el-button style="width: 130px;" type="primary">导入Excel文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 145px;">
                <el-link :href="downloadExcelURL">导出Excel模板 <i class="el-icon-download"></i></el-link>
              </el-button>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddSoldiers = false">取 消</el-button>
          <el-button type="primary" @click="confirmOperate('formExcel')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="查看名单是否解析正确？" :visible.sync="dialogTableVisible" width="500px">
        <el-table :data="gridData">
          <el-table-column property="soldierId" label="士兵ID" ></el-table-column>
          <el-table-column property="soldierName" label="士兵名字" ></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddByExcel">确 定</el-button>
        </span>
      </el-dialog>
    </span>

    <!--第三部分-->
    <div style="margin:30px 0 0 20px">
      <el-table ref="multipleTable"
                :header-cell-style="{background:'#eef1f6'}"
                :data="tableData"
                tooltip-effect="dark"
                v-loading="loading"
                element-loading-text="拼命加载中"
                style="width:100%;">
        <el-table-column
          label="编号"
          prop="num">
        </el-table-column>

        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>

        <el-table-column
          label="训练记录"
          prop="records">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="color: dodgerblue" class="buttonText" @click="go">训练记录</a>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="goTrainStatic(scope.row.num,scope.row.name,scope.row.num)">开始训练</a>
  <!--          <span style="color: #eae9e9">|</span><a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="goTrainDynamic(scope.row.id)">单兵正步训练</a>-->
            <span style="color: #eae9e9">|</span><a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="modify(scope.row.num,scope.row.name,scope.row.cid)">编辑</a>
            <!--新增-->
            <span>
              <el-dialog :visible.sync="dialogEditSoldier" title="修改待训练士兵" width="600px">
                <el-form ref="edit" :model="edit">
                  <el-form-item label="士兵编号：">
                    <el-input v-model="edit.num" style="width: 80%;" type="text"/>
                  </el-form-item>
                  <el-form-item label="士兵姓名：">
                    <el-input v-model="edit.name" style="width: 80%;" type="text"/>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogEditSoldier = false">取 消</el-button>
                  <el-button type="primary" @click="confirmModify('edit')">确 定</el-button>
                </div>
              </el-dialog>
            </span>
            <span style="color: #eae9e9">|</span><a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="del(scope.row.cid)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {getAllSoldierTrainingScore} from "../../assets/api/request";
  import {addNewSoldier} from "../../assets/api/request";
  import {updateSoldier} from "../../assets/api/request";
  import {deleteSoldier} from "../../assets/api/request";
  import {addByUploadExcel} from "../../assets/api/request";
  import {confirmExcel} from "../../assets/api/request";
  import {getAllSoldier} from "../../assets/api/request";
  import axios from '../../assets/api/base'

  export default {
    name: "Score",
    data() {
      return {
        name: '',
        num:'',
        tableData:[],
        loading:false,
        tmp:[],
        dialogAddSoldier:false,
        add:{
          name:'',
          num:''
        },
        tempId:'',
        dialogEditSoldier:false,
        edit:{
          name:'',
          num:''
        },
        dialogAddSoldiers:false,
        formExcel: { //Excel添加
          file: null
        },
        gridData:[],
        dialogTableVisible:false,
        downloadExcelURL:`${axios.defaults.baseURL}/download/excel`,
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      ...mapMutations(['changeActive']),
      query(){
        this.loading = true;
        getAllSoldier()
        .then(data=>{
          console.log(data);
          this.loading = false;
          let arr = data.data.data;
          this.tableData = [];
          this.tmp = [];
          if(data.data.code === 200) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].soldier !== null) {
                let temp = {};
                temp['num'] = arr[i].csoldierId;
                temp['name'] = arr[i].csoldierName;
                temp['cid'] = arr[i].cid;
                // temp['score'] = arr[i].cfinalScore;
                this.tableData.push(temp);
                this.tmp.push(temp);
              }
            }
            console.log(this.tableData);
          }
        })
      },
      search() { //查询用户
        var arr = [];
        this.loading = true;
        this.tableData = JSON.parse(JSON.stringify(this.tmp)); //深拷贝
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
      go(){
        this.changeActive(5);
        this.$router.push('/admin/trainingRecord');
      },
      modify(num,name,id){
        this.dialogEditSoldier = true;
        this.tempId = id;
        this.edit.num = num;
        this.edit.name = name;
      },
      confirmModify(){
        updateSoldier(this.edit.num,this.edit.name,this.tempId)
        .then(data=>{
          if(data.data.code === 200){
            this.$message.success('修改成功！');
            this.query();
            this.dialogEditSoldier = false;
          }
          console.log(data);
        })
      },
      del(id){
        this.$confirm('确定删除当前士兵吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSoldier(id)
          .then(data=>{
            if(data.data.code === 200){
              this.$message.success('删除成功！');
              this.query();
            }
          })
        })
      },
      addSoldier(){ //添加
        this.dialogAddSoldier = true;
      },
      confirmAdd(Form){
        this.$refs[Form].validate((valid) => {
          if (valid) {
            addNewSoldier(this.add.num,this.add.name)
            .then(data=>{
              console.log(data);
              if(data.data.code === 200){
                if(data.data.insertSuccessCount === 0){
                  this.$message.error('士兵编号已存在，插入失败！')
                } else{
                  this.$message.success('插入成功！');
                  this.dialogAddSoldier = false;
                  this.add.name = '';
                  this.add.num = '';
                  this.query();
                }
              }
            })
          }
        })
      },
      operate(){ //批量操作
        this.dialogAddSoldiers = true;
      },
      confirmOperate(formName){
        console.log(this.formExcel.file);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.formExcel.file != null) { //文件不为空
              let form = new FormData(); //通过FormData上传文档
              form.append("file", this.formExcel.file);
              addByUploadExcel(form) //上传
                .then(data => {
                  console.log(data);
                  this.dialogTableVisible = true;
                  if(data.data.code === 200) {
                    this.gridData = data.data.data;
                  }
                })
            } else {
              this.$message.error('请导入Excel文件');
            }
          }
        })
      },
      confirmAddByExcel(){
        confirmExcel(this.gridData)
        .then(data=>{
          console.log(data);
          if(data.data.code === 200){
            if (data.data.insertSuccessCount === 0) {
              this.$message.error('插入失败,士兵编号都已存在')
            } else {
              this.$message.success('成功插入 ' + data.data.insertSuccessCount + ' 个士兵！');
              this.query();
              this.dialogTableVisible = false;
              this.dialogAddSoldiers = false;
            }
          }
        })
      },
      goTrainStatic(num,name,id){
        // this.$router.push('/admin/trainingStatic');
        this.$router.push({path:'/admin/trainingStatic',query:{num:num,name:name,id:id }});
      },
      goTrainDynamic(){
        this.$router.push('/admin/training');
      },
      onChange(file, fileList) { //跟踪上传信息
        this.formExcel.file = file.raw;//file.raw为文件
      },
      onRemove(file, fileList) {
        this.formExcel.file = null;
      },
      onExceed(files, fileList) {
        this.$message.error('只能上传一个文件');
      },
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
