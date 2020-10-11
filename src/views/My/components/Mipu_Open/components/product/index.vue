<template>
  <div class="product">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">商品管理</div>
      <div slot='edior' class="edior" @click="editHandle">{{!editshow? '编辑': '取消'}}</div>
    </tops>
    <div class="content">
      <div class="content-left">
        <van-sidebar v-model="activeKey" v-if="sideList.length>0">
          <van-sidebar-item :title="item.typeName" v-for="(item,index) in sideList" :key="index" @click="getProduct(item)"/>
        </van-sidebar>
        <van-cell @click="addClassify" style="padding: 0;">
        <button class="side-button">
          <van-icon name="add-o" />选品类
        </button>
        </van-cell>
        <van-popup v-model="showPopup"  :style="{width:'100%', height: '65%',borderRadius:'8px 8px 0 0',overflow:' hidden' }"  position="bottom" >
          <classify @event1="change($event)" ref="childMethod"></classify >
        </van-popup>
      </div>
      <div class="content-right">
        <ul v-if="sideList.length>0">
          <li class="add-product" @click="addProduct">
            <van-icon name="add-o" />
            <div>添加商品</div>
          </li>
          <li v-for="(item,index) in productList" :key="index" v-if="productList.length>0" >
            <img :src="item.defaultImg" @click="toDetail(item)">
            <p>{{item.commodityName}}</p>
            <span>¥<b>{{item.price}}</b></span>
            <div class="bg" v-if="item.status!=1 || editshow">
              <h5 v-if="item.status==0">待审核…</h5>
              <h5 v-if="item.status==2">审核不通过…</h5>
              <div class="chose" v-if="editshow">
                <van-checkbox v-model="item.radio" :name="item.id"></van-checkbox>
              </div>
            </div>
          </li>
        </ul>
        <div class="guidePage" >
          <div class="guidePage_first">
            <div class="guidePage_first_left">
              <p class="p1">
                <img src="./images/1.png">
                <span>添加分类</span>
              </p>
              <p  class="p2">需先点击添加分类按钮,选择商品分类;</p>
            </div>
            <div class="guidePage_first_right">
              <img src="./images/guide1.png">
            </div>
          </div>
          <div class="guidePage_secode">
            <div class="guidePage_first_left">
              <p class="p1">
                <img src="./images/2.png">
                <span>添加商品</span>
              </p>
              <p  class="p2">再点击添加商品,上传商品图片、规格等;</p>
            </div>
            <div class="guidePage_first_right">
              <img src="./images/guide2.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="delete" @click="delHandle" v-if="editshow">删除</button>
  </div>
</template>

<script>
import Tops from "@/components/Top";
import Classify from "@/components/Classify"
export default {
  components: {
    Tops,
    Classify
  },
  data() {
    return {
      activeKey: 0,
      radio: 0,
      showPopup: false,
      sideList: [],
      productList: '',
      classifyList: '',
      editshow: false,
      mipuNo: '',
      ways:0,
      defaultImg:[] //默认图片
    };
  },
  created () {
    this.mipuNo = this.$route.query.mipuNo;
    this.ways = this.$route.query.ways;
    this.getSideList(this.mipuNo)
  },
  methods: {
    toDetail(item){
      if(item.status!=0){
        this.$router.push({path:'/my/mipu_open/product/editorproduct',query:{commodityNo:item.commodityNo,mipuNo:item.mipuNo,ways:this.ways}})
      }
    },
    //获取分类
    getSideList (mipuNo) {
      let data = {
        "mipuNo": mipuNo,
        "pageNum": 1,
        "pageSize": 500,
      }
      this.$http({
        method: 'post',
        url: '/minle/mipuCommodity/classify',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(data)
      })
        .then(res => {
          this.sideList = res.data.data.list;
          this.getProduct(this.sideList[0]);//获取商品列表
        }).catch((e)=> {})
    },
    //分类切换
    getProduct(item) {
      this.getList(item.id)
    },
    // 点击编辑
    editHandle () {
      this.editshow = !this.editshow
    },
    delHandle () {
      let commodityNo = []
      this.productList.forEach((item,index)=> {
        if(item.radio) {
          commodityNo.push(item.commodityNo)
        }
      })
      if (commodityNo.length == 0) {
        this.$toast("请选择要删除的商品");
        return
      }
      let dataObj = {
        "mipuNo": this.mipuNo,
        "commodityNo": commodityNo,
      }
      this.$http({
        method: 'post',
        url: '/minle/mipuCommodity/deleteCommodity',
        data: dataObj
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            this.$toast("删除成功");
          }
          let afterFiltering = this.productList.filter(item=>item.commodityNo !=commodityNo)
          this.productList = afterFiltering;

        }).catch((e)=> {})
    },
    getList (flId) {
      let dataObj = {
        "mipuNo": this.mipuNo,
        "commodityType": flId,
        "pageNum": 1,
        "pageSize": 500,
      }
      this.$http({
        method: 'post',
        url: '/minle/mipuCommodity/commodityShow',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(dataObj)
      })
        .then(res => {
          if(res.data.data == null) {
            this.commodityType = flId;
            this.productList = [];
          }else{
          for(let i in res.data.data.list){
            res.data.data.list[i]['defaultImg']=res.data.data.list[i]['commodityPicture'].split(",")[0];
          }
          this.commodityType =  res.data.data.list[0].commodityType;
          this.productList = res.data.data.list;
          }
        }).catch((e)=> {

      })
    },
    addClassify () {
      this.showPopup=true
    },
    change(data) {
      let obj = {typeName: data.three_levelName,id:data.threeId};
      let some = this.sideList.some(item=>{return item.typeName == data.three_levelName});
      if(some) {
        this.$toast("分类已存在")
      }else{
        this.activeKey = this.sideList.length;
        this.sideList.push(obj);
        this.getList (data.threeId)
        this.commodityType = data.threeId
      }
      this.showPopup=false
    },
    getClassify () {
      let dataObj = {
        "typeLevel": 1,
        "pageNum": 1,
        "pageSize": 500,
      }
      this.$http({
        method: 'post',
        url: '/minle/mipuCommodity/classifyDisplay',
        data: dataObj
      })
        .then(res => {
          this.classifyList = res.data.data.list;
        }).catch((e)=> {})
    },
    radioChange (value) {
      //console.log('value', value)
    },
    returns () {
      this.$router.go(-1)
    },
    //添加规格
    addProduct () {
      this.$router.push('/my/mipu_open/product/addproduct?commodityType='+ this.commodityType + '&mipuNo='+ this.mipuNo + '&ways=' + this.ways)
    },
    onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      Toast('取消');
    },
  }
}
</script>

