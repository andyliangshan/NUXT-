<template>
  <div class="recommendList" v-if="recommedUserData">
    <div class="list">
      <ul>
        <li v-for="(item, index) in recommedUserData" :key="index">
          <a :href="'/user/' + item.rcdUser.id">
            <em><img :src="item.rcdUser.avatarImage" alt="back"/></em>
            <span class="name">{{ item.rcdUser.nickName }}</span>
            <span>{{ item.rcdUser.followCount }}关注</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'recommendList',
  data () {
    return {
      result: [],
      initData: []
    }
  },
  mounted () {
    this.RECOMMEND_USER_TEN_DATA()
  },
  computed: {
    ...mapGetters(['recommedUserData'])
  },
  methods: {
    ...mapActions(['RECOMMEND_USER_TEN_DATA'])
  }
}
</script>
<style lang="stylus">
  .recommendList {
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 10px 0;
    background: #f2f2f2;

    .list {
      width: 100%;

      ul {
        padding: 0;
        display: flex;
        justify-content: flex-start;
        margin: 0;

        li {
          margin-left: 10px;
          width: 72px;
          text-align: center;
          list-style: none;

          a {
            display: block;
            width: 100%;

            em {
              display: inline-block;
              width: 60px;

              img {
                width: 100%;
                height: 60px;
                border-radius 50%
                -webkit-border-radius 50%
                -moz-border-radius 50%
              }
            }

            span {
              display: inline-block;
              line-height: 1;
              font-size: 12px;
              margin-top: 5px;
              clear: both;
              width: 100%;
              color: #939393;
            }

            span.name {
              margin-top: 5px;
              color: #202020;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
