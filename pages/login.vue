<template>
    <div class="login-view">
        <nv-header></nv-header>
        <!--登录前-->
        <div class="prev-login">
            <div class="profile">
                <div class="profile-wp"><img src="../assets/img/nt.png" alt="loginbg"/></div>
                <div class="profilebg" @click="showLogin"><img src="../assets/img/profile-gray.png" alt="profile"/></div>
                <div class="loginbox"><a href="javascript:void(0)" id="login" class="login" @click="showLogin">登录/注册</a></div>
            </div>
            <div class="version-list">
                <a class="listcon row" href="/about">
                    <span class="col-md-12">关于知币</span>
                    <em><img src="../assets/img/right-icon.png" alt="right-icon" /></em>
                </a>
                <a class="listcon row" href="/roast">
                    <span class="col-md-12">吐槽一下</span>
                </a>
                <a class="listcon row" href="javascript:void(0)" id="version">
                    <span class="col-md-8">当前版本</span>
                    <span class="col-md-4">
                <b>&nbsp;</b>
                v1.0
                </span>
                </a>
            </div>
        </div>
        <nuxt-child/>
        <login-form v-show="showLoginState"></login-form>
    </div>
</template>

<script>
import LoginForm from './login/login-form.vue';
import nvHeader from './Header.vue';
export default {
  name: 'login-view',
  data() {
    return {
      showLoginState: false,
    };
  },
  head() {
    return {
      title: '登录/注册知币社区',
      meta: [{ hid: 'description', name: 'description', content: '登录/注册知币社区' }],
    };
  },
  components: {
    LoginForm,
    nvHeader,
  },
  methods: {
    showLogin() {
      this.showLoginState = !this.showLoginState;
    },
  },
};
</script>

<style lang="stylus">
@import '../assets/styl/login.styl';

.login-view .footer .bottomBar .b-term a.index {
    .underline {
        display: none;
    }

    .gps {
        background: url('../assets/img/icon1-black.png') no-repeat;
        background-size: contain;
    }
}
</style>
