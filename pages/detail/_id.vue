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
          <article class="contDesc" v-html="format(tweetInfoData)"></article>
        </div>
        <div class="list-mid-publish-img">
          <span v-for="(img, idx) in getImages(tweetInfoData)" :key="idx"><img :src=img.url alt="profile-ho"/></span>
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
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import axios from '~/plugins/axios';
import * as filters from '../../server/tools/filters';
import ReplayList from '../../components/ReplayList.vue';
import TipPop from '../../components/TipPop.vue';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
export default {
  name: 'detail',
  data() {
    return {
      showAttent: false,
      showComment: false,
      comment: '',
    };
  },
  components: {
    ReplayList,
    TipPop,
  },
  head() {
    return {
      title: '币文正文',
    };
  },
  computed: {
    ...mapGetters(['tweetInfoData']),
  },
  mounted() {
    const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    this.GET_TWEET_DETAIL_DATA(uid);
  },
  actions: {
    getImages(tweet) {
      try {
        return JSON.parse(tweet.images);
      } catch (e) {
        return [];
      }
    },
  },
  methods: {
    ...mapActions(['GET_TWEET_DETAIL_DATA']),
    // 解析博文图片
    getImages(tweet) {
      try {
        return JSON.parse(tweet.images);
      } catch (e) {
        return [];
      }
    },
    // 格式化博文内容（加粗显示）
    format(tweet) {
      let content = tweet.content;
      try {
        // 解析 ['10:5','21:2'] 格式的加粗标记，并替换博文内容
        const contentBold = Array.isArray(tweet.contentBold) ? tweet.contentBold : JSON.parse(tweet.contentBold);
        const contents = []; // 内容数据，将纯文本的content按 contentBold 记录的数据切分成片段，并在相关片段增加 <strong></strong>
        let substrStart = 0;
        if (Array.isArray(contentBold)) {
          for (let i = 0; i < contentBold.length; i++) {
            let [start, len] = contentBold[i].split(':').map(val => Number(val));
            contents.push(content.substring(substrStart, start));
            contents.push('<strong>' + content.substr(start, len) + '</strong>');
            substrStart = start + len;
          }
        }
        // 内容剩余部分
        if (substrStart !== content.length) {
          contents.push(content.substring(substrStart));
        }
        console.log(contents);
        content = contents.join('');
      } catch (e) {
        // 如果出现错误，不再处理加粗内容
        console.log(e);
      }

      return content.replace(/\n/g, '<br>');
    },
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/detail.styl';
</style>
