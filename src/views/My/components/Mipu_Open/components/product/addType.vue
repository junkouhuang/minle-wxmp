<template>
  <div class="add-typeC">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">添加商品类型</div>
    </tops>
    <div class="contentC">
      <div class="content-title">
        <van-cell-group>
          <van-field required label="商品规格"   placeholder="例：颜色、尺寸、大小" disabled  >
            <template #button>
              <span size="small" type="primary" style="font-size: 15px;color: #333333;" @click="show_type_delete_icon_click" v-if="!show_type_delete_icon">编辑</span>
              <span size="small" type="primary" style="font-size: 15px;color: #333333;" @click="show_type_delete_icon_click" v-else>完成</span>
            </template>
          </van-field>
        </van-cell-group>
        <div class="type">
         <div class="type-detail" v-if="typeData.length>0">
            <div v-for="(item,n) in typeData[0].arr" :key="n">
              <span v-if="item.attributeName!='' && item.attributeName!=null && item.attributeName!=undefined ">{{item.attributeName}}</span>
              <img src="./images/delete.png" class="delete_icon" v-if="show_type_delete_icon" @click="type_delete_icon_click(n)"/>
            </div>
          </div>
          <a @click="addTypeDetail"><van-icon name="plus" />&nbsp;添加</a>
        </div>
      </div>
      <div class="content-detail">
        <van-cell-group>
          <van-field required label="设置规格参数"  placeholder="例：红色、黄色、蓝色" disabled  >
            <template #button>
              <span size="small" type="primary" style="font-size: 15px;color: #333333;"  @click="show_type_dell_icon_click"  v-if="!show_type_del_icon">编辑</span>
              <span size="small" type="primary" style="font-size: 15px;color: #333333;"  @click="show_type_dell_icon_click"  v-else>完成</span>
            </template>
          </van-field>
        </van-cell-group>
        <div>
          <div v-for="(item,index) in typeData" :key="index" class="content_item">
            <van-field
              v-for="(list,inx) in item.arr"
              :key="inx"
              v-model="list.attributeVal"
              :name="list.attributeName"
              :label="`${list.attributeName}：`"
              :placeholder="`请输入${list.attributeName}`"
            />
            <van-field
              v-model="item.price"
              name="商品价格："
              label="商品价格："
              type="number"
              placeholder="请输入商品价格（销售价/建议零售价）"
              :rules="[{ required: true, message: '商品价格：' }]"
            >
              <template #button>
                <span size="small"  style="font-size: 15px;color: #333333;">元</span>
              </template>
            </van-field>
            <van-field
              v-model="item.supplyPrice"
              name="协议价："
              label="协议价："
              type="number"
              placeholder="请输入商品协议价（底价/结算价）"
              :rules="[{ required: true, message: '商品价格：' }]"
            >
              <template #button>
                <span size="small"  style="font-size: 15px;color: #333333;">元</span>
              </template>
            </van-field>
            <van-field
              v-model="item.inventory"
              name="商品库存："
              label="商品库存："
              type="number"
              placeholder="输入商品库存"
              :rules="[{ required: true, message: '商品库存：' }]"
            />
            <div class="zhizhao">
              <div class="left">
                <img :src="item.picture"  style="width: 65px;height: 65px;"  v-if="item.picture">
                <img src="./images/close_red.png" class="close_red" @click="PictureHandle(index)" v-if="item.picture"/>
              </div>
              <a href="javascript:;" class="file" @click="getIndex(index)" >
                <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon3" ref="cropper" style="width: 100%;height: 100%">
                  <img src="./images/camera.png" class="default">
                </simple-cropper>
              </a>
            </div>
            <img src="./images/del.png" class="del" v-if="show_type_del_icon" @click="type_del_icon(index)" >
          </div>
        </div>
      </div>
      <div class="addSpStyle" @click="addSpStyle"><img src="./images/add.png">添加商品规格</div>
      <button class="delete" @click="save">保存</button>
    </div>

    <van-dialog v-model="showNameDialog"  show-cancel-button @confirm="confirmNameHandle" @cancel="cancelNameHandle" confirm-button-color="#FF5555"
 >
      <p class="specTil">设置规格名称</p>
      <input type="text" class="product-input" v-model="attributeValue" placeholder="请输入规格名称" >
    </van-dialog>

  </div>
</template>

