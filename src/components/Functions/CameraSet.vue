<template>
  <div class="adminLog">
    <div class="top"><i class="el-icon-notebook-1"></i> 相机评定</div>

    <!--第一部分-->
    <!--    <div style="margin:20px 0 0 20px">
          <el-button type="primary" @click="add">添加项目</el-button>
          <el-button @click="operate">批量操作</el-button>
          <el-dropdown trigger="click" style="margin-left: 8px">
            <el-button >更多操作 <i class="el-icon-arrow-down"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="modify">修改</el-dropdown-item>
              <el-dropdown-item @click.native="del">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>-->
    <div style="margin:20px 0 0 15px">
      <el-button type="primary" @click="openCamera">开启相机</el-button>
      <el-button @click="dialogVisible = true">服务器IP配置</el-button>
      <span>
        <el-dialog
          title="服务器IP配置"
          :visible.sync="dialogVisible"
          width="55%">
          <el-table ref="multipleTable"
                    :header-cell-style="{background:'#eef1f6'}"
                    :data="tableData2"
                    tooltip-effect="dark"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    style="width:100%;">
            <el-table-column
              label="名称"
              prop="ctype"
              width="200px">
              <template slot-scope="scope">
                <div v-if="scope.row.ctype == 'ipServer'">
                  算法服务器IP
                </div>
                <div v-else-if="scope.row.ctype == 'ipPositive'">
                  正面相机IP
                </div>
                <div v-else-if="scope.row.ctype == 'ipAlide1'">
                  侧面1相机IP
                </div>
                <div v-else-if="scope.row.ctype == 'ipAlide2'">
                  侧面2相机IP
                </div>
                <div v-else-if="scope.row.ctype == 'ipAlide3'">
                  侧面3相机IP
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="IP"
              prop="cip">
              <template slot-scope="scope">
                <div v-if="scope.row.ctype == 'ipServer'">
                  <el-input v-model="form.ipServer" type="text"/>
                </div>
                <div v-else-if="scope.row.ctype == 'ipPositive'">
                  <el-input v-model="form.ipPositive" type="text"/>
                </div>
                <div v-else-if="scope.row.ctype == 'ipAlide1'">
                  <el-input v-model="form.ipAlide1" type="text"/>
                </div>
                <div v-else-if="scope.row.ctype == 'ipAlide2'">
                  <el-input v-model="form.ipAlide2" type="text"/>
                </div>
                <div v-else-if="scope.row.ctype == 'ipAlide3'">
                  <el-input v-model="form.ipAlide3" type="text"/>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue"
                   @click="updateIp(scope.row.ctype)">修改</a>
              </template>
            </el-table-column>
          </el-table>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
            <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
          </span>
        </el-dialog>
      </span>
    </div>
    <!--第二部分-->
    <div style="margin:15px 0 0 15px">
      <el-table ref="multipleTable"
                :header-cell-style="{background:'#eef1f6'}"
                :data="tableData"
                tooltip-effect="dark"
                v-loading="loading"
                element-loading-text="拼命加载中"
                style="width:100%;">
        <el-table-column
          label="相机"
          prop="camera"
          width="300px">
        </el-table-column>

        <el-table-column
          label="参数"
          prop="params">
          <!--<template slot-scope="scope">
            <el-input v-model="scope.row.params"  type="text"/>
          </template>-->
        </el-table-column>

        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue"
               @click="set(scope.row.params,scope.row.camera)">标定</a>
            <!--<span style="color: #eae9e9">|</span><a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="set(scope.row.id)">编辑</a>
            <span style="color: #eae9e9">|</span><a href="javascript:void(0);" style="margin-left: 10px;color: dodgerblue" @click="set(scope.row.id)">删除</a>-->
            <span>
              <el-dialog :visible.sync="dialogCamera" title="相机评定" width="800px">
                <el-form>
                  <div v-show="!videoShow" style="text-align: center;line-height: 400px">
                    实时画面
                  </div>
                  <div v-show="videoShow">
                    <video id="example_video_1" style="width: 100%;height: 400px"></video>
                  </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogCamera = false">取 消</el-button>
                  <el-button type="primary" @click="confirmSet()">确 定</el-button>
                </div>
              </el-dialog>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import '../../../static/css/main.css';   //引入使用相对路径
  import flvjs from "flv.js";
  import axios from "../../assets/api/base";
  import {getCameraConfigInfo} from "../../assets/api/request";
  import {updateCameraConfigInfo} from "../../assets/api/request";

  export default {
    name: "CameraSet",
    data() {
      return {
        cameraArr: ['正面', '侧面1', '侧面2', '侧面3'],
        tableData: [
          {
            camera: "正面",
            params: ''
          },
          {
            camera: "侧面1",
            params: ''
          },
          {
            camera: "侧面2",
            params: ''
          },
          {
            camera: "侧面3",
            params: ''
          },
        ],
        tableData2: [],
        form: {
          ipPositive: '',
          ipAlide1: '',
          ipAlide2: '',
          ipAlide3: '',
          ipServer: '',
        },
        loading: false,
        dialogCamera: false,
        videoShow: false,
        wSocket: '',
        player: null,
        dialogVisible: false,
      };
    },
    mounted() {
      this.query();
      /*建立websocket*/
      let url = axios.defaults.baseURL;
      this.wSocket = new WebSocket(`ws://${url.substring(7, url.length)}camera`);
      if (!this.wSocket) {
        console.log('您的浏览器不支持websocket协议！');
      } else {
        console.log("websocket");
        this.wSocket.onopen = () => {
          console.log('websocket已连接.');
        };
        this.wSocket.onmessage = (data) => {
          // console.log(data);
          // 在这里写处理函数
        };
        //this.wSocket.send(xxxxx); // 向后端发送数据
      }
    },
    methods: {
      query() {
        getCameraConfigInfo()
          .then(data => {
            if (data.data.code === 200) {
              console.log(data.data.data);
              this.tableData2 = data.data.data;
              let arr = data.data.data;
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].ctype == 'ipPositive')
                  this.form.ipPositive = arr[i].cip;
                else if (arr[i].ctype == 'ipAlide1')
                  this.form.ipAlide1 = arr[i].cip;
                else if (arr[i].ctype == 'ipAlide2')
                  this.form.ipAlide2 = arr[i].cip;
                else if (arr[i].ctype == 'ipAlide3')
                  this.form.ipAlide3 = arr[i].cip;
                else if (arr[i].ctype == 'ipServer')
                  this.form.ipServer = arr[i].cip;
              }
              //查询更新IP
              for (let i = 0; i < this.tableData.length; i++) {
                if (i === 0)
                  this.tableData[i].params = this.form.ipPositive;
                else if (i === 1)
                  this.tableData[i].params = this.form.ipAlide1;
                else if (i === 2)
                  this.tableData[i].params = this.form.ipAlide2;
                else if (i === 3)
                  this.tableData[i].params = this.form.ipAlide3;
              }
            }
          });
      },
      updateIp(type){
        console.log(type);
        let ip = '';
        if(type == 'ipServer')
          ip = this.form.ipServer;
        else if(type == 'ipPositive')
          ip = this.form.ipPositive;
        else if(type == 'ipAlide1')
          ip = this.form.ipAlide1;
        else if(type == 'ipAlide2')
          ip = this.form.ipAlide2;
        else if(type == 'ipAlide3')
          ip = this.form.ipAlide3;
        console.log(ip);
        updateCameraConfigInfo(type,ip)
        .then(data=>{
          console.log(data);
          if(data.data.code === 200) {
            this.$message.success('IP更新成功');
            this.query();
          }
        })
      },
      cameraShow(ip) {
        var video = document.getElementById('example_video_1');
        if (flvjs.isSupported()) {
          if (video) {
            this.player = flvjs.createPlayer({
              type: "flv",
              isLive: true,
              url: `ws://localhost:8989/rtsp/1/?url=rtsp://admin:hogo1234@${ip}/h265/ch1/sub/av_stream`,  //摄像头
            });
            this.player.attachMediaElement(video);
          }//192.168.1.64
        }
      },
      set(ip, camera) { //相机评定
        if (camera == this.cameraArr[0]) { //正面相机
          this.$message.info('正面相机暂时不需要标定');

        } else if (camera == this.cameraArr[1]) { //侧1
          this.$message.info('正在请求相机标定');
          this.wSocket.send('6,calib_camera1');
          this.dialogCamera = true;
          this.wSocket.onmessage = (data) => { //收到的后端指令
            let str = data.data;
            console.log(str);
            if (str == '') {
              console.log(camera, '标定成功');
              //this.cameraShow(ip);
            }
          }

        } else if (camera == this.cameraArr[2]) { //侧2
          this.$message.info('正在请求相机标定');
          this.wSocket.send('6,calib_camera2');
          // this.cameraShow(ip);

        } else if (camera == this.cameraArr[3]) { //侧3
          this.$message.info('正在请求相机标定');
          this.wSocket.send('6,calib_camera3');
          //this.cameraShow(ip);

        }

        // this.videoShow = true; //显示视频
        // this.player.unload();
        // this.player.load();
        // this.player.play();

      },
      confirmSet() {
        // this.videoShow = false;
        // this.player.pause();

      },
      openCamera() {
        const loading = this.$loading({ //设置页面加载
          lock: true,
          text: '正在启动相机中，请耐心等待',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.wSocket.send('4,camera_start'); //启动相机中
        this.wSocket.onmessage = (data) => { //收到的后端指令
          let str = data.data;
          console.log(str);
          if (str == '4,camera_start_succ') {
            loading.close(); //解除加载
            this.$message.success('相机连接成功');
            //this.cameraShow(ip);
          } else if (str == '4,camera_start_fail') {
            loading.close(); //解除加载
            this.$message.error('相机开启失败,请重新连接');
          }
        }
        if (1 == 2) {

        }
      },
      del() {

      },
      add() {

      },
      operate() {

      }
    },
    beforeDestroy() {
      if (this.wSocket.readyState == this.wSocket.OPEN) {
        this.wSocket.close();
        console.log('websocket连接已强制关闭...');
      }
    },
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
