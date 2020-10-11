<template>
  <div class="collet">
    <tops>
      <div slot='left' class="arrow" @click="$router.go('-1')"></div>
      <div slot='center' class="title">收款记录</div>
    </tops>
    <div class="nav">
      <van-tabs v-model="active" @change="change" color="#FF5555" line-width="20px" sticky>
        <van-tab title="全部" name="">
          <!-- 有商品 -->
          <div class="content" v-if="show == 1">
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ul>
                <li v-for="(item,index) in arr" :key="index">
                  <div class="clear">
                    <div class="img"  @click="toDetail(item)">
                      <img :src="item.avatar" alt/>
                    </div>
                    <div class="text"  @click="toDetail(item)">
                      <p class="commodityName"><span class="nickname">{{item.nickname}}</span><span>{{item.telephone}}</span></p>
                      <p class="time">{{item.createTime | formatDate}}</p>
                    </div>
                    <div class="price">
                      ￥<span>{{item.amount}}</span>
                    </div>
                    <button class="no_withdrawal" v-if="item.type == 0" @click="withdraw(item.amount)">
                      提现
                    </button>
                    <button class="already_withdrawal" v-if="item.type == 1">
                      已提现
                    </button>
                  </div>
                </li>
              </ul>
            </van-list>
          </div>
          <!-- 有商品end -->
          <!-- 无商品 -->
          <div v-if="show == 2">
            <div class="content">
              <div class="divs">
                <img src="./img/noimg.png" alt="">
                <p>暂无数据</p>
              </div>
            </div>
          </div>
          <!-- 无商品end -->
        </van-tab>
        <van-tab title="未提现" name="0">
          <!-- 有商品 -->
          <div class="content" v-if="show == 1">
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ul>
                <li v-for="(item,index) in arr" :key="index">
                  <div class="clear">
                    <div class="img"  @click="toDetail(item)">
                      <img :src="item.avatar" alt/>
                    </div>
                    <div class="text"  @click="toDetail(item)">
                      <p class="commodityName"><span class="nickname">{{item.nickname}}</span><span>{{item.telephone}}</span></p>
                      <p class="time">{{item.createTime | formatDate}}</p>
                    </div>
                    <div class="price">
                      ￥<span>{{item.amount}}</span>
                    </div>
                    <button class="no_withdrawal" v-if="item.type == 0" @click="withdraw(item.amount)">
                      提现
                    </button>
                    <button class="already_withdrawal" v-if="item.type == 1">
                      已提现
                    </button>
                  </div>
                </li>
              </ul>
            </van-list>
          </div>
          <!-- 有商品end -->
          <!-- 无商品 -->
          <div v-if="show == 2">
            <div class="content">
              <div class="divs">
                <img src="./img/noimg.png" alt="">
                <p>暂无数据</p>
              </div>
            </div>
          </div>
          <!-- 无商品end -->
        </van-tab>
        <van-tab title="已提现" name="1">
          <!-- 有商品 -->
          <div class="content" v-if="show == 1">
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ul>
                <li v-for="(item,index) in arr" :key="index">
                  <div class="clear">
                    <div class="img"  @click="toDetail(item)">
                      <img :src="item.avatar" alt/>
                    </div>
                    <div class="text"  @click="toDetail(item)">
                      <p class="commodityName"><span class="nickname">{{item.nickname}}</span><span>{{item.telephone}}</span></p>
                      <p class="time">{{item.createTime | formatDate}}</p>
                    </div>
                    <div class="price">
                      ￥<span>{{item.amount}}</span>
                    </div>
                    <button class="no_withdrawal" v-if="item.type == 0" @click="withdraw(item.amount)">
                      提现
                    </button>
                    <button class="already_withdrawal" v-if="item.type == 1">
                      已提现
                    </button>
                  </div>
                </li>
              </ul>
            </van-list>
          </div>
          <!-- 有商品end -->
          <!-- 无商品 -->
          <div v-if="show == 2">
            <div class="content">
              <div class="divs">
                <img src="./img/noimg.png" alt="">
                <p>暂无数据</p>
              </div>
            </div>
          </div>
          <!-- 无商品end -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import Tops from "@/components/Top";
  export default {
    name: "detail",
    data() {
      return {
        pageNum:1,
        pageSize:10,
        arr:[],
        loading:false,
        finished:false,
        total:0,
        active:1,
        immediate_check:false,
        show:0,
        mipuNo:''
      }
    },
    components: {
      Tops
    },
    created(){
      this.mipuNo = this.$route.query.mipuNo;
    },
    methods: {
      withdraw(amount){
        this.$router.push({path:'/my/wallet/extract', query: {mipuNo: this.mipuNo}})
        sessionStorage.setItem('useramount',amount)
        sessionStorage.setItem('type',3);
      },
      //收藏列表
      tradingRecord(type){
        /*
        this.$toast.loading({
          message: '加载中...',
        });*/
        this.$http({
          method: 'post',
          url: '/minle/mall/mipu/tradingRecord',
          data: {pageNum: this.pageNum,pageSize:this.pageSize,mipuNo:this.mipuNo, startTime:'',  type}
        })
          .then(res => {
            this.$toast.clear();
            for (let index of  res.data.data.list) {
              index.check = false;
            }
            if(res.data.data.pages>0){
              this.show = 1
              this.arr = this.arr.concat(res.data.data.list);
              this.total = res.data.data.total;
            }else{
              this.show = 2
            }
          }).catch(e => {
        })
      },

      //下拉加載更多
      onLoad(){
        setTimeout(() => {
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.arr.length >= this.total) {
            this.finished = true;
          }else{
            this.pageNum += this.pageNum;
            this.tradingRecord();
          }
        }, 500);
      },

      /**
       * tab切换
       */
      change(e){
        this.arr = [];
        this.pageNum =1;
        this.tradingRecord(e)
      },
    },

    filters: {
      //格式化时间戳
      formatDate: function (value) {
        var date = new Date(value);
        var Y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var H = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
        if (m < 10) {
          m = '0' + m;
        }
        if (d < 10) {
          d = '0' + d;
        }
        if (H < 10) {
          H = '0' + H;
        }
        if (i < 10) {
          i = '0' + i;
        }
        if (s < 10) {
          s = '0' + s;
        }
        var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
        return t;
      }
    },

    mounted() {
      this.mipuNo = this.$route.query.mipuNo;
      // 0未提现 1已提现
      this.tradingRecord('');
    }
  }

