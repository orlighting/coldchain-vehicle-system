<template>
  <div>
    <el-row :gutter="20">

      <el-col :span="11">

      </el-col>

      <el-col :span="24">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-server"></i>当前已行驶时间</p>
          <p class="drivetime">
            <i class="hournum">{{driveHour}}</i>
            <i class="hourtext">小时</i>
            <i class="minnum">{{driveMin}}</i>
            <i class="mintext">分钟</i>
          </p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="24">

        <div style="display: flex; align-items: center; justify-content: center;">
          <div class="mapcontent">
            <el-amap
              :center='center'
              :zoom='zoom'
            >
              <el-amap-marker
                :position="center"
                :label="label"
              ></el-amap-marker>
            </el-amap>
          </div>
        </div>

      </el-col>
    </el-row>
  </div>
</template>



<script>
export default {
  name: "driveState",
  data () {
    return {
      driveHour:4,
      driveMin:23,

      center: [116.397428, 39.90923],
      zoom: 15,
      label:{
        content: '当前位置',
        offset:[10,12]
      }
    }
  },
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
