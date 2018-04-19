<template>
  <div class="accountClose" v-if="cpsnoData">
    <div class="incomeInfo">
      <div class="closeIncome">×</div>
      <div class="incomeList">
        <div class="title">{{ cpsnoData.reason }}</div>
        <div class="subTitle">{{ cpsnoData.message }}</div>
        <div class="accoutDesc">{{ cpsnoData.extraMsg }}</div>
        <div class="queryDetail"><a href="javascript:void(0)">确定</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'accountClose',
  computed: mapGetters(['userInfo', 'cpsnoData']),
  middleware: 'authenticated',
  mounted() {
    this.GET_CPS_NO_DATA()
  },
  methods: {
    ...mapActions(['GET_CPS_NO_DATA'])
  },
}
</script>

<style lang="stylus">
  .accountClose {
    width: 100%;
    position: fixed;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;

    .incomeInfo {
      width: 80%;
      margin: 0 auto;
      margin-top: 20%;
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

        .title {
          width: 100%;
          text-align: center;
          color: #0d0d0d;
          font-size: 18px;
          font-weight: bolder;
          line-height: 1;
        }

        .subTitle {
          width: 100%;
          color: #939393;
          font-size: 12px;
          clear: both;
          padding-top: 5px;
          line-height: 18px;
        }

        .accoutDesc {
          clear: both;
          overflow: hidden;
          padding-top: 20px;
          color: #0d0d0d;
          font-weight: bolder;
          font-size: 14px;
          line-height: 20px;
        }

        .queryDetail {
          clear: both;
          overflow: hidden;
          padding-top: 20px;
          text-align: center;

          a {
            display: block;
            width: 100%;
            color: #138FF2;
            font-size: 16px;
            font-weight: bolder;
          }
        }
      }
    }
  }
</style>
