<template>
  <div class="teaseInfo">
    <div class="teaseForm">
      <form @submit.stop.prevent="submitTease">
        <div class="submitBox row">
          <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
          <div class="title col-9">吐槽一下</div>
          <div class="submitBtn col-2"><button type="submit" id="about-btn" class="btn btn-defaultabout-btn" ref="btnCode">提交</button></div>
        </div>
        <div class="suggestText">
          <textarea class="textareaText" rows="8" v-model="content" placeholder="请输入建议内容"></textarea>
        </div>
        <div class="phone">
          <input type="number" class="phoneInput" v-model="contact" placeholder="请输入联系方式" />
        </div>
        <div class="about-danger" role="alert">{{ errTips }}</div>
      </form>
    </div>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'
  import { toast } from '../../components/toast';

  export default {
    name: 'teaseInfo',
    head () {
      return {
        title: '吐槽',
        meta: [
          { hid: 'description', name: 'description', content: '吐槽一下' }
        ]
      }
    },
    data () {
      return {
        content: '',
        contact: '',
        errTips: '',
        validate: {
          contentError: '建议内容不能为空',
          contactError: '联系方式错误'
        },
        isDoubleClick: false
      }
    },
    methods: {
      setErrTips (msg) {
        this.errTips = msg
        setTimeout(() => {
          this.errTips = ''
        }, 2000)
      },
      async submitTease () {
        const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/
        if (!this.content) {
          this.setErrTips(this.validate.contentError)
          return
        }
        if (!this.contact) {
          this.setErrTips('联系方式不为空！')
          return
        }
        if (this.contact && !regPhone.test(this.contact)) {
          this.setErrTips(this.validate.contactError)
          return
        }
        // 防止重复点击
        this.isDoubleClick = true;
        const postData = {
          content: this.content,
          contact: this.contact
        }
        const bkData = await axios.post('/api/tease', postData, {
          credentials: true
        })
        this.isDoubleClick = false;
        console.log(bkData, '.....')
        if (bkData.data.success) {
          this.errTips = ''
          toast(bkData.data.msg)
          this.$router.push({ path: '/user' });
        } else {
          toast(bkData.data.msg)
        }
      }
    }
  }
</script>

<style lang="stylus">
@import "../../assets/styl/roast.styl";

</style>