</script>

<style lang="less" scope>
  .collet {
    .nav {
      margin-top: 45px;
    }
    .content {
      /*background-color: #ffffff;*/
      li {
        margin: 0 12px;
        padding: 15px  0;
        background-color: #fff;
        border-bottom: 1px solid #ebedf0;

        .time {
          font-size: 14px;
          color: #666666;
        }

        .img > img {
          width: 45px;
          height: 45px;
          border-radius: 4px;
        }

        .clear {
          display: flex;
          align-items: center;

          .text {
            flex: 1;
            padding: 0 0 0 10px;
            .commodityName {
              font-size: 15px;
              margin-bottom: 5px;
              .nickname {
                max-width: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
                margin-right: 2px;
              }
            }
          }
          .price {
            color: #FF3444;
            font-size: 15px;
            span {
              font-size: 21px;
            }
          }
          .no_withdrawal {
            width: 60px;
            height:26px;
            line-height: 26px;
            text-align: center;
            background: linear-gradient(270deg, #ec1212, #ff5040);
            font-size: 13px;
            border: none;
            border-radius:30px;
            color: #ffffff;
            margin-left: 15px;
          }
          .already_withdrawal {
            width: 60px;
            height:26px;
            line-height: 26px;
            text-align: center;
            background-color: #B3B3B3;
            font-size: 13px;
            border: none;
            border-radius:30px;
            color: #ffffff;
            margin-left: 15px;
          }
        }
      }

      .divs {
        padding-top: 1.6rem;
        text-align: center;

        img {
          margin-top:20px;
          width: 105px;
          margin-bottom: 0.266667rem;
          border-radius: 4px;
        }

        p {
          color: #615F60FF;
          margin: 0.533333rem auto;
          font-size: 0.4rem;
        }

        .oDiv {
          margin: auto;
          width: 2.906667rem;
          height: 0.8rem;
          line-height: 0.8rem;
          color: #ffffff;
          background: -webkit-linear-gradient(right, #ec1212, #ff5040);
          background: linear-gradient(270deg, #ec1212, #ff5040);
          border-radius: 0.8rem;
          font-size: 0.373333rem;
          box-shadow: 0 0.106667rem 0.16rem 0 rgba(255, 85, 85, 0.3);
          border: 0.026667rem solid #FF5555;
          margin-top: 0.72rem;

          a {
            color: #ffffff;
          }
        }
      }

      .btn {

        .checkall {
          flex: 1;
          margin-left: 10px;
        }
      }
    }
    .content2 {
      padding: 12px;
      .van-cell {
        background: none;
        padding: 0;
        .van-col {
          .item {
            background-color: #ffffff;
            border-radius:8px;
            padding-bottom: 14px;
            margin-bottom: 8px;
            .shop_icon {
              width: 100%;
              height:117px ;
              background-size: cover;
              background-position: center;
              border-radius:8px 8px 0 0;
            }
            .name {
              color: #333333;
              font-size: 15px;
              margin-top: 8px;
              margin-left: 4px;
            }
            .tag {
              margin-left: 4px;
              span {
                display: inline-block;
                padding: 0 6px;
                color: #FF4141;
                background-color: #FFECEC;
                font-size: 9px;
                margin-right: 4px;
                margin-top: 9px;
                border-radius: 60px;
              }
            }
            .distance {
              font-size: 10px;
              color: #868686;
              margin-top: 9px;
              margin-left: 4px;
            }
          }
        }
      }
    }
  }

</style>




