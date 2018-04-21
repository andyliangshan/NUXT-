<template>
<div class="commits">
  <div v-if="singleReplayListData" class="newlist">
    <div class="list" v-for="(item, index) in singleReplayListData" :key="index">
      <div class="list-top row">
        <div class="list-top-l col-2"><img :src="item.topReplyUser.avatarImage" alt="profile-ho"/></div>
        <div class="list-top-r col-10"><a :href="'/user/' + item.topReplyUser.id" class="publisher">{{ item.topReplyUser.nickName }}</a></div>
      </div>
      <div class="list-mid row">
        <div class="list-mid-l col-2">&nbsp;</div>
        <div class="list-mid-r col-10">{{ item.content }}</div>
      </div>
      <div class="list-bot row">
        <div class="list-bot-time col-8">{{ item.createdAt | dynamicFormatTime }}</div>
        <div class="list-bot-msg col-2" @click="replayComments(item, $event)"><a href="javascript:void(0);" class="msger"><span>&nbsp;</span>{{ item.replyCount }}</a></div>
        <div class="list-bot-zans col-2" @click="userDianZanFlag(item, $event)"><a href="javascript:void(0);" class="zanser"><span>&nbsp;</span><em>{{ item.zanCount }}</em></a></div>
        <div class="list-bot-coin"><a href="javascript:void(0);" class="coin"><span>&nbsp;</span>1.25</a></div>
      </div>
      <div id="subReplay" class="subReplay">
        <div class="subReplies" v-for="(val, ind) in item.subReplies.data" :key="ind">
          <div class="list-top row">
          <div class="list-top-l col-2"></div>
          <div class="list-top-r col-10">
              <a href="javascript:void(0);" class="publisher">{{ val.subReplyUser.nickName }}</a>
              <span v-show="val.subReplyUser.id !== item.topReplyUser.id">回复
              <a href="javascript:void(0);" class="publisher second">{{ item.topReplyUser.nickName }}</a></span>
          </div>
          </div>
          <div class="list-mid row">
            <div class="list-mid-l col-2">&nbsp;</div>
            <div class="list-mid-r col-10">{{ val.linkedContent }}</div>
          </div>
          <div class="list-bot row">
            <div class="list-bot-time col-8">{{ val.createdAt | dynamicFormatTime }}</div>
            <div class="list-bot-msg col-2" @click="replayComments(val, $event)"><a href="javascript:void(0);" class="msger"><span>&nbsp;</span>{{ item.subReplies.count }}</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottombar" v-show="showComment" ref="showComment">
    <div class="bottombat-height"></div>
    <div class="comment">
      <form @submit.stop.prevent="commentCont">
          <!-- <input type="text" placeholder="发表评论…" class="commentText" v-model="comment" contenteditable="true" > -->
          <textarea name="" placeholder="请填写评论内容" class="commentText" v-model="comment" contenteditable="true"></textarea>
          <input type="submit" class="submitBtn" value="提交" />
      </form>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import axios from '~/plugins/axios';
import * as filters from '../server/tools/filters';
import { toast } from './toast';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

export default {
  name: 'commits',
  data() {
    return {
      showComment: false,
      comment: '',
      commenter: '', // 评论人 从userInfo获取
      type: 0, // 0 为本人， 1为别人
      oldComment: '', // 当前评论者
      commentConts: [],
    };
  },
  mounted() {
    const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0];
    this.SINGLE_REPLAY_LIST(uid);
  },
  computed: {
    ...mapGetters(['singleReplayListData', 'userInfo']),
  },
  methods: {
    ...mapActions(['SINGLE_REPLAY_LIST']),
    async userDianZanFlag(item, evt) {
      if (this.userInfo) {
        const selt = evt.currentTarget;
        if (item.iszan !== null) {
          toast('你已经点过赞啦～');
        } else {
          const postdata = {
            targetUserId: item.UserId,
            tweetId: item.TweetId,
          };
          const bkData = await axios.post('/api/action/zan', postdata, { credentials: true });
          console.log(bkData, '-----');
          if (bkData.data.success) {
            toast(bkData.data.msg);
            selt.children[1].innerHTML = bkData.data.data.data;
            selt.className = 'list-bot-zans col-2 active';
          } else {
            toast(bkData.data.msg);
          }
        }
      } else {
        this.$router.push({ path: '/login' });
      }
    },
    replayComments(item, evt) {
      this.showComment = true;
      this.$refs.showComment.style.bottom = '0';
      //  const commentsInsertContHTML = '';
    },
  },
  async commentCont() {
    console.log('1');
  }
};
</script>

<style lang="stylus">
@import '../assets/styl/replayList.styl';

.bottombar {
  position: fixed;
  bottom: -100%;
  height: 54px;
  width: 100%;
  background: #fafafa;
  left 0
  padding 0 10px

  .bottombat-height {
    height: 35px;
  }

  .comment {
    width: 100%;
    height: 35px;
    display flex
    position absolute
    top 0

    form {
      overflow: hidden;
      width 95%

      .commentText {
        flex 1
        width 75%
        padding: 5px;
        color: #0d0d0d;
        font-size: 14px;
        background: #fff;
        border-radius: 3px;
        box-sizing: border-box;
        border: none;
        height: 35px;
        resize: none;

        &:focus {
          outline: none;
        }
      }

      .submitBtn {
        width 70px
        height 35px
        line-height 35px
        text-align center
        border-radius 4px
        background #e6e6ee
        font-size 14px
        color #202020
        float right
        border none

        &:focus {
          outline none   
        } 
      }
    }
  }

  .botlist {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    color: #FAFAFA;
    z-index: 999;
    margin: 0;
    background: #FAFAFA;
    box-shadow: 0 -1px 0 0 #f0f0f0;
    padding: 10px 0;

    .col-4 {
      display: inline-block;
      text-align: center;
      position: relative;
      border-right: 1px solid #e6e6e6;

      a {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #0d0d0d;
        font-size: 12px;

        em {
          display: inline-block;
          font-style: normal;
        }

        span {
          display: inline-block;
          margin-right: 5px;
        }

        span.zanB {
          background: url('./../assets/img/zan-black.png') no-repeat center;
          width: 15px;
          height: 15px;
          background-size: contain;
          vertical-align: middle;
        }

        span.msgB {
          background: url('./../assets/img/commitNumers-black.png') no-repeat center;
          width: 16px;
          height: 15px;
          background-size: contain;
          vertical-align: middle;
        }

        span.shareB {
          background: url('./../assets/img/shareIcon-black.png') no-repeat center;
          width: 16px;
          height: 16px;
          background-size: contain;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
