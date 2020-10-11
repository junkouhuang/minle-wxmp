<template>
  <div class="card">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">银行卡</div>
    </tops>
    <div class="content">
      <van-cell-group>
        <van-field v-model.trim="username" type="text" label="真实姓名" placeholder="请填写真实姓名" required
                   clearable/>
        <van-field v-model.trim="tel" type="number" label="手机号码" maxlength="11" placeholder="请填写银行卡预留手机号码" required
                   clearable/>
        <van-field v-model="card" @click="open" label="开户银行" placeholder="请选择银行" required disabled
                   right-icon="debit-pay"/>
        <van-field v-model.trim="cardno" type="number" label="银行卡号" maxlength="19" placeholder="请填写银行卡号" required
                   clearable/>
        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            show-toolbar
            :default-index="defaultIndex"
            :columns="bankList"
            @cancel="onCancel"
            @confirm="onConfirm"
            />
        </van-popup>
      </van-cell-group>
      <p class="tip">为保障您的收益顺利提现到账，请如实填写您的真实银行卡号信息，以免影响提现操作。</p>
      <div class="btnse">
        <van-button type="danger" @click="onSaves">保存</van-button>
      </div>
    </div>
  </div>

</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>



