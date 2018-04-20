<template>
  <div class="compatible" ref="compatible">
    <!--PC版本-->
    <div class="nav-container">
      <div class="min-container">
        <div class="login"><nuxt-link to="/recommend" class="login"><img src="../assets/img/logo.png" /></nuxt-link></div>
        <div class="menu">      
          <div class="zhiB-list">
            <nuxt-link :to="{path: 'follow'}" class="active"><em>关注</em><span class="underline"></span></nuxt-link>
            <nuxt-link :to="{path: 'recommend'}"><em>推荐</em><span class="underline"></span></nuxt-link>
            <nuxt-link :to="{path: 'find'}"><em>发现</em><span class="underline"></span></nuxt-link>
            <nuxt-link to="http://www.baidu.com" class="download" ><em>下载APP</em></nuxt-link>
          </div>
        </div>
        <div class="loginbox">
            <div class="loginModel">
              <!--登录前-->
              <div class="loginTag" v-if="!userInfo"><nuxt-link to="/login">登录</nuxt-link></div>
              <!--登录后-->
              <div class="showLoginState" v-else @click="changeState">
                <div class="successLogin"><img :src="userInfo ? userInfo.avatarImage : '../assets/img/pelProfile.png'" alt="pelProfile"/></div>
                <div class="successBox" v-show="loginState">
                  <span class="triangle"></span>
                  <div class="logout">
                    <nuxt-link to="/user" class="user" >个人中心</nuxt-link>
                    <a href="javascript:void(0)" class="logout" @click="logout">退出登录</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="search"><nuxt-link to="/search" class="search" ><img src="../assets/img/search-b.png" alt="search"/></nuxt-link></div>
            <div class="zhiB-msg" v-show="!!userInfo">
              <nuxt-link to="/notice" class="message">
                <img src="../assets/img/Info.png" alt="Group"/>
                <em v-show="noticeCount && noticeCount.count !== 0" ref="showFlagIcon">{{ noticeCount }}</em>
              </nuxt-link>
            </div>
            <div class="release">
              <nuxt-link to="/release">
                <img src="../assets/img/pencil.png" alt="Group"/>
                <em>发文</em>
              </nuxt-link>
            </div>
          </div>
      </div>
    </div>
    <!--移动端-->
    <div class="h5NavMeum">
      <div class="loginModel">
        <!--登录前-->
        <div class="loginTag" v-if="!userInfo"><nuxt-link to="/login">登录</nuxt-link></div>
        <!--登录后-->
        <div class="showLoginState" v-else>
          <div class="successLogin" @click="changeH5State">
            {{userInfo.nickName}}<img src="../assets/img/triangle.png" alt="Group" />
          </div>
          <div class="logoutBox" v-show="h5LoginState">
            <em class="triangle"></em>
            <div class="logout">
              <nuxt-link to="/notice" class="notice">消息列表</nuxt-link>
              <a href="javascript:void(0)" class="logout" @click="logout">退出登录</a>
            </div>
          </div>
        </div>
      </div>
      <div class="editorArea">
         <div class="release"><nuxt-link to="/release"><img src="../assets/img/zb-icon6.png" alt="release"/></nuxt-link></div>
         <div class="search"><nuxt-link to="/search"><img src="../assets/img/zb-icon7.png" alt="search"/></nuxt-link></div>
         <div class="reloadPage"><a href="javascript:void(0)"><img src="../assets/img/zb-icon5.png" alt="reloadPage"/></a></div> 
      </div>
      <div class="mobileMeum">
        <nuxt-link :to="'/follow'"><em>关注</em></nuxt-link>
        <nuxt-link :to="'/recommend'"><em>推荐</em></nuxt-link>
        <nuxt-link :to="'/find'"><em>发现</em></nuxt-link>
        <nuxt-link :to="'/user'"><em>我</em></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import axios from '~/plugins/axios';
export default {
  computed: mapGetters(['userInfo', 'noticeData', 'noticeCount']),
  data() {
    return {
      loginState: false,
      h5LoginState: false,
      showMsgState: false,
    };
  },
  middleware: 'authenticated',
  mounted() {
    this.GET_NOTICE_COUNT()
  },
  methods: {
    ...mapMutations(['LOGINOUT']),
    ...mapActions(['GET_NOTICE_COUNT']),
    async logout() {
      const logout = await axios.post('/api/logout');
      if (logout.data.success) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('logout');
        this.LOGINOUT();
        this.$router.push({ path: '/login' });
      } else {
        alert('退出失败');
      }
    },
    changeState() {
      // this.$emit('transmitState', !this.loginState)
      this.loginState = true;
      setTimeout(() => {
        this.loginState = false;
      }, 2000);
    },
    changeH5State() {
      this.h5LoginState = true;
      setTimeout(() => {
        this.h5LoginState = false;
      }, 2000);
    },
  },
};
</script>

<style lang="stylus">
@import '../assets/styl/head.styl';
</style>
