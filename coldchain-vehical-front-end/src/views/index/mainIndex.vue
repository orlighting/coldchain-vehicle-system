<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="card kjfs">
          <p class="title"><i class="fa fa-th-large fa-lg"></i>快捷方式</p>
          <ul>
            <li><router-link to="/box" class="kjfs kjfs-bluee"><span><i class="fa fa-thermometer-half fa-2x"></i></span><span>车厢信息</span></router-link></li>
            <li><router-link to="/good" class="kjfs kjfs-pinkk"><span><i class="fa fa-archive fa-2x"></i></span><span>载货信息</span></router-link></li>
            <li><router-link to="/face" class="kjfs kjfs-yelloww"><span><i class="fa fa-user-circle-o fa-2x"></i></span><span>人脸识别</span></router-link></li>
          </ul>
          <ul>
            <li><router-link to="/drive" class="kjfs kjfs-grennn"><span><i class="fa fa-tachometer fa-2x"></i></span><span>驾驶信息</span></router-link></li>
            <li><router-link to="/help" class="kjfs kjfs-purplee"><span><i class="fa fa-question-circle-o fa-2x"></i></span><span>使用说明</span></router-link></li>
            <li  v-on:click="logout"><router-link to="/" class="kjfs kjfs-lightBluee"><span><i class="fa fa-sign-out fa-2x"></i></span><span>退出系统</span></router-link></li>
          </ul>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-server"></i>箱内简略信息</p>
          <div class="table">
            <p><span class="tit">箱内平均温度(℃)</span>{{tempA}}</p>
            <p><span class="tit">箱内平均湿度(%)</span>{{humiA}}</p>
            <p><span class="tit">箱内货物品种</span>{{kinds}}</p>
            <p><span class="tit">车门开闭状态</span>{{door}}</p>
          </div>
        </div>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="18">
        <div v-if="efcheck" class="card bbxx" style="margin-top: 15px; ">
          <p class="title"><i class="fa fa-user"></i>司机信息</p>

          <el-row>
            <el-col :span="8">
              <div class="photo">
                <img :src="imgUrl" alt="" style="height: 200px">
              </div>
            </el-col>

            <el-col :span="16">
              <div class="table">
                <p><span class="tit">司机姓名</span>{{name}}</p>
                <p><span class="tit">司机驾龄</span>{{driveyear}}</p>
                <p><span class="tit">驾驶执照</span>{{drivelv}}</p>
                <p><span class="tit">工号</span>{{num}}</p>
              </div>
            </el-col>
          </el-row>
        </div>

        <div v-if="!efcheck">
          <div class="card bbxx" style="margin-top: 15px; height: 140px; padding-bottom: 40px">
            <p class="title"><i class="fa fa-user"></i>司机信息</p>
            <p style="font-size: 40px; line-height: 120px; text-align: center;">请尽快进行人脸识别！！！！</p>
          </div>
        </div>


      </el-col>
    </el-row>

  </div>
</template>

<script>
import LineEcharts from "../../components/ECharts/lineEcharts"
import Cookies from "js-cookie";

export default {
  name: "mainIndex",
  components: {LineEcharts},
  mounted () {
    this.selfAdaption()
  },
  data(){
    return{
      imgUrl:require("../../assets/photo.jpeg"),

      tempA:"23",
      humiA:"54",
      kinds:"民猪",
      door:"关闭",

      name:"BBB",
      driveyear:"12",
      drivelv:"B2",
      num:"2019123123",

      efcheck : false,

    }
  },

  created() {

    if(this.$store.getters.face === "checked"){
      this.efcheck = true;
    }

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
      .post('/indexGet', {
        imageBase:"123123",
        driverId:this.$store.getters.token,
      })
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准

          if(successResponse.data.door === "1"){
            this.door="开启";
          }
          else {
            this.door="关闭";
          }

          this.tempA = successResponse.data.tempA;
          this.humiA = successResponse.data.humiA;
          this.name = successResponse.data.name;
          this.drivelv = successResponse.data.drivelv;
          this.driveyear = successResponse.data.driveyear;
          this.kinds = successResponse.data.kinds;
          this.num = successResponse.data.num;

        }
        else {
          this.$message({
            showClose: true,
            message: "账号或密码错误！",
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


  methods: {

    logout() {

      Cookies.remove("token")
      Cookies.remove("face")
      location.reload()

    },

    // echart自适应
    selfAdaption () {
      let that = this
      setTimeout(() => {
        window.onresize = function () {
          if (that.$refs.echarts) {
            that.$refs.echarts.chart.resize()
          }
        }
      }, 10)
    }

  }
}
</script>

<style lang="scss">
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

  .photo{
    height: 200px;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
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