<script>
import Tops from "@/components/Top";
import SimpleCropper from '@/components/SimpleCropper'
export default {
  data() {
    return {
      show_type_delete_icon:false,//是否显示规格列表删除按钮
      show_type_del_icon:false,//是否显示规格列表删除按钮
      showNameDialog: false,//是否显示添加规格名称弹出框
      attributeKey: '',
      attributeValue: '',
      currentIndex:'',//当前规格列表索引
      typeData:[],//规格类型
      itemData:'', //选中的规格
      isHasPicture:'',//是否有商品图片
      uploadParam: {
        fileType: 'recruit', // 其他上传参数
        uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址
        scale: 4  // 相对手机屏幕放大的倍数: 4倍
      },
    }
  },
  components: {
    Tops,
    SimpleCropper
  },

  methods: {
    //获取规格列表索引
    getIndex(index){
      this.currentIndex = index;
    },
    type_del_icon(index){
      this.typeData.splice(index,1);
    },
   //添加规格参数
    addSpStyle(){
      if(this.typeData.length>0){
        let typeData = new Array();
        typeData=JSON.parse(JSON.stringify(this.typeData[0]));
        typeData['inventory']="";
        typeData['price']="";
        typeData['picture']="";
        typeData['supplyPrice']="";
        for(let i in typeData.arr){
          typeData.arr[i]['attributeVal'] = "";
        }
        this.typeData.push(typeData);
      }else{
        this.$toast("请添加商品规格")
      }
    },

    getMsgFormSon3(data){
      this.typeData[this.currentIndex]["picture"] = data;
    },
    PictureHandle(index){
      this.typeData[index]["picture"] = '';
    },
    onOversize(file) {
      console.log(file);
    },
    /**
     * 删除门脸图
     */
    delmlt(){
      this.picture = "";
      this.isHasPicture = false;
    },
    /**
     * 上传商品图片
     * @param data
     */
    getMsgFormSon2(data){
      this.picture = data;
      this.isHasPicture = true;
    },

    /**
     * 规格：编辑*/
    show_type_delete_icon_click(){
      if(this.typeData.length>0){
        this.show_type_delete_icon = !this.show_type_delete_icon;
      }else{
        this.show_type_delete_icon = false;
      }
    },

    /**
     * 规格列表：编辑*/
    show_type_dell_icon_click(){
      if(this.typeData.length>0){
        this.show_type_del_icon = !this.show_type_del_icon;
      }else{
        this.show_type_del_icon = false;
      }
    },

    /**
     * 保存
     */
     save(){
       if(this.typeData.length==0){
         this.$toast("请添加商品规格");
         return false;
       }
       let flag = true


       for(let i in this.typeData){
         let a = Object.keys(this.typeData[i])
         for(let j of a){
           if(this.typeData[j]=="" && j!='arr'){
             flag = false;
           }
         }
         console.log(this.typeData)

       }
      if(!flag){
        this.$toast("请完善规格参数");
        return false;
      }

      let typeData = [];
      for(let i in this.typeData){
        let idStr = [];//存放规格id字符串对象
        let nameStr = [];//存放规格名字符串对象
        for(let j in this.typeData[i]['arr']){
          idStr.push(this.typeData[i]['arr'][j]['id'])
          nameStr.push(this.typeData[i]['arr'][j]['attributeVal'])
        }
        //分装商品规格数据
        typeData.push({
          "attributeKeyList":idStr.toString(),
          "skuList":nameStr.toString(),
          "skuListStr":nameStr.toString().replace(/,/,'+'),
          "inventory":Number(this.typeData[i]["inventory"]),
          "price":Number(this.typeData[i]["price"]),
          "supplyPrice":Number(this.typeData[i]["supplyPrice"]),
          "suggestedRetailPrice":Number(this.typeData[i]["price"]),
          "picture":this.typeData[i]["picture"]
        })
      }
      this.$store.state.typeData = typeData;
      //localStorage.setItem("typeData",JSON.stringify(typeData));
      this.$router.go('-1');
    },

    /**
     * 删除规格
     * @param index
     */
    type_delete_icon_click(index){
      for(let i in this.typeData){
        this.typeData[i].arr.splice(index,1);
      }
      if( this.typeData[0].arr.length==0){
        this.show_type_delete_icon = false;
        this.typeData=[];
      }
    },
    // 商品规格key添加
    confirmHandle () {
      let data = {
        'attributeKey': this.attributeKey
      }
      this.$http({
        method: 'post',
        url: '/minle/mipuCommodity/attributeTypes',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(data)
      })
      .then(res => {
        this.typeData.push(res.data.data)
        this.typeData = this.typeData
      }).catch((e)=> {})
    },
    cancelHandle(){},
    // 点击添加
    addTypeDetail () {
      this.showNameDialog = true;
      this.attributeValue = "";
    },
    confirmNameHandle () {
      if(this.attributeValue == ""){
        this.$toast("请输入规格名称");
        return false;
      }
      let data = {
        'attributeKey': this.attributeValue,
      }
      this.$http({
        method: 'post',
        url: '/minle/mipuCommodity/attributeTypes',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(data)
      })
      .then(res => {

        if(this.typeData.length>0){
          for(let i in this.typeData){
            this.typeData[i]['arr'].push(res.data.data)
          }
        }else{
          let obj = new Array();
          res.data.data['attributeVal']=''
          obj.push(res.data.data)
          this.typeData.push({arr:obj,inventory:'',price:'',picture:''});
        }
      }).catch((e)=> {})
    },
    cancelNameHandle () {

    },
    returns(){
      this.$router.go(-1)
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
    },
  }
}
</script>

