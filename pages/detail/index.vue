<template>
  <div class="detail">
    <div class="detailTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.go(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-10">环球市场播报的币文</div>
      <div class="report">···</div>
    </div>
    <div class="dataListCont">
      <div class="list-top row">
        <div class="list-top-profile col-2"><img src="../../assets/img/profile.png" alt="profile"/></div>
        <div class="list-top-info col-8">
          <div class="list-top-info-title"><a href="/user/" class="backtoPage">环球市场播报</a></div>
          <div class="list-top-info-publishTime"><span>23</span>分钟前</div>
        </div>
        <div class="list-top-attent col-2">
          <a href="javascript:void(0);" class="attention">关注</a>
        </div>
      </div>
      <div class="list-mid">
        <div class="list-mid-publish-content">
          <div class="contDesc">主要加密数字货币上周纷纷出现了不同程度的回落，伴随着交易量的大幅下降，市场上并未传出明显的利空，获利回吐似乎是主要的因素。</div>
        </div>
        <div class="list-mid-publish-img">
          <span><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>
          <span><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>
          <span><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>
        </div>
      </div>
    </div>
    <div class="vueTab">
      <div class="tab">
        <span class="active">836评论</span>
        <!--<span>9638赞同</span>-->
      </div>
      <div class="tabCon">
        <replay-list></replay-list>
        <div class="moreReplay"><a href="/moreReplay" class="moreReplay">123条回复&gt;&gt;</a></div>
      </div>
    </div>
    <div class="bottombar">
      <div class="bottombat-height"></div>
      <div class="comment">
        <form @submit.stop.prevent="commentCont">
          <!-- <textarea placeholder="发表评论…" v-model="comment" class="commentText"></textarea> -->
           <input type="text" placeholder="发表评论…" class="commentText" v-model="comment" contenteditable="true" />
        </form>
      </div>
    </div>
    <share-pop ref="shareBox" v-show="flagShare"></share-pop>
  </div>
</template>
<script>
  import SharePop from '../../components/SharePop.vue'
  import ReplayList from '../../components/ReplayList.vue'

  export default {
    name: 'detail',
    data () {
      return {
        showAttent: false,
        flagShare: false,
        comment: ''
      }
    },
    components: {
      SharePop,
      ReplayList
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style lang="stylus">
  @import "../../assets/styl/detail.styl";
</style>
