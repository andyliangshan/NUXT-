<template>
    <div class="homepage">
      <nv-header></nv-header>
    <!--登陆后-->
      <div class="after-login" v-if="userInfo">
        <div class="profile">
          <div class="profile-wp"><img src="../../assets/img/nt.png" alt="loginbg"/></div>
          <div class="profileInfo">
            <div class="profilebg">
              <img :src="userInfo.avatarImage" alt="profile" ref="avatarImg" />
              <a href="javascript:void(0)" class="accoutFreeze" v-if="userInfo.isBlock"><i><img src="../../assets/img/tan.png" alt="editor" /></i>账号冻结</a>
            </div>
            <div class="profile-r">
              <div class="loginbox">
                <a href="javascript:void(0)" id="logout" class="logout" >{{ userInfo.nickName }}</a>
                <a href="/editorPelnfo" class="editor" ><img src="../../assets/img/editor.png" alt="editor" /></a>
              </div>
              <div class="editorInfo">{{ userInfo.introduce }}</div>
            </div>
          </div>    
          <div class="infolist row">
            <a class="listcon col" :href="'/user/' + userInfo.id">
              <span class="title">发文</span>
              <span class="number">{{ userInfo.tweetsCount }}</span>
            </a>
            <a class="listcon col" href="javascript:void(0)">
              <span class="title">获赞</span>
              <span class="number">{{ userInfo.zanCount }}</span>
            </a>
            <a class="listcon col" :href="'/fans/' + userInfo.id">
              <span class="title">粉丝</span>
              <span class="number">{{ userInfo.fansCount }}</span>
            </a>
            <a class="listcon col" :href="'/attent/' + userInfo.id">
              <span class="title">关注</span>
              <span class="number">{{ userInfo.followCount }}</span>
            </a>
          </div>
          <!--<div class="news-version">-->
            <!--<div class="version-bg"><img src="../../assets/img/version-icon.png" alt="versionbg"/></div>-->
            <!--<p>当前是最新版本哦</p>-->
          <!--</div>-->
        </div>
        <div class="fillline"></div>
        <div class="pelInfoCont">
          <nuxt-link to="/user/myAssets" class="data">
            <div class="title">我的资产</div>
            <div class="earnings">
              <span>{{ assets.t }} <em>ZIB</em></span>
              <span>{{ assets.c }} <em>￥</em></span>
            </div>
          </nuxt-link>
        </div>
        <div class="fill"></div>
        <div class="getSuger">
          <a class="listcon row" href="http://zhib.didaedu.com/activity">
            <span class="col-md-12">邀请好友送糖果</span>
            <em><img src="../../assets/img/right-gray-icon.png" alt="right-icon" /></em>
          </a>
        </div>
        <div class="fill"></div>
        <div class="version-list">
          <a class="listcon row" href="/roast">
            <span class="col-md-12">吐槽一下</span>
            <em><img src="../../assets/img/right-gray-icon.png" alt="right-icon" /></em>
          </a>
          <a class="listcon row" href="/user/settings">
            <span class="col-md-12">设置</span>
            <em><img src="../../assets/img/right-gray-icon.png" alt="right-icon" /></em>
          </a>
        </div>
      </div>
      <!-- <cps></cps> -->
      <!-- <cpsed></cpsed> -->
      <!-- <cpsno></cpsno> -->
    </div>  
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import axios from '~/plugins/axios';
import nvHeader from '../Header.vue';
import cps from '../../components/ReportSuccess.vue'
import cpsed from '../../components/AccountClosureSelf.vue'
import cpsno from '../../components/AccountClosure.vue'

export default {
  name: 'homepage',
  middleware: 'authenticated',
  computed: {
    ...mapGetters(['userInfo']),
    ...mapState(['isCps', 'isCpsed', 'isCpsNo'])
  },
  head() {
    return {
      title: '个人主页',
    };
  },
  data() {
    return {
      assets: {
        t: 0,
        c: 0,
      },
    };
  },
  methods: {
    ...mapActions(['GET_MASTER_INFO_DATA']),
  },
  async mounted() {
    const data = await this.GET_MASTER_INFO_DATA();
    if (data.code === 403) {
      this.$route.push({ path: '/login' });
    }
    const assetsInfo = await axios.post('/api/assets');
    if (assetsInfo.data.success) {
      this.assets = assetsInfo.data.data;
    }
    // 每次登录成功领取奖励
    const everyDataCoinZIB = await axios.post('/api/coin');
    if (everyDataCoinZIB.data.success) {
      console.log(everyDataCoinZIB.data, everyDataCoinZIB.data.msg);
    }
  },
  components: {
    nvHeader,
    cps,
    cpsed,
    cpsno,
  },
};
</script>
<style lang="stylus">
@import '../../assets/styl/login.styl';
  .after-login .infolist {
    position absolute
    top 158px
  }
</style>

