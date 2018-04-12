<template>
  <div class="publish">
    <div class="teaseForm">
      <form @submit.stop.prevent="sendTweet">
        <div class="submitBox row">
          <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
          <div class="title col-9">发布币文</div>
          <div class="submitBtn col-2"><button type="submit" id="about-btn" class="btn btn-default about-btn">发布</button></div>
        </div>
        <!-- <div class="suggestText">
          <textarea class="textareaText" rows="10" v-model="content" ref="cont"></textarea>
        </div> -->
        <div id="editor" class="toolbar" ref="toolbar"></div>
        <div id="editor1" class="text" ref="editor"></div>
        <!-- <div class="sendContBtn">
          <div class="sendBtn row">
            <div class="sendPic col-2"><a href="javascript:void(0)"><img src="../../assets/img/upload-icon.png" alt="back"/></a></div>
            <div class="modfiedText col-2"><a href="javascript:void(0)"><img src="../../assets/img/fontsize-bold.png" alt="back"/></a></div>
          </div>
          <div class="defaultBtnHeight"></div>
        </div> -->
        <div class="about-danger" role="alert"></div>
      </form>
    </div>
  </div>
</template>
<script>
  // let E
  // if (typeof navigator === 'object') {
  //   E = require('wangeditor')
  // }

  export default {
    name: 'publish',
    data () {
      return {
        content: '',
        dialogImageUrl: '',
        dialogVisible: false,
        contentBold: [],
        imgList: [],
        size: 0,
        images: []
      }
    },
    mounted () {
      // const editor = new E(this.$refs.toolbar, this.$refs.editor)
      // const that = this
      // editor.customConfig.menus = [
      //   'bold'
      // ]
      // that.$refs.editor.innerHTML = '<p>在此输入你的建议和反馈</p>'
      // editor.create()
    },
    components: {},
    methods: { }
  }
</script>

<style lang="stylus">
  @import "../../assets/styl/publish.styl";

  .teaseForm {
    .el-upload {
      display: none;
    }
  }

  .teaseForm {
    .about-danger {
      clear: both;
      overflow: hidden;
      padding-top: 10px;
      width: 100%;
      color: #f00;
      font-size: 12px;
      text-align: center;
    }
  }
</style>
