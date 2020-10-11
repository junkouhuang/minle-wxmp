<template>
  <div class="add-productB">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">编辑商品</div>
    </tops>
    <div class="contentB">
      <div class="content-top">
        <div class="product-name">
          <h3 style="margin: 0 0 0 10px;"><b>*</b> 商品名称 ：</h3>
          <input type="text" placeholder="请输入商品名称" v-model="productData.commodityName">
        </div>
        <h3 style="padding-top:17px;margin-top:0;"><b>*</b> 图片和名称
          <span>默认第一张图片为商品封面</span>
        </h3>
        <div class="img-upload">
          <div class="zhizhao">
            <div>

              <div class="left" v-for="(item,index) in productData.commodityPicture" :key="index">
                <span v-if="index == 0"class="cover">商品封面图</span>
                <img :src="item"  style="width: 100%;height: 100%;"  v-if="show_commodityPicture">
                <img src="./images/close_red.png" class="close_red" @click="commodityPictureHandle(index)" v-if="show_commodityPicture"/>
              </div>
            </div>
            <a href="javascript:;" class="file">
              <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon2"  ref="cropper" style="width: 100%;height: 100%">
                <img src="./images/camera.png" class="default">
              </simple-cropper>
            </a>
          </div>
        </div>

      </div>
      <div class="content-center" v-if="this.ways==2">
        <van-field
          required
          name="商品推荐人"
          label="商品推荐人"
          placeholder=""
        />
        <van-field
          v-model="productData.commodityReferer"
          name="商品推荐人："
          label="会员号："
          readonly
          type="number" maxlength="11"
          placeholder="请输入商品推荐人会员号"
        />
      </div>
      <div class="content-center">
        <van-field
          required
          name="类型和价格"
          label="类型和价格"
          placeholder=""
        />
        <van-field
          v-model="productData.price"
          name="价格："
          label="价格："
          type="number"
          placeholder="请输入商品价格（销售价/建议零售价）"
        />
        <van-field
          v-model="productData.supplyPrice"
          name="协议价："
          label="协议价："
          type="number"
          placeholder="请输入商品协议价（底价/结算价）"
        />
        <van-field
          v-model="productData.inventory"
          name="库存："
          label="库存："
          type="number"
          placeholder="请输入商品数量"
        />
        <ul class="fen-list">
          <li class="bg">
            <h4>商品规格</h4>
            <span>库存</span>
            <b>价格</b>
          </li>
          <li class="list-detail" v-for="(item,index) in productData.commoditySkus" :key="index" >
            <h4>{{item.skuList}}</h4>
            <span>{{item.inventory}}</span>
            <b class="red">￥{{item.price}}</b>
          </li>
        </ul>
      </div>
      <div class="content-add" >
      <button @click="goType">
        <van-icon name="add-o" />添加商品规格
        </button>
      </div>
      <div class="content-detail">
        <h3>介绍和详情页面</h3>
        <div class="info">
          <span>商品介绍 ：</span>
          <textarea name="" id="" cols="30" rows="5" maxlength="120" placeholder="请输入商品介绍" v-model="productData.commodityDescribe"></textarea>
        </div>
        <div class="num">{{productData.commodityDescribe.length}}/120</div>
      </div>
      <div class="content-upload">
        <div class="upload-img">
          <div class="zhizhao2">
            <a href="javascript:;" class="file">
              <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon3"  ref="cropper" style="width: 100%;height: 100%">
                <img src="./images/camera.png" class="default" >
              </simple-cropper>
            </a>
          </div>
          <div class="upload-tips" style="color: #808080;font-size: 11px;">点击上传详情页面，图片大小在2M以内</div>
        </div>
        <div v-if="productData.commodityDetail.length>0">
          <div class="commodityDetail"  v-for="(item,index) in productData.commodityDetail" :key="index"  v-if="show_commodityDetail">
            <img :src="item">
            <img src="./images/close_red.png" class="close_red" @click="commodityDetailHandle(index)"/>
          </div>
        </div>
        <div class="btn">
          <button class="delete" @click="confirmHandle">确认修改商品</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Tops from "@/components/Top";
