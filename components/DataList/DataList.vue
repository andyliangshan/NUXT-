<template>
  <div class="index-datalist" id="wrapper" v-if="recommedList">
    <div class="datalist" id="myScrollbar">
      <!-- <div class="tipsNews">5条新币文</div> -->
      <div class="dataListCont" v-for="(items, ind) in recommedList.tweet" :key="ind">
        <div class="list-top row">
          <div class="list-top-profile col-2"><nuxt-link :to="'/user/' + items.tweetUser.id" class="backtoPage"><img :src="items.tweetUser.avatarImage" alt="profile"></nuxt-link></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><nuxt-link :to="'/user/' + items.tweetUser.id" class="backtoPage">{{ items.tweetUser.nickName }}</nuxt-link></div>
            <div class="list-top-info-publishTime"><span>{{ items.createdAt | dynamicFormatTime }}</span></div>
          </div>
          <div class="list-top-attent col-2" v-if="items.isfollow !== null" v-show="items.id !== items.tweetUser.id">
            <a href="javascript:void(0)" class="attention active" ref="attentBtn" @click="changeStateAttent(items, $event)">已关注</a>
          </div>
          <div class="list-top-attent col-2" v-else  v-show="items.id !== items.tweetUser.id">
            <!--<a href="javascript:void(0)" class="delete" ref="deleteBtn">删除</a>-->
            <a href="javascript:void(0)" class="attention" ref="attentBtn" @click="changeStateAttent(items, $event)">关注</a>
            <!--<a href="javascript:void(0)" class="report">×</a>-->
          </div>
        </div>
        <div class="list-mid">
          <div class="list-mid-publish-content">
            <div class="contDesc" ref="contDesc">{{ items.content }}</div>
            <div class="queryDetail"><nuxt-link :to="'/detail/' + items.id" class="backtoPage"></nuxt-link></div>
          </div>
          <div class="list-mid-publish-img">
            <span v-for="(img, idx) in getImages(items)" :key="idx"><img :src=img.url alt="profile-ho"></span>
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span></span><em>{{ items.collectCount }}</em></div>
          <div :class="[items.iszan === null ? 'dianzan col-2' : 'dianzan col-2 active']" @click="userDianZanFlag(items, $event)"><span></span><em>{{ items.zanCount }}</em></div>
          <div class="sendmsg col-2"><nuxt-link :to="'/detail/' + items.id"><span></span>{{ items.viewCount }}</nuxt-link></div>
          <div class="share col-7"><span></span>{{ items.shareCount }}</div>
        </div>
      </div>
      <div class="pullUp"></div>
    </div>
    <report-list v-show="reportListPop"></report-list>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from '~/plugins/axios';
import * as filters from '../../server/tools/filters';
import ReportList from '../../components/ReportList.vue';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

export default {
  name: 'index-datalist',
  data() {
    return {
      reportListPop: false,
      maxLen: 60,
      instroduce: '',
    };
  },
  props: {
    recommedList: {
      type: Object,
      default: {},
    },
  },
  components: {
    ReportList,
  },
  mounted() {
    // this.limitSize()
  },
  methods: {
    limitSize() {
      for (let i = 0, len = this.recommedList.essence.length; i < len; i++) {
        //  eslint-disable-line
        let instroduce = this.recommedList.essence[i].essenceTweet.content;
        if (instroduce.length > this.maxLen) {
          instroduce = instroduce.slice(0, this.maxLen) + '...'; //  eslint-disable-line
        } else {
          instroduce = this.recommedList.essence[i].content;
        }
      }
    },
    async changeStateAttent(item, evt) {
      const selt = evt.currentTarget;
      if (item.isfollow === null) {
        this.action = 1;
        selt.innerHTML = '已关注';
        selt.style.border = '1px solid #939393';
        selt.style.color = '#939393';
      } else {
        this.action = -1;
        selt.innerHTML = '关注Ta';
        selt.style.border = '1px solid #138FF2';
        selt.style.color = '#138FF2';
      }
      const postdata = {
        toFollowUserId: item.tweetUser.id,
        action: this.action,
      };
      const bkData = await axios.post('/api/action/follow', postdata, { credentials: true });
      if (bkData.data.success) {
        alert(bkData.data.msg);
      } else {
        alert(bkData.data.msg);
      }
    },
    async userDianZanFlag(item, evt) {
      const selt = evt.currentTarget;
      if (item.iszan !== null) {
        alert('你已经点过赞啦～');
      } else {
        const postdata = {
          targetUserId: item.tweetUser.id,
          tweetId: item.id,
        };
        const bkData = await axios.post('/api/action/zan', postdata, { credentials: true });
        console.log(bkData, '-----');
        if (bkData.data.success) {
          alert(bkData.data.msg);
          selt.children[1].innerText = bkData.data.data;
        } else {
          alert(bkData.data.msg);
        }
      }
    },
    // 解析博文图片
    getImages: function(tweet) {
      try {
        return JSON.parse(tweet.images);
      } catch (e) {
        return [];
      }
    },
  },
};
</script>
<style lang="stylus">
@import './Datalist.styl';
</style>
