<template>
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
              <div class="attentedBox" v-show="userInfo.id !== otherUserMainInfoData.id">
                <a href="javascript:void(0);" class="follow" @click="changeStateAttent(otherUserMainInfoData, $event)">关注</a>
                <!-- <a href="/privateLetter" class="priviateLetter">私信</a> -->
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
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import axios from '~/plugins/axios';
import DataListBox from '../../components/UserTweetDataList/UserTweetDataList.vue';

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
    ...mapGetters(['otherUserMainInfoData', 'userInfo']),
  },
  mounted() {
    const otherUserId = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    this.GET_OTHER_USER_INFO_DATA(otherUserId);
    this.GET_MASTER_INFO_DATA();
  },
  components: {
    DataListBox,
  },
  methods: {
    ...mapActions(['GET_MASTER_INFO_DATA', 'GET_OTHER_USER_INFO_DATA']),
    async changeStateAttent(item, evt) {
      const selt = evt.currentTarget;
      if (item.isfollow === null) {
        this.action = 1;
        selt.innerHTML = '已关注';
        selt.style.border = '1px solid #939393';
        selt.style.color = '#939393';
      } else {
        this.action = -1;
        selt.innerHTML = '关注Ta';
        selt.style.border = '1px solid #138FF2';
        selt.style.color = '#138FF2';
      }
      const postdata = {
        toFollowUserId: item.id,
        action: this.action,
      };
      const bkData = await axios.post('/api/action/follow', postdata, { credentials: true });
      if (bkData.data.success) {
        alert(bkData.data.msg);
      } else {
        alert(bkData.data.msg);
      }
    },
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/customState.styl';
</style>