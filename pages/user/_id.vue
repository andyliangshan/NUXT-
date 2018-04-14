<template>
  <div class="customState">
    <div class="loginProfile">
      <!--登录后-->
      <div class="after-login">
        <div class="profile">
          <div class="profile-wp"><img src="../../assets/img/loginbg.png" alt="loginbg"/></div>
          <div class="backtoPage"><a href="javascript:history.back(-1);" class="backtoPagse"><img src="../../assets/img/back.png" alt="back"/></a></div>
          <div class="profilebg"><img src="../../assets/img/profile.png" alt="profile" /></div>
          <div class="news-version">
            <div class="version-bg"><img src="../../assets/img/version-icon.png" alt="versionbg"/></div>
            <p>当前是最新版本哦</p>
          </div>
          <div class="loginbox"><a href="javascript:void(0)" id="logout" class="logout" >Marix</a></div>
          <div class="personInfoDesc">做心态的主人,不做情绪的奴隶</div>
          <div class="editorInfo">
            <a href="javascript:void(0)" class="attent" @click="attentTa(userInfo, $event)" ref="attentBtn">关注</a>
            <a href="/privateLetter" id="privateMsg" class="privateMsg">私信</a>
          </div>
        </div>
        <div class="infolist row">
          <a class="listcon col" href="/user/">
            <span class="title">发文</span>
            <span class="number">34</span>
          </a>
          <a class="listcon col" href="javascript:void(0)">
            <span class="title">获赞</span>
            <span class="number">56</span>
          </a>
          <a class="listcon col" href="/fans">
            <span class="title">粉丝</span>
            <span class="number">112</span>
          </a>
          <a class="listcon col" href="/attent">
            <span class="title">关注</span>
            <span class="number">2134</span>
          </a>
        </div>
      </div>
      <div class="customList">
        <data-list-box ref="datalist" :recommedList="tweetList"></data-list-box>
      </div>
    </div>
  </div>
</template>
<script>
  import DataListBox from '../../components/DataList/DataList.vue'

  export default {
    name: 'customState',
    data () {
      return {
        userInfo: {},
        toFollowUserId: '',
        action: null,
        userCookie: '',
        tweetList: {},
        isAttentInfo: {}
      }
    },
    mounted () {},
    components: {
      DataListBox
    },
    methods: {}
  }
</script>

<style lang="stylus">
  @import "../../assets/styl/customState.styl";
</style>