<style lang="less" scoped>
/*.product /deep/ .van-cell {padding: 0;}*/
.product /deep/ .van-checkbox__icon--checked .van-icon {
  background-color: #ff5555;
  border-color: #ff5555;
}
.product {

  .content {
    position: absolute;
    top: 1.1736rem;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    background-color: #fff;
    border-top: 1px solid #E4E4E4;
    display: flex;
  }
  .side-button {
    width:88px;
    height:50px;
    background:#F0F0F0;
    margin-top: 8px;
    border:none;
    line-height: 50px;
  }
  .content-right {
    flex: 1;
    margin-left: 6px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 16px 10px 0 0;
        width:129px;
        height:155px;
        background:#FFFFFF;
        box-shadow:0px 2px 15px rgba(0,0,0,0.06);
        opacity:1;
        border-radius:9px;
        position: relative;
        img {
          display: block;
          width: 129px;
          height: 106px;
          border-radius: 8px 8px 0 0;
        }
        p {
          white-space: nowrap;
          overflow: hidden;
          font-size: 11px;
          margin: 3px 0 4px 4px;
          font-weight:400;
          line-height:16px;
          color: #333333;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        span {
          font-size:12px;
          color: #ff5555;
          line-height:16px;
          display: block;
          margin: 0 0 6px 9px;
          b {
            font-size: 17px;
            vertical-align: baseline;
          }
        }
        .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 129px;
          height: 106px;
          border-radius: 8px 8px 0 0;
          background: url('./images/bg.png') 100% 100%;
          background-size: 100% 100%;
          h5 {
            font-size: 11px;
            color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
          .chose {
            margin: 8px 0 0 100px;
            // width: 15px;
            // height: 15px;

          }
        }
      }
    }
    .guidePage {
      .guidePage_first,
      .guidePage_secode{
        overflow: hidden;;
        .guidePage_first_left {
          float: left;
          margin: 35px 10px 42px 10px ;
          width: 105px;
          .p1 {
            display: flex;
            align-items: center;
            img {
              width: 18px;
              height: 18px;
            }
            span {
              color: #333333;
              font-size: 14px;
              margin-left: 3px;
            }
          }
          .p2 {
            font-size: 11px;
            color: #808080;
            margin-top: 6px;
            line-height: 25px;
          }
        }
        .guidePage_first_right {
          width:140px;
          float: left;
          margin-top: 23px;
          img {
            width: 100%;
          }
        }
      }
    }
    .add-product {
      background-color: #F0F0F0;
      text-align: center;
      div {
        font-size: 13px;
      }
    }
  }
  .delete {
    width:345px;
    height:40px;
    background: linear-gradient(270deg,#f55,#f55);
    box-shadow: 0 0.106667rem 0.16rem 0 rgba(27, 191, 128, 0.3);
    opacity:1;
    border-radius:23px;
    position: fixed;
    bottom: 10px;
    left: 15px;
    border: none;
    color: #fff;
    font-size:14px;
  }
}
.product /deep/ .van-sidebar-item {
  text-align: center;
}

.van-sidebar-item--select {
    color: #323233;
    font-weight: 500;
    border-color: #ff5555;
    background-color: #fff;
}

.side-button /deep/ i {
  font-size:14px;
  position:relative;
  top:2px;
  margin-right: 5px;
}
.add-product /deep/ i {
  font-size: 19px;
  margin: 50px 0 9px 0;
}
</style>
