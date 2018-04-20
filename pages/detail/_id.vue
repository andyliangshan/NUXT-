<template>
<div class="wrapperAll">
  <div class="tweet-detail" v-if="tweetInfoData && userInfo">
    <common-header :title="tweetInfoData.tweetUser.nickName + '的币文'"></common-header>
    <div class="tweet-content">
      <div class="tweet-info">
        <div class="author-avatar"><nuxt-link :to="'/user/' + tweetInfoData.tweetUser.id" class="backtoPage"><img :src="tweetInfoData.tweetUser.avatarImage" alt="profile"></nuxt-link></div>
        <div class="info">
          <div class="author-name"><nuxt-link :to="'/user/' + tweetInfoData.tweetUser.id" class="backtoPage">{{ tweetInfoData.tweetUser.nickName }}</nuxt-link></div>
          <div class="publish-time">{{ tweetInfoData.createdAt | dynamicFormatTime }}</div>
        </div>
        <div class="follow-button" v-if="showFollow()">
          <button @click="follow">关注</button>
        </div>
      </div>
      <article class="contDesc" v-html="format(tweetInfoData)"></article>
      <div class="tweet-images">
        <div class="image-container" v-for="(img, idx) in getImages(tweetInfoData)" :key="idx" :style="{backgroundImage: 'url(' + img.url + ')'}"></div>
      </div>
      <div class="category" v-if="tweetInfoData.tweetCategory">
        <span>{{tweetInfoData.tweetCategory.name}}</span>
      </div>
      <tweet-stats :tweet="tweetInfoData" hideReplyCount="true" v-on:zan="updateZan"></tweet-stats>
    </div>
    <div class="comments">
      <div class="comments-header">{{ tweetInfoData.replyCount }}评论</div>
      <replay-list :replayItems="tweetInfoData"></replay-list>      
    </div>
    <div class="bottombar" v-show="showComment">
      <div class="bottombat-height"></div>
      <div class="comment">
        <form @submit.stop.prevent="commentCont">
           <input type="text" placeholder="发表评论…" class="commentText" v-model="comment" contenteditable="true" >
        </form>
      </div>
    </div>
    <complaint :show="showComplain"></complaint>
  </div>
</div>  
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import * as filters from '../../server/tools/filters';
import ReplayList from '../../components/ReplayList.vue';
import TipPop from '../../components/TipPop.vue';
import CommonHeader from '../../components/CommonHeader';
import TweetStats from '../../components/TweetStats';
import axios from '~/plugins/axios';
import { toast } from '../../components/toast';
import Complaint from '../../components/complaint';

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
      title: '币文正文',
      canFollow: true,
      showComplain: false
    };
  },
  components: {
    ReplayList,
    TipPop,
    CommonHeader,
    TweetStats,
    Complaint,
  },
  head() {
    return {
      title: '币文正文',
    };
  },
  computed: {
    ...mapGetters(['tweetInfoData']),
    ...mapGetters(['userInfo']),
  },
  mounted() {
    const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    this.GET_TWEET_DETAIL_DATA(uid);
  },
  actions: {},
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
      document.title = this.userInfo.nickName + '的币文';
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
        content = contents.join('');
      } catch (e) {
        // 如果出现错误，不再处理加粗内容
      }

      return content.replace(/\n/g, '<br>');
    },
    showFollow() {
      // 如果当前用户没有 follow 作者，并且不是作者本人，显示“关注”
      return this.tweetInfoData.isfollow === null && this.userInfo && this.userInfo.id !== this.tweetInfoData.tweetUser.id;
    },
    ...mapMutations(['SET_ZAN', 'SET_FOLLOWED']),
    // 关注用户
    async follow() {
      const postdata = {
        toFollowUserId: this.tweetInfoData.tweetUser.id,
        action: 1,
      };
      const resp = await axios.post('/api/action/follow', postdata, { credentials: true });
      if (resp.data.success) {
        this.SET_FOLLOWED(this.userInfo.id);
        toast('关注成功');
      } else {
        toast(resp.data.msg);
      }
    },
    updateZan(cnt) {
      this.SET_ZAN(cnt, this.userInfo.id);
    },
  },
};
</script>

<style lang="stylus">
// @import '../../assets/styl/detail.styl';
.tweet-detail {
  .tweet-content {
    padding: 15px;
    padding-bottom: 6px;
    margin-bottom: 15px;
    background-color: #fff;

    .tweet-info {
      display: flex;
      margin-bottom: 30px;

      // 作者头像
      .author-avatar {
        margin-right: 15px;

        a {
          display: block;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
          }
        }
      }

      // 信息块，作者、发布时间等
      .info {
        flex: auto;

        .author-name {
          line-height: 36px;
          font-weight: bold;
        }

        .publish-time {
          color: #999;
          font-size: 0.8rem;
        }
      }

      // 关注按钮
      .follow-button {
        button {
          border: 1px solid #138FF2;
          padding: 0.5em 2em;
          color: #138FF2;
          background-color: transparent;
          border-radius: 8px;
          margin-top: 15px;
        }
      }
    }

    .tweet-images {
      margin: 15px 0;

      .image-container {
        float: left;
        width: calc(33% - 8px);
        padding-top: calc(33% - 8px);
        max-width: 150px;
        margin: 4px;
        background-color: #eee;
        border-radius: 4px;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        position: relative;
      }
    }

    .tweet-images::after {
      content: '';
      display: block;
      clear: both;
    }
  }

  // 分类名称
  .category {
    margin-bottom: 15px;

    span {
      background-color: #F7F7F7;
      color: #7D7D7D;
      font-size: 0.9rem;
      padding: 8px 12px;
      border-radius: 10px;
      display: inline-block;
    }
  }

  .comments {
    background-color: #fff;
    padding: 15px;

    .comments-header {
      border-bottom: 1px solid #e5e5e5;
      line-height: 35px;
      font-weight: bold;
    }

    .newlist .list {
      padding: 15px 0 0 0;
    }
  }

  .tweet-stats {
    border-top: 1px solid #e5e5e5;
    font-size: 0.8rem;
  }
}
</style>
