<template>
  <div class="customState" v-if="userMainInfoData">
    <div class="loginProfile">
      <!--登录后-->
      <div class="after-login">
        <div class="profile">
          <div class="profile-wp"><img src="../../assets/img/nt.png" alt="loginbg"/></div>
          <div class="profileInfo">
            <div class="profilebg">
              <img :src="userMainInfoData.avatarImage" alt="profile" ref="avatarImg" />
              <a href="javascript:void(0)" class="accoutFreeze"><i><img src="../../assets/img/tan.png" alt="editor" /></i>账号冻结</a>
            </div>
            <div class="profile-r">
              <div class="loginbox">
                <a href="javascript:void(0)" id="logout" class="logout" >{{ userMainInfoData.nickName }}</a>
                <a href="/editorPelnfo" class="editor" ><img src="../../assets/img/editor.png" alt="editor" /></a>
              </div>
              <div class="editorInfo">{{ userMainInfoData.introduce }}</div>
            </div>
          </div>    
          <div class="infolist row">
            <a class="listcon col" :href="'/user/' + userMainInfoData.id">
              <span class="title">发文</span>
              <span class="number">{{ userMainInfoData.tweetsCount }}</span>
            </a>
            <a class="listcon col" href="javascript:void(0)">
              <span class="title">获赞</span>
              <span class="number">{{ userMainInfoData.zanCount }}</span>
            </a>
            <a class="listcon col" href="/fans">
              <span class="title">粉丝</span>
              <span class="number">{{ userMainInfoData.fansCount }}</span>
            </a>
            <a class="listcon col" href="/attent">
              <span class="title">关注</span>
              <span class="number">{{ userMainInfoData.followCount }}</span>
            </a>
          </div>
          <!--<div class="news-version">-->
            <!--<div class="version-bg"><img src="../../assets/img/version-icon.png" alt="versionbg"/></div>-->
            <!--<p>当前是最新版本哦</p>-->
          <!--</div>-->
        </div>
        <div class="fillline"></div>
      </div>   
      <div class="customList">
        <data-list-box ref="datalist" :recommedList="tweetList"></data-list-box>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import DataListBox from '../../components/DataList/DataList.vue';

export default {
  name: 'customState',
  data() {
    return {
      userInfo: {},
      toFollowUserId: '',
      action: null,
      userCookie: '',
      tweetList: {},
      isAttentInfo: {},
    };
  },
  head() {
    return {
      title: '个人主页',
    };
  },
  computed: {
    ...mapGetters(['userMainInfoData']),
  },
  mounted() {
    const otherUserId = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    this.GET_MASTER_INFO_DATA({ userId: otherUserId });
  },
  components: {
    DataListBox,
  },
  methods: {
    ...mapActions(['GET_MASTER_INFO_DATA']),
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/customState.styl';
</style>