<template>
  <div>
    <div class="aticalClassfiy" v-show="listPop">
      <div class="incomeInfo">
        <div class="incomeList">
          <div class="choice">请选择文章分类</div>
          <div class="list">
            <div class="listInfo" v-if="categoryData">
              <a href="javascript:void(0)" @click="getCategoryID(item)" v-for="(item, index) in categoryData" :key="index">{{ item.name }}</a>
            </div>
            <div class="queryDetail" @click="listTopHide"><a href="javascript:void(0)">×</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'reportList',
  middleware: 'authenticated',
  data() {
    return {
      listPop: true,
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'categoryData']),
  },
  mounted() {
    this.CATEGORY_ALL_DATA({ page: 1, limit: 10 });
  },
  methods: {
    ...mapActions(['CATEGORY_ALL_DATA']),
    listTopHide() {
      this.listPop = false;
      this.$emit('listpop', false);
    },
    getCategoryID(item) {
      if (!this.userInfo) {
        this.$router.push({ path: '/login' })
      } else {
        this.$router.push({ path: `/release/${item.id}` })
      }
    },
  },
};
</script>

<style lang="stylus">
.aticalClassfiy {
  width: 100%;
  position: fixed;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 1000;

  .incomeInfo {
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    position: fixed;
    bottom: 0;

    .incomeList {
      overflow: hidden;
      background: #fff;
      border-radius: 6px;

      .choice {
        font-size: 18px;
        color: #138FF2;
        font-weight: bolder;
        padding-top: 20px;
        line-height: 1;
        padding-left: 15px;
      }

      .list {
        clear: both;
        overflow: hidden;
        padding-top: 25px;

        .listInfo {
          clear: both;
          padding: 0 15px;
          overflow: hidden;

          a {
            float: left;
            display: inline-block;
            width: 31%;
            text-align: center;
            color: #202020;
            font-size: 14px;
            height: 30px;
            border-radius: 3px;
            line-height: 30px;
            margin: 0 3% 3% 0;
            background: #efefef;

            &:nth-child(3n + 3) {
              margin-right: 0;
            }
          }
        }
      }

      .queryDetail {
        clear: both;
        overflow: hidden;
        text-align: center;

        a {
          display: block;
          width: 100%;
          color: #202020;
          font-size: 20px;
          font-weight: bolder;
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
