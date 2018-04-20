<template>
  <div class="follow">
    <!--没有关注内容显示-->
    <div class="noFollow" ref="follow" v-show="userFollowListData !== ''">
      <div class="cont">
        <div class="img"><img src="../../assets/img/attent.png" alt="Group"/></div>
        <div class="desc">还没有关注账号哟</div>
        <div class="find"><router-link to="/find">去发现</router-link></div>
      </div>
    </div>
    <!--已经有关注内容列表-->
    <!-- <data-list v-show="showSharePop" :pushDataList="result"></data-list> -->
    <follow-list-data></follow-list-data>
    <common-footer></common-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FollowListData from '../../components/FollowListData.vue';
import commonFooter from '../HomeFooter.vue';

export default {
  name: 'index-view',
  data() {
    return {
      showSharePop: false,
      result: [],
    };
  },
  mounted() {
    this.$refs.follow.style.minHeight = window.screen.height - 141 + 'px';
  },
  head() {
    return {
      title: '关注',
    };
  },
  computed: {
    ...mapGetters(['userFollowListData'])
  },
  components: {
    FollowListData,
    commonFooter,
  },
};
</script>


<style lang="stylus">
@import '../../assets/styl/home.styl';

.follow {
  width: 100%;
  background: #fff;
  max-width: 750px;
  margin: 0 auto;
  margin-top 91px

  .noFollow {
    position: relative;
    width: 100%;
    height: 100%;

    .cont {
      position: absolute;
      top: 100px;
      width: 100%;
      text-align: center;

      .img {
        width: 93px;
        height: 93px;
        margin: 0 auto;

        img {
          width: 100%;
        }
      }

      .desc {
        clear: both;
        color: #939393;
        font-size: 16px;
        width: 100%;
      }

      .find {
        clear: both;
        padding-top: 20px;
        width: 74px;
        height: 30px;
        margin: 0 auto;

        a {
          display: block;
          width: 100%;
          border: 1px solid #138FF2;
          border-radius: 3px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          color: #138FF2;
        }
      }
    }
  }
}
</style>
