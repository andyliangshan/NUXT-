<template>
  <div class="index-datalist" id="wrapper" v-if="recommedList">
    <div class="datalist" id="myScrollbar">
      <div class="dataListCont" v-for="(item, index) in recommedList.essence" :key="index">
        <div class="list-top row">
          <div class="list-top-profile col-2"><img :src="item.essenceTweet.tweetUser.avatarImage" alt="profile"/></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><nuxt-link :to="'/masterState/' + item.essenceTweet.tweetUser.id" class="backtoPage">{{ item.essenceTweet.tweetUser.nickName }}</nuxt-link></div>
            <div class="list-top-info-publishTime"><span>{{ item.createdAt | dynamicFormatTime }}</span><em><i></i>精选</em></div>
          </div>
          <div class="list-top-attent col-2" v-if="item.essenceTweet.isfollow !== null"></div>
          <div class="list-top-attent col-2" v-else>
            <!--<a href="javascript:void(0)" class="delete" ref="deleteBtn">删除</a>-->
            <a href="javascript:void(0)" class="attention" ref="attentBtn" @click="changeStateAttent(item, $event)">关注</a>
            <!--<a href="javascript:void(0)" class="report">×</a>-->
          </div>
        </div>
        <div class="list-mid">
          <div class="list-mid-publish-content">
            <div class="contDesc" ref="contDesc">{{ item.essenceTweet.content }}</div>
            <div class="queryDetail"><nuxt-link :to="'/detail/' + item.TweetId" class="backtoPage"></nuxt-link></div>
            <p>查看详情</p>
          </div>
          <div class="list-mid-publish-img">
            <!--<span v-for="(val, idx) in item.essenceTweet.images"><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>-->
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span></span><em>{{ item.essenceTweet.currentCoinWorth }}</em></div>
          <div :class="[item.essenceTweet.iszan === null ? 'dianzan col-2' : 'dianzan col-2 active']" @click="userDianZanFlag(item, $event)"><span></span><em>{{ item.essenceTweet.zanCount }}</em></div>
          <div class="sendmsg col-2"><span></span>{{ item.essenceTweet.collectCount }}</div>
          <div class="share col-7"><span></span>{{ item.essenceTweet.shareCount }}</div>
        </div>
      </div>
      <div class="dataListCont" v-for="(items, ind) in recommedList.tweet" :key="ind">
        <div class="list-top row">
          <div class="list-top-profile col-2"><img :src="items.tweetUser.avatarImage" alt="profile"/></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><nuxt-link :to="'/masterState/' + items.tweetUser.id" class="backtoPage">{{ items.tweetUser.nickName }}</nuxt-link></div>
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
            <p>查看详情</p>
          </div>
          <div class="list-mid-publish-img">
            <span v-for="(val, idx) in JSON.parse(items.images)" :key="idx"><img :src=val[idx] alt="profile-ho"/></span>
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span></span><em>{{ items.collectCount }}</em></div>
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
        console.log(bkData, '-----')
        if (bkData.data.success) {
          alert(bkData.data.msg);
          selt.children[1].innerText = bkData.data.data;
        } else {
          alert(bkData.data.msg);
        }
      }
    },
  },
};
</script>
<style lang="stylus">
@import './list.styl';
</style>
