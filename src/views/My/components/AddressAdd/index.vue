<template>
  <div class="addressadd">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">编辑地址</div>
    </tops>
    <div class="content">
      <van-cell-group>
        <van-field v-model.trim="username" type="text" label="收货人" placeholder="请填写收货人姓名" required class="firstFiled"
                   clearable/>
        <van-field v-model.trim="tel" type="number" label="手机号码" maxlength="11" placeholder="请填写收货人手机号码" required
                   clearable/>
        <van-field v-model.trim="dq" @click="open" type="text" label="所在地区" placeholder="请选择地区" required readonly
                   right-icon="location-o"/>
        <van-field v-model.trim="dz" type="text" label="详细地址" placeholder="街道，楼牌号等" required clearable/>
        <div class="setaddress">
          <div>
            <span>设为默认地址</span>
            <van-switch v-model="checked" class="switch" size="20px"/>
          </div>
          <p class="remind">提醒：每次下单会默认推荐使用该地址</p>
        </div>
        <van-popup
          v-model="show"
          class="p_popup"
          position="bottom"
          closeable
          :style="{ height: '75%' }"
        >
          <div class="top">
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
        </van-popup>
      </van-cell-group>
      <div class="btnse">
        <van-button type="danger" @click="onSaves">保存</van-button>
      </div>
    </div>

  </div>
</template>
<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>
