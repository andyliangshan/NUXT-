<template>
  <div class="index-datalist" id="wrapper">
    <div class="datalist" id="myScrollbar">
      <div class="tipsNews">5条新币文</div>
      <div class="dataListCont" v-if="recommedList.essence.length > 0" v-for="(item, index) in recommedList.essence">
        <div class="list-top row">
          <div class="list-top-profile col-2"><img :src="item.essenceTweet.tweetUser.avatarImage" alt="profile"/></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><nuxt-link :to="'/masterState/' + item.essenceTweet.tweetUser.id" class="backtoPage">{{ item.essenceTweet.tweetUser.nickName }}</nuxt-link></div>
            <div class="list-top-info-publishTime"><span>{{ item.createdAt | dynamicFormatTime }}</span><em><i></i>精选</em></div>
          </div>
          <div class="list-top-attent col-2" v-if="item.essenceTweet.isfollow !== null"></div>
          <div class="list-top-attent col-2" v-else>
            <!--<a href="javascript:void(0)" class="delete" ref="deleteBtn">删除</a>-->
            <a href="javascript:void(0)" class="attention" ref="attentBtn">关注</a>
            <!--<a href="javascript:void(0)" class="report">×</a>-->
          </div>
        </div>
        <div class="list-mid">
          <div class="list-mid-publish-content">
            <div class="contDesc" ref="contDesc">{{ item.essenceTweet.content }}</div>
            <div class="queryDetail"><nuxt-link :to="'/detail/' + item.TweetId" class="backtoPage">&nbsp;</nuxt-link></div>
            <p>查看详情</p>
          </div>
          <div class="list-mid-publish-img">
            <!--<span v-for="(val, idx) in item.essenceTweet.images"><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>-->
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span>&nbsp;</span><em>{{ item.essenceTweet.currentCoinWorth }}</em></div>
          <div class="dianzan col-2 active"><span>&nbsp;</span><em>{{ item.essenceTweet.zanCount }}</em></div>
          <div class="sendmsg col-2"><span>&nbsp;</span>{{ item.essenceTweet.collectCount }}</div>
          <div class="share col-7"><span>&nbsp;</span>{{ item.essenceTweet.shareCount }}</div>
        </div>
      </div>
      <div class="dataListCont" v-if="recommedList.tweet.length > 0" v-for="(items, ind) in recommedList.tweet">
        <div class="list-top row">
          <div class="list-top-profile col-2"><img :src="items.tweetUser.avatarImage" alt="profile"/></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><nuxt-link :to="'/masterState/' + items.tweetUser.id" class="backtoPage">{{ items.tweetUser.nickName }}</nuxt-link></div>
            <div class="list-top-info-publishTime"><span>{{ items.createdAt | dynamicFormatTime }}</span></div>
          </div>
          <div class="list-top-attent col-2" v-if="items.isfollow !== null">
            <a href="javascript:void(0)" class="attention" ref="attentBtn">已关注</a>
          </div>
          <div class="list-top-attent col-2" v-else>
            <!--<a href="javascript:void(0)" class="delete" ref="deleteBtn">删除</a>-->
            <a href="javascript:void(0)" class="attention" ref="attentBtn">关注</a>
            <!--<a href="javascript:void(0)" class="report">×</a>-->
          </div>
        </div>
        <div class="list-mid">
          <div class="list-mid-publish-content">
            <div class="contDesc" ref="contDesc">{{ items.content }}</div>
            <div class="queryDetail"><nuxt-link :to="'/detail/' + items.id" class="backtoPage">&nbsp;</nuxt-link></div>
            <p>查看详情</p>
          </div>
          <div class="list-mid-publish-img">
            <!--<span v-for="(val, idx) in items.images"><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>-->
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span>&nbsp;</span><em>{{ items.collectCount }}</em></div>
          <div class="dianzan col-2 active"><span>&nbsp;</span><em>{{ items.zanCount }}</em></div>
          <div class="sendmsg col-2"><span>&nbsp;</span>{{ items.viewCount }}</div>
          <div class="share col-7"><span>&nbsp;</span>{{ items.shareCount }}</div>
        </div>
      </div>
      <div class="pullUp"></div>
    </div>
    <report-list v-show="reportListPop"></report-list>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as filters from '../../server/tools/filters'
  import ReportList from '../../components/ReportList.vue'
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })

  export default {
    name: 'index-datalist',
    data () {
      return {
        reportListPop: false,
        maxLen: 60,
        instroduce: ''
      }
    },
    props: {
      recommedList: {
        type: Object,
        default: []
      }
    },
    components: {
      ReportList
    },
    mounted () {
      this.limitSize()
    },
    methods: {
      limitSize () {
        for (let i = 0, len = this.recommedList.essence.length; i < len; i++ ) { //  eslint-disable-line
          let instroduce = this.recommedList.essence[i].essenceTweet.content
          if (instroduce.length > this.maxLen) {
            instroduce = instroduce.slice(0, this.maxLen) + '...'; //  eslint-disable-line
          } else {
            instroduce = this.recommedList.essence[i].content
          }
        }
      }
    }
  }
</script>
<style lang="stylus">
@import "./datalist.styl";
</style>
