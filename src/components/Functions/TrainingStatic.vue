<template>
  <div class="adminLog">
    <div class="top"><i class="el-icon-notebook-1"></i> 评比打分 / 训练列表 / <span style="font-size: 17px;font-weight: bold">开始训练</span>
    </div>
    <div
      style="margin-bottom:10px;color:#67C23A;font-size:15px; background-color:#F0F9EB;width: 100%;height: 35px;line-height: 35px; border-radius:5px">
      <!--    <span style="margin-left: 20px;">当前项目：{{trainingItem}}</span>-->
      <span style="margin-left: 10px">当前受检人员：{{ $route.query.name }}</span>
    </div>
    <!--第一部分-->
    <el-row>
      <el-col :span="24">
        <el-button id="train" @click="train" type="primary">{{ trainTitle }}</el-button>
        <el-button style="margin-left: 15px">启动正面检测</el-button>
      </el-col>
    </el-row>

    <!--第二部分-->
    <div>
      <el-row :gutter="20" class="row" style="margin-top: 20px">
        <el-col :span="9">
          <div class="border left">
            <div v-show="video.aside.count === 0" style="text-align: center;line-height: 400px">
              侧面相机视角
            </div>
            <div v-for="(item,index) in video.aside.players" v-show="item.show">
              <video :class="`video_${index}`" id="example_video_0" style="width: 100%;height: 400px"></video>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="border left">
            <div v-show="!video.positive.show" style="text-align: center;line-height: 400px">
              正面相机视角
            </div>
            <div v-show="video.positive.show">
              <video id="example_video_1" style="width: 100%;height: 400px"></video>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="24">
              <div class="border right2">
                <div v-if="imgUrl.step1 === ''" style="text-align: center;line-height: 195px">步态截图</div>
                <img v-else :src="imgUrl.step1" alt="" style="height: 100%;margin-left: 50%;transform: translateX(-50%)">
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-top: 6px">
            <el-col :span="24">
              <div class="border right4">
                <div v-if="imgUrl.step2 === ''" style="text-align: center;line-height: 195px">步态截图</div>
                <img v-else :src="imgUrl.step2" alt="" style="height: 100%;margin-left: 50%;transform: translateX(-50%)">
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
        </div>

        <div class="title">动作识别结果</div>
        <div style="margin-top: 5px;padding-left: 5px">
          <el-table ref="multipleTable"
                    :data="tableData2"
                    height="240"
                    tooltip-effect="dark"
                    v-loading="loading"
                    :header-cell-style="{background:'#eef1f6'}"
                    element-loading-text="拼命加载中"
                    style="width:100%;">
            <el-table-column
              label="序号"
              prop="num"
              width="60px">
            </el-table-column>

            <el-table-column
              label="步序"
              prop="step"
              width="60px">
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
              width="140px">
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

      </el-col>
      <el-col :span="8">
        <div class="title">扣分列表</div>
        <div style="margin-top: 5px;padding-left: 5px;">
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
              width="50px">
            </el-table-column>

            <el-table-column
              label="扣分项目"
              prop="deduction">
            </el-table-column>

            <el-table-column
              label="扣分"
              prop="score"
              width="50px">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '../../../static/css/main.css';   //引入使用相对路径
import flvjs from "flv.js";
import {getCameraConfigInfo, getNextStepInfo} from "../../assets/api/request";
import axios from '../../assets/api/base'

