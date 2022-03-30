<template>
  <div class="adminLog">
    <div class="top"><i class="el-icon-notebook-1"></i> 考核标准</div>
    <div style="margin:15px 0 0 20px">
      <!--<el-button type="primary" @click="addAssessment" style="margin-bottom: 15px">添加标准</el-button>-->
      <!--新增-->
      <span>
        <el-dialog :visible.sync="dialogAddAssessment" title="添加考核标准" width="600px">
          <el-form ref="add" :model="add">
            <el-form-item label="考核项目：">
              <el-row>
                <el-select v-model="add.name" placeholder="请选择" style="width: 80%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-row>
            </el-form-item>
            <el-form-item label="考核要求：">
              <el-input v-model="add.assessment" style="width: 80%;" type="text"/>
            </el-form-item>
            <el-form-item label="评分每级：">
              <el-input v-model="add.score" style="width: 80%;" type="text"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddAssessment = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd('add')">确 定</el-button>
          </div>
        </el-dialog>
      </span>
      <!--修改-->
      <span>
        <el-dialog :visible.sync="dialogModifyAssessment" title="修改考核标准" width="600px">
          <el-form ref="edit" :model="edit">
            <el-form-item label="考核项目：">
              <el-row>
                <el-select v-model="edit.name" placeholder="请选择" style="width: 80%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-row>
            </el-form-item>
            <el-form-item label="考核要求：">
              <el-input v-model="edit.assessment" type="text" style="width: 80%;"/>
            </el-form-item>
            <el-form-item label="评分每级：">
              <el-input v-model="edit.score" type="text" style="width: 80%;"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogModifyAssessment = false">取 消</el-button>
            <el-button type="primary" @click="confirmEdit('edit')">确 定</el-button>
          </div>
        </el-dialog>
      </span>
      <el-table ref="multipleTable"
                :header-cell-style="{background:'#eef1f6'}"
                :data="tableData"
                tooltip-effect="dark"
                v-loading="loading"
                element-loading-text="拼命加载中"
                style="width:100%;">
        <el-table-column
          label="序号"
          prop="cid"
          width="80px">
        </el-table-column>

        <el-table-column
          label="考核项目"
          prop="citem"
          width="200px">
          <template slot-scope="scope">
            <div v-if="scope.row.citem == 1">
              单兵动作辨别
            </div>
            <div v-else>
              单兵姿态识别
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="要求"
          prop="cRequire">
        </el-table-column>

        <el-table-column
          label="扣分项"
          prop="cDeductionItem"
        width="180px">
        </el-table-column>

        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <!--<a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="set(scope.row.cid,scope.row.cRequire,scope.row.cScore)">编辑</a>-->
            <a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="showDetail(scope.$index)">查看详情</a>
            <!-- <span style="color: #eae9e9">|</span><a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="del(scope.row.cid)">删除</a>-->
          </template>
        </el-table-column>
      </el-table>
      <!--查看每个扣分项-->
      <span>
      <el-dialog :visible.sync="dialogDetailAssessment" title="考核标准详情页" width="700px">
        <el-table ref="multipleTable"
                  :header-cell-style="{background:'#eef1f6'}"
                  :data="tableData2"
                  tooltip-effect="dark"
                  v-loading="loading1"
                  element-loading-text="拼命加载中"
                  style="width:100%;">
         <el-table-column
           label="序号"
           prop="cid"
           width="80px">
         </el-table-column>
         <el-table-column
           label="扣分项"
           prop="cDeductionItem">
         </el-table-column>
          <el-table-column
            label="区间范围"
            prop="cRange"
            width="200px">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">备注："["和"]"包括等于号，"("和")"不包括等于号！</div>
                <el-input v-model="scope.row.cRange"></el-input>
              </el-tooltip>
            </template>
         </el-table-column>
          <el-table-column
            label="扣分"
            prop="cDeductionScore"
            width="120px">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">备注：不要写标点符号！</div>
                <el-input v-model="scope.row.cDeductionScore"></el-input>
              </el-tooltip>
            </template>
         </el-table-column>
       <!--   <el-table-column label="操作" width="80px">
            <template slot-scope="scope">
              <a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="editDetailBtn(scope.row)">修改</a>
            </template>
          </el-table-column>-->
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailAssessment = false">取 消</el-button>
          <el-button type="primary" @click="editDetailBtn">确 定</el-button>
        </div>
      </el-dialog>
    </span>
      <!--修改详情-->
      <span>
        <el-dialog :visible.sync="dialogDetailModifyAssessment" title="修改考核标准" width="600px">
          <el-form ref="editDetail" :model="editDetail">
            <el-form-item label="当前扣分项:">
              <el-tag>{{editDetail.cDeductionItem}}</el-tag>
            </el-form-item>
            <el-form-item label="区间范围：">
              <el-row>
                 <el-input v-model="editDetail.cRange" type="text" style="width: 80%;"/>
              </el-row>
             <el-row style="color: #ababab;margin-left: 82px;">备注："["和"]"包括等于号，"("和")"不包括等于号</el-row>
            </el-form-item>
            <el-form-item label="扣分分数：">
              <el-input v-model="editDetail.cDeductionScore" type="text" style="width: 80%;"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogDetailModifyAssessment = false">取 消</el-button>
            <el-button type="primary" @click="confirmEditDetail('editDetail')">确 定</el-button>
          </div>
        </el-dialog>
      </span>
    </div>
  </div>
</template>

