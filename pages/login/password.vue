<template>
    <div class="passwordFrom">
        <div class="closeForm"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
        <div class="yuyueForm">
            <div class="tit">输入密码</div>
            <form @submit.stop.prevent="submitLogin">
                <div class="cont phone">
                    <input type="password" placeholder="请输入密码" name="phone" v-model="password" />
                </div>
                <div class="about-danger" role="alert">{{errTips}}</div>
                <div class="submitBtn">
                    <button type="submit" class="btn btn-default about-btn" ref="btnCode">进入</button>
                </div>
                <div class="forgetPwd"><nuxt-link to="/login/forgetPassword" class="backtoPage">忘记密码</nuxt-link></div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from '~/plugins/axios'
import { toast } from '../../components/toast';
export default {
  name: 'accountCourse',
  middleware: 'anonymous',
  data() {
    return {
      password: '',
      errTips: '',
      isRequesting: false,
    };
  },
  head() {
    return {
      title: '输入密码',
      meta: [{ hid: 'description', name: 'description', content: '输入密码' }],
    };
  },
  computed: {
    ...mapState(['loginPhone']),
  },
  methods: {
    async submitLogin() {
      if (!this.password) {
        toast('密码不能为空');
        return;
      }
      if (this.isRequesting) {
        return;
      }
      const postData = {
        password: this.password,
        isValidateRegister: 1,
        phone: this.loginPhone,
      };
      this.isRequesting = true;
      const bkData = await axios.post('/api/login', postData, {
        credentials: true,
      });
      this.isRequesting = false;
      if (bkData.data.success) {
        this.errTips1 = '';
        localStorage.setItem('user', JSON.stringify(bkData.data.user));
        localStorage.setItem('token', JSON.stringify(bkData.data.token));
        this.$router.push({ path: '/user' });
      } else {
        //  TODO:友好提示信息
        toast(bkData.data.msg);
      }
    },
  },
};
</script>
<style lang="stylus">
.passwordFrom {
    width: 100%;
    z-index: 1111;
    height: 100%;
    background: #fff;
    max-width: 750px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 50%;

    .forgetPwd {
        clear: both;
        overflow: hidden;
        padding-top: 10px;
        font-size: 14px;
        text-align: right;
        padding-right: 12px;

        a {
            color: #939393;
        }
    }

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
                border-radius: 4px;
                margin: 0 auto;
                border: 1px solid #e6e6e6;
                box-sizing: border-box;

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
                width: 100%;
                height: 40px;
                line-height: 40px;
                border: none;
                color: #fff;
                padding: 0;
                display: inline-block;
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
    .passwordFrom {
        margin-left -375px
    }
}

@media screen and (max-width 767px) {
    .passwordFrom {
        margin-left -50%
    }
}
</style>
