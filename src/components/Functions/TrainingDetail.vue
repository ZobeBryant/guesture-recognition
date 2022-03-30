<template>
  <div class="adminLog">
    <div class="top"><i class="el-icon-notebook-1"></i> 训练记录 / <span
      style="font-size: 17px;font-weight: bold">训练详情</span></div>
    <div
      style="margin-bottom:10px;color:#67C23A;font-size:15px; background-color:#F0F9EB;width: 100%;height: 35px;line-height: 35px; border-radius:5px">
      <span style="margin-left: 20px">当前受检人员：{{ $route.query.name }}</span>
      <span style="margin-left: 50px">训练时间：{{ $route.query.time }}</span>
    </div>
    <div>
      <div>
        <!--第一部分-->
        <el-row>
          <el-col :span="24">
           <!-- <el-button id="train" @click="train" type="primary">{{trainTitle}}</el-button>-->
          </el-col>
        </el-row>

        <!--第二部分-->
        <div>
          <el-row :gutter="20" class="row" style="margin-top: 20px">
            <el-col :span="16">
              <div class="border left">
                <div class="block">
                  <!--<span class="demonstration">默认 Hover 指示器触发</span>-->
                  <el-carousel height="400px" indicator-position="outside" type="card" :autoplay="false">
                    <el-carousel-item v-for="i in 10">
                      <img src="http://192.168.1.106/1.png" alt="" style="height: 400px">
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="24">
                  <div class="border right2">
                    <div v-if="imgUrl.step1 === ''" style="text-align: center;line-height: 195px">步态截图</div>
                    <img v-else :src="imgUrl.step1" alt=""
                         style="height: 100%;margin-left: 50%;transform: translateX(-50%)">
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 6px">
                <el-col :span="24">
                  <div class="border right4">
                    <div v-if="imgUrl.step2 === ''" style="text-align: center;line-height: 195px">步态截图</div>
                    <img v-else :src="imgUrl.step2" alt=""
                         style="height: 100%;margin-left: 50%;transform: translateX(-50%)">
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <!--第三部分-->
        <el-row :gutter="20" class="row" style="margin-top: 20px;margin-left: 1px">
          <el-col :span="16">
            <div class="title">姿态识别结果</div>
            <div style="margin-top: 5px;padding-left: 5px">
              <el-table ref="multipleTable"
                        :data="tableData1"
                        height="240"
                        @row-click="handdleStatic"
                        tooltip-effect="dark"
                        v-loading="loading"
                        :header-cell-style="{background:'#eef1f6'}"
                        element-loading-text="拼命加载中"
                        style="width:100%;">
                <el-table-column
                  label="序号"
                  prop="num"
                  width="80px">
                </el-table-column>

                <el-table-column
                  label="头正"
                  prop="a1">
                </el-table-column>

                <el-table-column
                  label="颈直"
                  prop="a2">
                </el-table-column>

                <el-table-column
                  label="口闭"
                  prop="a3">
                </el-table-column>

                <el-table-column
                  label="两肩平"
                  prop="a4">
                </el-table-column>

                <el-table-column
                  label="两臂下垂"
                  prop="a5">
                </el-table-column>

                <el-table-column
                  label="停止间上体正直"
                  prop="a6"
                  width="120px">
                </el-table-column>

                <el-table-column
                  label="两腿挺直并拢"
                  prop="a7"
                  width="120px">
                </el-table-column>
              </el-table>
              <span>
                <el-dialog :visible.sync="dialogStaticDetailAssessment" title="姿态原始数据" width="89%">
                  <div style="margin-bottom: 10px; text-align: center;width: 100%;height: 30px;line-height: 30px;background-color: #d8d7ff;font-weight: bold">{{dialog.num}}</div>
                  <el-table ref="multipleTable"
                            :header-cell-style="{background:'#eef1f6'}"
                            :data="tableData5"
                            tooltip-effect="dark"
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            style="width:100%;">
                     <el-table-column
                       label="头正/度"
                       prop="a1"
                       width="80px">
                     </el-table-column>
                     <el-table-column
                       label="颈直/度"
                       prop="a2">
                     </el-table-column>
                      <el-table-column
                        label="口闭"
                        prop="a3"
                        width="100px">
                        <template slot-scope="scope">
                        </template>
                     </el-table-column>
                      <el-table-column
                        label="左肩水平度/度"
                        prop="a4">
                     </el-table-column>
                    <el-table-column
                      label="右肩水平度/度"
                      prop="a5">
                     </el-table-column>
                    <el-table-column
                      label="左臂垂直度/度"
                      prop="a6">
                     </el-table-column>
                    <el-table-column
                      label="右臂垂直度/度"
                      prop="a7">
                     </el-table-column>
                    <el-table-column
                      label="停止间上体正直/度"
                      prop="a8">
                     </el-table-column>
                    <el-table-column
                      label="两腿挺直并拢/度"
                      prop="a9">
                     </el-table-column>
                  </el-table>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogStaticDetailAssessment = false">取 消</el-button>
                    <el-button type="primary" @click="dialogStaticDetailAssessment = false">确 定</el-button>
                  </div>
                </el-dialog>
              </span>
            </div>
            <div class="title">动作识别结果</div>
            <div style="margin-top: 5px;padding-left: 5px">
              <el-table ref="multipleTable"
                        :data="tableData2"
                        height="240"
                        @row-click="handdle"
                        tooltip-effect="dark"
                        v-loading="loading"
                        :header-cell-style="{background:'#eef1f6'}"
                        element-loading-text="拼命加载中"
                        style="width:100%;">
                <el-table-column
                  label="序号"
                  prop="num"
                  width="50px">
                </el-table-column>

                <el-table-column
                  sortable
                  label="步序"
                  prop="step"
                  width="80px">
                </el-table-column>

                <el-table-column
                  label="步幅/cm"
                  prop="a1">
                </el-table-column>

                <el-table-column
                  label="步高/cm"
                  prop="a2">
                </el-table-column>

                <el-table-column
                  label="脚尖下压"
                  prop="a3">
                </el-table-column>

                <el-table-column
                  label="行进间上体正直"
                  prop="a4"
                  width="130px">
                </el-table-column>

                <el-table-column
                  label="摆臂水平"
                  prop="a5">
                </el-table-column>

                <el-table-column
                  label="平均步速/（步/分钟）"
                  prop="a6"
                  width="160px">
                </el-table-column>
              </el-table>
            </div>
            <span>
              <el-dialog :visible.sync="dialogDynamicDetailAssessment" title="动作原始数据" width="700px">
                <div style="margin-bottom: 10px; text-align: center;width: 100%;height: 30px;line-height: 30px;background-color: #d8d7ff;font-weight: bold">{{dialog.step}}</div>
                <el-table ref="multipleTable"
                          :header-cell-style="{background:'#eef1f6'}"
                          :data="tableData4"
                          tooltip-effect="dark"
                          v-loading="loading"
                          element-loading-text="拼命加载中"
                          style="width:100%;">
                   <el-table-column
                     label="步幅/cm"
                     prop="a1">
                   </el-table-column>
                   <el-table-column
                     label="步高/cm"
                     prop="a2">
                   </el-table-column>
                    <el-table-column
                      label="脚水平度/度"
                      prop="a3">
                   </el-table-column>
                    <el-table-column
                      label="上身垂直度/度"
                      prop="a4">
                   </el-table-column>
                    <el-table-column
                      label="上臂水平度/度"
                      prop="a5">
                   </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogDynamicDetailAssessment = false">取 消</el-button>
                  <el-button type="primary" @click="dialogDynamicDetailAssessment = false">确 定</el-button>
                </div>
              </el-dialog>
            </span>
          </el-col>
          <el-col :span="8">
            <div class="title">扣分列表</div>
            <div style="margin-top: 5px;padding-left: 5px">
              <el-table ref="multipleTable"
                        :data="tableData3"
                        height="420"
                        tooltip-effect="dark"
                        :header-cell-style="{background:'#eef1f6'}"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        style="width:100%;">
                <el-table-column
                  label="序号"
                  prop="num"
                  width="80px">
                </el-table-column>

                <el-table-column
                  label="扣分项目"
                  prop="deduction">
                </el-table-column>

                <el-table-column
                  label="扣分"
                  prop="score"
                  width="100px">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCameraConfigInfo, getSoliderTrainInfo,getOriginData} from "../../assets/api/request";

  export default {
    name: "TrainingDetail",
    data() {
      return {
        tableData1: [],
        tableData2: [],//数据示例
        tableData3: [],
        tableData4: [],
        tableData5: [],
        trainTitle: '打开视频',
        loading: false,
        dialogDynamicDetailAssessment: false,
        dialogStaticDetailAssessment: false,
        cIP: '',
        imgUrl: {
          step1: '',
          step2: '',
        },
        dialog:{
          num:'',
          step:''
        }
      }
    },
    mounted() {
      this.query();
      this.ipConfig();
    },
    methods: {
      ipConfig() {
        getCameraConfigInfo()
          .then(data => {
            if (data.data.code === 200) {
              // console.log(data.data.data);
              let arr = data.data.data;
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].ctype == 'ipServer')
                  this.cIP = arr[i].cip;
              }
              // console.log(this.ipPositive,this.ip,this.cIP);
            }
          })
      },
      handdleStatic(row, event, column) {
        console.log(row.originId);
        // this.$message.info('序号：' + row.num);
        this.dialog.num = '序号：' + row.num;
        this.dialogStaticDetailAssessment = true;
        this.tableData5 = [];
        getOriginData(row.originId)
          .then(data=>{
            console.log(data);
            if(data.data.code === 200){
              let tmp = {};
              let str = data.data.data.cdata;
              var arr = str.split(',');
              for (let i = 2; i < arr.length; i++) {
                tmp['a' + (i - 1)] = arr[i];
              }
              this.tableData5.push(tmp);
            }
          });
      },
      handdle(row, event, column) {
        console.log(row.originId);
        // this.$message.info('步序：' + row.step);
        this.dialog.step = '步序：' + row.step;
        this.dialogDynamicDetailAssessment = true;
        this.tableData4 = [];
        getOriginData(row.originId)
        .then(data=>{
          console.log(data);
          if(data.data.code === 200){
            let tmp = {};
            let str = data.data.data.cdata;
            var arr = str.split(',');
            for (let i = 3; i < arr.length; i++) {
              tmp['a' + (i - 2)] = arr[i];
            }
            this.tableData4.push(tmp);
          }
        });
        //读取静态文件
        this.imgUrl.step1 = `http://${this.cIP}/${row.time}Step${row.step}-1.jpg`;
        this.imgUrl.step2 = `http://${this.cIP}/${row.time}Step${row.step}-2.jpg`;
      },
      query() {
        let soliderId = this.$route.query.soliderId;
        let time = this.$route.query.time;
        let endTime = this.$route.query.endTime;
        console.log(soliderId, time, endTime);
        getSoliderTrainInfo(soliderId, time, endTime)
          .then(data => {
            if (data.data.code === 200) {
              data = data.data.data;
              console.log(data);
              for (let i = 0; i < data.length; i++) {
                let d = JSON.parse(data[i].caxis);
                console.log(d); //获取历史训练记录,显示在对应表格里面
                if (d.flag == null) return;
                if (d.flag == 2) {  //姿态识别数据，动作识别之前的静止几分钟
                  let tmp = {
                    num: this.tableData1.length + 1
                  };
                  for (let i = 0; i < d.arr.length; i++) {
                    tmp['a' + (i + 1)] = d.arr[i];
                  }
                  tmp['time'] = d.time;
                  tmp['originId'] = d.originId;
                  this.tableData1.push(tmp);
                  /*处理扣分项*/
                  let tmp2 = {};
                  for (let i = 0; i < d.deductionArr.length; i++) {
                    tmp2 = {};
                    tmp2['num'] = this.tableData3.length + 1;
                    tmp2['deduction'] = `【姿态识别 序号:${tmp.num}】` + d.deductionArr[i].deductionItem;
                    tmp2['score'] = d.deductionArr[i].deductionScore;
                    this.tableData3.push(tmp2);
                  }
                } else if (d.flag == 1) { //动作识别数据，一步一步的
                  let tmp = {
                    num: this.tableData2.length + 1,
                    step: d.step
                  };
                  for (let i = 0; i < d.arr.length; i++) {
                    tmp['a' + (i + 1)] = d.arr[i];
                  }
                  tmp['time'] = d.time;
                  tmp['originId'] = d.originId;
                  this.tableData2.push(tmp);
                  /*处理扣分项*/
                  let tmp2 = {};
                  for (let i = 0; i < d.deductionArr.length; i++) {
                    tmp2 = {};
                    tmp2['num'] = this.tableData3.length + 1;
                    tmp2['deduction'] = `【动作识别 第${tmp.step}步】` + d.deductionArr[i].deductionItem;
                    tmp2['score'] = d.deductionArr[i].deductionScore;
                    this.tableData3.push(tmp2);
                  }
                  this.imgUrl.step1 = `http://${this.cIP}/${d.time}Step${d.step}-1.jpg`;
                  this.imgUrl.step2 = `http://${this.cIP}/${d.time}Step${d.step}-2.jpg`;
                  console.log(this.imgUrl.step1, this.imgUrl.step2);
                }
              }
            }
          })
      },
      train() {
        var btn = document.getElementById('train');
        if (this.trainTitle === '播放视频') {
          this.trainTitle = '暂停视频';
          this.$message.success('正在打开视频，请稍后');
          btn.style.backgroundColor = 'red';
        } else if (this.trainTitle === '暂停视频') {
          this.trainTitle = '播放视频';
          this.$message.success('暂停播放');
          btn.style.backgroundColor = '';
        }
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

  .border {
    margin: 2px 5px 0 5px;
    background-color: #fff;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
  }

  .left {
    height: 400px;
  }

  .right1, .right2, .right3, .right4 {
    height: 195px;

  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    /*line-height: 150px;*/
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .title {
    font-size: 18px;
  }
</style>
