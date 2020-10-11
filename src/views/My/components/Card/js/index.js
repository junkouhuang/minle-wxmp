import Tops from "@/components/Top";

export default {
  data() {
    return {
      username: '',
      tel: '',
      card: '',
      cardno: '',
      code: '',
      show: false,
      list: [],
      bankList: [],
      defaultIndex:0
    };
  },
  methods: {
    returns() {
      this.$router.go(-1)
    },
    open() {
      this.show = true;
      this.bankList = [];
      this.getCard();
    },
    getCard() {
      this.$http({
        method: "get",
        url: '/common/bank/codes',
        data: ''
      }).then(res => {
        if (res.data.returnCode == "ERR_0000") {
          this.list = res.data.data;
          for (var i=0;i<res.data.data.length;i++) {
            this.bankList.push(res.data.data[i].name);
            if(res.data.data[i].name == this.card){
              this.defaultIndex = i
            }
          }
        }
      });
    },
    onSaves() {
      if (this.username == '') {
        this.$toast('请填写真实姓名');
        return false;
      }
      if (this.tel == '') {
        this.$toast('请填写银行卡预留手机号码');
        return false;
      } else {
        if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
          this.$toast('请输入正确的手机号');
          return false;
        }
      }
      if (this.card == '') {
        this.$toast('请选择银行');
        return false;
      }
      if (this.cardno == '') {
        this.$toast('请填写银行卡号');
        return false;
      } else {
        if (!(/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/.test(this.cardno))) {
          this.$toast('请输入正确的银行卡号');
          return false;
        }
      }
      this.$http({
        method: "post",
        url: '/minle/user/bankcard/redact',
        data: {
          bankAccountName: this.username,
          bankReserveTel: this.tel,
          bankCode: this.code,
          bankName: this.card,
          bankAccount: this.cardno
        }
      }).then(res => {
        if (res.data.returnCode == "ERR_0000") {
          this.$toast("保存成功");
          this.$router.go(-1);
        }
      });
    },
    findBankCard() {
      this.$http({
        method: "post",
        url: '/minle/user/bankcard/findBankCard',
        data: {}
      }).then(res => {
        if (res.data.returnCode == "ERR_0000") {
          this.username = res.data.data.bankAccountName;
          this.tel = res.data.data.bankReserveTel;
          this.card = res.data.data.bankName;
          this.code = res.data.data.bankCode;
          this.cardno = res.data.data.bankAccount;
          //this.index = res.data.data.id;
        }
      });
    },
    onConfirm(value, index) {
      this.card = value;
      this.code = this.list[index].value;
      this.show = false;
      console.log(index)
      this.defaultIndex = index;
    },
    onCancel() {
      this.show = false;
    }
  },
  created() {
    this.findBankCard();
  },
  components: {
    Tops
  }
};
