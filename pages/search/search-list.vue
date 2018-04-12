<template>
  <div class="InterestList" ref="listData">
    <div class="showlist row" v-for="(item, index) in resultList" :key="index">
      <div class="list-l col-3"><img :src=item.avatarImage alt="userProfile"/></div>
      <div class="list-r col-9">
        <div class="list-r-title">@<span>{{ item.nickName }}</span></div>
        <div class="list-r-etc">
          <span>粉丝<em>{{ item.fansCount }}</em></span><span>获赞<em>{{ item.zanCount }}</em></span>
        </div>
        <div class="list-r-desc">{{ item.introduce }}</div>
        <!--关注前-->
        <div class="list-r-attention" v-if="item.isfollow !== null">
          <a href="javascript:void(0);" class="attention active" @click="changeStateAttent(item, $event)" ref="attentBtn">已关注</a>
        </div>
        <div class="list-r-attention" v-else>
          <a href="javascript:void(0);" class="attention" @click="changeStateAttent(item, $event)" ref="attentBtn">关注Ta</a>
        </div>
        <!--关注后 给a标签添加 active的class-->
      </div>
      <div class="list-links"><a :href="'/user?targetUserId=' + item.id" class="links">&nbsp;</a></div>
    </div>
    <!--<div class="showlist row" v-show="resultFlag"><p class="reachDataFull">搜索数据为空</p></div>-->
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  export default{
    name: 'InterestList',
    data () {
      return {
        action: -1,
        userCookie: '',
        dataInfo: [],
        resultFlag: false
      }
    },
    props: {
      attentFlag: {
        type: Boolean,
        default: false
      },
      resultList: {
        type: Array,
        default: []
      },
      showstate: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      async changeStateAttent (item, evt) {
        const selt = evt.currentTarget
        if (item.isfollow === null) {
          this.action = 1
          selt.innerHTML = '已关注'
          selt.style.border = '1px solid #939393'
          selt.style.color = '#939393'
        } else {
          this.action = -1
          selt.innerHTML = '关注Ta'
          selt.style.border = '1px solid #138FF2'
          selt.style.color = '#138FF2'
        }
        const postdata = {
          toFollowUserId: item.id,
          action: this.action
        }
        const bkData = await axios.post('/api/user/action/follow', postdata, { credentials: true })
        if (!bkData.success) {
          alert(bkData.msg)
        } else {
          alert(bkData.msg)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .InterestList {
    background: #fff;
    max-height: 800px;
    overflow-y: auto;

  .reachDataFull {
    padding: 100px 0;
    text-align: center;
    width: 100%;
    font-size: 50px;
    color: #202020;
    font-weight: bolder;
  }

  .showlist {
    margin: 0;
    position: relative;
    display: flex;

  .list-l {
    width: 60px;
    padding-top: 20px;
    padding-bottom: 20px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }

  .list-r {
    padding: 0;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 10px;
    flex: 1:

  .list-r-title {
    color: #0d0d0d;
    font-size: 16px;
    font-weight: normal;
    line-height: 1;

    span {
      display: inline-block;
    }
  }

  .list-r-etc {
    margin-top: 10px;
    line-height: 1;

    span {
      display: inline-block;
      margin-right: 10px;
      font-size: 12px;
      color: #939393;

      em {
        display: inline-block;
        font-style: normal;
        margin-left: 5px;
      }
    }
  }

  .list-r-desc {
    margin-top: 10px;
    font-size: 12px;
    color: #939393;
    overflow: hidden;
    width: 70%;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1;
  }

    .list-r-attention {
      position: absolute;
      right: 16px;
      top: 36px;
      width: 70px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      text-align: center;
      z-index: 2;

      a {
        display: block;
        width: 100%;
        height: 100%;
        border: 1px solid #138FF2;
        border-radius: 4px;
        color: #138FF2;
      }

      a.active {
        border: 1px solid #939393;
        color: #939393;
      }
    }
  }

    .list-links {
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
  }
  }

</style>
