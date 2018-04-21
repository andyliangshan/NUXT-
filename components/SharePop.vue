<template>
  <div class="shareicon" ref="shareState">
    <!-- <share :config="config"></share> -->
    <div class="shareType">
      <a href="javascript:void(0)" class="weibo" @click="shareToXl"><span></span><em>微博</em></a>
      <a href="javascript:void(0)" class="weichart"><span></span><em>微信</em></a>
      <a href="javascript:void(0)" class="friend"><span></span><em>朋友圈</em></a>
      <a href="javascript:void(0)" class="qq" @click="shareToQq"><span></span><em>QQ</em></a>
      <a href="javascript:void(0)" class="qqzone"><span></span><em>QQ空间</em></a>
    </div>
    <div class="cancelShare" @click="closeShare">取消</div>
  </div>
</template>
<script>
// import Vue from 'vue';
// import Share from 'vue-social-share';
// Vue.use(Share);

export default {
  name: 'attentPop',
  data() {
    return {};
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeShare() {
      this.$refs.shareState.style.display = 'none';
    },
    shareToXl(title, url, picurl) {
      // 分享到微博
      const sharesinastring =
        'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;
      window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
    },
    shareToQq(title, url, picurl) {
      const shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url + '&pics=' + picurl;
      window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
    },
    subinfo() {
      this.shareToQq('测试标题', 'www.baidu.com', 'http://aladdin-vray.oss-cn-beijing.aliyuncs.com/Other/80de988c-ad11-449b-af48-b5341c957668.jpg');
    },
  },
};
</script>
<style lang="stylus">
.shareicon {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .shareType {
    position: absolute;
    bottom: 44px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 10px 0;
    width: 100%;

    a {
      display: inline-block;

      span, em {
        width: 100%;
        display: inline-block;
        font-style: normal;
        font-size: 12px;
        color: #333;
      }

      span {
        width: 40px;
        height: 40px;
      }

      em {
        clear: both;
        padding-top: 10px;
      }
    }

    a.weibo span {
      background: url('./../assets/img/weibo@2x.png') no-repeat;
      background-size: cover;
    }

    a.weichart span {
      background: url('./../assets/img/wechat@2x.png') no-repeat;
      background-size: cover;
    }

    a.friend span {
      background: url('./../assets/img/friends@2x.png') no-repeat;
      background-size: cover;
    }

    a.qq span {
      background: url('./../assets/img/qqz@2x.png') no-repeat;
      background-size: cover;
    }

    a.qqzone span {
      background: url('./../assets/img/qq@2x.png') no-repeat;
      background-size: cover;
    }
  }

  .cancelShare {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #f7f7f7;
    color: #8590A6;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
