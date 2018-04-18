<template>
  <div class="attent" v-if="attentedData">
    <div class="fansTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-11">我关注的</div>
    </div>
    <div class="InterestList">
      <div class="showlist row" v-for="(item, index) in attentedData" :key="index">
        <div class="list-l col-3"><img :src="item.toFollowUser.avatarImage" alt="userProfile"/></div>
        <div class="list-r col-9">
          <div class="list-r-title">@<span>{{ item.toFollowUser.nickName }}</span></div>
          <div class="list-r-etc">
            <span>粉丝<em>{{ item.toFollowUser.fansCount }}</em></span><span>获赞<em>{{ item.toFollowUser.zanCount }}</em></span>
          </div>
          <div class="list-r-desc">{{ item.toFollowUser.introduce }}</div>
          <div class="list-r-attention" v-if="item.toFollowUser.isfollow !== null">
            <a href="javascript:void(0);" class="attention active" ref="attentBtn" @click="changeStateAttent(item, $event)">已关注</a>
          </div>
          <div class="list-r-attention" v-else>
            <a href="javascript:void(0);" class="attention" ref="attentBtn" @click="changeStateAttent(item, $event)">已关注</a>
          </div>
        </div>
        <div class="list-links"><a :href="'/user/' +  item.toFollowUser.id" class="links">&nbsp;</a></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import axios from '~/plugins/axios'
  export default {
    name: 'attent',
    data () {
      return {}
    },
    mounted () {
      this.MY_ATTENTED();
    },
    computed: {
      ...mapGetters(['attentedData'])
    },
    methods: {
      ...mapActions(['MY_ATTENTED']),
      async changeStateAttent(item, evt) {
        const selt = evt.currentTarget;
        if (item.toFollowUser.isfollow === null) {
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
          toFollowUserId: item.toFollowUser.id,
          action: this.action,
        };
        const bkData = await axios.post('/api/action/follow', postdata, { credentials: true });
        if (bkData.data.success) {
          alert(bkData.data.msg);
        } else {
          alert(bkData.data.msg);
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
@import "../../assets/styl/attent.styl";

</style>
