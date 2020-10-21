<template>
  <div>
    <el-col span="12">
      <el-row gutter="14">

        <div class="card bbxx">
          <p class="title"><i class="fa fa-user-o"></i>人脸核验</p>
          <div v-if="!elcheck" class="camera_outer">
            <div style="display: flex; align-items: center; justify-content: center;">
              <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
            </div>
            <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
            <div v-if="imgSrc" class="img_bg_camera">
            </div>
            <div class="button" style="padding-bottom: 25px; text-align: center">
              <el-button @click="setImage()">进行核验！</el-button>
            </div>
          </div>
          <div v-if="elcheck" style="height: 300px">
            <p style="text-align: center; line-height: 300px; font-size: 80px">人脸核验已完成！</p>
          </div>
        </div>

      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {

  name:"faceState",

  data() {
    return {
      videoWidth: 600,
      videoHeight: 450,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo:false,
      driverId:'',
      elcheck:false,
    };
  },
  mounted(){
    if(this.$store.getters.face === "checked"){
      this.elcheck = true;
    }
    else{
      this.getCompetence()//进入页面就调用摄像头
    }
  },
  methods: {
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {//不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
    setImage() {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image;//赋值并预览图片

      this.$axios
        .post('/faceCom', {
          imageBase:image,
          driverId:this.$store.getters.token,
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
            this.$message({
              showClose: true,
              message: "人脸核验成功！",
              type: "alert"
            })

            _this.$store.dispatch("setFace", "checked").then(() => {
              _this.$router.push({path: "/"})
            }).catch(res => {
              _this.$message({
                showClose: true,
                message: res,
                type: "error"
              })
            })

          }
          else if(successResponse.data.code === 401){
            this.$message({
              showClose: true,
              message: "图片对比失败,请重新拍摄！！！",
              type: "error"
            })
          }
          else if(successResponse.data.code === 412){
            this.$message({
              showClose: true,
              message: "非本人操作！请向管理员确认",
              type: "error"
            })
          }
        })
        .catch(failResponse => {
        })

    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  }
};
</script>

<style scoped lang="scss">
$top:top;
$bottom:bottom;
$left:left;
$right:right;
$leftright: ($left, $right);
$pinkk: #eec2d3;
$bluee: #409eff;
$yelloww: #f4d884;
$grennn: #89dda0;
$purplee: #78a2ea;
$lightBluee: #b8d6ff;

$list: bluee pinkk yelloww grennn purplee lightBluee;
$list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
%shadow{
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);
  .title{
    font-size: 14px;
    padding: 10px;
    i{
      margin-#{$right}: 5px;
    }
  }
}

@mixin flex($direction:row,$content:space-between){
  display: flex;
  flex-direction: $direction;
  justify-content: $content;
}

.drivetime{
  text-align: center;
  font-size: 50px;
  padding-bottom: 25px;
  padding-top: 15px;

}

.mapcontent{
  text-align: center;
  height: 600px;
  width: 1200px;
  margin-top: 20px;
}

.card{
  color: #666;
  @extend %shadow;

  ul{
    @include flex;
    li{
      flex: 1;
      a{
        color: #666666;
        align-items:center;
        padding-#{$top}: 20px;
        padding-#{$bottom}: 20px;
        @include flex(column);
        span{
          height: 44px;
        }
        .num{
          line-height: 44px;
          font-size: 42px;
          color: $bluee;
          margin: 0px;
        }
      }
      .kjfs-bluee{
        color: $bluee;
      }
      .kjfs-pinkk{
        color: $pinkk;
      }
      .kjfs-yelloww{
        color: $yelloww;
      }
      .kjfs-grennn{
        color: $grennn;
      }
      .kjfs-purplee{
        color: $purplee;
      }
      .kjfs-lightBluee{
        color: $lightBluee;
      }
      &:hover{
        .kjfs-bluee{
          color: #ffffff;
          background: $bluee;
        }
        .kjfs-pinkk{
          color: #ffffff;
          background: $pinkk;
        }
        .kjfs-yelloww{
          color: #ffffff;
          background: $yelloww;
        }
        .kjfs-grennn{
          color: #ffffff;
          background: $grennn;
        }
        .kjfs-purplee{
          color: #ffffff;
          background: $purplee;
        }
        .kjfs-lightBluee{
          color: #ffffff;
          background: $lightBluee;
        }
      }
    }
  }
  .table{
    padding: 21px;
    p{
      height: 52px;
      line-height: 52px;
      border: 1px solid #cccccc;
      overflow: hidden;
      border-#{$top}: none;
      @include flex( null,start);
      &:first-child{
        border-#{$top}: 1px solid #cccccc;
      }
      span{
      }
      .tit{
        width: 180px;
        min-width: 180px;
        height: 100%;
        text-align: center;
        border-#{$right}: 1px solid #cccccc;
        margin-#{$right}: 18px;
      }
      span.gitbox{
        flex: 1;
        height: 100%;
        overflow: hidden;
        @include flex(row,start);
        a{
          &:first-child{
            margin-#{$right}: 30px;
          }
        }
      }
    }
  }
}
#lineEcharts{
  margin-#{$top}: 30px;
  padding-#{$top}: 30px;
  @extend %shadow;
}
#maintable{
  margin-#{$top}: 30px;
  padding-#{$top}: 10px;
  @extend %shadow;
}
</style>
