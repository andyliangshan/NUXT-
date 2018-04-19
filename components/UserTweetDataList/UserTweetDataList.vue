<template>
  <div class="index-datalist" id="wrapper" v-if="tweetListData">
    <div class="datalist" id="myScrollbar">
      <div class="dataListCont" v-for="(items, ind) in tweetListData.tweet" :key="ind">
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
import { mapGetters, mapActions } from 'vuex';
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
      page: 1,
      limit: 10,
    };
  },
  components: {
    ReportList,
  },
  computed: mapGetters(['userInfo', 'tweetListData']),
  mounted() {
    console.log(this.userInfo, '.......')
    const otherUserId = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    this.GET_MASTER_INFO_DATA();
    this.GET_TWEET_LIST_ALL_DATA({ page: 1, limit: 10, otherUserId: otherUserId });
  },
  methods: {
    ...mapActions(['GET_MASTER_INFO_DATA', 'GET_TWEET_LIST_ALL_DATA']),
    async changeStateAttent(item, evt) {
      if (!this.userInfo) {
        this.$router.push({ path: '/login' });
      } else {
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
      }
    },
    async userDianZanFlag(item, evt) {
      if (!this.userInfo) {
        this.$router.push({ path: '/login' });
      } else {
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
      }
    },
  },
};
</script>
<style lang="stylus">
@import './list.styl';
</style>
