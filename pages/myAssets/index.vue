<template>
  <div class="myAssets">
    <div class="assetsHead">
      <div class="assetsBg"><img src="../../assets/img/my-assets.png" alt="my-assets"/></div>
      <div class="assets-top">
        <div class="backpage"><a href="javascript:history.back(-1);" class="backtoPagse"><img src="../../assets/img/backWhite.png" alt="backWhite"/></a></div>
        <div class="myTitle">我的资产</div>
        <div class="myBill"><a href="/bill" class="bill"><img src="../../assets/img/bill.png" alt="bill"/></a></div>
      </div>
      <div class="incomeSelf">
        <div class="self-tit">昨日收益</div>
        <div class="self-assets">782.00</div>
        <div class="total-assets">总资产 6082.93 ZIB</div>
      </div>
    </div>
    <div class="assetsOne">
      <div class="assets-title">已赠送<b>2000.00 ZIB</b>，每日登录领取<b>20 ZIB</b></div>
      <div class="assets-zib">
        <div class="unget">
          <span>待领取</span>
          <em>1600.00</em>
        </div>
        <div class="get">
          <span>已领取</span>
          <em>400.00</em>
        </div>
      </div>
    </div>
    <div class="fill"></div>
    <div class="assetsTwo">
      <div class="assets-title">锁定状态资产 <b>2000.00 ZIB</b></div>
      <div class="assets-zib">
        <div class="unget">
          <i>收益翻倍</i>
          <span>已锁定</span>
          <em>1600.00</em>
        </div>
        <div class="get">
          <span>解锁中</span>
          <em>400.00</em>
        </div>
      </div>
      <div class="lockBtn">
        <a href="javascript:void(0)" class="unlock" @click="expect">解锁</a>
        <a href="javascript:void(0)" class="pay" @click="expect">充值</a>
      </div>
    </div>
    <div class="cash">
      <div class="canCash"><span>可提现</span><em>敬请期待</em></div>
      <div class="cashTotal"><span>89306.33<b>ZIB</b></span></div>
    </div>
    <!--敬请期待-->
    <div class="expect" v-show="showExpect">
      <div class="expectCont">功能尚在开发中，敬请期待!</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'myAssets',
    data () {
      return {
        showExpect: false
      }
    },
    methods: {
      expect () {
        this.showExpect = true
        setTimeout(() => {
          this.showExpect = false
        }, 2000)
      }
    }
  }
</script>
<style lang="stylus">
@import "../../assets/styl/myAssets.styl";
</style>

