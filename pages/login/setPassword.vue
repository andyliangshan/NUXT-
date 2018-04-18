<template>
    <div class="setPassword">
        <div class="closeForm"><nuxt-link to="/login" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></nuxt-link></div>
        <div class="yuyueForm">
            <div class="tit">设置密码</div>
            <div class="subtit">验证码发送至您<b></b>的手机上</div>
            <form @submit.stop.prevent="submitSetLogin()">
                <div class="cont username">
                    <input type="text" placeholder="请输入短信验证码" name="name" v-model="phoneCode" maxlength="4" autocomplete="off" />
                    <button type="button" class="btnCode" ref="btnCode" @click="sendPhoneCode">获取验证码</button>
                </div>
                <div class="cont phone">
                    <input type="password" placeholder="请设置登录密码" name="phone" v-model="serPassword" />
                </div>
                <div class="about-danger" role="alert">{{errTips}}</div>
                <div class="submitBtn">
                    <button type="submit" class="btn btn-default about-btn" ref="loginBtn">进入</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from '~/plugins/axios';
import { mapState } from 'vuex';
export default {
  name: 'setPassword',
  middleware: 'anonymous',
  computed: {
    ...mapState(['loginPhone', 'isUserNew']),
  },
  head() {
    return {
      title: '设置密码',
      meta: [{ hid: 'description', name: 'description', content: '设置密码' }],
    };
  },
  data() {
    return {
      serPassword: '',
      phoneCode: '',
      errTips: '',
      isDoubleClick: false,
      isRequesting: false,
    };
  },
  mounted() {
    if (!this.loginPhone) {
        return this.$router.push({ path: '/login' })
    }
    this.sendPhoneCode();
  },
  methods: {
    async sendPhoneCode() {
      if (this.isRequesting) {
        return;
      }
      try {
        this.isRequesting = true;
        const phoneCodeData = await axios.post('/api/phoneCode', { phone: this.loginPhone, type: 'password' });
        const btnCodeEle = this.$refs.btnCode;
        if (!phoneCodeData.success) {
          let timeout = 60;
          btnCodeEle.disabled = true;
          const cc = setInterval(() => {
            btnCodeEle.innerHTML = `${timeout}s`;
            --timeout; // eslint-disable-line
            if (timeout <= 0) {
              btnCodeEle.innerHTML = '获取验证码';
              btnCodeEle.disabled = false;
              clearInterval(cc);
            }
          }, 1000);
        } else {
          alert('短信发送过于频繁，请稍后刷新页面重试');
        }
      } catch (err) {
        alert('获取验证码失败');
      }
      this.isRequesting = false;
    },
    async submitSetLogin() {
      if (this.isRequesting) {
        return;
      }
      if (!this.serPassword) {
        alert('密码不能为空～');
        return;
      }
      if (!this.phoneCode) {
        alert('验证码不能为空～');
        return;
      }
      if (this.serPassword && this.serPassword.length < 6) {
        alert('密码不能少于6位～');
        return;
      }
      const postData = {
        password: this.serPassword,
        phoneCode: this.phoneCode,
      };
      let bkData;
      try {
        bkData = await axios.post('/api/account/password', postData, { credentials: true });
        if (bkData.data.success) {
          this.errTips = '';
          localStorage.setItem('user', JSON.stringify(bkData.data.user));
          localStorage.setItem('token', JSON.stringify(bkData.data.token));
          if (this.isUserNew) {
            return this.$router.push({ path: '/login/editorInfo' });
          }
          this.$router.push({ path: '/user' });
        } else {
            alert(bkData.data.msg);
        }
        this.isRequesting = true;
      } catch (err) {
        alert('网络异常');
      }
      this.isRequesting = false;
    },
  },
};
</script>
<style lang="stylus">
.setPassword {
    width: 100%;
    z-index: 1111;
    height: 100%;
    background: #fff;
    max-width: 750px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 50%;

    .closeForm {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 12px;
        height: 20px;

        a {
            display: block;
            width: 12px;
            height: 20px;

            img {
                width: 12px;
                height: 20px;
            }
        }
    }

    .yuyueForm {
        padding: 30px 0;
        background: #fff;
        border-radius: 5px;
        width: 82%;
        margin: 10% auto 0;
    }

    .tit {
        color: #0D0D0D;
        font-size: 26px;
        width: 100%;
        text-align: center;
        line-height: 1;
    }

    .subtit {
        clear: both;
        margin-top: 20px;
        font-size: 12px;
        overflow: hidden;
        color: #939393;
        width: 100%;
        text-align: center;
        line-height: 1;

        b {
            color: #138ff2;
        }
    }

    form {
        clear: both;
        margin-top: 40px;
        overflow: hidden;

        .cont {
            clear: both;
            margin-bottom: 15px;
            width: 100%;
            position: relative;

            input {
                display: inline-block;
                padding: 12px 0 12px 12px;
                font-size: 12px;
                background: #fff;
                color: #0D0D0D;
                width: 100%;
                border: none;
                border-bottom: 1px solid #0D0D0D;

                &:focus {
                    outline: none;
                }
            }

            .btnCode {
                position: absolute;
                right: 10px;
                top: 0;
                font-size: 12px;
                height: 42px;
                line-height: 42px;
                color: #138ff2;
                display: inline-block;
                text-decoration: none;
                background: none;
                z-index: 2;
                border: none;

                &:focus {
                    outline none
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
            padding-top: 10px;
            font-size: 12px;
        }

        .submitBtn {
            clear: both;
            overflow: hidden;
            margin-top: 10px;
            text-align: center;
            width: 100%;

            button {
                background: #138ff2;
                background-size: contain;
                font-size: 17px;
                border-radius: 4px;
                width: 279px;
                height: 40px;
                line-height: 40px;
                border: none;
                color: #fff;
                padding: 0;
                display: inline-block;

                &:focus {
                    outline: none;
                }
            }
        }
    }

    .logoZhib {
        clear: both;
        padding-top: 70px;
        width: 100%;
        text-align: center;

        img {
            width: 86px;
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
        background: url('/public/img/range.png') no-repeat;
        transition: left 0.5s;
        background-size: contain;
        color: #939393;

        &.end {
            background: #fff;

            em {
                display: inline-block;
                background: url('/public/img/ok.png') no-repeat #fff right center;
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

@media screen and (max-width: 374px) {
    .accountCourse {
        .yuyueForm {
            margin-left: 10px;
            margin-right: 10px;
            width: auto;
        }
    }
}

@media screen and (min-width 768px) {
    .setPassword {
        margin-left -375px
    }
}

@media screen and (max-width 767px) {
    .setPassword {
        margin-left -50%
    }
}
</style>
