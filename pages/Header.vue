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
                <div class="successLogin"><img src="../assets/img/pelProfile.png" alt="pelProfile"/></div>
                <div class="successBox" v-show="loginState">
                  <span class="triangle"></span>
                  <div class="logout">
                    <nuxt-link to="/user" class="user" >个人中心</nuxt-link>
                    <nuxt-link to="/logout" class="logout" >退出登录</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="search"><nuxt-link to="/search" class="search" ><img src="../assets/img/search-b.png" alt="search"/></nuxt-link></div>
            <div class="zhiB-msg">
              <nuxt-link to="/notice" class="message" >
                <img src="../assets/img/Info.png" alt="Group"/>
                <em ref="showFlagIcon">3</em>
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
    <div class="h5NavMeum" v-if="userInfo">
      <div class="loginModel">
        <!--登录前-->
        <div class="loginTag"><nuxt-link to="/login">登录</nuxt-link></div>
        <!--登录后-->
        <div class="showLoginState">
          <div class="successLogin">
            {{userInfo.nickName}}<img src="../assets/img/triangle.png" alt="Group" />
          </div>
          <div class="logoutBox">
            <em class="triangle"></em>
            <div class="logout">
              <nuxt-link to="/notice" class="notice">消息列表</nuxt-link>
              <nuxt-link to="/logout" class="logout">退出登录</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="editorArea">
         <div class="release"><a><img src="../assets/img/zb-icon6.png" alt="release"/></a></div>
         <div class="search"><nuxt-link to="/search"><img src="../assets/img/zb-icon7.png" alt="search"/></nuxt-link></div>
         <div class="reloadPage"><a href="javascript:void(0)"><img src="../assets/img/zb-icon5.png" alt="reloadPage"/></a></div> 
      </div>
      <div class="mobileMeum">
        <nuxt-link :to="{path: 'follow'}"><em>关注</em></nuxt-link>
        <nuxt-link :to="{path: 'recommend'}"><em>推荐</em></nuxt-link>
        <nuxt-link :to="{path: 'find'}"><em>发现</em></nuxt-link>
        <nuxt-link :to="{path: 'user'}"><em>我</em></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: mapGetters(['userInfo']),
  data() {
    return {
      loginState: false,
    };
  },
  middleware: 'authenticated',
  mounted() {
    this.GET_MASTER_INFO_DATA();
  },
  methods: {
    ...mapActions(['GET_MASTER_INFO_DATA']),
    changeState() {
      // this.$emit('transmitState', !this.loginState)
      this.loginState = !this.loginState;
    },
  },
};
</script>

<style lang="stylus">
@import '../assets/styl/head.styl';
</style>
