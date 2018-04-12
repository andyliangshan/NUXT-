<template>
  <div>
    <div class="aticalClassfiy" v-show="listPop">
      <div class="incomeInfo">
        <div class="incomeList">
          <div class="choice">请选择文章分类</div>
          <div class="list">
            <div class="listInfo">
              <a href="javascript:void(0)">快讯要闻</a>
              <a href="javascript:void(0)">项目交流</a>
              <a href="javascript:void(0)">行情解读</a>
              <a href="javascript:void(0)">币圈说说</a>
              <a href="javascript:void(0)">小道消息</a>
              <a href="javascript:void(0)">撸羊毛</a>
              <a href="javascript:void(0)">行业知识</a>
              <a href="javascript:void(0)">其他</a>
            </div>
            <div class="queryDetail" @click="listTopHide"><a href="javascript:void(0)">×</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'reportList',
    data () {
      return {
        listPop: true
      }
    },
    methods: {
      listTopHide () {
        this.listPop = false
      }
    }
  }
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
    width: 94%;
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
            width: 82px;
            text-align: center;
            color: #202020;
            font-size: 14px;
            height: 30px;
            border-radius: 3px;
            line-height: 30px;
            margin: 0 10px 10px 0;
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
