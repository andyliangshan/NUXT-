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
              <a href="javascript:void(0)" class="accoutFreeze"><i><img src="../../assets/img/tan.png" alt="editor" /></i>账号冻结</a>
            </div>
            <div class="profile-r">
              <div class="loginbox">
                <a href="javascript:void(0)" id="logout" class="logout" >{{ userInfo.nickName }}</a>
                <a href="/editorPeInfo" class="editor" ><img src="../../assets/img/editor.png" alt="editor" /></a>
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
            <a class="listcon col" href="/fans">
              <span class="title">粉丝</span>
              <span class="number">{{ userInfo.fansCount }}</span>
            </a>
            <a class="listcon col" href="/attent">
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
          <nuxt-link to="/myAssets" class="data">
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
          <a class="listcon row" href="/settings">
            <span class="col-md-12">设置</span>
            <em><img src="../../assets/img/right-gray-icon.png" alt="right-icon" /></em>
          </a>
        </div>
      </div>     
    </div>  
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from '~/plugins/axios'
import nvHeader from '../Header.vue'

export default {
  name: 'homepage',
  middleware: 'authenticated',
  computed: mapGetters(['userInfo']),
  head () {
    return {
      title: '个人主页'
    }
  },
  data () {
    return {
      assets: {
        t: 0,
        c: 0,
      },
    }
  },
  methods: {
    ...mapActions(['GET_MASTER_INFO_DATA']),
  },
  async mounted() {
    const data = await this.GET_MASTER_INFO_DATA();
    if (data.code === 403) {
      this.$route.push({ path: '/login' });
    }
    const assetsInfo = await axios.post('/api/assets')
    if (assetsInfo.data.success) {
      this.assets = assetsInfo.data.data;
    }
  },
  components: {
    nvHeader,
  },
}
</script>
<style lang="stylus">
@import '../../assets/styl/login.styl';
</style>

