<template>
  <div class="index-datalist" id="wrapper" v-if="tweetListData" ref="wrapper">
    <div class="datalist" id="myScrollbar">
      <div class="dataListCont" v-for="(items, ind) in tweetListData" :key="ind" ref="parentRoot">
        <div class="list-top row">
          <div class="list-top-profile col-2"><nuxt-link :to="'/user/' + items.tweetUser.id"><img :src="items.tweetUser.avatarImage" alt="profile"/></nuxt-link></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><nuxt-link :to="'/user/' + items.tweetUser.id" class="backtoPage">{{ items.tweetUser.nickName }}</nuxt-link></div>
            <div class="list-top-info-publishTime"><span>{{ items.createdAt | dynamicFormatTime }}</span></div>
          </div>
          <div class="list-top-attent col-2" v-show="userInfo.id === items.tweetUser.id">
            <a href="javascript:void(0)" class="delete" ref="deleteBtn" @click="deleteTweet(items, ind, $event)">删除</a>
          </div>
          <div class="list-top-attent col-2" v-show="userInfo.id !== items.tweetUser.id" v-if="items.isfollow !== null">
            <a href="javascript:void(0)" class="attention active" ref="attentBtn" @click="changeStateAttent(items, $event)">已关注</a>
          </div>
          <div class="list-top-attent col-2" v-show="userInfo.id !== items.tweetUser.id" v-else>
            <a href="javascript:void(0)" class="attention" ref="attentBtn" @click="changeStateAttent(items, $event)">关注</a>
          </div>
        </div>
        <div class="list-mid">
          <div class="list-mid-publish-content">
            <div class="contDesc" ref="contDesc" v-html="format(items)"></div>
            <div class="queryDetail"><nuxt-link :to="'/detail/' + items.id" class="backtoPage"></nuxt-link></div>
            <p>查看详情</p>
          </div>
          <div class="list-mid-publish-img">
            <span v-for="(val, idx) in getImages(items)" :key="idx"><img :src=val.url alt="profile-ho"/></span>
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span></span><em>{{ items.currentCoinWorth }}</em></div>
          <div :class="[items.iszan === null ? 'dianzan col-2' : 'dianzan col-2 active']" @click="userDianZanFlag(items, $event)"><span></span><em>{{ items.zanCount }}</em></div>
          <div class="sendmsg col-2"><nuxt-link :to="'/detail/' + items.id"><span></span>{{ items.viewCount }}</nuxt-link></div>
          <div class="share col-7"><span></span>{{ items.shareCount }}</div>
        </div>
      </div>
    </div>
    <report-list v-show="reportListPop"></report-list>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from '~/plugins/axios';
import { mapGetters, mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import * as filters from '../../server/tools/filters';
import ReportList from '../../components/ReportList.vue';
import { toast } from '../../components/toast';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
export default {
  name: 'index-datalist',
  middleware: 'authenticated',
  data() {
    return {
      reportListPop: false,
      maxLen: 60,
      instroduce: '',
      page: 1,
      limit: 0,
      off_on: false,
      timers: null,
    };
  },
  components: {
    ReportList,
    InfiniteLoading,
  },
  computed: mapGetters(['userInfo', 'tweetListData']),
  mounted() {
    const otherUserId = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    this.GET_TWEET_LIST_ALL_DATA({ page: 1, limit: 10, otherUserId: otherUserId });
  },
  methods: {
    ...mapActions(['GET_TWEET_LIST_ALL_DATA']),
    async deleteTweet(item, index, event) {
      // const evt = event.currentTarget;
      const deleteBtn = await axios.post('/api/deltweet', { tweetId: item.id });
      if (deleteBtn.data.success) {
        toast('成功删除该条博文');
        // location.reload();
        const otherUserId = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
        this.GET_TWEET_LIST_ALL_DATA({ page: 1, limit: 10, otherUserId: otherUserId });
      } else {
        toast('删除失败');
      }
    },
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
        content = contents.join('');
      } catch (e) {
        // 如果出现错误，不再处理加粗内容
      }

      return content.replace(/\n/g, '<br>');
    },
    async changeStateAttent(item, evt) {
      if (!this.userInfo) {
        this.$router.push({ path: '/login' });
      } else {
        const selt = evt.currentTarget;
        if (item.isfollow === null) {
          this.action = 1;
          selt.innerHTML = '已关注';
          selt.className = 'attention active';
        } else {
          this.action = -1;
          selt.innerHTML = '关注';
          selt.className = 'attention';
        }
        const postdata = {
          toFollowUserId: item.tweetUser.id,
          action: this.action,
        };
        const bkData = await axios.post('/api/action/follow', postdata, { credentials: true });
        if (bkData.data.success) {
          toast(bkData.data.msg);
        } else {
          toast(bkData.data.msg);
        }
      }
    },
    async userDianZanFlag(item, evt) {
      if (!this.userInfo) {
        this.$router.push({ path: '/login' });
      } else {
        const selt = evt.currentTarget;
        if (item.iszan !== null) {
          toast('你已经点过赞啦～');
        } else {
          const postdata = {
            targetUserId: item.tweetUser.id,
            tweetId: item.id,
          };
          const bkData = await axios.post('/api/action/zan', postdata, { credentials: true });
          console.log(bkData, '-----');
          if (bkData.data.success) {
            toast(bkData.data.msg, '......');
            selt.children[1].innerText = bkData.data.data.data;
            selt.className = 'dianzan col-2 active';
          } else {
            toast(bkData.data.msg);
          }
        }
      }
    },
  },
};
</script>
<style lang="stylus">
@import './list.styl';
</style>
