<template>
  <div class="wrapperAll">
    <div class="customState" v-if="otherUserMainInfoData">
      <div class="loginProfile">
        <!--登录后-->
        <div class="after-login">
          <div class="profile">
            <div class="backtoPage col-1"><a href="javascript:history.back(-1);"><img src="../../assets/img/back.png" alt="back"/></a></div>
            <div class="profile-wp"><img src="../../assets/img/nt.png" alt="loginbg"/></div>
            <div class="profileInfo">
              <div class="profilebg">
                <img :src="otherUserMainInfoData.avatarImage" alt="profile" ref="avatarImg" />
              </div>
              <div class="profile-r">
                <div class="loginbox">
                  <a href="javascript:void(0)" id="logout" class="logout" >{{ otherUserMainInfoData.nickName }}</a>
                </div>
                <div class="editorInfo">{{ otherUserMainInfoData.introduce }}</div>
                <div class="attentedBox" v-show="userInfo.id !== otherUserMainInfoData.id" v-if="isFollowState && isFollowState.data1.isFollow !== true">
                  <a href="javascript:void(0);" class="follow" @click="changeStateAttent($event)">关注</a>
                  <!-- <a href="/privateLetter" class="priviateLetter">私信</a> -->
                </div>
                <div class="attentedBox" v-show="userInfo.id !== otherUserMainInfoData.id" v-else>
                  <a href="javascript:void(0);" class="follow active" @click="changeStateAttent($event)">已关注</a>
                </div>
              </div>
            </div>    
            <div class="infolist row">
              <a class="listcon col" :href="'/user/' + otherUserMainInfoData.id">
                <span class="title">发文</span>
                <span class="number">{{ otherUserMainInfoData.tweetsCount }}</span>
              </a>
              <a class="listcon col" href="javascript:void(0)">
                <span class="title">获赞</span>
                <span class="number">{{ otherUserMainInfoData.zanCount }}</span>
              </a>
              <a class="listcon col" :href="'/fans/' + otherUserMainInfoData.id">
                <span class="title">粉丝</span>
                <span class="number">{{ otherUserMainInfoData.fansCount }}</span>
              </a>
              <a class="listcon col" :href="'/attent/' + otherUserMainInfoData.id">
                <span class="title">关注</span>
                <span class="number">{{ otherUserMainInfoData.followCount }}</span>
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
          <data-list-box ref="datalist"></data-list-box>
        </div>
      </div>     
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import axios from '~/plugins/axios';
import DataListBox from '../../components/UserTweetDataList/UserTweetDataList.vue';
import { toast } from '../../components/toast';

export default {
  name: 'customState',
  data() {
    return {
      toFollowUserId: '',
      action: null,
      userCookie: '',
      isAttentInfo: {},
    };
  },
  head() {
    return {
      title: '个人主页',
    };
  },
  computed: {
    ...mapGetters(['otherUserMainInfoData', 'userInfo', 'isFollowState']),
  },
  mounted() {
    const otherUserId = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    this.GET_OTHER_USER_INFO_DATA(otherUserId);
    this.GET_IS_FOLLOW_DATA({ targetUserId: otherUserId });
  },
  components: {
    DataListBox,
  },
  methods: {
    ...mapActions(['GET_OTHER_USER_INFO_DATA', 'GET_IS_FOLLOW_DATA']),
    async changeStateAttent(evt) {
      if (!this.userInfo) {
        this.$router.push({
          path: '/login',
        });
      } else {
        const selt = evt.currentTarget;
        if (this.isFollowState.data1.isFollow === false) {
          this.action = 1;
          selt.innerHTML = '已关注';
          selt.className = 'follow active';
        } else {
          this.action = -1;
          selt.innerHTML = '关注';
          selt.className = 'follow';
        }
        const otherUserId = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
        const postdata = {
          toFollowUserId: otherUserId,
          action: this.action,
        };
        const bkData = await axios.post('/api/action/follow', postdata);
        if (bkData.data.success) {
          toast(bkData.data.msg);
        } else {
          toast(bkData.data.msg);
        }
      }
    },
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/customState.styl';

.customState .after-login {
  margin-top: 0;
}

body, html {
  overflow: auto !important;
}
</style>