export default {
  name: "VideoDetection",
  data() {
    return {
      trainingItem: '单兵姿态训练',
      //trainingPerson: 'Tom',
      tableData1: [],
      tableData2: [],
      tableData3: [],
      //显示是否加载中提示
      loading: false,
      trainTitle: '启动动作识别',
      video:{
        positive:{
          show:false,
          player:null
        },
        aside:{
          count:0,
          timeout:3000,
          players:[{
            show:false,
            player:null
          },{
            show:false,
            player:null
          },{
            show:false,
            player:null
          }]
        },
      },
      inter: null,
      imgUrl: {
        step1: '',
        step2: '',
      },
      rtsp: 'rtsp://admin:hogo1234@192.168.124.64/h265/ch1/main/av_stream',
      wSocket: '', //websocket
      ip:'',
      ipPositive:'', //正面相机
      cIP:'',
      flag:false,
    };
  },
  mounted() {
    console.log(this.$route.query);
    /*建立websocket*/
    let url = axios.defaults.baseURL;
    this.wSocket = new WebSocket(`ws://` + `${url.substring(7, url.length)}trainInfo/` + `${this.$route.query.id}`);
    if (!this.wSocket) {
      console.log('您的浏览器不支持websocket协议！');
    } else {
      console.log("websocket");
      this.wSocket.onopen = () => {
        console.log('websocket已连接.');
      };
    }
    this.ipConfig();
  },
  methods: {
    ipConfig(){
      getCameraConfigInfo()
      .then(data=>{
        if(data.data.code === 200){
          // console.log(data.data.data);
          let arr = data.data.data;
          for(let i =0;i< arr.length;i++){
            if(arr[i].ctype == 'ipPositive')
              this.ipPositive = arr[i].cip;
            else if(arr[i].ctype == 'ipAlide1')
              this.ip = arr[i].cip;
            else if(arr[i].ctype == 'ipServer')
              this.cIP = arr[i].cip;
          }
          console.log(this.ipPositive,this.ip,this.cIP);
          if(this.ip !== '' && this.ipPositive !== ''){
            this.startCameraShow(this.ip,'example_video_0','aside');
            this.startCameraShow(this.ipPositive,'example_video_1','positive');
          }
        }
      })
    },
    create(curCount, ip, ms=0){//延迟多少ms播放
      let players = this.video.aside.players;
      let item = players[curCount];
      var video = document.querySelector(`.video_${curCount}`);
      console.log('asdf');
      if (flvjs.isSupported()) {
        if (video) {
          item.player = flvjs.createPlayer({
            type: "flv",
            isLive: true,
            url: `ws://localhost:8989/rtsp/1/?url=rtsp://admin:hogo1234@${ip}/h265/ch1/sub/av_stream`,  //摄像头
            // url:'http://192.168.1.105/1.flv'
          });
          item.player.attachMediaElement(video);
          item.player.load();
          setTimeout(() => {
            item.player.play();
            item.show = true;
          }, ms);
        }
      }
    },
    destroy(curCount, ms=0){
      let players = this.video.aside.players;
      if(players[curCount].player != null){
        setTimeout(() => {
          players[curCount].player.pause();
          players[curCount].player.unload();
          players[curCount].player.detachMediaElement();
          players[curCount].player.destroy();
          players[curCount].player = null;
          players[curCount].show = false;
        }, ms);
      }
    },
    cameraShow(ip){
      let len = this.video.aside.players.length;
      let curCount = this.video.aside.count % len;
      this.video.aside.count++;
      let timeout = this.video.aside.timeout;
      this.destroy((curCount - 1 + len) % len, timeout);
      this.create(curCount, ip, timeout);
    },
    startCameraShow(ip,id,str){
      if (flvjs.isSupported()) {
        if(str === 'positive'){
          console.log(id);
          var video = document.getElementById(id);
          this.video.positive.player = flvjs.createPlayer({
            type: "flv",
            isLive: true,
            url: `ws://localhost:8989/rtsp/1/?url=rtsp://admin:hogo1234@${ip}/h265/ch1/sub/av_stream`,  //摄像头
            // url:'http://192.168.1.105/1.flv'
          });
          this.video.positive.player.attachMediaElement(video);
          this.video.positive.show = true;
          this.video.positive.player.load();
          this.video.positive.player.play();
        }else{
          console.log(123);
          this.cameraShow(ip);
          console.log(456)
        }
      }
    },
    solve(data) {
      // console.log(data);
      if (data.code === 200) {
        data = data.data;
        if (data.flag == null) return;
        if (data.flag == 2) {  //姿态识别数据，动作识别之前的静止几分钟
          let tmp = {
            num: this.tableData1.length + 1
          };
          for (let i = 0; i < data.arr.length; i++) {
            tmp['a' + (i + 1)] = data.arr[i];
          }
          this.tableData1.push(tmp);
          /*处理扣分项*/
          let tmp2 = {};
          for (let i = 0; i < data.deductionArr.length; i++) {
            tmp2 = {};
            tmp2['num'] = this.tableData3.length + 1;
            tmp2['deduction'] = `【姿态识别 序号:${tmp.num}】` + data.deductionArr[i].deductionItem;
            tmp2['score'] = data.deductionArr[i].deductionScore;
            this.tableData3.push(tmp2);
          }
        } else if (data.flag == 1) { //动作识别数据，一步一步的55
          let tmp = {
            num: this.tableData2.length + 1,
            step: data.step
          };
          for (let i = 0; i < data.arr.length; i++) {
            tmp['a' + (i + 1)] = data.arr[i];
          }
          this.tableData2.push(tmp);
          /*处理扣分项*/
          let tmp2 = {};
          for (let i = 0; i < data.deductionArr.length; i++) {
            tmp2 = {};
            tmp2['num'] = this.tableData3.length + 1;
            tmp2['deduction'] = `【动作识别 第${tmp.step}步】` + data.deductionArr[i].deductionItem;
            tmp2['score'] = data.deductionArr[i].deductionScore;
            this.tableData3.push(tmp2);
          }
          this.imgUrl.step1 = `http://${this.cIP}/${data.time}Step${data.step}-1.jpg`;
          this.imgUrl.step2 = `http://${this.cIP}/${data.time}Step${data.step}-2.jpg`;
          console.log(this.imgUrl);
        }
      }
    },
    train() {
      var btn = document.getElementById('train');
      if (this.trainTitle === '启动动作识别') {
        this.trainTitle = '结束训练';
        this.tableData1 = [];
        this.tableData2 = [];
        this.tableData3 = [];
        this.$message.success('开启动作识别，请稍后');
        btn.style.backgroundColor = 'red';
        this.wSocket.send('5,detect_start'); //启动动作识别
        let obj = this;
        this.wSocket.onmessage = (data) => {
          let str = data.data;
          if(str == '5,detect_start_succ'){
            obj.flag = true;
            obj.$message.success('正步训练开启成功！');
          } else if(str == '5,detect_start_fail'){
            obj.flag = false;
            obj.$message.error('正步训练开启失败！');
          }
          if(this.flag){
            //console.log("原始数据", data);
            data = JSON.parse(data.data);
            console.log("转换后的数据", data);
            obj.solve(data);
          }
          if(data.data.hasOwnProperty('cIP')){
            obj.ip = data.data.cIP;
            console.log(data.data, obj.ip);
            //obj.player.close();
            obj.cameraShow(obj.ip);
          }
        };

      } else if (this.trainTitle === '结束训练') {
        this.trainTitle = '启动动作识别';
        this.$message.success('正在保存训练结果，请稍后');
        btn.style.backgroundColor = '';
        // this.videoShow = false;
        // this.player.pause();
        this.wSocket.send('5,detect_stop'); //结束动作识别
        this.wSocket.onmessage = (data) => {
          console.log(data.data);
          let str = data.data;
          if(str == '5,detect_stop_succ'){
            this.$message.success('成功关闭正步训练');
          }
        }

        // this.wSocket.close();
        //当想关闭时
      /*  this.wSocket.onclose = () => {
          //服务器那边异常，断开
          console.log('websocket连接已关闭...');
        };*/
      }
    },
    onChange(file, fileList) { //跟踪上传信息
      this.file = file.raw;//file.raw为文件
    },
    onRemove(file, fileList) {
      this.file = null;
    },
  },
  beforeDestroy() {
    if(this.wSocket.readyState == this.wSocket.OPEN){
      this.wSocket.close();
      console.log('websocket连接已强制关闭...');
      this.$message.error('当前训练中断');
    }
  },
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

.title {
  font-size: 18px;
}

</style>
