<template>
  <div class="teaseInfo">
    <div class="editorbg"><img src="../../assets/img/loginbg.png" alt="editorbg"/></div>
    <div class="teaseForm">
      <form @submit.stop.prevent="submitSaveEditorInfo">
        <div class="submitBox row">
          <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
          <div class="title col-9">编辑个人资料</div>
          <div class="submitBtn col-2"><button type="submit" id="about-btn" class="btn btn-defaultabout-btn">保存</button></div>
        </div>
        <div class="editorProfile">
          <div class="editorPic" :style="'backgroundImage: url(' + avatarImage + ')'" ref="avatarImg" @click="editorPic">
            <!-- <img src="../../assets/img/person-pic.png" alt="pel" /> -->
          </div>
          <div class="photo" @click="editorPic"><img src="../../assets/img/photo.png" alt="back"/></div>
        </div>
        <div class="cont-tit">昵称</div>
        <div class="phone">
          <input type="text" class="phoneInput" v-model="nickName"/>
        </div>
        <div class="cont-tit cont-tit2">简介</div>
        <div class="suggestText">
          <!-- <p class="textareaText" contenteditable="true">{{ introduce }}</p> -->
          <input class="textareaText" contenteditable="true" v-model="introduce" />
        </div>
        <div class="about-danger" role="alert">{{ errTips }}</div>
      </form>
    </div>
    <crop-profile ref="cropfile" :showcrop="cropbox" :headerImage="headerImage" @getHeaderImage="newHeaderImage"></crop-profile>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex';
import axios from '~/plugins/axios';
import cropProfile from './cropProfile.vue';

export default {
  name: 'teaseInfo',
  data() {
    return {
      nickName: '',
      introduce: '',
      avatarImage: '',
      errTips: '',
      validate: {
        nickNamerror: '请输入新的昵称',
      },
      userInfo: {},
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
    this.getUserInfo();
    // this.GET_USER_INFO_DATA();
  },
  computed: {
    // ...mapGetters(['userAllInfoData']),
  },
  methods: {
    editorPic() {
      this.$refs.cropfile.show();
    },
    newHeaderImage(newImg) {
      this.headerImage = newImg;
      this.avatarImage = this.headerImage;
      console.log(newImg, 'aaaaaa');
    },
    // ...mapActions(['GET_USER_INFO_DATA']),
    async getUserInfo() {
      const bData = await axios.post('/api/userInfo', { credentials: true });
      if (!bData.data.success) {
        this.$router.push({ path: '/login' });
      }
      this.userInfo = bData.data.data;
      this.nickName = this.userInfo.nickName;
      this.introduce = this.userInfo.introduce;
      this.avatarImage = this.userInfo.avatarImage;
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
      if (!this.introduce) {
        alert('个人信息介绍不能为空');
        return;
      }
      if (!this.avatarImage) {
        alert('请上传个人头像');
        return;
      }
      const postData = {
        nickName: this.nickName,
        introduce: this.introduce,
        avatarImage: this.avatarImage,
      };
      const bkData = await axios.post('/api/updateUserInfo', postData, {
        credentials: true,
      });
      if (bkData.data.success) {
        this.errTips = '';
        alert('信息修改成功');
        this.$router.push({ path: `/user/${bkData.data.data.data.user.id}` });
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

.teaseInfo {
  margin-top 0  
}
</style>
