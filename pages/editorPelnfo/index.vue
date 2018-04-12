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
          <div class="editorPic" :style="'backgroundImage: url(' + avatarImage + ')'" ref="avatarImg">
          </div>
          <div class="photo" ><img src="../../assets/img/photo.png" alt="back"/></div>
        </div>
        <div class="cont-tit">昵称</div>
        <div class="phone">
          <input type="text" class="phoneInput" v-model="nickName"/>
        </div>
        <div class="cont-tit cont-tit2">简介</div>
        <div class="suggestText">
          <p class="textareaText" contenteditable="true">{{ introduce }}</p>
        </div>
        <div class="about-danger" role="alert">{{ errTips }}</div>
      </form>
    </div>
    <crop-profile ref="cropfile" :showcrop="cropbox"></crop-profile>
  </div>
</template>

<script>
import cropProfile from './cropProfile.vue'

export default {
  name: 'teaseInfo',
  data () {
    return {
      nickName: '',
      introduce: '',
      avatarImage: '',
      errTips: '',
      validate: {
        nickNamerror: '请输入新的昵称'
      },
      userInfo: {},
      cropbox: false,
      cookie: '',
      headerImage: ''
    }
  },
  components: {
    cropProfile
  },
  mounted () {
  },
  methods: {
  }
}
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
</style>
