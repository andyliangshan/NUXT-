<template>
  <div class="fans">
    <div class="fansTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-11">我的粉丝</div>
    </div>
    <div class="InterestList" ref="listData">
      <div class="showlist row" v-for="(item, index) in result" :key="index">
        <div class="list-l col-3"><img :src="item.followUser.avatarImage" alt="userProfile"/></div>
        <div class="list-r col-9">
          <div class="list-r-title">@<span>{{ item.followUser.nickName }}</span></div>
          <div class="list-r-etc">
            <span>粉丝<em>{{ item.followUser.fansCount }}</em></span><span>获赞<em>{{ item.followUser.zanCount }}</em></span>
          </div>
          <div class="list-r-desc">{{ item.followUser.introduce }}</div>
          <!--关注前-->
          <div class="list-r-attention" v-if="item.followUser.isfollow !== null">
            <a href="javascript:void(0);" class="attention active" ref="attentBtn">已关注</a>
          </div>
          <div class="list-r-attention" v-else>
            <a href="javascript:void(0);" class="attention" ref="attentBtn">关注</a>
          </div>
          <!--关注后 给a标签添加 active的class-->
        </div>
        <div class="list-links"><a :href="'/user/' + item.followUser.id" class="links"></a></div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'
  export default {
    name: 'fans',
    data () {
      return {
        page: 1,
        limit: 10,
        result: []
      }
    },
    head () {
      return {
        title: '我的粉丝'
      }
    },
    async asyncData () {
      try {
        let res = await axios.post('/api/fans', { credentials: true })
        return { result: res.data.fansData.data }
      } catch (err) {
        console.log(err)
      }
    },
    mounted () {},
    methods: {}
  }
</script>

<style lang="stylus">
@import "../../assets/styl/fans.styl";
</style>