<script>
  import {getAllAssessment} from "../../assets/api/request";
  import {addAssessment} from "../../assets/api/request";
  import {editAssessment} from "../../assets/api/request";
  import {delAssessment} from "../../assets/api/request";
  import {updateDeduction} from "../../assets/api/request";

  export default {
    name: "Assessment", /*考核标准*/
    data() {
      return {
        loading: false,
        loading1:false,
        options: [{
          value: '单兵动作辨别',
          label: '单兵动作辨别'
        },{
          value: '单兵姿态识别',
          label: '单兵姿态识别'
        }],
        dialogModifyAssessment: false,
        edit: {
          name: '',
          assessment: '',
          score: ''
        },
        tempId: '', //临时变量
        dialogAddAssessment: false,
        add:{
          name: '',
          assessment: '',
          score: ''
        },
        tableData: [],
        tableData2:[],
        dialogDetailAssessment:false,
        dialogDetailModifyAssessment:false,
        editDetail:{
          cRange:'',
          cDeductionScore:'',
          cDeductionItem:''
        },
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      query() {
        this.loading = true;
        getAllAssessment()
          .then(data => {
            console.log(data.data);
            this.loading = false;
            if(data.data.code === 200){
              let tmp = [];
              let obj = data.data.data;
              for(let item in obj){
                let arr = obj[item];
                for(let i = 0;i < arr.length;i++){
                  tmp.push({
                    cid:tmp.length + 1,
                    citem:item,
                    id:arr[i].cId,
                    isShowValue:arr[i].isShowValue,
                    cRequire:arr[i].cRequire,
                    cDeductionItem:arr[i].cDeductionItem,
                    indexArr:arr[i].indexArr,
                    referArr:arr[i].referArr
                  });
                }
              }
              this.tableData = tmp;
            }
            // let arr = data.data.data;
            // console.log(arr);
            // this.tableData = arr;
          })
      },

      //添加
      addAssessment() {
        this.dialogAddAssessment = true;
      },
      confirmAdd(Form){
        this.$refs[Form].validate((valid) => {
          if (valid) {
            addAssessment(this.add.name, this.add.assessment, this.add.score)
            .then(data => {
              console.log(data);
              if(data.data.code === 200){
                this.$message.success('添加成功');
                this.query();
                this.dialogAddAssessment = false;
                this.add.name = '';
                this.add.assessment = '';
                this.add.score = '';
              }
            })
          }
        })
      },

      //查看详情
      showDetail(index){
        this.dialogDetailAssessment = true;
        console.log("bbb",this.tableData[index]);
        let table = this.tableData[index];
        let tableData = [];
        for(let i = 0;i < table['referArr'].length;i++){
          tableData.push({
            cid:tableData.length + 1,
            cDeductionItem:table['cDeductionItem'],
            cRange:table['referArr'][i].refer,
            cDeductionScore:table['referArr'][i].deductionScore,
            id:table['id'],
            indexArr:table['indexArr'],
            isShowValue:table['isShowValue']
          })
        }
        this.tableData2 = tableData;
      },
      editDetailBtn(){ //修改
        console.log("aa",this.tableData2);
        if(this.tableData2.length > 0){
          let table = this.tableData2;
          let cid = table[0].id;
          let indexArr = table[0].indexArr;
          let isShowValue = table[0].isShowValue;
          let arr = [];
          for(let i = 0;i < table.length;i++){
            let item = table[i];
            arr.push({
              cRange:item.cRange,
              cDeductionScore:item.cDeductionScore,
            })
          }
          let obj = {
            cid:cid,
            referArr:arr,
            indexArr:indexArr,
            isShowValue:isShowValue
          };
          console.log(obj);
          updateDeduction(obj)
            .then(data=>{
              console.log(data);
              if(data.data.code === 200){
                this.dialogDetailAssessment = false;
                this.query();
                this.$message.success("修改成功！");
              } else if(data.data.code === 502){
                this.$message.error("格式错误！");
              }
            })
        }

        // this.dialogDetailModifyAssessment = true;
        // this.editDetail.cRange = item.cRange;
        // this.editDetail.cDeductionScore = item.cDeductionScore;
        // this.editDetail.cDeductionItem = item.cDeductionItem;

      },

      confirmEditDetail(Form){
        this.$refs[Form].validate((valid) => {
          if (valid) {
          }
        })
      },

      //编辑
      set(id,require,deduction) {
        this.dialogModifyAssessment = true;
        if(item == 1){
          this.edit.name = '单兵动作辨别';
        }else{
          this.edit.name = '单兵姿态识别';
        }
        this.tempId = id;
        this.edit.assessment = require;
        this.edit.score = deduction;
      },
      confirmEdit(Form) {
        this.$refs[Form].validate((valid) => {
          if (valid) {
            editAssessment(this.edit.name,this.edit.assessment,this.edit.score,this.tempId)
              .then(data=>{
                console.log(data);
                if(data.data.code === 200) {
                  this.$message.success('修改成功');
                  this.dialogModifyAssessment = false;
                  this.query();
                }
            })
          }
        });
      },

      //删除
      del(id) {
        this.$confirm('确定删除此考核标准吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAssessment(id)
          .then(data=>{
            console.log(data);
            if(data.data.code === 200) {
              this.$message.success('删除成功');
              this.query();
            }
          })
        })
      }

    }
  }
</script>

<style scoped>
  .adminLog {
    padding: 16px;
  }

  .top {
    font-size: 17px;
    color: #4B4B4B;
  }


</style>
