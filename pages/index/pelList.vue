<template>
  <div class="recommendList">
    <div class="list">
      <ul>
        <li v-for="(item, index) in result" :key="index">
          <a href="javascript:void(0)">
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
import axios from '~/plugins/axios'

export default {
  name: 'recommendList',
  data () {
    return {
      result: [],
      page: 1,
      limit: 10,
      initData: []
    }
  },
  // async asyncData () {
  //   try {
  //     let res = await axios.get('/api/ru/rcd')
  //     console.log(res.data, '...')
  //     return { result: res.data }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },
  mounted () {
    this.recommedUserData()
  },
  methods: {
    async recommedUserData () {
      if (!this.initData) {
        this.result = this.initData
        return
      }
      const bkData = await axios.get(`/api/ru/rcd?page=${this.page}&limit=${this.limit}`, {
        credentials: true
      })
      if (!bkData.success) {
        this.result = bkData.data.data
        this.initData = bkData.data.data
      } else {
        alert('数据加载失败')
      }
    }
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
