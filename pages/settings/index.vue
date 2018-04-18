<template>
  <div class="settings">
    <div class="header">
         <a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a>
         设置
     </div>
     <div class="list">
        <a class="listcon row" href="/login/forgetPassword">
            <span class="col-md-12">修改密码</span>
            <em><img src="../../assets/img/right-icon.png" alt="right-icon" /></em>
        </a>
        <a class="listcon row" href="/about_us">
            <span class="col-md-12">关于知币</span>
            <em><img src="../../assets/img/right-icon.png" alt="right-icon" /></em>
        </a>
        <a class="listcon row" href="javascript:void(0)">
            <span class="col-md-8">当前版本</span>
            <span class="col-md-4">
                <b>&nbsp;</b>
                v1.0
            </span>
        </a>
    </div>
    <div class="logoutbox"><a href="javascript:void(0)" class="logoutcont" @click="logoutUserID">退出登录</a></div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapMutations } from 'vuex';
export default {
  name: 'settings',
  middleware: 'authenticated',
  data () {
    return { }
  },
  methods: {
    ...mapMutations(['LOGINOUT']),
    async logoutUserID () {
      const bkData = await axios.post('/api/logout')
      if (bkData) {
        this.LOGINOUT();
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>

<style lang="stylus">
body, html {
  background #fafafa
}
.settings {
    width 100%
    height 100%
    max-width 750px
    margin 0 auto

    .header {
      position relative
      padding 10px 15px
      text-align center
      font-size 20px
      color #202020
      font-weight bolder
      background #fafafa

      a {
        display block
        position absolute
        top 10px
        left 15px
        width 12px
        height 20px

        img {
           width 12px
           height 20px
        }
      }  
    }

    .list {
        clear: both;
        margin-top: 10px;
        background: #fff;
        padding-left: 15px;
        padding-right: 15px;

        a {
        width: 100%;
        border-bottom: 1px solid #e6e6e6;
        padding-top: 10px;
        padding-bottom: 10px;
        margin: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;

        span {
            padding: 0;

            &:first-child {
            width: 70%;
            font-size: 14px;
            color: #000;
            }

            b {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #E14123;
            display: inline-block;
            vertical-align: middle;
            }
        }

        span.col-md-4 {
            width: 30%;
            color: #939393;
            text-align: right;
        }

        em {
            position: absolute;
            right: 0;
            display: inline-block;
            width: 10px;
            height: 16px;
            padding-left: 15px;
            padding-right: 0;

            img {
            width 100%
            height 100%
            }
        }
        }

        a:last-child {
        border-bottom: none;
        }
    }
  .logoutbox {
     clear both
     overflow hidden
     margin 20px 15px 0
     
    a {
       padding 10px 0 
       display block 
       width 100%
       background #e1e1e1
       text-align center
       color #fff
       font-size 18px
       border-radius 4px 
    }
  }  
}
</style>


