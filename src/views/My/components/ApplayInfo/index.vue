<template>
  <div class="applayinfo">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">合伙人申请</div>
    </tops>
    <div class="content">
      <van-cell-group>
        <van-field :value="this.applyAgentLevel == 2 ? '区县代理' : this.applyAgentLevel == 3 ? '市代理IP' : this.applyAgentLevel == 4 ? '省代理IP' : ''" type="text" label="合伙人级别"  class="grade"
                   readonly/>
        <van-field v-model.trim="username" type="text" label="合伙人姓名" placeholder="请填写合伙人真实姓名" required class="firstFiled"
                   clearable/>
        <van-field v-model.trim="tel" type="number" label="合伙人电话" maxlength="11" placeholder="请填写合伙人手机号" required
                   clearable/>
        <van-field v-model.trim="dq" @click="open" type="text" label="所在地区" placeholder="请选择地区" required  required
                   right-icon="location-o"/>
        <van-field v-model.trim="dz" type="text" label="详细地址" placeholder="街道，楼牌号等"  clearable required/>
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
                <!--                <van-index-anchor :index="dataList.prefix">
                                   {{dataList.prefix}}
                                 </van-index-anchor>-->
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
      <p class="tip">
        合伙人申请成功后，平台将会在1-3工作日内完成审核，请您保持手机畅通。查看审核进度，请前往 "我的申请"。
      </p>
      <div class="btnse">
        <van-button type="danger" @click="onSaves">确认提交</van-button>
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
