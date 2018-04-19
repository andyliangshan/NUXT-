<template>
  <div class="teaseInfo" v-if="userInfo">
    <div class="editorbg"><img src="../../assets/img/loginbg.png" alt="editorbg"/></div>
    <div class="teaseForm">
      <form @submit.stop.prevent="submitSaveEditorInfo">
        <div class="submitBox row">
          <div class="backtoPage col-1"><nuxt-link to="/user" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></nuxt-link></div>
          <div class="title col-9">编辑社区名片</div>
          <div class="submitBtn col-2"><button type="submit" id="about-btn" class="btn btn-defaultabout-btn">保存</button></div>
        </div>
        <div class="editorProfile">
          <div class="editorPic" @click="editorPic" :style="avatarImage ? 'backgroundImage: url(' + avatarImage + ')' : 'backgroundImage: url(' + userInfo.avatarImage +')'" ref="avatarImg"></div>
          <div class="photo" @click="editorPic"><img src="../../assets/img/photo.png" alt="back"/></div>
        </div>
        <div class="cont-tit">昵称</div>
        <div class="phone">
          <input type="text" class="phoneInput" v-model="nickName" />
        </div>
        <div class="cont-tit cont-tit2">简介</div>
        <div class="suggestText">
          <p class="textareaText" contenteditable="true" ref="introduce">{{ userInfo.introduce }}</p>
        </div>
        <div class="about-danger" role="alert">{{ errTips }}</div>
      </form>
    </div>
    <crop-profile ref="cropfile" :showcrop="cropbox" :headerImage="headerImage" @getHeaderImage="newHeaderImage"></crop-profile>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import { mapGetters, mapActions } from 'vuex';
import cropProfile from './cropProfile.vue';

export default {
  name: 'teaseInfo',
  middleware: 'authenticated',
  computed: mapGetters(['userInfo']),
  data() {
    return {
      nickName: '',
      introduce: '',
      avatarImage: '',
      errTips: '',
      validate: {
        nickNamerror: '请输入新的昵称',
      },
      cropbox: false,
      cookie: '',
      headerImage: '',
    };
  },
  head() {
    return {
      title: '信息编辑',
    };
  },
  components: {
    cropProfile,
  },
  mounted() {
    this.GET_MASTER_INFO_DATA();
    this.nickName = this.$store.state.userInfo.nickName;
  },
  methods: {
    ...mapActions(['GET_MASTER_INFO_DATA']),
    editorPic() {
      this.$refs.cropfile.show();
    },
    newHeaderImage(newImg) {
      console.log(newImg, '.....55555...');
      this.headerImage = newImg;
      this.avatarImage = this.headerImage;
    },
    setErrTips(msg) {
      this.errTips = msg;
      setTimeout(() => {
        this.errTips = '';
      }, 2000);
    },
    async submitSaveEditorInfo() {
      if (!this.nickName) {
        this.setErrTips(this.validate.nickNamerror);
        return;
      }
      if (this.nickName.indexOf('官方') !== -1) {
        alert('带有官方二字的账号需审核后才可注册，请联系我们或更换呢称。');
        return;
      }
      if (this.nickName.length > 10) {
        alert('名字太长');
        return;
      }
      if (!this.$refs.introduce.innerHTML) {
        alert('个人信息介绍不能为空');
        return;
      }
      if (!this.avatarImage) {
        alert('请上传个人头像');
        return;
      }
      const postData = {
        nickName: this.nickName,
        introduce: this.$refs.introduce.innerHTML,
        avatarImage: this.avatarImage,
      };
      console.log(postData, '...')
      const bkData = await axios.post('/api/updateUserInfo', postData, {
        credentials: true,
      });
      if (bkData.data.success) {
        this.errTips = '';
        alert('信息修改成功');
        this.$router.push({ path: '/recommend' });
      } else {
        this.setErrTips(bkData.data.msg);
      }
    },
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/editorPeInfo.styl';

.teaseForm {
    .about-danger {
        font-size: 12px;
        text-align: center;
        clear: both;
        padding-top: 10px;
        overflow: hidden;
        color: #f00;
    }
}

.prev-login {
  display none
}
</style>
