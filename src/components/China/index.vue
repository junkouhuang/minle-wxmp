<template>
  <div class="china">
    <div class="china_top">
      <div class="sent" sticky>选择地区</div>
      <div class="tbs" sticky>
        <div class="child" @click="getProvice(0)" :class="indexs == 0?'active':''">{{provinceName}}</div>
        <div class="child" @click="getCity(1)" :class="indexs == 1?'active':''">{{cityName}}</div>
        <div class="child" @click="getCounty(2)" :class="indexs == 2?'active':''">{{regionName}}</div>
      </div>
    </div>
    <div class="a_scroll">
      <van-index-bar :index-list="[]" highlight-color="#FF5555">
        <div v-for="(dataList,index) in dataList" :key="index">
          <div v-for="(provinces,index) in dataList.provinces" :key="index" v-if="indexs == 0">
            <van-cell :title="provinces.provinceName"
                      @click="selProvice(provinces.provinceId,provinces.provinceName,0)"
                      :style="{color:(provinces.provinceName == provinceName?'#FF5555':'')}"
            >
              <van-icon name="success" v-if="provinces.provinceName == provinceName" class="a_arrow" size="20px"/>
            </van-cell>
          </div>
          <div v-for="(cities,index) in dataList.cities" :key="index" v-if="indexs == 1">
            <van-cell :title="cities.cityName"
                      @click="selCity(cities.cityId,cities.cityName,1)"
                      :style="{color:(cities.cityName == cityName?'#FF5555':'')}"
            >
              <van-icon name="success" v-if="cities.cityName == cityName" class="a_arrow" size="20px"/>
            </van-cell>
          </div>
          <van-cell :title="dataList.district" @click="selCounty(dataList.id,dataList.district,2)"
                    v-if="indexs == 2"
                    :style="{color:(dataList.district == regionName?'#FF5555':'')}"
          >
            <van-icon name="success" v-if="dataList.district == regionName" class="a_arrow" size="20px"/>
          </van-cell>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        province: [],
        dataList:[],
        indexList:[],
        indexs:0,
        provinceId:0,
        cityId:0,
        regionId:0,
        provinceName:'请选择',
        cityName:'请选择',
        regionName:'请选择',
      };
    },
    created() {
      this.getProvice(0);
    },
    methods: {
      selProvice(p,x,idex){
        if(this.provinceName != x) {
          this.provinceName = x;
          this.cityName = '请选择'
          this.regionName = '请选择'
        }
        this.indexs = idex;
        this.provinceId = p;
        this.getCity(1);
      },
      selCity(c,x,idex){
        if(this.cityName != x) {
          this.cityName = x;
          this.regionName = '请选择';
        }
        this.indexs = idex;
        this.cityId = c;
        this.getCounty(2);
      },
      selCounty(c,x,idex){
        this.indexs = idex;
        this.regionId = c;
        this.regionName = x;
        //往父组件传参
        let array = new Array();
        array={
          provinceId:this.provinceId,
          cityId:this.cityId,
          regionId:this.regionId,
          provinceName:this.provinceName,
          cityName:this.cityName,
          regionName:this.regionName,
        }
        this.$emit('event1', array)
      },
      //获取省份
      getProvice(index){
        this.indexs = index;
        this.dataList = [];
        this.indexList = [];
        this.$http({
          method: 'get',
          url: '/common/province/guide?country=1',
          data: {},
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        })
          .then(res => {
            if (res.status == 200) {
              for(let i = 0;i<res.data.data.length;i++){
                this.indexList.push(res.data.data[i].prefix)
              }
              this.dataList = res.data.data;
            }
          }).catch(e => {

        })
      },
      //获取城市
      getCity(index){
        if(this.provinceName == "请选择"){
          return false;
        }
        this.indexs = index;
        this.dataList = [];
        this.indexList = [];
        this.$http({
          method: 'get',
          url: '/common/city/guide?country=1&province='+this.provinceId,
          data: {},
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        })
          .then(res => {
            if (res.status == 200) {
              for(let i = 0;i<res.data.data.length;i++){
                this.indexList.push(res.data.data[i].prefix)
              }
              this.dataList = res.data.data;
            }
          }).catch(e => {

        })
      },
      //获取县
      getCounty(index) {
        if(this.cityName == "请选择"){
          return false;
        }
        this.indexs = index;
        this.dataList = [];
        this.$http({
          method: 'get',
          url: '/common/area/display?city='+this.cityId,
          data: {},
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        })
          .then(res => {
            if (res.status == 200) {
              this.indexList = [];
              this.dataList = res.data.data;
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
      color: #FF5555;
      position: relative;

      &:after {
        content: '';
        width: 60%;
        left: 20%;
        height: 1px;
        position: absolute;
        background-color: #FF5555;
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
          color: #FF5555;
          position: relative;
          top: 0;
        }
      }
    }
  }
</style>
