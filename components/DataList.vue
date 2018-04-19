<template>
  <div class="datalist">
    <div class="tipsNews">5条新币文</div>
    <div class="dataListCont"  v-for="(item, index) in pushDataList" :key="index">
      <div class="list-top row">
        <div class="list-top-profile col-2"><img :src="item.tweetUser.avatarImage" alt="profile"/></div>
        <div class="list-top-info col-8">
          <div class="list-top-info-title"><a :href="'/user/' + item.tweetUser.id" class="backtoPage">{{ item.tweetUser.nickName }}</a></div>
          <div class="list-top-info-publishTime"><span>{{ item.createdAt | dynamicFormatTime }}</span></div>
        </div>
        <div class="list-top-attent col-2" v-if="item.isfollow !== null">
          <a href="javascript:void(0);" class="attention active" @click="changeStateAttent(item, $event)">已关注</a>
        </div>
        <div class="list-top-attent col-2" v-else>
          <a href="javascript:void(0);" class="attention" @click="changeStateAttent(item, $event)">关注</a>
        </div>
      </div>
      <div class="list-mid">
        <div class="list-mid-publish-content">
          <div class="contDesc" ref="contDesc">{{ item.content }}</div>
          <div class="queryDetail"><a :href="'/detail/' + item.id" class="backtoPage">&nbsp;</a></div>
          <p>查看详情</p>
        </div>
        <div class="list-mid-publish-img">
          <span v-for="(tem, ind) in (JSON.parse(item.images) || [])" :key="ind"><img :src=tem.url alt="profile-ho"/></span>
        </div>
      </div>
      <div class="list-bot row">
        <div class="coin"><span>&nbsp;</span><em>{{ item.currentScoreWorth }}</em></div>
        <div :class="[item.iszan === null ? 'dianzan col-2' : 'dianzan col-2 active']" @click="userDianZanFlag(item, $event)"><span>&nbsp;</span><em>{{ item.zanCount }}</em></div>
        <div class="sendmsg col-2"><nuxt-link :to="'/detail/' + item.id"><span>&nbsp;</span>{{ item.collectCount }}</nuxt-link></div>
        <div class="share col-6"><span>&nbsp;</span>{{ item.shareCount }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import axios from '~/plugins/axios'
import * as filters from '../server/tools/filters';
import ReportList from '../components/ReportList.vue';
import TipPop from './TipPop.vue';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

export default {
  data() {
    return {
      showTipPop: false,
      result: [],
      page: 1,
      limit: 10,
    };
  },
  props: {
    pushDataList: {
      type: Array,
      default: [],
    },
  },
  components: {
    TipPop,
    ReportList,
  },
  methods: {
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
  },
  mounted() {},
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.datalist {
  width: 100%;
  background: #fff;
  padding-bottom: 60px;

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
      display: flex;
      overflow visibility !important

      .list-top-profile {
        display: inline-block;
        width: 32px;
        height: 32px;
        max-width: 42px;
        border-radius: 50%;
        padding-left: 0;
        padding-right: 0;

        img {
          width: 32px;
          height: 32px;
          vertical-align: middle;
          border-radius 50%
          -webkit-border-radius 50%
          -moz-border-radius 50%
        }
      }

      .list-top-info {
        padding-left: 10px;
        line-height: 1;
        flex: 1;

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
        }
      }

      .list-top-attent {
        display: inline-block;
        padding: 0 5px 0 0;
        max-width: 70px;

        a {
          display: block;
          border: 1px solid #138FF2;
          border-radius: 4px;
          color: #138FF2;
          font-size: 12px;
          width: 70px;
          height: 28px;
          line-height: 28px;
          margin-top: 2px;
          text-align: center;
        }

        a.active {
          color: #939393;
          border: 1px solid #939393;
        }
      }
    }

    .list-mid {
      clear: both;
      margin-top: 20px;

      .list-mid-publish-content {
        position: relative;

        .contDesc {
          color: #0d0d0d;
          font-size: 16px;
          line-height: 28px;
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
            width: 100px;
            height: 100px;
            border-radius: 2px;
          }
        }
      }
    }

    .list-bot {
      clear: both;
      margin: 15px 0 0;
      position: relative;
      height: 24px;
      line-height: 24px;
      display: flex;
      justify-content: space-between;

      em {
        font-style: normal;
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
        margin-right: 10px;
        float: left;

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
        margin-right: 10px;
        float: left;

        span {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 5px;
          background: url('../assets/img/commitNumers.png') no-repeat left center;
          background-size: contain;
          vertical-align: text-top;
        }
      }

      .share {
        display: inline-block;
        color: #939393;
        font-size: 12px;
        padding: 0;
        margin-right: 10px;
        float: left;

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
        float: right;
        color: #939393;
        padding: 0;
        text-align: right;
        font-size: 20px;
        line-height: 17px;
        height: 24px;
        font-weight: bolder;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .datalist {
    padding-bottom: 30px;
  }
}
</style>
