<template>
  <div class="message">
    <div class="submitBox row">
      <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-11">消息</div>
    </div>
    <div class="privateMsg row">
      <div class="msg-l col-3">
        <div class="msg-l-profile"><img src="../../assets/img/profile-ho.png" alt="profile"/></div>
        <span><img src="../../assets/img/Info-white.png" alt="profile"/></span>
        <em>3</em>
      </div>
      <div class="msg-r col-9">
        <div class="msg-r-title">私信</div>
        <div class="msg-r-desc"><b>马云：</b>兄弟，我看好你的项目，有没有兴趣具体聊有没有兴趣具体聊</div>
      </div>
      <div class="links-privateLetter"><a href="/privateLetter" class="privateLetter">&nbsp;</a></div>
    </div>
    <div class="noticeList">
      <h1>通知列表</h1>
      <div class="notice">
        <!-- <div class="list">
          <div class="list-top row">
            <div class="list-top-l col-2"><img src="../../assets/img/profile-ho.png" alt="pravite-profile"/></div>
            <div class="list-top-mid col-8">
              <div class="list-top-mid-tit"><b>d牛哥</b>评论了你</div>
              <div class="list-top-mid-publishTime"><span>25</span>分钟前</div>
            </div>
            <div class="list-top-r col-2"><a href="javascript:void(0)" class="comments">回复</a></div>
          </div>
          <div class="list-msgCont row">
            <div class="col-2"></div>
            <div class="msgContDesc col-10">我每天都会更新一些行情研判我每天都会更新一些行情研判我每天都会更新一些行情研判我每天都会更新一些行情研判</div>
          </div>
          <div class="list-remark row">
            <div class="col-2"></div>
            <div class="remarkDesc col-10">我每天都会更新一些行情研判，大家快来关注我，跟着我，保证翻倍</div>
          </div>
        </div>
        <div class="list">
          <div class="list-top row">
            <div class="list-top-l col-2"><img src="../../assets/img/profile-ho.png" alt="pravite-profile"/></div>
            <div class="list-top-mid col-8">
              <div class="list-top-mid-tit"><b>阿拉丁</b>评论了你</div>
              <div class="list-top-mid-publishTime"><span>30</span>分钟前</div>
            </div>
            <div class="list-top-r col-2"><a href="javascript:void(0)" class="comments">回复</a></div>
          </div>
          <div class="list-msgCont row">
            <div class="col-2"></div>
            <div class="msgContDesc col-10">我每天都会更新一些行情研判我每天都会更新一些行情研判我每天都会更新一些行情研判我每天都会更新一些行情研判</div>
          </div>
          <div class="list-remark row">
            <div class="col-2"></div>
            <div class="remarkDesc col-10">我每天都会更新一些行情研判，大家快来关注我，跟着我，保证翻倍</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'message',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['noticeListData', 'userInfo']),
  },
  mounted() {
    this.GET_NOTICE_LIST_DATA();
  },
  methods: {
    ...mapActions(['GET_NOTICE_LIST_DATA']),
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/notice.styl';
</style>
