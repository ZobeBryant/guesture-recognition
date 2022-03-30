<template>
  <div class="adminLog">
    <div class="top"><i class="el-icon-notebook-1"></i> 系统首页</div>
    <div style="margin-top: 20px">
      <div class="form">
        <div class="notice">
          <el-alert
            :title="`当前士兵人数${this.stuNum}人`"
            type="warning"
            show-icon>
          </el-alert>
        </div>
        <el-row>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-badge class="item">
                <el-tag type="success">训练数据</el-tag>
              </el-badge>
            </div>
            <el-row>
              <el-col :span="12">
                <div class="index-top">
                  <div id="myChartTwo" :style="{width: '500px', height: '300px'}"></div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="index-top">
                  <div id="myChartThree" :style="{width: '500px', height: '300px'}"></div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import {getAllSoldierTrainingScore} from "../../assets/api/request";
import {getAllSoldier} from "../../assets/api/request";

export default {
  name: "SystemIndex",
  data() {
    return {
      stuNum: 0,
      stu: {
        NoPass: 0, //不通过
        Pass: 0, //通过

        Good: 0, //优秀
        NoFail: 0, //及格
        Fail: 0, //不及格
      }


    }
  },
  mounted(){
    this.query();
  },
  methods: {
    query(){
      getAllSoldier()
      .then(data=>{
        // console.log(data);
        this.stuNum = data.data.data.length;
        getAllSoldierTrainingScore()
          .then(data=>{
            // console.log(data.data.data);
            let arr = data.data.data;
            let len = arr.length;
            if(data.data.code === 200){
              for(let i = 0;i < arr.length;i++){
                // console.log(arr[i].cfinalScore);
                if(arr[i].cfinalScore < 60){
                  this.stu.NoPass++; //不通过
                  this.stu.Fail++;
                } else if(arr[i].cfinalScore >= 60 && arr[i].cfinalScore < 85){
                  this.stu.NoFail++; //良好
                } else{
                  this.stu.Good++; //优秀
                }
              }
              this.stu.Pass = len - this.stu.NoPass;
              // console.log(this.stu);
              this.drawLineTwo();
              this.drawLineThree();
            }
          });
      })
    },
    drawLineTwo() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(document.getElementById('myChartTwo'))
      // 绘制图表
      myChartTwo.setOption({
        title: {
          text: '训练通过记录对比',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['未通过记录', '通过记录']
        },
        series: [
          {
            name: '记录',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: this.stu.NoPass, name: '未通过记录'},
              {value: this.stu.Pass, name: '通过记录'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            color: ['blue', 'orange']
          }
        ]
      });
    },
    drawLineThree() {
      // 基于准备好的dom，初始化echarts实例
      let myChartThree = this.$echarts.init(document.getElementById('myChartThree'))
      // 绘制图表
      myChartThree.setOption({
        title: {
          text: '士兵训练成绩分布',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['优秀记录', '及格记录','不及格记录']
        },
        series: [
          {
            name: '记录',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: this.stu.Good, name: '优秀记录'},
              {value: this.stu.NoFail, name: '及格记录'},
              {value: this.stu.Fail, name: '不及格记录'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            color: ['blue', 'orange','yellow']
          }
        ]
      });
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

.form {
  margin: 10px 0;
}


</style>
