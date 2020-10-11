<template>
  <div class="china">
    <div class="china_top">
      <div class="sent" sticky>选择品类</div>
      <div class="tbs" sticky>
        <div class="child" @click="getProvice(0)" :class="indexs == 0?'active':''">{{first_levelName}}</div>
        <div class="child" @click="getCity(1)" :class="indexs == 1?'active':''">{{second_levelName}}</div>
        <div class="child" @click="getCounty(2)" :class="indexs == 2?'active':''">{{three_levelName}}</div>
      </div>
    </div>
    <div class="a_scroll">
      <van-index-bar :index-list="[]" highlight-color="#FF5555">
        <!--<div v-for="(dataList,index) in dataList" :key="index">-->
          <div v-for="(first_level,index) in dataList" :key="index" v-if="indexs == 0">
            <van-cell :title="first_level.typeName"
                      @click="selProvice(first_level.id,first_level.typeName,0)"
                      :style="{color:(first_level.typeName == first_levelName?'#FF5555':'')}"
            >
              <van-icon name="success" v-if="first_level.typeName == first_levelName" class="a_arrow" size="20px" style="margin-top: 6px"/>
            </van-cell>
          </div>
          <div v-for="(second_level,index) in dataList" :key="index" v-if="indexs == 1">
            <van-cell :title="second_level.typeName"
                      @click="selCity(second_level.id,second_level.typeName,1)"
                      :style="{color:(second_level.typeName == second_levelName?'#FF5555':'')}"
            >
              <van-icon name="success" v-if="second_level.typeName == second_levelName" class="a_arrow" size="20px" style="margin-top: 6px"/>
            </van-cell>
          </div>
          <div v-for="(three_level,index) in dataList" :key="index" v-if="indexs == 2">
            <van-cell :title="three_level.typeName" @click="selCounty(three_level.id,three_level.typeName,2)"
                      v-if="indexs == 2"
                      :style="{color:(three_level.typeName == three_level?'#FF5555':'')}"
            >
              <van-icon name="success" v-if="three_level.typeName == three_levelName" class="a_arrow" size="20px" style="margin-top: 6px"/>
            </van-cell>
          </div>
        <!--</div>-->
      </van-index-bar>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataList:[],
        indexList:[],
        indexs:0,
        firstId:0,
        secondId:0,
        threeId:0,
        first_levelName:'请选择',
        second_levelName:'请选择',
        three_levelName:'请选择',
      };
    },
    created() {
      this.getProvice(0);
    },
    methods: {
      selProvice(p,x,idex){
        if(this.first_levelName != x) {
          this.first_levelName = x;
          this.second_levelName = '请选择'
          this.three_levelName = '请选择'
        }
        this.indexs = idex;
        this.firstId = p;
        this.getCity(1);
      },
      selCity(c,x,idex){
        if(this.second_levelName != x) {
          this.second_levelName = x;
          this.three_levelName = '请选择';
        }
        this.indexs = idex;
        this.secondId = c;
        this.getCounty(2);
      },
      selCounty(c,x,idex){
        this.indexs = idex;
        this.threeId = c;
        this.three_levelName = x;
        //往父组件传参
        let array = new Array();
        array={
          firstId:this.firstId,
          secondId:this.secondId,
          threeId:this.threeId,
          first_levelName:this.first_levelName,
          second_levelName:this.second_levelName,
          three_levelName:this.three_levelName,
        }
        this.$emit('event1', array)
      },
      //获取省份
      getProvice(index){
        this.indexs = index;
        this.dataList = [];
        this.indexList = [];
        this.$http({
          method: 'post',
          url: '/minle/mipuCommodity/classifyDisplay',
          data: {typeLevel:1,pageNum:1,pageSize:500},
        })
          .then(res => {
            if (res.status == 200) {
              this.dataList = res.data.data.list;
            }
          }).catch(e => {

        })
      },
      //获取城市
      getCity(index){
        if(this.first_levelName == "请选择"){
          return false;
        }
        this.indexs = index;
        this.dataList = [];
        this.indexList = [];
        this.$http({
          method: 'post',
          url: '/minle/mipuCommodity/classifyDisplay',
          data: {
            typeLevel:'',
            pageNum:1,
            pageSize:500,
            parentTypeId:this.firstId
          },
        })
          .then(res => {
            if (res.status == 200) {
        /*      for(let i = 0;i<res.data.data.length;i++){
                this.indexList.push(res.data.data[i].prefix)
              }*/
              this.dataList = res.data.data.list;
            }
          }).catch(e => {

        })
      },
      //获取县
      getCounty(index) {
        if(this.second_levelName == "请选择"){
          return false;
        }
        this.indexs = index;
        this.dataList = [];
        this.$http({
          method: 'post',
          url: '/minle/mipuCommodity/classifyDisplay',
          data: {
            typeLevel:'',
            pageNum:1,
            pageSize:500,
            parentTypeId:this.secondId
          },
        })
          .then(res => {
            if (res.status == 200) {
              this.indexList = [];
              this.dataList = res.data.data.list;
            }
          }).catch(e => {

        })
      },
    },
  };
</script>

<style lang="less" scoped>
  .china_top {
    height: 75px;
    position: relative;
    .sent {
      font-size: 16px;
      font-weight: bold;
      padding: 0.466667rem 0.466667rem 0.1rem 0.366667rem;

      .tbs {

      }
    }
  }
  .tbs {
    display: flex;
    &:after {
      content: '';
      width: 93%;
      left: 3.5%;
      height: 1px;
      position: absolute;
      background-color: #f5f5f5;
      bottom: 1px;
    }

    .child {
      height: 1.1rem;
      line-height: 1.1rem;
      padding: 0 0.366667rem;
      font-size: 0.373333rem;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .active {
      color: #ff5555;
      position: relative;

      &:after {
        content: '';
        width: 60%;
        left: 20%;
        height: 1px;
        position: absolute;
        background-color: #ff5555;
        bottom: 6px;
      }
    }
  }
  .a_scroll {
    height: 85%;
    width: 100%;
    position: absolute;
    top: 2rem;
    .van-index-bar {
      height: 100%;
      overflow-y: scroll;
      .van-cell__value,
      .van-cell__title {
        flex: none;
        .a_arrow {
          float: left;
          color: #ff5555;
          position: relative;
          top: 0;
        }
      }
    }
  }
</style>
