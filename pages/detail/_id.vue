<template>
  <div class="detail">
    <div class="detailTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.go(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-10">币文正文</div>
      <button @click="$store.commit('increment')">{{ counter }}</button>
      <div class="report">···</div>
    </div>
    <div class="dataListCont">
      <div class="list-top row">
        <div class="list-top-profile col-2"><img src="../../assets/img/profile.png" alt="profile"/></div>
        <div class="list-top-info col-8">
          <div class="list-top-info-title"><a href="/user/" class="backtoPage">{{ detailList.tweet ? detailList.tweet.tweetUser.nickName : ''}}</a></div>
          <div class="list-top-info-publishTime"><span>{{ (detailList.tweet ? detailList.tweet.createdAt : '') | dynamicFormatTime }}</span></div>
        </div>
      </div>
      <div class="list-mid">
        <div class="list-mid-publish-content">
          <div class="contDesc">{{ detailList.tweet ? detailList.tweet.content : '' }}</div>
        </div>
        <div class="list-mid-publish-img">
          <!-- <span v-for="(val, idx) in JSON.parse(detailList.tweet.images || '')" :key="idx"><img :src=val[idx] alt="profile-ho"/></span> -->
        </div>
      </div>
    </div>
    <div class="vueTab">
      <div class="tab">
        <span class="active">{{ detailList.tweet ? detailList.tweet.replyCount : '' }}评论</span>
      </div>
      <div class="tabCon">
        <replay-list :replayItems="detailList"></replay-list>
        <div class="moreReplay">
            <a :href="'/moreReplay/'" class="moreReplay">{{ detailList.tweet ? detailList.tweet.replyCount : '' }}条回复&gt;&gt;</a>
        </div>
      </div>
    </div>
    <div class="bottombar">
      <div class="bottombat-height"></div>
      <div class="comment">
        <form @submit.stop.prevent="commentCont">
           <input type="text" placeholder="发表评论…" class="commentText" v-model="comment" contenteditable="true" />
        </form>
      </div>
    </div>
    <share-pop ref="shareBox" v-show="flagShare"></share-pop>
  </div>
</template>
<script>
  import Vue from 'vue'
  // import Vuex from 'vuex'
  import { mapState } from 'vuex' // mapActions
  import axios from '~/plugins/axios'
  import SharePop from '../../components/SharePop.vue'
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
        flagShare: false,
        comment: '',
        userId: '',
        detailList: {}
        // uid: location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0]
      }
    },
    components: {
      SharePop,
      ReplayList,
      TipPop
    },
    head () {
      return {
        title: '币文正文'
      }
    },
    computed: {
      ...mapState(['counter'])
      // ...mapState(['repalyData', 'tweetList'])
    },
    mounted () {
      this.getTweetInfoDetail()
      // console.log(repalyData, '...rrerereeeee...')
    },
    methods: {
      // ...mapActions(['replyList', 'getTweetInfoDetail'])
      async getTweetInfoDetail () {
        const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0]
        const bkData = await axios.get(`/api/tweetInfo?tid=${uid}`, { credentials: true })
        console.log(bkData, '........')
        if (bkData.data.success) {
          console.log('111', bkData.data.data)
          this.detailList = bkData.data.data
        } else {
          alert(bkData.data.msg)
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../assets/styl/detail.styl";
</style>
