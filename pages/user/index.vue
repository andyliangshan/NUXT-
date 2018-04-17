<template>
    <div class="homepage">
    <!--登陆后-->
      <div class="after-login">
        <div class="profile">
          <div class="profile-wp"><img src="../../assets/img/nt.png" alt="loginbg"/></div>
          <div class="profileInfo">
            <div class="profilebg">
              <img :src="result.avatarImage" alt="profile" ref="avatarImg" />
              <a href="javascript:void(0)" class="accoutFreeze"><i><img src="../../assets/img/tan.png" alt="editor" /></i>账号冻结</a>
            </div>
            <div class="profile-r">
              <div class="loginbox">
                <a href="javascript:void(0)" id="logout" class="logout" >{{ result.nickName }}</a>
                <a href="/editorPeInfo" class="editor" ><img src="../../assets/img/editor.png" alt="editor" /></a>
              </div>
              <div class="editorInfo">{{ result.introduce }}</div>
            </div>
          </div>    
          <div class="infolist row">
            <a class="listcon col" :href="'/user/' + result.id">
              <span class="title">发文</span>
              <span class="number">{{ result.tweetsCount }}</span>
            </a>
            <a class="listcon col" href="javascript:void(0)">
              <span class="title">获赞</span>
              <span class="number">{{ result.zanCount }}</span>
            </a>
            <a class="listcon col" href="/fans">
              <span class="title">粉丝</span>
              <span class="number">{{ result.fansCount }}</span>
            </a>
            <a class="listcon col" href="/attent">
              <span class="title">关注</span>
              <span class="number">{{ result.followCount }}</span>
            </a>
          </div>
          <!--<div class="news-version">-->
            <!--<div class="version-bg"><img src="../../assets/img/version-icon.png" alt="versionbg"/></div>-->
            <!--<p>当前是最新版本哦</p>-->
          <!--</div>-->
        </div>
        <div class="fillline"></div>
        <div class="pelInfoCont">
          <a href="/myAssets" class="data">
            <div class="title">我的资产</div>
            <div class="earnings">
              <span>{{ result.presentCoin }} <em>ZIB</em></span>
              <span>{{ parseInt(result.presentCoin * 0.2) }} <em>￥</em></span>
            </div>
          </a>
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
import axios from '~/plugins/axios'

export default {
  name: 'homepage',
  data () {
    return {
      showLoginState: false,
      result: {}
    }
  },
  head () {
    return {
      title: '个人中心'
    }
  },
  components: {
  },
  // async asyncData () {
  //   try {
  //     let { res } = await axios.post('/api/userInfo')
  //     console.log(res.data, '..........??????....')
  //     return { result: res }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    async logoutUserID () {
      const bkData = await axios.post('/api/logout')
      if (bkData) {
        window.location.href = '/login'
      }
    },
    async getUserInfo () {
      const userInfo = await axios.post('/api/userInfo')
      console.log(userInfo, '.......');
      if (userInfo.data.success === true) {
        this.result = userInfo.data.data
      }
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/styl/login.styl';
</style>

