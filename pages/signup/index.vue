<template>
  <div class="register">
    <div class="registerForm">
      <div class="tit">注册你的知币账号</div>
      <form @submit.stop.prevent="registerForm">
        <div class="cont phone">
          <input type="text" placeholder="请输入你的手机号" name="phone" v-model="phone" />
        </div>
        <div class="cont username">
          <input type="text" placeholder="请输入验证码" name="name" v-model="phoneCode" />
          <button type="button" class="btnCode" id="getCode" ref="btnCode" disabled="disabled">获取验证码</button>
        </div>
        <div class="about-danger" role="alert">{{errTips1}}</div>
        <div class="submitBtn">
          <button type="submit" id="about-btn1" class="btn btn-default about-btn">注册</button>
        </div>
      </form>
      <div class="logoZhib"><img src="../../assets/img/logo.png" alt="logo"/></div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'register',
    data () {
      return {
        validate: {
          phoneError: '*手机号码错误',
          phoneCodeError: '*验证码错误'
        },
        phoneCode: '',
        phone: '',
        errTips1: '',
        errProject: false,
        showFlag: false,
        isDoubleClick: false
      }
    },
    head () {
      return {
        title: '注册知币',
        meta: [
          { hid: 'description', name: 'description', content: '注册知币' }
        ]
      }
    },
    props: {
    },
    mounted () {
    },
    methods: {}
  }
</script>
<style lang="stylus">
  .register {
    width: 100%;
    z-index: 1111;
    height: 100%;
    background: #fff;
    max-width: 750px;
    margin: 0 auto;

    .closeForm {
        position: absolute;
        top 20px
        righ 20px
        width 30px
        height 30px
        font-size 26px
        color: #000;
        line-height 30px
        text-align: center;

        &:hover {
            transform: rotate(360deg);
        }
    }

    .registerForm {
        padding 30px 0
        background: #fff;
        border-radius: 5px;
        width: 82%;
        margin: 10% auto 0;
    }

    .tit {
        color: #0D0D0D;
        font-size 26px
        width: 100%;
        text-align: center;
        line-height: 1;
    }

  .subtit {
    clear: both;
    margin-top 20px
    overflow: hidden;
    color: #939393;
    width: 100%;
    text-align: center;
    line-height: 1;
    font-size 12px
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

        input {
            display: inline-block;
            padding 12px 0 12px 10px
            background: #fff;
            font-size 16px
            color: #0D0D0D;
            width: 100%;
            border: none;
            border-bottom: 1px solid #0D0D0D;
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
            background: #138ff2;
            background-size: contain;
            font-size 17px
            border-radius 4px
            width 280px
            height 40px
            line-height 40px
            border: none;
            color: #fff;
            padding: 0;
            display: inline-block;

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
      background: url(../../assets/img/range.png) no-repeat;
      transition: left 0.5s;
      background-size: contain;
      color: #939393;

      &.end {
         background: #fff;

        em {
          display: inline-block;
          background: url(../../assets/img/ok.png) no-repeat #fff right center;
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
    .register {
      .registerForm {
        margin-left: 10px;
        margin-right: 10px;
        width: auto;
      }
    }
  }
</style>
