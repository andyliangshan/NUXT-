<template>
  <div class="reportSuccess" v-show="successPop">
    <div class="incomeInfo">
      <div class="closeIncome">×</div>
      <div class="incomeList">
        <div class="img"><img src="../assets/img/report.png" alt="profile"/></div>
        <div class="suc" @click="closeReport">举报成功</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'reportList',
    data () {
      return {
        successPop: false
      }
    },
    methods: {
      closeReport () {
        this.successPop = false
      }
    }
  }
</script>

<style lang="stylus">
.reportSuccess {
  width: 100%;
  position: fixed;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 1000;

  .incomeInfo {
    width: 60%;
    margin: 0 auto;
    margin-top: 50%;
    background: #fff;
    border-radius: 6px;
    padding: 10px;
    position: relative;

    .closeIncome {
      position: absolute;
      width: 30px;
      height: 30px;
      color: #939393;
      font-size: 20px;
      top: 0;
      right: 0;
      text-align: center;
    }

    .incomeList {
      overflow: hidden;
      padding: 10px 20px 0;
      text-align: center;

      .img {
        width: 40px;
        height: 28px;
        margin: 0 auto;

        img {
          width: 100%;
        }
      }

      .suc {
        clear: both;
        overflow: hidden;
        padding-top: 20px;
        width: 100%;
        text-align: center;
        color: #0d0d0d;
        font-size: 18px;
        font-weight: bolder;
      }
    }
  }
}
</style>