<style lang="less" scoped>

.zhizhao {
    display: flex;
    padding: 15px 20px;
    justify-content: space-between;
    position: relative;
    .left {
      width: 70px;
      height: 65px;
      position: relative;
      .close_red {
        width: 15px;
        height: 15px;
        position: absolute;
        right: 4px;
        top: -8px;
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
.specTil {
  margin:20px 0px 0px 30px;
  font-size: 14px;
}
.product-input {
  width:70%;
  height:40px;
  line-height: 40px;
  font-size:15px;
  background:#F5F5F5;
  opacity:1;
  border-radius:8px;
  padding-left: 20px;
  border: none;
  margin: 30px 30px;
}
.add-typeC {
  .contentC {
    //position: absolute;
    padding-top: 1.1736rem;
    //left: 0;
    //bottom: 0;
    //right: 0;
    overflow: auto;
    border-top: 1px solid #E4E4E4;
    .content-title {
      background-color: #fff;
      .type {
        display: flex;
        margin-left: 10px;
        h4 {
          margin: 15px 0 0 10px;
          font-size: 14px;
          font-weight: normal;
        }
        a {
          display: flex;
          font-size: 12px;
          color: #ff5555;
          font-weight: 300;
          line-height: 26px;
          height: 26px;
          border-radius: 6px;
          margin: 10px 10px 10px 0;
          border:1px solid #ff5555;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
        }
        .type-detail {
          display: flex;
          flex-wrap: wrap;
          div {
            position: relative;
            margin: 10px 20px 10px 0;
            span {
              display: flex;
              font-size: 12px;
              color: #333;
              font-weight: 300;
              padding: 7px 11px;
              border-radius: 6px;
              border:1px solid rgba(144,144,144,1);
              position: relative;
              .del-icon {
                position: absolute;
                width:15px;
                height: 15px;
                background: url('./images/delete.png') no-repeat;
                background-size: 100% 100%;
                right: -7px;
                top: -7px;
              }
            }
            .delete_icon {
              width: 17px;
              height: 17px;
              position: absolute;
              right: -8px;
              top: -8px;
            }
          }
        }
      }
    }
    .content-detail {
      background-color: #fff;
      margin-bottom: 15px;
      margin-top: 8px;
      .content_item{
        position: relative;

        .del {
          width: 20px;
          position: absolute;
          top: 20px;
          right: 20px;
        }
        &:not(:last-child)::after {
          position: absolute;
          box-sizing: border-box;
          content: ' ';
          pointer-events: none;
          right: 0;
          bottom: 0;
          left: 0.426667rem;
          border-bottom: 0.026667rem solid #ebedf0;
          -webkit-transform: scaleY(.5);
          transform: scaleY(.5);
        }
      }
    }
    .addSpStyle {
      width:100%;
      height:38px;
      line-height: 38px;
      color: #ff5555;
      font-size: 14px;
      background:rgba(255,255,255,1);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 100px;
      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
    .content-add {
      border: none;
      font-size:13px;
      line-height:19px;
      color:#EE1917;
      background-color: transparent;
      margin: 12px 0 17px 0px;
      i {
        margin-right: 5px;
        position: relative;
        top: 2px;
      }
    }
  }
   .delete {
    width:345px;
    height:40px;
     line-height: 38px;
    background: linear-gradient(270deg,#f55,#f55);
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
</style>
