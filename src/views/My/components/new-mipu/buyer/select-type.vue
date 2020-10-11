

<template>
  <div class="select-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">举报商家</div>
    </tops>
    <div class="select-lsit">
        <div class="select-item2" v-for="(n,i) in typeList" :key="i" @click="handleSelectIndex(i,n)">
            <p class="type">{{n.name}}</p>
            <img v-show="selectIndex==i" src="../img/green.png" alt="">
            <img v-show="selectIndex!=i" src="../img/hui.png" alt="">
        </div>
    </div>
  </div>
</template>
<script>
import Tops from "@/components/Top";
export default {
    data(){
        return{
            selectIndex:null,
            typeList:[]
        }
    },
    components:{
        Tops
    },
    async created(){
        const selectIndex = this.$storage.get('select__index')||''
        if(selectIndex){
            this.selectIndex = selectIndex
        }
        this.requsetTypeList()
    },
    methods:{
        async requsetTypeList(){
            const resp = await this.$http({
                method:'get',
                url:'/common/complaint/types'
            })
            if(resp.data.returnCode=="ERR_0000"){
                this.typeList = resp.data.data
            }
        },
        async handleSelectIndex(index,item){
            this.selectIndex = index
            this.$storage.set('select__index',index)
            this.$storage.set('select__item',item)
            this.$router.back()
        }
    }
}
</script>
<style lang="less">
.select-page{
    box-sizing: border-box;
    padding-top:45px;
    .select-lsit{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding:0 8px;
        background-color: #fff;
        .select-item2 {
            height:56px;
            box-sizing: border-box;
            padding:0 11px;
            display: flex;
            align-items:center;
            justify-content: space-between;
            border-bottom:1px solid #F7F7F7;
            .type{
                font-size:14px;
                color:#333;
            }
            img{
                width:20px;
                height:20px;
            }
        }
    }
}
</style>
