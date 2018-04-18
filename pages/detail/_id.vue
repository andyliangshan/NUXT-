<template>
  <div class="detail" v-if="tweetInfoData">
    <div class="detailTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.go(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-10">币文正文</div>
      <div class="report">···</div>
    </div>
    <div class="dataListCont">
      <div class="list-top row">
        <div class="list-top-profile col-2"><a :href="'/user/' + tweetInfoData.tweetUser.id" class="backtoPage"><img src="../../assets/img/profile.png" alt="profile"/></a></div>
        <div class="list-top-info col-8">
          <div class="list-top-info-title"><a :href="'/user/' + tweetInfoData.tweetUser.id" class="backtoPage">{{ tweetInfoData.tweetUser.nickName }}</a></div>
          <div class="list-top-info-publishTime"><span>{{ tweetInfoData.createdAt | dynamicFormatTime }}</span></div>
        </div>
      </div>
      <div class="list-mid">
        <div class="list-mid-publish-content">
          <div class="contDesc">{{ tweetInfoData.content }}</div>
        </div>
        <div class="list-mid-publish-img">
          <span v-for="(val, idx) in JSON.parse(tweetInfoData.images || [])" :key="idx"><img :src=val.url alt="profile-ho"/></span>
        </div>
      </div>
    </div>
    <div class="vueTab">
      <div class="tab">
        <span class="active">{{ tweetInfoData.replyCount }}评论</span>
      </div>
      <div class="tabCon">
        <replay-list :replayItems="tweetInfoData"></replay-list>
        <div class="moreReplay">
            <a :href="'/moreReplay/' + tweetInfoData.id" class="moreReplay">{{ tweetInfoData.replyCount }}条回复&gt;&gt;</a>
        </div>
      </div>
    </div>
    <div class="bottombar" v-show="showComment">
      <div class="bottombat-height"></div>
      <div class="comment">
        <form @submit.stop.prevent="commentCont">
           <input type="text" placeholder="发表评论…" class="commentText" v-model="comment" contenteditable="true" />
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import * as filters from '../../server/tools/filters'
  import ReplayList from '../../components/ReplayList.vue'
  import TipPop from '../../components/TipPop.vue'
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  export default {
    name: 'detail',
    data () {
      return {
        showAttent: false,
        showComment: false,
        comment: '',
      }
    },
    components: {
      ReplayList,
      TipPop
    },
    head () {
      return {
        title: '币文正文'
      }
    },
    computed: {
      ...mapGetters(['tweetInfoData'])
    },
    mounted () {
      const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0]
      this.GET_TWEET_DETAIL_DATA(uid);
    },
    methods: {
      ...mapActions(['GET_TWEET_DETAIL_DATA'])
    }
  }
</script>

<style lang="stylus">
  @import "../../assets/styl/detail.styl";
</style>
