<template>
  <div>
    <el-row :gutter="20"  class="chartArea">

      <el-col :span="9">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-thermometer-3"></i>温度传感器信息</p>
          <div class="table">
            <p><span class="tit">温度传感器1</span>{{temp1}}</p>
            <p><span class="tit">温度传感器2</span>{{temp2}}</p>
            <p><span class="tit">温度传感器3</span>{{temp3}}</p>
            <p><span class="tit">温度传感器4</span>{{temp4}}</p>
            <p><span class="tit">温度传感器5</span>{{temp5}}</p>
            <p><span class="tit">温度传感器6</span>{{temp6}}</p>
            <p><span class="tit">温度传感器7</span>{{temp7}}</p>
          </div>
        </div>
      </el-col>

      <el-col :span="9">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-umbrella"></i>湿度传感器信息</p>
          <div class="table">
            <p><span class="tit">湿度传感器1</span>{{humi1}}</p>
            <p><span class="tit">湿度传感器2</span>{{humi2}}</p>
            <p><span class="tit">湿度传感器3</span>{{humi3}}</p>
            <p><span class="tit">湿度传感器4</span>{{humi4}}</p>
            <p><span class="tit">湿度传感器5</span>{{humi5}}</p>
            <p><span class="tit">湿度传感器6</span>{{humi6}}</p>
            <p><span class="tit">湿度传感器7</span>{{humi7}}</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="doorArea">
      <el-col span="16">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-dot-circle-o"></i>厢门开闭状态</p>
          <p class="doorState">{{doorinfo}}</p>
        </div>
      </el-col>
    </el-row>
  </div>




</template>


<script>

export default {
  name: "boxstate",

  data (){
    return{
      doorinfo:"关闭",

      temp1:0,
      temp2:0,
      temp3:0,
      temp4:0,
      temp5:0,
      temp6:0,
      temp7:0,

      humi1:0,
      humi2:0,
      humi3:0,
      humi4:0,
      humi5:0,
      humi6:0,
      humi7:0,
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
      .post('/boxGet', {
      })
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
          this.humi1=successResponse.data.humi1;
          this.humi2=successResponse.data.humi2;
          this.humi3=successResponse.data.humi3;
          this.humi4=successResponse.data.humi4;
          this.humi5=successResponse.data.humi5;
          this.humi6=successResponse.data.humi6;
          this.humi7=successResponse.data.humi7;
          if(successResponse.data.door === "1"){
            this.doorinfo="开启";
          }
          else {
            this.doorinfo="关闭";
          }

          this.temp1=successResponse.data.temp1;
          this.temp2=successResponse.data.temp2;
          this.temp3=successResponse.data.temp3;
          this.temp4=successResponse.data.temp4;
          this.temp5=successResponse.data.temp5;
          this.temp6=successResponse.data.temp6;
          this.temp7=successResponse.data.temp7;
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
  methods:{
    dataGet(){

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

.chartArea{
  margin-bottom: 15px;
}

.doorArea{

  margin-top: 15px;
  border-bottom: 30px;
  padding-#{$bottom}: 20px;
}

.doorState{
  font-size: 50px;
  color: seagreen;
  padding-bottom: 30px;
  text-align: center;
  font-weight: bold;
  font-family: "Microsoft YaHei", "微软雅黑", Helvetica, Tahoma, STXihei, "华文细黑", STHeiti, "Helvetica Neue", Helvetica, Tahoma, "Droid Sans", "wenquanyi micro hei", FreeSans, Arimo, Arial, SimSun, "宋体", Heiti, "黑体", sans-serif;
}
</style>

