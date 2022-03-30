<template>
  <div class="adminLog">
    <div class="top"><i class="el-icon-notebook-1"></i> 评比打分 / 训练列表 / <span style="font-size: 17px;font-weight: bold">单兵动作训练</span></div>
    <div style="margin-bottom:10px;color:#67C23A;font-size:15px; background-color:#F0F9EB;width: 100%;height: 35px;line-height: 35px; border-radius:5px">
      <span style="margin-left: 20px;">当前项目：{{trainingItem}}</span>
      <span style="margin-left: 100px">当前受检人员：{{trainingPerson}}</span>
    </div>
    <!--第一部分-->
    <el-row>
      <el-col :span="2">
        <el-button id="train" @click="train" type="primary">{{trainTitle}}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button>切换相机</el-button>
      </el-col>
    </el-row>

    <!--第二部分-->
    <div>
      <el-row :gutter="20" class="row" style="margin-top: 20px">
        <el-col :span="11">
          <div class="border left">
            <div v-show="!videoShow" style="text-align: center;line-height: 400px">
              实时画面
            </div>
            <div v-show="videoShow">
              <video id="example_video_1" style="width: 100%;height: 400px"></video>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <el-row>
            <el-col :span="12">
              <div class="border right1">
                <div style="text-align: center;line-height: 195px">当前步态-头颈胸腹</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="border right2">
                <div style="text-align: center;line-height: 195px">步态截图</div>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-top: 6px">
            <el-col :span="12">
              <div class="border right3">
                <div style="text-align: center;line-height: 195px">当前步态-腿脚足</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="border right4">
                <div style="text-align: center;line-height: 195px">步态截图</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--第三部分-->
    <el-row :gutter="20" class="row" style="margin-top: 20px;margin-left: 1px">
      <el-col :span="16">
        <div class="title">检测数据</div>
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
              label="步幅/cm"
              prop="">
            </el-table-column>

            <el-table-column
              label="步高/cm"
              prop="">
            </el-table-column>

            <el-table-column
              label="脚尖/度"
              prop="">
            </el-table-column>

            <el-table-column
              label="头颈/度"
              prop="">
            </el-table-column>

            <el-table-column
              label="上体/度"
              prop="">
            </el-table-column>

            <el-table-column
              label="大腿角度/度"
              prop="">
            </el-table-column>

            <el-table-column
              label="小腿角度/度"
              prop="">
            </el-table-column>

            <el-table-column
              label="手臂/度"
              prop="">
            </el-table-column>
          </el-table>
        </div>

      </el-col>
      <el-col :span="8">
        <div class="title">扣分列表</div>
        <div style="margin-top: 5px;padding-left: 5px">
          <el-table ref="multipleTable"
                    :data="tableData2"
                    height="240"
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
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import '../../../static/css/main.css';   //引入使用相对路径
  import flvjs from "flv.js";

  export default {
    name: "VideoDetection",
    data() {
      return {
        trainingItem:'单兵动作训练',
        trainingPerson:'Tom',
        tableData1: [],
        tableData2: [ //数据示例
          {
            num: "1",
            deduction: "背部角度不正确"
          },
          {
            num: "2",
            deduction: "脖颈角度错误"
          },
          {
            num: "1",
            deduction: "背部角度不正确"
          },
          {
            num: "1",
            deduction: "背部角度不正确"
          },
          {
            num: "1",
            deduction: "背部角度不正确"
          },
          {
            num: "1",
            deduction: "背部角度不正确"
          },
          {
            num: "1",
            deduction: "背部角度不正确"
          },
          {
            num: "1",
            deduction: "背部角度不正确"
          },
        ],
        //显示是否加载中提示
        loading: false,
        trainTitle: '开始训练',
        videoShow: false,
        player: null,
      };
    },
    mounted() {
      var video = document.getElementById('example_video_1');
      if (flvjs.isSupported()) {
        if (video) {
          this.player = flvjs.createPlayer({
            type: "flv",
            isLive: true,
            url: `ws://localhost:8989/rtsp/1/?url=rtsp://admin:hogo1234@192.168.1.64/h265/ch1/main/av_stream`
          });
          this.player.attachMediaElement(video);
        }
      }
    },
    methods: {
      train() {
        var btn = document.getElementById('train');
        if (this.trainTitle === '开始训练') {
          this.trainTitle = '暂停训练';
          this.$message.success('正在连接摄像头，请稍后');
          btn.style.backgroundColor = 'red';
          this.videoShow = true;
          this.player.unload();
          this.player.load();
          this.player.play();

        } else if (this.trainTitle === '暂停训练') {
          this.trainTitle = '开始训练';
          this.$message.success('正在保存训练结果，请稍后');
          btn.style.backgroundColor = '';
          // this.videoShow = false;
          this.player.pause();
        }

      },
      onChange(file, fileList) { //跟踪上传信息
        this.file = file.raw;//file.raw为文件
      },
      onRemove(file, fileList) {
        this.file = null;
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

  .title {
    font-size: 18px;
  }

</style>
