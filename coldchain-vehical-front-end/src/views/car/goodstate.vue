<template>


  <div>
    <el-row :gutter="20"  class="chartArea">

      <el-col :span="10">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-archive"></i>货物信息</p>
          <div class="table">
            <p><span class="tit">品种</span>{{kinds}}</p>
            <p><span class="tit">重量(/kg)</span>{{pweight}}</p>
            <p><span class="tit">推荐温度(℃)</span>{{tempd}}~{{tempu}}</p>
            <p><span class="tit">推荐湿度(%)</span>{{humid}}~{{humiu}}</p>
            <p><span class="tit">上车时间</span>{{loadtime}}</p>
            <p><span class="tit">始发地</span>{{startpls}}</p>
            <p><span class="tit">目的地</span>{{destpls}}</p>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div class="boxvideo">

          <video src="http://192.168.1.107:8081/stream" type="video/ogg" width="800" height="600" autoplay="autoplay"  loop="loop" style="margin-top: -75px;"></video>

        </div>
      </el-col>


    </el-row>

  </div>


</template>

<script>
export default {
  name: "goodstate",

  data () {
    return {
      kinds : '东北民猪',
      pweight : "11000",
      tempd : "10",
      tempu : "20",
      humid : "50",
      humiu : "60",
      loadtime : "12:40",
      startpls : "黑龙江",
      destpls : "北京",

      // 视频播放
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        techOrder: ['flash', 'html5'],      // 兼容顺序
        flash: {

          hls: {withCredentials: false},
          swf: 'static/video-js.swf' // 引入静态文件swf
        },
        html5: {hls: {withCredentials: false}},
        sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
          type: 'http/rtmp',
          src: 'http://192.168.1.103:8081/stream'
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },

  created() {

    var webSocket;
    var url = 'ws://localhost:8443/websocket/doorState';

    webSocket = new WebSocket(url);

    webSocket.onopen = function (){
      console.log('webSocket连接创建。。。');
    }
    webSocket.onclose = function(){

    }
    webSocket.onmessage = function(event){
      if(event.data === "1"){
        location.reload();
      }
    }
    webSocket.onerror = function (event) {
      console.log('webSocket连接异常。。。');
    }


    this.$axios
      .post('/goodGet', {
      })
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
          this.kinds = successResponse.data.kinds;
          this.pweight = successResponse.data.pweight;
          this.tempd = successResponse.data.tempd;
          this.tempu = successResponse.data.tempu;
          this.humid = successResponse.data.humid;
          this.humiu = successResponse.data.humiu;
          this.loadtime = successResponse.data.loadtime;
          this.startpls = successResponse.data.startpls;
          this.destpls = successResponse.data.destpls;

        }
        else {
          this.$message({
            showClose: true,
            message: "错误！",
            type: "error"
          })
        }
      })
      .catch(failResponse => {
      })
  },

  destroyed() {
    webSocket.close();
  },

}
</script>




<style scoped>

</style>
