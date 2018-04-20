<template>
  <div class="index-datalist" id="wrapper" v-if="userFollowListData" ref="wrapper">
    <div class="datalist" id="myScrollbar">
      <div class="dataListCont" v-for="(items, ind) in userFollowListData" :key="ind" ref="parentRoot">
        <div class="list-top row">
          <div class="list-top-profile col-2"><nuxt-link :to="'/user/' + items.tweetUser.id"><img :src="items.tweetUser.avatarImage" alt="profile"/></nuxt-link></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><nuxt-link :to="'/user/' + items.tweetUser.id" class="backtoPage">{{ items.tweetUser.nickName }}</nuxt-link></div>
            <div class="list-top-info-publishTime"><span>{{ items.createdAt | dynamicFormatTime }}</span></div>
          </div>
          <div class="list-top-attent col-2" v-if="items.isfollow === null">
             <a href="javascript:void(0)" class="attention active" ref="attentBtn" @click="changeStateAttent(items, $event)">已关注</a>
          </div>
          <div class="list-top-attent col-2" v-else>
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

      <!-- <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
          数据已经加载完～😊
        </span>
      </infinite-loading> -->
    </div>
    <report-list v-show="reportListPop"></report-list>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from '~/plugins/axios';
import { mapGetters, mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import * as filters from '../server/tools/filters';
import ReportList from './ReportList.vue';
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
  computed: mapGetters(['userInfo', 'userFollowListData']),
  mounted() {
    const rtime = new Date().getTime();
    this.USER_FOLLOW_TWEET_LIST_ALL_DATA({ page: 1, limit: 10, rtime: rtime });
    // window.addEventListener('scroll', this.handLoadingDataScrollTop);
  },
  methods: {
    ...mapActions(['USER_FOLLOW_TWEET_LIST_ALL_DATA']),
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
          selt.style.border = '1px solid #939393';
          selt.style.color = '#939393';
        } else {
          this.action = -1;
          selt.innerHTML = '关注';
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
            alert(bkData.data.msg, '......');
            selt.children[1].innerText = bkData.data.data.data;
            selt.className = 'dianzan col-2 active';
          } else {
            alert(bkData.data.msg);
          }
        }
      }
    },
    // 分页加载 page++ limit + 10
    // infiniteHandler($state) {
    //   const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    //   if (this.tweetListData.length) {
    //     // this.tweetListData = this.tweetListData.concat(newData);
    //     this.$store.dispatch('GET_TWEET_LIST_ALL_DATA', { page: ++this.page, limit: 10, otherUserId: uid });
    //     $state.loaded();
    //     if (parseInt(this.tweetListData.length / 10) === 3) {
    //       $state.complete();
    //     }
    //   } else {
    //     $state.complete();
    //   }
    //   document.querySelector('.infinite-status-prompt').innerHTML = '数据加载完～';
    // },
    // handLoadingDataScrollTop() {
    //   const _this = this;
    //   _this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //   const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    //   if (_this.scrollTop + document.body.clientHeight > document.body.scrollHeight - 10) {
    //     console.log('aaaaa');
    //     clearTimeout(this.timers);
    //     this.timers = setTimeout(function() {
    //       const page = _this.page++;
    //       const len = Math.ceil(this.tweetListData / 10);
    //       for (let i = 0; i < len; i++) {
    //         this.off_on = true;
    //         _this.limit += 10;
    //         _this.$store.dispatch('GET_TWEET_LIST_ALL_DATA', { page: page, limit: _this.limit, otherUserId: uid });
    //         i++;
    //       }
    //       console.log('第' + page + '页', _this.limit + '条数据');
    //     }, 300);
    //   }
    // },
  },
};
</script>
<style lang="stylus">
.datalist {
  width: 100%;
  background: #fff;

  .tipsNews {
    clear: both;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    background: #138FF2;
  }

  .dataListCont {
    padding: 15px;
    border-bottom: 1px solid #e6e6e6;
    clear: both;

    .list-top {
      margin: 0;
      width: 100%;
      overflow: hidden;
      display: flex;

      .list-top-profile {
        display: inline-block;
        width: 32px;
        height: 32px;
        max-width: 32px;
        border-radius: 50%;
        padding-left: 0;
        padding-right: 0;

        img {
          width: 32px;
          height: 32px;
          vertical-align: middle;
        }
      }

      .list-top-info {
        padding-left: 0;
        line-height: 1;
        flex: 1;
        margin-left: 10px;

        .list-top-info-title {
          font-size: 14px;
          padding-top: 2px;

          a {
            display: block;
            width: 100%;
            font-weight: bold;
            color: #0d0d0d;
          }
        }

        .list-top-info-publishTime {
          clear: both;
          margin-top: 5px;
          font-size: 12px;
          color: #939393;
          display: flex;
          justify-content: flex-start;

          span {
            display: inline-block;
            margin-right: 5px;
          }

          em {
            display: inline-block;
            font-style: normal;
            font-size: 12px;
            color: #E14123;

            i {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: url('../assets/img/choice.png') no-repeat;
              background-size: contain;
              vertical-align: -1px;
            }
          }
        }
      }

      .list-top-attent {
        padding: 0;
        display: flex;
        justify-content: flex-start;

        a {
          display: block;
          color: #138FF2;
          font-size: 12px;
          margin-top: 2px;
          text-align: center;

          em {
            display: none;
          }
        }

        a.attention, a.delete {
          width: 60px;
          height: 22px;
          line-height: 22px;
          border: 1px solid #138FF2;
          border-radius: 4px;
          margin-right: 10px;
        }

        a.active {
          color: #939393;
          border: 1px solid #939393;
        }

        a.report {
          color: #1D2043;
          opacity: 0.2;
          width: 20px;
          height: 20px;
          font-size: 20px;
          line-height: 20px;
        }

        a.gray {
          color: #939393;
          border: 1px solid #939393;
        }
      }
    }

    .list-mid {
      clear: both;
      margin-top: 10px;

      .list-mid-publish-content {
        position: relative;

        .contDesc {
          color: #0d0d0d;
          font-size: 16px;
          line-height: 28px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }

        .queryDetail {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;

          a {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        p {
          clear: both;
          padding-top: 5px;
          font-size: 12px;
          margin: 0;
          color: #507DAF;
        }
      }

      .list-mid-publish-img {
        clear: both;
        overflow: hidden;
        width: 100%;

        span {
          display: inline-block;
          margin-right: 5px;
          margin-top: 10px;
          float: left;

          img {
            width: 80px;
            height: 80px;
            border-radius: 2px;
          }
        }
      }
    }

    .list-bot {
      clear: both;
      margin-top: 15px;
      height: 24px;
      line-height: 24px;
      position: relative;
      display: flex;
      justify-content: space-between;

      em {
        font-style: normal;
        display: inline-block;
      }

      .coin {
        display: inline-block;
        color: #939393;
        font-size: 12px;
        padding: 0;

        span {
          display: inline-block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
          background: url('../assets/img/coin.png') no-repeat left center;
          background-size: contain;
          vertical-align: text-top;
        }
      }

      .dianzan {
        display: inline-block;
        color: #939393;
        font-size: 12px;
        padding: 0;

        span {
          display: inline-block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
          background: url('../assets/img/zan.png') no-repeat left center;
          background-size: contain;
          vertical-align: text-top;
        }
      }

      .dianzan.active {
        color: #138FF2;

        span {
          background: url('../assets/img/zan-Hover.png') no-repeat left center;
          background-size: contain;
        }
      }

      .sendmsg {
        display: inline-block;
        color: #939393;
        font-size: 12px;
        padding: 0;

        span {
          display: inline-block;
          width: 16px;
          height: 15px;
          margin-right: 5px;
          background: url('../assets/img/commitNumers.png') no-repeat left center;
          background-size: contain;
          vertical-align: text-top;
        }
      }

      .attentP {
        float: right;
        width: 30px;
      }

      .share {
        display: inline-block;
        color: #939393;
        font-size: 12px;
        padding: 0;

        span {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 5px;
          background: url('../assets/img/shareIcon.png') no-repeat left center;
          background-size: contain;
          vertical-align: text-top;
        }
      }

      .attenPop {
        color: #939393;
        padding: 0;
        text-align: right;
        font-size: 20px;
        font-weight: bolder;
        line-height: 28px;
      }
    }
  }
}
</style>
