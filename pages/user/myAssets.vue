<template>
  <div class="myAssets" v-if="userAessetsInfo">
    <div class="assetsHead">
      <div class="assetsBg"><img src="../../assets/img/my-assets.png" alt="my-assets"/></div>
      <div class="assets-top">
        <div class="backpage"><a href="javascript:history.back(-1);" class="backtoPagse"><img src="../../assets/img/backWhite.png" alt="backWhite"/></a></div>
        <div class="myTitle">我的资产</div>
        <div class="myBill"><a href="/user/bill" class="bill"><img src="../../assets/img/bill.png" alt="bill"/></a></div>
      </div>
      <div class="incomeSelf">
        <div class="self-tit">昨日收益</div>
        <div class="self-assets">{{ userAessetsInfo.yesterdayAdded }}</div>
        <div class="total-assets">总资产 {{ ( Math.round(userAessetsInfo.presentCoin + userAessetsInfo.lockCoin - userAessetsInfo.alreadRecevieCoin) * 100 / 100) }} ZIB</div>
      </div>
    </div>
    <div class="assetsOne">
      <div class="assets-title">已赠送<b>{{ userAessetsInfo.presentCoin }} ZIB</b>，每日登录领取<b>{{ userAessetsInfo.receiveCoinEveryDay }} ZIB</b></div>
      <div class="assets-zib">
        <div class="unget">
          <p>待领取</p>
          <p class="value">{{ (userAessetsInfo.presentCoin - userAessetsInfo.alreadRecevieCoin) }}</p>
        </div>
        <div class="get">
          <p>已领取</p>
          <p class="value">{{ userAessetsInfo.alreadRecevieCoin }}</p>
        </div>
      </div>
    </div>
    <div class="fill"></div>
    <div class="assetsTwo">
      <div class="assets-title">锁定状态资产 <b>{{ userAessetsInfo.lockCoin }} ZIB</b></div>
      <div class="assets-zib">
        <div class="unget">
          <i>收益翻倍</i>
          <p>已锁定</p>
          <p class="value">{{ (userAessetsInfo.lockCoin - userAessetsInfo.delockingCoin) }}</p>
        </div>
        <div class="get">
          <p>解锁中</p>
          <p class="value">{{ userAessetsInfo.delockingCoin }}</p>
        </div>
      </div>
      <div class="lockBtn">
        <a href="javascript:void(0)" class="unlock" @click="expect">解锁</a>
        <a href="javascript:void(0)" class="pay" @click="expect">充值</a>
      </div>
    </div>
    <div class="cash">
      <div class="canCash"><p>可提现</p><em>敬请期待</em></div>
      <div class="cashTotal"><p>{{ userAessetsInfo.coinCount }}<b>ZIB</b></p></div>
    </div>
    <!--敬请期待-->
    <div class="expect" v-show="showExpect">
      <div class="expectCont">功能尚在开发中，敬请期待!</div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'myAssets',
    middleware: 'authenticated',
    data () {
      return {
        showExpect: false,
      }
    },
    head() {
      return {
        title: '个人资产信息'
      }
    },
    mounted() {
      this.GET_USER_ASSETS_INFO_DATA();
    },
    computed: {
      ...mapGetters(['userAessetsInfo'])
    },
    methods: {
      ...mapActions(['GET_USER_ASSETS_INFO_DATA']),
      expect () {
        this.showExpect = true
        setTimeout(() => {
          this.showExpect = false
        }, 2000)
      },
    }
  }
</script>
<style lang="stylus">
@import "../../assets/styl/myAssets.styl";
</style>

