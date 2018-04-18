<template>
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
        <div class="list-bot-zans col-2" @click="userDianZanFlag(item, $event)"><a href="javascript:void(0);" class="zanser"><span>&nbsp;</span>{{ item.zanCount }}</a></div>
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
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex';
import axios from '~/plugins/axios'
import * as filters from '../server/tools/filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

export default {
  name: 'newlist',
  data() {
    return {
    };
  },
  mounted() {
    const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0]
    this.SINGLE_REPLAY_LIST(uid)
  },
  computed: {
    ...mapGetters(['singleReplayListData'])
  },
  methods: {
    ...mapActions(['SINGLE_REPLAY_LIST']),
    async userDianZanFlag(item, evt) {
      const selt = evt.currentTarget;
      if (item.iszan !== null) {
        alert('你已经点过赞啦～');
      } else {
        const postdata = {
          targetUserId: item.UserId,
          tweetId: item.TweetId,
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
    async replayComments() {
    //  const commentsInsertContHTML = '';
    }
  }
}
</script>

<style lang="stylus">
@import "../assets/styl/replayList.styl";
</style>
