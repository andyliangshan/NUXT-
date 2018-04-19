<template>
  <div class="reportSuccess">
    <div class="incomeInfo">
      <div class="closeIncome">×</div>
      <div class="incomeList">
        <div class="title">举报成功</div>
        <div class="subTitle">您举报的内容已通过审核，原内容产生的全部收益已平分给每个举报人，收益已存入您的账户内，请查收！</div>
        <div class="list">
          <div class="listInfo">
            <div class="listInfo-l">文章收益</div>
            <div class="listInfo-r">
              <span>20<b>ZIB</b></span>
            </div>
          </div>
        </div>
        <div class="incomeInfoDesc">感谢您的举报，维护知币的社区生态，人人有责</div>
        <div class="queryDetail"><a href="/">查看详情</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'reportSuccess',
  computed: mapGetters(['userInfo', 'cpsData']),
  middleware: 'authenticated',
  mounted() {
    this.GET_CPS_DATA()
  },
  methods: {
    ...mapActions(['GET_CPS_DATA'])
  },
}
</script>

<style lang="stylus">
.reportSuccess {
  width: 100%;
  position: fixed;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;

  .incomeInfo {
    width: 80%;
    margin: 0 auto;
    margin-top: 20%;
    background: #fff;
    border-radius: 6px;
    padding: 10px;
    position: relative;

    .closeIncome {
      position: absolute;
      width: 30px;
      height: 30px;
      color: #939393;
      font-size: 20px;
      top: 0;
      right: 0;
      text-align: center;
    }

    .incomeList {
      overflow: hidden;
      padding: 10px 20px 0;

      .title {
        width: 100%;
        text-align: center;
        color: #0d0d0d;
        font-size: 18px;
        font-weight: bolder;
        line-height: 1;
      }

      .subTitle {
        width: 100%;
        color: #939393;
        font-size: 12px;
        clear: both;
        padding-top: 5px;
        line-height: 18px;
      }

      .list {
        clear: both;
        padding: 10px 0 0;
        overflow: hidden;

        .listInfo {
          clear: both;
          padding: 15px 0;
          display: flex;
          justify-content: space-between;

          .listInfo-l {
            color: #0d0d0d;
            font-size: 14px;
            font-weight: bolder;
          }

          .listInfo-r {
            text-align: right;

            span {
              display: inline-block;
              width: 100%;
              color: #0d0d0d;
              font-size: 12px;
              clear: both;

              b {
                display: inline-block;
                margin-left: 5px;
              }
            }
          }
        }
      }

      .incomeInfoDesc {
        clear: both;
        overflow: hidden;
        padding-top: 5px;
        color: #202020;
        font-size: 12px;
        line-height: 18px;
      }

      .queryDetail {
        clear: both;
        overflow: hidden;
        padding-top: 20px;
        text-align: center;

        a {
          display: block;
          width: 100%;
          color: #138FF2;
          font-size: 16px;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