import SimpleCropper from '@/components/SimpleCropper'
export default {
  components: {
    Tops,
    SimpleCropper
  },
  data () {
    return {
      uploadParam: {
        fileType: 'recruit', // 其他上传参数
        uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址
        scale: 4  // 相对手机屏幕放大的倍数: 4倍
      },
      show_commodityPicture:true,
      show_commodityDetail:true,
      productData: {
        commodityPicture: [],//商品封面
        commodityName: '',
        commodityDescribe: '',
        commodityType: '',//三级分类ID
        inventory: '',
        mipuNo: '',
        price: '',
        supplyPrice:'',
        suggestedRetailPrice:'',
        commodityDetail: [],//商品详情图
        commoditySkus: '',
        invntory: '',
        createTime:"",
        id:'',
        commodityReferer:'',
      },
      mipuNo: '',
      commodityNo:'',
      ways: 0,
    }
  },
  created () {
    this.ways = this.$route.query.ways;
    this.productData.mipuNo = this.$route.query.mipuNo;
    this.commodityNo = this.$route.query.commodityNo;
    this.productData.commodityType = this.$route.query.commodityType;
    //console.log("=======================")
    //console.log( this.$store.getters.getTypeData)
    //if (!localStorage.getItem('typeData')) return false;
    this.getInfo()
  },
  mounted() {
    // 缓存商品信息
    if (sessionStorage.getItem('commodityName') != null && sessionStorage.getItem('commodityName') != '') {
          this.productData.commodityName = sessionStorage.getItem('commodityName');
    }
    if (sessionStorage.getItem('commodityPicture') != null && sessionStorage.getItem('commodityPicture') != '') {
      this.productData['commodityPicture'] = sessionStorage.getItem('commodityPicture').split(',');
      this.show_commodityPicture = true;
    }
    if (sessionStorage.getItem('price') != null && sessionStorage.getItem('price') != '') {
        this.productData.price = sessionStorage.getItem('price');
    }
    if (sessionStorage.getItem('supplyPrice') != null && sessionStorage.getItem('supplyPrice') != '') {
        this.productData.supplyPrice = sessionStorage.getItem('supplyPrice');
    }
    if (sessionStorage.getItem('inventory') != null && sessionStorage.getItem('inventory') != '') {
        this.productData.inventory = sessionStorage.getItem('inventory');
    }
    if (sessionStorage.getItem('commodityDescribe') != null && sessionStorage.getItem('commodityDescribe') != '') {
        this.productData.commodityDescribe = sessionStorage.getItem('commodityDescribe');
    }
    if (sessionStorage.getItem('commodityDetail') != null && sessionStorage.getItem('commodityDetail') != '') {
      this.productData['commodityDetail'] = sessionStorage.getItem('commodityDetail').split(',');
      this.show_commodityDetail = true;
    }
  },
  methods: {
    getInfo(){
      this.$http({
        method: 'post',
        url: '/minle/mipuCommodity/preview',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify({mipuNo:this.productData.mipuNo,commodityNo:this.commodityNo})
      })
        .then(res => {

          res.data.data.commodityPicture = res.data.data.commodityPicture.split(",")
          res.data.data.commodityDetail = res.data.data.commodityDetail.split(",")
          if(this.$store.getters.getTypeData.length>0){
            res.data.data.commoditySkus  = this.$store.getters.getTypeData
          }
          this.productData = res.data.data
        }).catch((e)=> {})
    },
    commodityPictureHandle(index){
      this.productData['commodityPicture'].splice(index,1);
      if(this.productData['commodityPicture'].length==0){
        this.show_commodityPicture = false;
      }
    },
    commodityDetailHandle(index){
      this.productData['commodityDetail'].splice(index,1);
      if(this.productData['commodityDetail'].length==0){
        this.show_commodityDetail = false;
      }
    },
    /**
     * 上传商品封面
     * @param data
     */
    getMsgFormSon2(data){
      this.productData['commodityPicture'].push( data);
      this.show_commodityPicture = true;
    },
    /**
     * 上传详情图片
     */
    getMsgFormSon3(data){
      this.productData['commodityDetail'].push(data);
      this.show_commodityDetail = true;
    },
    returns(){
      this.$router.go(-1)
    },
    goType () {
      // 跳转前需保存当前产品数据
      sessionStorage.setItem('commodityName', this.productData.commodityName);
      sessionStorage.setItem('commodityPicture', this.productData.commodityPicture);
      sessionStorage.setItem('price', this.productData.price);
      sessionStorage.setItem('supplyPrice', this.productData.supplyPrice);
      sessionStorage.setItem('inventory', this.productData.inventory);
      sessionStorage.setItem('commodityDescribe', this.productData.commodityDescribe);
      sessionStorage.setItem('commodityDetail', this.productData.commodityDetail);


      this.$router.push('/my/mipu_open/product/addtype')
    },
    afterRead(file) {
      console.log("file", file)
      this.uploadPicture(file,'more')
    },
    afterRead2(file) {
      this.uploadPicture(file,'single')
    },
     //上传图片
    async uploadPicture(file,type) {
      try {
        let imageSuffix,
        imageData = file.content;
        if (imageData.includes("image/png")) {
          imageData = imageData.split("data:image/png;base64,")[1];
          imageSuffix = "png";
        } else if (imageData.includes("image/jpeg")) {
          imageData = imageData.split("data:image/jpeg;base64,")[1];
          imageSuffix = "jpg";
        }
        this.$toast.loading({
          message: "上传中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        const res = await this.$http({
          method: "post",
          url: "/common/image/upload",
          data: this.$qs.stringify({
            imageSuffix,
            imageData
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        if (res.data.returnCode == "ERR_0000") {
          if (type=='single') {
            this.productData.commodityDetail  = res.data.data
          } else {
            this.productData.commodityPicture += res.data.data
          }

          this.$toast.clear();
        }
      } catch (err) {
        this.$toast.clear();
      }
    },
    confirmHandle () {
      if(this.productData.commodityPicture.length==0){
        this.$toast("请上传商品封面");
        return false;
      }
      if(this.productData.commodityName==0){
        this.$toast("请填写商品名称");
        return false;
      }
      if(this.productData.price.length==0) {
        this.$toast("请输入商品零售价");
        return false;
      }
      if(this.productData.supplyPrice.length==0) {
        this.$toast("请输入商品协议价");
        return false;
      }
      this.productData.suggestedRetailPrice = this.productData.price
      if(this.productData.inventory.length==0) {
        this.$toast("请输入商品库存");
        return false;
      }
     /* if(this.productData.commoditySkus.length==0){
        this.$toast("请添加商品规格");
        return false;
      }*/
      if(this.productData.commodityDescribe==0){
        this.$toast("请填写商品介绍");
        return false;
      }
      if(this.productData.commodityDetail.length==0){
        this.$toast("请上传商品详情图片");
        return false;
      }
      let arr = JSON.parse(JSON.stringify(this.productData));
      arr["commodityDetail"] = arr["commodityDetail"].toString();
      arr["commodityPicture"] = arr["commodityPicture"].toString();
      arr.mipuNo=this.$route.query.mipuNo;
      this.$http({
        method: 'post',
        url: '/minle/mipuCommodity/updateCommodity',
        data: arr
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            this.clear();
            this.$toast("修改成功");
            this.$router.go(-1)
          }
        }).catch((e)=> {})
    }
  },
  clear () {
    // 清除当前保存当前产品数据
    sessionStorage.removeItem('commodityName')
    sessionStorage.removeItem('commodityPicture');
    sessionStorage.removeItem('price');
    sessionStorage.removeItem('supplyPrice');
    sessionStorage.removeItem('inventory');
    sessionStorage.removeItem('commodityDescribe');
    sessionStorage.removeItem('commodityDetail');

  },
}
</script>

<style lang="less" scoped>

  .add-productB {
   width:100%;
   heigth:calc(100vh);
    .contentB {
      padding-top: 1.1736rem;
      overflow: auto;
      border-top: 1px solid #E4E4E4;
      .content-top {
        background-color:#fff;
      }
      h3 {
        font-size:14px;
        color: #333333;
        font-weight: 500;
        margin: 17px 0 0 10px;
        b {
          color: #FF3444;
        }
        span {
          color: #909090;
          margin-left: 5px;
        }
      }
      .img-upload {
        margin: 14 10px 8px 10px;
        .cover{
          font-size: 10px;
          color: #ffffff;
          height: 17px;
          line-height: 17px;
          display: block;
          background: rgba(0,0,0,.5);
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
        }
      }
      .product-name {
        display: flex;
        height: 40px;
        align-items: center;
        background-color: #ffffff;
        input {
          margin-right: 12px;
          flex: 1;
          height: 21px;
          font-size:15px;
          border: none;
        }
      }
      .content-center {
        background-color: #fff;
        overflow: hidden;
        margin-top: 8px;
        padding-bottom: 20px;
        .content-price {
          font-size: 14px;
          height: 38px;
          margin: 10px 0 10px 10px;
          input {
            width: 285px;
            height: 38px;
            border: 1px solid #CDCDCD;
            border-radius: 7px;
            padding-left: 10px;
            box-sizing: border-box;
          }
        }
        .fen-list {
          font-size: 14px;
          margin-top: 15px;
          .bg{
            padding: 13px 10px;

          }
          li {
            display: flex;
            align-items: center;

          }
          .list-detail {
            padding: 13px 10px 16px 10px;
            border-bottom: 1px solid #E6E6E6;
          }
          h4 {
            flex: 1;
            margin-right: 30px;
            font-weight: normal;
            line-height:19px;
          }
          span,b {
            display: block;
            width: 40px;
            margin-left: 30px;
            text-align: center;
            font-weight: normal;
            &.red{
              color: #EE1917;
            }
          }
        }

      }
      .content-add {
        width: 100%;
        margin: 12px auto;
        display: flex;
        justify-content: center;
        button {
          border: none;
          font-size:14px;
          line-height:19px;
          color: #ff5555;
          background-color: transparent;
          i {
            margin-right: 5px;
            position: relative;
            top: 2px;
          }
        }
      }
      .content-detail {
        background-color:#fff;
        overflow: hidden;
        font-size: 14px;
        .info {
          margin: 17px 10px 10px 10px;
          font-size:14px;
          display: flex;
          align-items: baseline;
          textarea{
            flex: 1;
            border: none;
            line-height: 20px;
          }
        }
        .num {
          text-align: right;
          margin: 0 15px 0 0;
          padding-bottom: 15px;
          font-size:13px;
          color: #C7C7C7;
          border-bottom: 1px solid #F4F4F4;
        }
      }
      .content-upload {
        background-color: #fff;
        overflow: hidden;
        padding-bottom: 100px;
      }
      .upload-img {
        margin: 0 10px 10px;
        padding: 0 0 15px 0;
        background-color: #EEEEEE;
        text-align: center;
      }
    }
    .btn {
      width: 100%;
      height: auto;
      background-color: #ffffff;
      text-align: center;

      .delete {
        width:345px;
        height:40px;
        line-height: 38px;
        background-color: #ff5555;
        box-shadow: 0 0.106667rem 0.16rem 0 rgba(27, 191, 128, 0.3);
        opacity:1;
        border-radius:23px;
        position: fixed;
        bottom: 10px;
        left: 15px;
        border: none;
        color: #fff;
        font-size:16px;
      }
    }
    .zhizhao {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: 10px 0 ;
      div{
        width: 316px;
        .left {
          width: 70px;
          height: 65px;
          position: relative;
          float: left;
          margin-right: 10px;
          margin-left: 15px;
          .close_red {
            width: 15px;
            height: 15px;
            position: absolute;
            right: -8px;
            top: -8px;
          }
        }
      }
      .file {
        position: relative;
        border-radius: 0;
        height: 100%;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        display: flex;
        display: flex;
        align-items: center;
        .default {
          width: 65px;
          height: 65px;
          float: right;
          margin-left:8px;
          margin-right:8px;
        }
        input {
          position: absolute;
          font-size: 2.666667rem;
          height: 1.866667rem;
          width: 2.666667rem;
          right: 0;
          top: 0;
          opacity: 0;
        }
      }
    }
    .zhizhao2 {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      position: relative;
      .file {
        position: relative;
        border-radius: 0.106667rem;
        height: 100%;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        display: flex;
        display: flex;
        align-items: center;
        margin: 21px auto 15px;
        .default {
          width: 65px;
          height: 65px;
          float: right;
        }
        input {
          position: absolute;
          font-size: 2.666667rem;
          height: 1.866667rem;
          width: 2.666667rem;
          right: 0;
          top: 0;
          opacity: 0;
        }
        .close_red {
          width: 15px;
          height: 15px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .commodityDetail {
      position: relative;
      margin-bottom: 10px;
      padding:10px 10px 0px 10px;
      img {
        width: 100%;
        height:auto;
      }
      .close_red {
        width: 15px;
        position: absolute;
        top: 3px;
        right: 3px;
      }
    }

  }


</style>
