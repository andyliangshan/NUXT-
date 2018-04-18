<template>
  <div class="accountCourse">
    <div class="closeForm" @click="linkhref">×</div>
    <div class="yuyueForm">
      <div class="tit">登录知币社区，投资机会早知道</div>
      <form @submit.stop.prevent="submitLogin">
        <div class="cont phone">
          <input type="text" placeholder="请输入你的手机号" name="phone" v-model="phone" maxlength="11" autocomplete="off" />
        </div>
        <div class="about-danger" role="alert">{{errTips1}}</div>
        <div class="submitBtn">
          <button type="submit" class="btn btn-default about-btn" ref="btnCode">继续</button>
        
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  import axios from '~/plugins/axios';
  import eventHub from '../../components/eventHub.js';
  import { mobileReg } from '~/plugins/constants';

  export default{
    middleware: 'anonymous',
    name: 'accountCourse',
    data () {
      return {
        validate: {
          phoneError: '*手机号码错误'
        },
        phone: '',
        errTips1: '',
        isDoubleClick: false,
        isRequesting: false
      }
    },
    head () {
      return {
        title: '登录/注册知币社区',
        meta: [
          { hid: 'description', name: 'description', content: '登录/注册知币社区' }
        ]
      }
    },
    props: {
      showLogin: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapMutations(['SET_LOGIN_PHONE', 'SET_USER_NEW']),
      setErrTips1 (msg) {
        this.errTips1 = msg
        setTimeout(() => {
          this.errTips1 = ''
        }, 2000)
      },
      linkhref () {
        eventHub.$emit('loginMobile:show', false);
      },
      async submitLogin () {
        if (!mobileReg.test(this.phone)) {
          this.setErrTips1(this.validate.phoneError)
          return
        }
        if (this.isRequesting) {
          return
        }
        this.isRequesting = true
        try {
          const bkData = await axios.get(`/api/valid/phone?phone=${this.phone}`)
          this.isRequesting = false;
          if (bkData.data.success) {
            this.errTips1 = ''
            eventHub.$emit('loginMobile:show', false);
            this.SET_LOGIN_PHONE(this.phone)
            this.SET_USER_NEW(bkData.data.data.useIsNew)
            if (bkData.data.data.password === true) {
              this.$router.push({ path: '/login/password' })
            } else {
              this.$router.push({ path: '/login/setPassword' })
            }
          } else {
            this.setErrTips1(bkData.msg)
          }
        } catch (err) {
          this.isRequesting = false;
        }
      }
    }
  }
</script>
<style lang="stylus">
  .accountCourse {
    width: 100%;
    z-index: 1111;
    height: 175%;
    background: #fff;
    max-width: 750px;
    margin: 0 auto;
    position fixed
    top 0
    left 50%
    margin-left -375px

  .closeForm {
    position: absolute;
    top 20px
    right 20px
    width 30px
    height 30px
    font-size 26px
    line-height 30px
    color: #000;
    text-align: center;

  &:hover {
     transform: rotate(360deg);
   }
  }

  .yuyueForm {
    padding 30px 0
    background: #fff;
    border-radius: 5px;
    width: 82%;
    margin: 10% auto 0;
  }

  .tit {
    color: #0D0D0D;
    font-size 10px
    width: 100%;
    text-align: center;
    line-height: 1;
    font-weight: bolder;
  }

  .subtit {
    clear: both;
    margin-top 20px
    font-size 12px
    overflow: hidden;
    color: #939393;
    width: 100%;
    text-align: center;
    line-height: 1;
  }

  form {
    clear: both;
    margin-top 40px
    overflow: hidden;

  .cont {
    clear: both;
    margin-bottom 15px
    width: 100%;
    position: relative;
    text-align: center;

  input {
    display: inline-block;
    padding 12px 0 12px 12px
    font-size 12px
    background: #fff;
    color: #0D0D0D;
    width: 90%;
    margin: 0 auto;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-sizing border-box

    &:focus {
      outline: none;
    }
  }

  .btnCode {
    position: absolute;
    right 10px
    top 0
    font-size 12px
    height 42px
    line-height 42px
    color: #939393;
    display: inline-block;
    text-decoration: none;
    background: none;
    z-index: 2;
    border: none;

    &:focus {
       text-decoration: none;
    }
  }

  .btnCode.gray {
    color: #939393;
  }
  }

  .about-danger {
    clear: both;
    overflow: hidden;
    width: 100%;
    text-align: center;
    color: #f00;
    padding-top 10px
    font-size 12px
  }

  .submitBtn {
    clear: both;
    overflow: hidden;
    margin-top 10px
    text-align: center;
    width: 100%;

  button {
    background-size: contain;
    font-size 17px
    border-radius 4px
    width 279px
    height 40px
    line-height 40px
    border: none;
    color: #fff;
    padding: 0;
    display: inline-block;
    background: #2B9FFB;

    &:focus {
      outline: none;
    }
  }
  }
  }

  .logoZhib {
    clear: both;
    padding-top 70px
    width: 100%;
    text-align: center;

  img {
    width 86px
    vertical-align: middle;
  }
  }
  }

  .login-swiper {
    position: relative;
    margin: 0 auto 18px;
    width: 300px;
    height: 40px;
    line-height: 40px;
    background: #f2f2f2;
    text-align: center;
    font-size: 16px;
    color: #939393;

    span {
      position: relative;
      z-index: 5;
    }

    i {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #58bc29;
      transition: width 0.5s;
    }

    a {
      position: absolute;
      z-index: 10;
      top: 1px;
      left: 1px;
      width: 38px;
      height: 38px;
      background: url(/public/img/range.png) no-repeat;
      transition: left 0.5s;
      background-size: contain;
      color: #939393;

      &.end {
         background: #fff;

        em {
          display: inline-block;
          background: url(/public/img/ok.png) no-repeat #fff right center;
          color: #fff;
          width: 16px;
          height: 16px;
          background-size: contain;
        }
      }
    }

    &.end {
      color: #fff;
    }
  }

  @media screen and (max-width:374px){
    .accountCourse {
      .yuyueForm {
        margin-left: 10px;
        margin-right: 10px;
        width: auto;
      }
    }
  }

  @media screen and (max-width 767px) {
    .accountCourse {
      margin-left -50%
    }
  }

  @media screen and (min-width 768px) {
    .accountCourse {
      margin-left -375px
    }
  }
</style>
