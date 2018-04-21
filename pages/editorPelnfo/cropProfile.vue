<template>
  <div class="teaseInfoup" v-show="showFlag">
    <div class="teaseForm">
      <div class="submitBox row">
        <div class="backtoPage col-1"><a href="javascript:void(0)" class="backtoPage" @click="hideCrop"><img src="../../assets/img/back.png" alt="back"/></a></div>
        <div class="title col-9">裁剪头像</div>
      </div>
      <div id="demo">
        <!-- 遮罩层 -->
        <div class="container" v-show="panel">
          <div>
            <img id="image" :src="url" alt="Picture">
          </div>
          <button type="button" id="button" @click="commit">确定</button>
          <button type="button" id="cancel" @click="cancel">取消</button>
        </div>
        <div class="showImg">
          <div class="show">
            <div class="picture" :style="'backgroundImage:url(' + headerImage + ')'" ref="cropImg"></div>
          </div>
          <div class="uploadPic">
            <input type="file" accept="image/gif,image/png,image/jpeg,image/jpg,image/bmp" id="change" @change="change">
            <label for="change">上传图片</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Cropper from 'cropperjs';
import { toast } from '../../components/toast';

export default {
  name: 'teaseInfo',
  data() {
    return {
      showFlag: false,
      picValue: '',
      cropper: '',
      croppable: false,
      panel: false,
      url: '',
      imgCropperData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      },
      storeImg: '',
      postHeaderImg: '',
    };
  },
  components: {},
  props: {
    showcrop: {
      type: Boolean,
      default: false,
    },
    setImg: {
      type: Function,
    },
    headerImage: {
      type: String,
      default: '',
    },
  },
  methods: {
    show() {
      this.showFlag = true;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      sessionStorage.setItem('posTop', scrollTop);
      document.getElementsByTagName('html')[0].style.height = '100%';
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    },
    hide() {
      this.showFlag = false;
      const posTop = sessionStorage.getItem('posTop');
      document.getElementsByTagName('html')[0].style.height = 'inherit';
      document.getElementsByTagName('html')[0].style.overflow = 'inherit';
      document.body.style.height = 'inherit';
      document.body.style.overflow = 'auto';
      window.scrollTo(0, posTop);
    },
    hideCrop() {
      this.showFlag = !this.showFlag;
    },
    // 取消上传
    cancel() {
      this.panel = false;
    },
    // 创建url路径
    getObjectURL(file) {
      this.panel = true;
      let url = null;
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    // input框change事件，获取到上传的文件
    change(e) {
      this.panel = true;
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const type = files[0].type; // 文件的类型，判断是否是图片
      const size = files[0].size; // 文件的大小，判断图片的大小
      if (this.imgCropperData.accept.indexOf(type) === -1) {
        toast('请选择我们支持的图片格式！');
        return;
      }
      if (size > 5242880) {
        toast('请选择5M以内的图片！');
        return;
      }
      this.picValue = files[0];
      this.url = this.getObjectURL(this.picValue);
      // 每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url);
      }
      this.panel = true;
    },
    // 确定提交
    commit() {
      this.panel = false;
      let croppedCanvas = null;
      let roundedCanvas = null;
      if (!this.croppable) {
        return;
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas();
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      this.postHeaderImg = roundedCanvas.toDataURL('image/png');
      // 上传图片
      this.postImg();
      this.showFlag = !this.showFlag;
    },
    // canvas画图
    getRoundedCanvas(sourceCanvas) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const width = sourceCanvas.width;
      const height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
      return canvas;
    },
    // 提交上传函数
    postImg() {
      // alert('上传成功');
      const _this = this;
      const formData = new FormData();
      formData.append('imgData', _this.postHeaderImg);
      const request = new XMLHttpRequest();
      request.addEventListener('load', evt => {
        const data = JSON.parse(evt.target.response);
        if (data.error) {
          toast(data.msg);
        } else {
          _this.$emit('getHeaderImage', data.url);
          console.log(data.url, '3333');
        }
      });
      request.open('POST', '/api/base642img');
      request.send(formData);
      console.log(_this.postHeaderImg, '222');
    },
  },
  mounted() {
    const self = this;
    const image = document.getElementById('image');
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: true,
      movable: true,
      zoomOnTouch: true,
      zoomOnWheel: true,
      wheelZoomRatio: 0.1,
      dragMode: 'move',
      toggleDragModeOnDblclick: false,
      ready: function() {
        self.croppable = true;
      },
    });
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/upload.styl';
</style>
